import { tick } from "svelte";
import { cubicInOut, quintOut } from "svelte/easing";
import { derived, get, writable } from "svelte/store";
import NavigationView from "./NavigationView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController, type UIViewControllerOptions } from "./UIViewController.js";
import { sleep } from "./internal/Util.js";

export class UINavigationController extends UIViewController {

	static animationDuration = 500;
	static animationDelay = 0;// delayを入れることで、pushアニメーションのはじめのカクツキを軽減できます。
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
		viewController.presentingViewController = this;
		const current = get(this.viewControllers);
		this.viewControllers.set(current.concat(viewController));

		if( !animated){
			return;
		}
		viewController.view.translateX.set(99, { duration: 0 });
	}
	async onChildMount(viewController:UIViewController){
		await sleep(1)
		viewController.view.translateX.set(0, { duration: UINavigationController.animationDuration });
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
