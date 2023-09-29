import type { UIViewController } from "$lib/index.js";
import type { UIViewControllerAnimatedTransitioning } from "./UIViewControllerAnimatedTransitioning.js";
import type { UIViewControllerContextTransitioning } from "./UIViewControllerContextTransitioning.js";
import type { UIViewControllerTransitioningDelegate } from "./UIViewControllerTransitioningDelegate.js";

export class MyTransitionDelegate implements UIViewControllerTransitioningDelegate {
	animationControllerForPresented(presented: UIViewController, presenting: UIViewController, source: UIViewController): UIViewControllerAnimatedTransitioning {
		return new MyPresentAnimation();
	}
}

class MyPresentAnimation implements UIViewControllerAnimatedTransitioning {
	animateTransition(transitionContext: UIViewControllerContextTransitioning) {
		
	}
}