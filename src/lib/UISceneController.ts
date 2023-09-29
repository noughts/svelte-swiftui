import { derived, get, writable } from "svelte/store";
import { UIViewController, UIViewControllerContextTransitioning } from "./UIViewController.js";
import SceneView from "./internal/SceneView.svelte";
import { UIView } from "./UIView.js";

export class UISceneController extends UIViewController {

	readonly className: string = "UISceneController";

	readonly viewControllers = writable<UIViewController[]>([]);
	readonly topViewController = derived(this.viewControllers, $a => {
		return $a[$a.length - 1];
	})

	constructor(rootViewController: UIViewController) {
		super(new UIView(SceneView), {})
		this.push(rootViewController, false)
	}

	push(viewController: UIViewController, animated: boolean = true) {
		viewController.presentingViewController = this;
		const viewControllers = get(this.viewControllers);
		this.viewControllers.set(viewControllers.concat(viewController));
	}
	async pop() {
		if (get(this.viewControllers).length <= 1) {
			return;
		}
		const newAry = [...get(this.viewControllers)];
		newAry.pop();
		this.viewControllers.set(newAry);
	}
}