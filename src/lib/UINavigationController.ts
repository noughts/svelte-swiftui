import { derived, get, writable } from "svelte/store";
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
		this.push(rootViewController)
	}

	push(viewController: UIViewController) {
		viewController.presentingViewController = this;
		const current = get(this.viewControllers);
		const prevTop_vc = current[current.length - 1];
		this.viewControllers.set(current.concat(viewController));
	}
	pop() {
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

