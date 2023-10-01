import { derived, get, writable, type Unsubscriber } from "svelte/store";
import NavigationView from "./NavigationView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController, type UIViewControllerOptions } from "./UIViewController.js";

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
		this.push(rootViewController, false)
	}

	unsubscribe?: Unsubscriber;
	async push(viewController: UIViewController, animated: boolean = true) {
		viewController.presentingViewController = this;
		const vcs = get(this.viewControllers);
		this.viewControllers.set(vcs.concat(viewController));
		if (animated == false) {
			return;
		}

		// アニメーション
		const fromVC = vcs[vcs.length - 1];
		viewController.isTransitioning.set(true)// containerScrollTop.subscribeの前に行ってください

		const targetLeft = window.innerWidth;
		this.unsubscribe = viewController.containerScrollLeft.subscribe(x => {
			const pct = x / targetLeft;
			fromVC.brightness.set(100 - (pct * 50));
			fromVC.translateX.set(`-${(pct * 100) * 0.25}%`);
			fromVC.navigationItem.opacity?.set(1 - pct);
			fromVC.navigationItem.translateX.set(`-${(pct * 100) * 0.25}%`);
			viewController.navigationItem.opacity.set(pct);
			if (get(viewController.isTransitioning) == false) {
				if (pct <= 0) {
					fromVC.brightness.set(100);
					fromVC.translateX.set("0");
					this.pop(false);
				}
			}
		});
		await viewController.containerScrollLeft.set(targetLeft, { duration: 333 })
		viewController.isTransitioning.set(false);
	}
	async pop(animated: boolean = true) {
		if (get(this.viewControllers).length <= 1) {
			return;
		}
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
		await fromVC.containerScrollLeft.set(0, { duration: 333 })
		fromVC.isTransitioning.set(false)
		this.viewControllers.set(newAry);
		this.unsubscribe && this.unsubscribe();
	}
}
