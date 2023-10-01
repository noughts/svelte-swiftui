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

	async push(viewController: UIViewController, animated: boolean = true) {
		viewController.presentingViewController = this;
		const viewControllers = get(this.viewControllers);
		const fromVC = viewControllers[viewControllers.length - 1];
		this.viewControllers.set(viewControllers.concat(viewController));

		if (!animated) {
			return;
		}

		const duration = 333;
		fromVC.brightness.set(50, { duration });
		viewController.scrollSnapType.set("none")
		await viewController.containerScrollTop.set(window.innerHeight, { duration })
		viewController.scrollSnapType.set("y mandatory");

	}
	async pop(animated: boolean = true) {
		if (get(this.viewControllers).length <= 1) throw "もうSceneControllerにスタックがありません"
		const newAry = [...get(this.viewControllers)];
		const fromVC = newAry.pop();
		if (!fromVC) throw "popできませんでした"
		if (!animated) {
			this.viewControllers.set(newAry);
			return;
		}

		const toVC = newAry[newAry.length - 1];
		toVC.brightness.set(100);
		await fromVC.containerScrollTop.set(0)
		this.viewControllers.set(newAry);
	}
}