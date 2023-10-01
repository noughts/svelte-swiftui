import { derived, get, writable, type Unsubscriber } from "svelte/store";
import { UIView } from "./UIView.js";
import { UIViewController } from "./UIViewController.js";
import SceneView from "./internal/SceneView.svelte";

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

	unsubscribe?: Unsubscriber;
	async push(viewController: UIViewController, animated: boolean = true) {
		viewController.presentingViewController = this;
		const viewControllers = get(this.viewControllers);
		const fromVC = viewControllers[viewControllers.length - 1];
		this.viewControllers.set(viewControllers.concat(viewController));

		if (!animated) {
			return;
		}
		viewController.isTransitioning.set(true)// containerScrollTop.subscribeの前に行ってください

		const targetTop = window.innerHeight;
		this.unsubscribe = viewController.containerScrollTop.subscribe(x => {
			const pct = x / targetTop;
			fromVC.brightness.set(100 - (pct * 50));
			fromVC.scale.set(1 - (pct / 50));
			if (get(viewController.isTransitioning) == false) {
				if (pct <= 0) {
					fromVC.brightness.set(100);
					fromVC.scale.set(1);
					this.pop(false);
				}
			}
		});

		await viewController.containerScrollTop.set(targetTop, { duration: 333 })
		viewController.isTransitioning.set(false);
	}
	async pop(animated: boolean = true) {
		if (get(this.viewControllers).length <= 1) throw "もうSceneControllerにスタックがありません"
		const newAry = [...get(this.viewControllers)];
		const fromVC = newAry.pop();
		if (!fromVC) throw "popできませんでした"
		
		if (!animated) {
			this.unsubscribe && this.unsubscribe();
			this.viewControllers.set(newAry);
			return;
		}

		// アニメーション
		fromVC.isTransitioning.set(true)
		await fromVC.containerScrollTop.set(0, { duration: 333 })
		fromVC.isTransitioning.set(false)
		this.viewControllers.set(newAry);
		this.unsubscribe && this.unsubscribe();
	}
}