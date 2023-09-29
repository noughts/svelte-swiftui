import type { UIViewController, UIViewControllerAnimatedTransitioning, UIViewControllerContextTransitioning, UIViewControllerTransitioningDelegate } from "$lib/UIViewController.js";
import { tick } from "svelte";
import { sleep } from "./Util.js";

export class PresentTransitionDelegate implements UIViewControllerTransitioningDelegate {
	animationControllerForPresented(
		presented: UIViewController,
		presenting: UIViewController,
		source?: UIViewController): UIViewControllerAnimatedTransitioning {
		return new PresentTransitioning();
	}
	animationControllerForDismissed(dismissed: UIViewController):UIViewControllerAnimatedTransitioning{
		return new DismissTransitioning();
	}
}

class PresentTransitioning implements UIViewControllerAnimatedTransitioning {
	async animateTransition(transitionContext: UIViewControllerContextTransitioning) {
		
		transitionContext.toVC.translateY.set("100%")
		await tick();
		transitionContext.toVC.translateY.set("0")
	}
	transitionDuration(transitionContext: UIViewControllerContextTransitioning) {
		return 0.3
	}
}

class DismissTransitioning implements UIViewControllerAnimatedTransitioning {
	async animateTransition(transitionContext: UIViewControllerContextTransitioning) {
		console.log(transitionContext)
		await tick();
		transitionContext.fromVC.translateY.set("100px")
	}
	transitionDuration(transitionContext: UIViewControllerContextTransitioning) {
		return 0.3
	}
}
