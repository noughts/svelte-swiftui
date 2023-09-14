import { get, writable } from "svelte/store";
import NavigationView from "./internal/NavigationView.svelte";
import { UIViewController } from "./UIViewController.js";

export class UINavigationController extends UIViewController {

	readonly viewControllers = writable<UIViewController[]>([]);

	constructor(rootViewController: UIViewController) {
		super(NavigationView, { rootViewController })
		rootViewController.navigationController = this;
		this.viewControllers.set([rootViewController]);
	}

	get topViewController(): UIViewController {
		const vcs = get(this.viewControllers);
		return vcs[vcs.length - 1];
	}

	push(viewController: UIViewController) {
		console.log("push", viewController)
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