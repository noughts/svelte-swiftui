import { derived, get, writable } from "svelte/store";
import NavigationView from "./internal/NavigationView.svelte";
import { UIViewController } from "./UIViewController.js";

export class UINavigationController extends UIViewController {

	readonly viewControllers = writable<UIViewController[]>([]);
	readonly topViewController = derived(this.viewControllers, $a => {
		return $a[$a.length - 1];
	})

	constructor(rootViewController: UIViewController, subComponent?: any) {
		super(NavigationView, { subComponent })
		rootViewController.presentingViewController = this;
		this.viewControllers.set([rootViewController]);
	}

	push(viewController: UIViewController) {
		viewController.presentingViewController = this;
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