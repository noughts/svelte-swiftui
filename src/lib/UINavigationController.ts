import { derived, get, writable, type Unsubscriber } from "svelte/store";
import NavigationView from "./NavigationView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController, type UIViewControllerOptions } from "./UIViewController.js";
import { sleep } from "./internal/Util.js";
import { tick } from "svelte";

export class UINavigationController extends UIViewController {

	readonly className: string = "UINavigationController";
	readonly viewControllers = writable<UIViewController[]>([]);
	readonly topViewController = derived(this.viewControllers, $a => {
		return $a[$a.length - 1];
	})

	constructor(rootViewController: UIViewController, subview?: UIView | null, options?: UIViewControllerOptions) {
		const view = new UIView(NavigationView);
		if( subview ){
			view.addSubView(subview);
		}
		super(view, options)
		this.push(rootViewController, false)
	}

	unsubscribe?: Unsubscriber;
	transitioning = false;
	async push(viewController: UIViewController, animated: boolean = true) {
		if( this.transitioning ){
			console.warn("トランジション中です")
			return;
		}
		this.transitioning = true;
		this.unsubscribe && this.unsubscribe();
		viewController.presentingViewController = this;
		const vcs = get(this.viewControllers);
		this.viewControllers.set(vcs.concat(viewController));
		if (animated == false) {
			this.transitioning = false;
			return;
		}

		await tick();// viewControllersが反映されるのを待つ

		const renderedViewInstance = this.view.renderedInstance as NavigationView;
		const topElement = renderedViewInstance.getTopElement()
		await topElement.getScrollView().scrollTo({ left: 375, behavior: "smooth" });
		this.transitioning = false;

		
		// アニメーション
		// const fromVC = vcs[vcs.length - 1];
		// const screenWidth = get(this.view.width);
		// this.unsubscribe = viewController.view.containerScrollLeft.subscribe(x => {
		// 	const pct = x / screenWidth;
		// 	fromVC.view.brightness.set(100 - (pct * 50));
		// 	fromVC.view.translateX.set(`-${(pct * 100) * 0.25}%`);
		// 	if (get(viewController.isTransitioning) == false) {
		// 		if (pct <= 0) {
		// 			this.pop(false);
		// 			this.transitioning = false;
		// 		}
		// 	}
		// });
		// await tween(0, screenWidth, { duration: 333, easing: cubicOut }, x => {
		// 	viewController.view.containerScrollLeft.set(x)
		// })
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
			this.unsubscribe && this.unsubscribe();
			this.viewControllers.set(newAry);
			return;
		}

		// アニメーション
		this.transitioning = true;
		this.viewControllers.set(newAry);
		this.unsubscribe && this.unsubscribe();
	}
}
