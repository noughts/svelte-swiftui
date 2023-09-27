import type { UIViewController } from "$lib/index.js";

export class UIPresentationController {
	constructor(readonly presentedViewController: UIViewController, readonly presentingViewController: UIViewController) {

	}
}