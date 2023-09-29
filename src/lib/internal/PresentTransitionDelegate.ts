import type { UIViewController, UIViewControllerAnimatedTransitioning, UIViewControllerContextTransitioning, UIViewControllerTransitioningDelegate } from "$lib/UIViewController.js";

export class PresentTransitionDelegate implements UIViewControllerTransitioningDelegate {
	animationControllerForPresented(
		presented: UIViewController,
		presenting: UIViewController,
		source: UIViewController): UIViewControllerAnimatedTransitioning {
		return new PresentTransitioning();
	}
}

class PresentTransitioning implements UIViewControllerAnimatedTransitioning {
	animateTransition(transitionContext: UIViewControllerContextTransitioning) {

	}
	transitionDuration(transitionContext: UIViewControllerContextTransitioning) {
		return 0.3
	}
}