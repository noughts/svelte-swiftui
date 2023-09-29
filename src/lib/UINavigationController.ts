import { derived, get, writable } from "svelte/store";
import NavigationView from "./NavigationView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController, type UIViewControllerOptions } from "./UIViewController.js";
import { MyTransitionDelegate } from "./internal/MyTransitionDelegate.js";

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
		if( !viewController.transitioningDelegate){
			viewController.transitioningDelegate = new MyTransitionDelegate();
			// const animeController = viewController.transitioningDelegate.animationControllerForPresented(viewController)
		}
		const current = get(this.viewControllers);
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