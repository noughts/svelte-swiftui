import { writable } from "svelte/store";
import type { UINavigationController } from "./UINavigationController.js";
import type { UISceneController } from "./UISceneController.js";
import type { UIView } from "./UIView.js";
import type { UINavigationItem, UITabBarController, UITabBarItem } from "./index.js";
import { PresentTransitionDelegate } from "./internal/PresentTransitionDelegate.js";
import type { UIPercentDrivenInteractiveTransition } from "./internal/UIPercentDrivenInteractiveTransition.js";
import type { UIPresentationController } from "./internal/UIPresentationController.js";

export type UIViewControllerOptions = {
	navigationItem?: UINavigationItem;
	tabBarItem?: UITabBarItem;
	hidesNavigationBarWhenPushed?: boolean;
}

enum UIModalPresentationStyle {
	fullScreen = 'fullScreen',
	pageSheet = 'pageSheet',
	formSheet = 'formSheet',
}

export class UIViewController extends EventTarget {

	readonly className: string = "UIViewController";
	readonly translateX = writable(0);
	readonly translateY = writable("0");

	hidesNavigationBarWhenPushed = false;
	navigationItem: UINavigationItem = { title: "placeholder" };
	tabBarItem: UITabBarItem = { title: "placeholder", icon: { name: "" } };
	presentingViewController?: UIViewController;
	modalPresentationStyle: UIModalPresentationStyle = UIModalPresentationStyle.pageSheet;
	transitioningDelegate?: UIViewControllerTransitioningDelegate = new PresentTransitionDelegate();

	constructor(readonly view: UIView, readonly options?: UIViewControllerOptions) {
		super();
		if (options?.hidesNavigationBarWhenPushed) {
			this.hidesNavigationBarWhenPushed = options.hidesNavigationBarWhenPushed;
		}
		if (options?.navigationItem) {
			this.navigationItem = options.navigationItem;
		}
		if (options?.tabBarItem) {
			this.tabBarItem = options.tabBarItem;
		}
	}

	get tabBarController(): UITabBarController | null {
		let parent: UIViewController | undefined = this;
		while (true) {
			if (!parent) return null;
			// 循環参照を避けるために instanceof は使用しません
			if (parent.className == "UITabBarController") return parent as UITabBarController;
			parent = parent.presentingViewController;
		}
	}
	get navigationController(): UINavigationController | null {
		let parent: UIViewController | undefined = this;
		while (true) {
			if (!parent) return null;
			// 循環参照を避けるために instanceof は使用しません
			if (parent.className == "UINavigationController") return parent as UINavigationController;
			parent = parent.presentingViewController;
		}
	}
	get sceneController(): UISceneController | null {
		let parent: UIViewController | undefined = this;
		while (true) {
			if (!parent) return null;
			// 循環参照を避けるために instanceof は使用しません
			if (parent.className == "UISceneController") return parent as UISceneController;
			parent = parent.presentingViewController;
		}
	}

	present(viewController: UIViewController) {
		const sc = this.sceneController;
		if (!sc) throw "UISceneControllerが見つかりません";
		sc.push(viewController);
	}
	dismiss() {
		const sc = this.sceneController;
		if (!sc) throw "UISceneControllerが見つかりません";
		sc.pop();
	}
}



export class UIViewControllerContextTransitioning {
	constructor(readonly fromVC:UIViewController, readonly toVC:UIViewController){}
}

export interface UIViewControllerInteractiveTransitioning {
	startInteractiveTransition: (transitionContext: UIViewControllerContextTransitioning) => void;
}

export interface UIViewControllerTransitioningDelegate {

	// --- トランジション・アニメーター・オブジェクトの取得

	// ViewControllerを表示する際に使用する遷移アニメータオブジェクトをデリゲートに問い合わせます。
	animationControllerForPresented?: (
		presented: UIViewController,
		presenting: UIViewController,
		source?: UIViewController) => UIViewControllerAnimatedTransitioning;

	// ViewControllerを終了する際に使用する遷移アニメータオブジェクトをデリゲートに問い合わせます。
	animationControllerForDismissed?: (dismissed: UIViewController) => UIViewControllerAnimatedTransitioning;

	// --- インタラクティブ・アニメーター・オブジェクトの取得

	// ViewControllerを表示する際に使用するインタラクティブアニメータオブジェクトをデリゲートに問い合わせます。
	interactionControllerForPresentation?: (animator: UIViewControllerAnimatedTransitioning)
		=> UIPercentDrivenInteractiveTransition;

	// ViewControllerを終了する際に使用するインタラクティブアニメータオブジェクトをデリゲートに問い合わせます。
	interactionControllerForDismissal?: (animator: UIViewControllerAnimatedTransitioning)
		=> UIPercentDrivenInteractiveTransition;

	// --- カスタム・プレゼンテーション・コントローラの取得

	// ViewControllerを表示する際のビュー階層の管理に使用するカスタムプレゼンテーションコントローラをデリゲートに問い合わせます。
	presentationController?: (presented: UIViewController, presenting: UIViewController, source: UIViewController)
		=> UIPresentationController;
}

export interface UIViewControllerAnimatedTransitioning {
	// アニメーターオブジェクトにトランジションアニメーションを実行させる。
	animateTransition: (transitionContext: UIViewControllerContextTransitioning) => void;

	// アニメーターオブジェクトにトランジションアニメーションの継続時間（秒）を尋ねます。
	transitionDuration:(transitionContext: UIViewControllerContextTransitioning) => number;
}