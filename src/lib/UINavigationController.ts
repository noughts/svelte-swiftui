import { derived, get, writable } from "svelte/store";
import NavigationView from "./NavigationView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController, type UIViewControllerOptions } from "./UIViewController.js";
import { sleep } from "./internal/Util.js";

export class UINavigationController extends UIViewController {

	static animationDuration = 500;
	transitioning = false;
	readonly className: string = "UINavigationController";
	readonly viewControllers = writable<UIViewController[]>([]);
	readonly topViewController = derived(this.viewControllers, $a => {
		return $a[$a.length - 1];
	})

	constructor(rootViewController: UIViewController, options?: UIViewControllerOptions, subview?: UIView | null) {
		const view = new UIView(NavigationView);
		if (subview) {
			view.addSubView(subview);
		}
		super(view, options)
		this.push(rootViewController, false)
	}
	async push(viewController: UIViewController, animated: boolean = true) {
		if (this.transitioning) {
			console.warn("現在遷移中です")
			return;
		}
		viewController.presentingViewController = this;
		const current = get(this.viewControllers);
		this.viewControllers.set(current.concat(viewController));

		if (!animated) {
			return;
		}
		this.transitioning = true;
		viewController.view.translateX.set(99, { duration: 0 });
	}
	async onChildMount(viewController: UIViewController) {
		await sleep(1)
		viewController.view.translateX.set(0);
		const vcs = get(this.viewControllers);
		const prev_vc = vcs[vcs.length - 2];
		if (prev_vc) {
			prev_vc.view.translateX.set(-50);
			prev_vc.view.brightness.set(50)
		}
		setTimeout(() => {
			this.transitioning = false;
		}, UINavigationController.animationDuration);
	}
	pop(animated: boolean) {
		if (this.transitioning) {
			console.warn("現在遷移中です")
			return;
		}
		if (get(this.viewControllers).length <= 1) {
			return;
		}
		const newAry = [...get(this.viewControllers)];
		newAry.pop();
		this.viewControllers.set(newAry);

		if (!animated) {
			return;
		}

		this.transitioning = true;
		const next_vc = newAry[newAry.length - 1];
		next_vc.view.translateX.set(0);
		next_vc.view.brightness.set(100)
		setTimeout(() => {
			this.transitioning = false;
		}, UINavigationController.animationDuration);
	}
}
