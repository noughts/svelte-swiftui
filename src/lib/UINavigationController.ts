import { tick } from "svelte";
import { derived, get, writable, type Unsubscriber } from "svelte/store";
import NavigationView from "./NavigationView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController, type UIViewControllerOptions } from "./UIViewController.js";
import { tween } from "./internal/Util.js";
import { cubicOut } from "svelte/easing";

export class UINavigationController extends UIViewController {

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


	transitioning = false;
	unsubscribe?:Unsubscriber;
	async push(viewController: UIViewController, animated: boolean = true) {
		if (this.transitioning) {
			console.warn("トランジション中です")
			return;
		}
		this.transitioning = true;
		viewController.presentingViewController = this;
		const vcs = get(this.viewControllers);
		this.viewControllers.set(vcs.concat(viewController));
		if (animated == false) {
			this.transitioning = false;
			return;
		}

		await tick();// viewControllersが反映されるのを待つ
		const screenWidth = get(this.view.width);

		// アニメーション
		const fromVC = vcs[vcs.length - 1];
		this.unsubscribe = viewController.view.containerScrollLeft.subscribe(x => {
			const pct = x / screenWidth;
			fromVC.view.brightness.set(100 - (pct * 50));
			fromVC.view.translateX.set(`-${(pct * 100) * 0.25}%`);
		});
		fromVC.view.opacity.set(0.5)

		await tween(100, 0, { duration: 333, easing: cubicOut }, x => {
			viewController.view.translateX.set(`${x}%`)
		})
		this.transitioning = false;
		console.log("Push完了")
	}

	async pop(animated: boolean = true) {
		if (this.transitioning) {
			console.warn("トランジション中です")
			return;
		}
		if (get(this.viewControllers).length <= 1) {
			return;
		}
		const newAry = [...get(this.viewControllers)];
		const fromVC = newAry.pop();
		const toVC = newAry[newAry.length - 1];
		if (!fromVC) throw "popできませんでした"

		if (!animated) {
			toVC.view.brightness.set(100);
			toVC.view.translateX.set("0");
			this.viewControllers.set(newAry);
			return;
		}

		// アニメーション
		this.transitioning = true;
		await tween(0, 100, { duration: 333, easing: cubicOut }, x => {
			fromVC.view.containerScrollLeft.set(x)
		})
		this.transitioning = false;
		this.viewControllers.set(newAry);
		this.unsubscribe && this.unsubscribe();

	}
}
