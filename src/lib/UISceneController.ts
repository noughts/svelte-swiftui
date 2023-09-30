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
		const fromVC = viewControllers[viewControllers.length - 1];
		this.viewControllers.set(viewControllers.concat(viewController));

		if( !animated){
			return;
		}

		if (viewController.transitioningDelegate?.animationControllerForPresented) {
			const animator = viewController.transitioningDelegate.animationControllerForPresented(viewController, this);
			const context = new UIViewControllerContextTransitioning(fromVC, viewController)
			animator.animateTransition(context);
		}
	}
	async pop() {
		if (get(this.viewControllers).length <= 1) {
			return;
		}
		const newAry = [...get(this.viewControllers)];
		const fromVC = newAry.pop();
		if (!fromVC) {
			return;
		}
		const toVC = newAry[newAry.length - 1];

		if( !fromVC.transitioningDelegate?.animationControllerForDismissed ){
			this.viewControllers.set(newAry);
			return;
		}

		const animator = fromVC.transitioningDelegate.animationControllerForDismissed(fromVC);
		const context = new UIViewControllerContextTransitioning(fromVC, toVC)
		if( !fromVC.transitioningDelegate.interactionControllerForDismissal ){
			await animator.animateTransition(context);
			this.viewControllers.set(newAry);
			return;
		}
		
		const interactor = fromVC.transitioningDelegate.interactionControllerForDismissal(animator)
	}
}