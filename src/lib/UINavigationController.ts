import { derived, get, writable, type Unsubscriber } from "svelte/store";
import NavigationView from "./NavigationView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController, type UIViewControllerAnimatedTransitioning, type UIViewControllerInteractiveTransitioning, type UIViewControllerOptions } from "./UIViewController.js";

export class UINavigationController extends UIViewController {

	readonly className: string = "UINavigationController";
	readonly viewControllers = writable<UIViewController[]>([]);
	readonly topViewController = derived(this.viewControllers, $a => {
		return $a[$a.length - 1];
	})

	constructor(rootViewController: UIViewController, view?: UIView | null, options?: UIViewControllerOptions) {
		if (view) {
			super(view, options)
		} else {
			super(new UIView(NavigationView), options)
		}
		this.push(rootViewController, false)
	}

	unsubscribe?: Unsubscriber;
	async push(viewController: UIViewController, animated: boolean = true) {
		viewController.presentingViewController = this;
		const vcs = get(this.viewControllers);
		const fromVC = vcs[vcs.length - 1];
		this.viewControllers.set(vcs.concat(viewController));

		if (animated == false) {
			return;
		}

		// アニメーション
		viewController.isTransitioning.set(true)// containerScrollTop.subscribeの前に行ってください

		const targetLeft = window.innerWidth;
		this.unsubscribe = viewController.containerScrollLeft.subscribe(x => {
			const pct = x / targetLeft;
			fromVC.brightness.set(100 - (pct * 50));
			fromVC.scale.set(1 - (pct / 50));
			if (get(viewController.isTransitioning) == false) {
				if (pct <= 0.05) {
					this.pop(false);
				}
			}
		});
		await viewController.containerScrollLeft.set(targetLeft, { duration: 333 })
		viewController.isTransitioning.set(false);
	}
	async pop(animated: boolean = true) {
		if (get(this.viewControllers).length <= 1) {
			return;
		}
		const newAry = [...get(this.viewControllers)];
		newAry.pop();
		this.viewControllers.set(newAry);
	}
}

export interface UINavigationControllerDelegate {
	// デリゲートが、ビューコントローラの遷移時に使用する 非インタラクティブなアニメーターオブジェクトを返せるようにします。
	animationControllerForOperation?: (
		operation: "push" | "pop",
		fromVC: UIViewController,
		toVC: UIViewController)
		=> UIViewControllerAnimatedTransitioning

	// ビューコントローラの遷移時に使用するインタラクティブなアニメータオブジェクトをデリゲートが返せるようにします。
	interactionControllerFor?: (animationController: UIViewControllerAnimatedTransitioning)
		=> UIViewControllerInteractiveTransitioning;
}

