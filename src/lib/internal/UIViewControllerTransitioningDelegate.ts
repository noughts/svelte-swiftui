import type { UIViewController } from "$lib/index.js";
import type { UIPresentationController } from "./UIPresentationController.js";
import type { UIViewControllerAnimatedTransitioning } from "./UIViewControllerAnimatedTransitioning.js";

export interface UIViewCOntrollerTransitioningDelegate {
	// ViewControllerを表示する際に使用する遷移アニメータオブジェクトをデリゲートに問い合わせます。
	animationControllerForPresented?: (presented: UIViewController, presenting: UIViewController, source: UIViewController) => UIViewControllerAnimatedTransitioning;

	// ビューコントローラを終了する際に使用する遷移アニメータオブジェクトをデリゲートに問い合わせます。
	animationControllerForDismissed?:(dismissed:UIViewController) => UIViewControllerAnimatedTransitioning;

	// ビューコントローラを表示する際のビュー階層の管理に使用するカスタムプレゼンテーションコントローラをデリゲートに問い合わせます。
	presentationController?:(presented:UIViewController, presenting:UIViewController, source:UIViewController) => UIPresentationController;
}