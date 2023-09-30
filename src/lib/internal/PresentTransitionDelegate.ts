import type { UIViewController, UIViewControllerAnimatedTransitioning, UIViewControllerContextTransitioning, UIViewControllerTransitioningDelegate } from "$lib/UIViewController.js";
import { UIPercentDrivenInteractiveTransition } from "./UIPercentDrivenInteractiveTransition.js";

export class PresentTransitionDelegate implements UIViewControllerTransitioningDelegate {

	readonly interactionController = new UIPercentDrivenInteractiveTransition();

	animationControllerForPresented(
		presented: UIViewController,
		presenting: UIViewController,
		source?: UIViewController): UIViewControllerAnimatedTransitioning {
		return new PresentAnimator();
	}
	animationControllerForDismissed(dismissed: UIViewController): UIViewControllerAnimatedTransitioning {
		return new DismissAnimator();
	}
	interactionControllerForDismissal(animator: UIViewControllerAnimatedTransitioning):UIPercentDrivenInteractiveTransition{
		return this.interactionController;
	}
}	

class PresentAnimator implements UIViewControllerAnimatedTransitioning {
	async animateTransition(transitionContext: UIViewControllerContextTransitioning) {
		const duration = this.transitionDuration(transitionContext) * 1000;
		
		transitionContext.fromVC.brightness.set(50, {duration});
		await transitionContext.toVC.containerScrollTop.set(window.innerHeight, {duration})
	}
	transitionDuration(transitionContext: UIViewControllerContextTransitioning) {
		return 0.333
	}
}

class DismissAnimator implements UIViewControllerAnimatedTransitioning {
	async animateTransition(transitionContext: UIViewControllerContextTransitioning) {
		const duration = this.transitionDuration(transitionContext) * 1000;

		transitionContext.toVC.brightness.set(100, {duration});
		await transitionContext.fromVC.containerScrollTop.set(0, {duration})
	}
	transitionDuration(transitionContext: UIViewControllerContextTransitioning) {
		return 0.333
	}
}
