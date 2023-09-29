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
		const duration = this.transitionDuration(transitionContext);
		transitionContext.toVC.transitionDuration.set(duration)
		transitionContext.fromVC.transitionDuration.set(duration)
		
		transitionContext.toVC.translateY.set("100%")
		await tick();
		transitionContext.toVC.translateY.set("0")
		transitionContext.fromVC.brightness.set("50%");
	}
	transitionDuration(transitionContext: UIViewControllerContextTransitioning) {
		return 1.333
	}
}

class DismissTransitioning implements UIViewControllerAnimatedTransitioning {
	async animateTransition(transitionContext: UIViewControllerContextTransitioning) {
		const duration = this.transitionDuration(transitionContext);
		transitionContext.fromVC.transitionDuration.set(duration)
		transitionContext.toVC.transitionDuration.set(duration)

		transitionContext.fromVC.translateY.set("100%")
		transitionContext.toVC.brightness.set("100%");
		await sleep(duration*1000);
	}
	transitionDuration(transitionContext: UIViewControllerContextTransitioning) {
		return 0.333
	}
}
