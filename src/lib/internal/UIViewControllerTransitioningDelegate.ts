import type { UIViewController } from "$lib/index.js";
import type { UIPercentDrivenInteractiveTransition } from "./UIPercentDrivenInteractiveTransition.js";
import type { UIPresentationController } from "./UIPresentationController.js";
import type { UIViewControllerAnimatedTransitioning } from "./UIViewControllerAnimatedTransitioning.js";

export interface UIViewCOntrollerTransitioningDelegate {

	// --- トランジション・アニメーター・オブジェクトの取得

	// ViewControllerを表示する際に使用する遷移アニメータオブジェクトをデリゲートに問い合わせます。
	animationControllerForPresented?: (presented: UIViewController, presenting: UIViewController, source: UIViewController) => UIViewControllerAnimatedTransitioning;

	// ViewControllerを終了する際に使用する遷移アニメータオブジェクトをデリゲートに問い合わせます。
	animationControllerForDismissed?: (dismissed: UIViewController) => UIViewControllerAnimatedTransitioning;

	// --- インタラクティブ・アニメーター・オブジェクトの取得

	// ViewControllerを表示する際に使用するインタラクティブアニメータオブジェクトをデリゲートに問い合わせます。
	interactionControllerForPresentation?: (animator: UIViewControllerAnimatedTransitioning) => UIPercentDrivenInteractiveTransition;

	// ViewControllerを終了する際に使用するインタラクティブアニメータオブジェクトをデリゲートに問い合わせます。
	interactionControllerForDismissal?:(animator:UIViewControllerAnimatedTransitioning) => UIPercentDrivenInteractiveTransition;

	// --- Getting the custom presentation controller

	// ViewControllerを表示する際のビュー階層の管理に使用するカスタムプレゼンテーションコントローラをデリゲートに問い合わせます。
	presentationController?: (presented: UIViewController, presenting: UIViewController, source: UIViewController) => UIPresentationController;
}