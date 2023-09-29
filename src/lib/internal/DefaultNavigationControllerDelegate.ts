import type { UINavigationControllerDelegate } from "$lib/UINavigationController.js";
import type { UIViewController } from "$lib/index.js";
import type { UIViewControllerAnimatedTransitioning } from "./UIViewControllerAnimatedTransitioning.js";
import type { UIViewControllerContextTransitioning } from "./UIViewControllerContextTransitioning.js";

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
}