import { derived, get, writable } from "svelte/store";
import Scene from "./Scene.svelte";
import { UIViewController } from "./UIViewController.js";

export class UISceneController extends UIViewController {

	readonly viewControllers = writable<UIViewController[]>([]);
	readonly topViewController = derived(this.viewControllers, $a => {
		return $a[$a.length - 1];
	})

	constructor(rootViewController: UIViewController) {
		super(Scene, {})
		rootViewController.sceneController = this;
		this.viewControllers.set([rootViewController]);
	}

	push(viewController: UIViewController) {
		viewController.sceneController = this;
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