import type { UINavigationControllerDelegate } from "$lib/UINavigationController.js";
import type { UIViewControllerAnimatedTransitioning, UIViewControllerContextTransitioning } from "$lib/UIViewController.js";
import type { UIViewController } from "$lib/index.js";

export class DefaultNavigationControllerDelegate implements UINavigationControllerDelegate {
	animationControllerForOperation(
		operation: "push" | "pop",
		fromVC: UIViewController,
		toVC: UIViewController): UIViewControllerAnimatedTransitioning {
		return new MyAnimatedTransitioning();
	}
}


class MyAnimatedTransitioning implements UIViewControllerAnimatedTransitioning {
	animateTransition(transitionContext: UIViewControllerContextTransitioning) {

	};
	transitionDuration(transitionContext: UIViewControllerContextTransitioning) {
		return 0.3
	}
}