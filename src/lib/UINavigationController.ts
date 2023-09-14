import { derived, get, writable } from "svelte/store";
import NavigationView from "./internal/NavigationView.svelte";
import { UIViewController } from "./UIViewController.js";

export class UINavigationController extends UIViewController {

	readonly viewControllers = writable<UIViewController[]>([]);
	readonly topViewController = derived(this.viewControllers, $a => {
		return $a[$a.length - 1];
	})

	constructor(rootViewController: UIViewController) {
		super(NavigationView, {})
		rootViewController.navigationController = this;
		rootViewController.sceneController = this.sceneController;
		this.viewControllers.set([rootViewController]);
	}

	push(viewController: UIViewController) {
		viewController.navigationController = this;
		viewController.sceneController = this.sceneController;
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