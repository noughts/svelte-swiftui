import { cubicOut } from "svelte/easing";
import { derived, get, writable, type Unsubscriber } from "svelte/store";
import NavigationView from "./NavigationView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController, type UIViewControllerOptions } from "./UIViewController.js";
import { tween } from "./internal/Util.js";

export class UINavigationController extends UIViewController {

	readonly className: string = "UINavigationController";
	readonly viewControllers = writable<UIViewController[]>([]);
	readonly topViewController = derived(this.viewControllers, $a => {
		return $a[$a.length - 1];
	})
	readonly navigationBarTranslateX = writable("0");

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

		const screenWidth = get(this.view.width);
		this.unsubscribe = viewController.view.containerScrollLeft.subscribe(x => {
			const pct = x / screenWidth;
			fromVC.view.brightness.set(100 - (pct * 50));
			fromVC.view.translateX.set(`-${(pct * 100) * 0.25}%`);
			if (fromVC.hidesNavigationBarWhenPushed) {
				this.navigationBarTranslateX.set(`${100 - pct * 100}%`)
				fromVC.navigationItem.opacity.set(0);
			} else {
				viewController.navigationItem.opacity.set(pct);
				fromVC.navigationItem.opacity?.set(1 - pct);
				fromVC.navigationItem.translateX.set(`-${(pct * 100) * 0.25}%`);
			}

			if (get(viewController.isTransitioning) == false) {
				if (pct <= 0) {
					// this.pop(false);
				}
			}
		});
		// await tween(0, screenWidth, { duration: 333, easing: cubicOut }, x => {
		// 	viewController.view.containerScrollLeft.set(x)
		// })
		viewController.isTransitioning.set(false);
	}


	async pop(animated: boolean = true) {
		if (get(this.viewControllers).length <= 1) {
			return;
		}
		const newAry = [...get(this.viewControllers)];
		const fromVC = newAry.pop();
		const toVC = newAry[newAry.length-1];
		if (!fromVC) throw "popできませんでした"

		if (!animated) {
			toVC.view.brightness.set(100);
			toVC.view.translateX.set("0");
			toVC.navigationItem.opacity?.set(1);
			toVC.navigationItem.translateX.set(`0`);
			this.unsubscribe && this.unsubscribe();
			this.viewControllers.set(newAry);
			return;
		}

		// アニメーション
		fromVC.isTransitioning.set(true)
		await tween(get(fromVC.view.containerScrollLeft), 0, { duration: 333, easing: cubicOut }, x => {
			fromVC.view.containerScrollLeft.set(x)
		})
		fromVC.isTransitioning.set(false)
		this.viewControllers.set(newAry);
		this.unsubscribe && this.unsubscribe();
	}
}
