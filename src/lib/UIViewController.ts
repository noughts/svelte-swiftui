import type { UINavigationController } from "./UINavigationController.js";
import type { UISceneController } from "./UISceneController.js";
import type { UIView } from "./UIView.js";
import type { UINavigationItem, UITabBarController, UITabBarItem } from "./index.js";
import { UIPercentDrivenInteractiveTransition } from "./internal/UIPercentDrivenInteractiveTransition.js";
import type { UIViewCOntrollerTransitioningDelegate } from "./internal/UIViewControllerTransitioningDelegate.js";

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

	hidesNavigationBarWhenPushed = false;
	navigationItem: UINavigationItem = { title: "placeholder" };
	tabBarItem: UITabBarItem = { title: "placeholder", icon: { name: "" } };
	presentingViewController?: UIViewController;
	modalPresentationStyle: UIModalPresentationStyle = UIModalPresentationStyle.pageSheet;
	transitioningDelegate?:UIViewCOntrollerTransitioningDelegate;
	interactionController = new UIPercentDrivenInteractiveTransition();

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

