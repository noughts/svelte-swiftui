import { tick } from "svelte";
import { derived, get, writable, type Unsubscriber } from "svelte/store";
import NavigationView from "./NavigationView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController, type UIViewControllerOptions } from "./UIViewController.js";
import type NavigationViewElement from "./internal/NavigationViewElement.svelte";

export class UINavigationController extends UIViewController {

	readonly className: string = "UINavigationController";
	readonly viewControllers = writable<UIViewController[]>([]);
	readonly topViewController = derived(this.viewControllers, $a => {
		return $a[$a.length - 1];
	})

	constructor(rootViewController: UIViewController, subview?: UIView | null, options?: UIViewControllerOptions) {
		const view = new UIView(NavigationView);
		if (subview) {
			view.addSubView(subview);
		}
		super(view, options)
		this.push(rootViewController, false)
	}

	private get topElement():NavigationViewElement{
		return get(this.topViewController).navigationElementInstance;
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

		this.topElement.setUserInteractionEnabled(false);
		await this.topElement.getScrollView().scrollTo({ left: screenWidth, behavior: "smooth" })
		this.topElement.setUserInteractionEnabled(true);
		this.transitioning = false;
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
		this.topElement.setUserInteractionEnabled(false);
		await this.topElement.getScrollView().scrollTo({ left: 0, behavior: "smooth" })
		this.transitioning = false;
		this.viewControllers.set(newAry);
		this.unsubscribe && this.unsubscribe();

	}
}
