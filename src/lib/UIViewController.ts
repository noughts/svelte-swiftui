import { writable } from "svelte/store";
import type { UINavigationController } from "./UINavigationController.js";
import type { UISceneController } from "./UISceneController.js";
import type { UIView } from "./UIView.js";
import type { UITabBarController, UITabBarItem } from "./index.js";
import { UINavigationItem } from "./internal/UINavigationItem.js";

export type UIViewControllerOptions = {
	navigationItem?: UINavigationItem;
	tabBarItem?: UITabBarItem;
	hidesNavigationBarWhenPushed?: boolean;
}

enum UIModalPresentationStyle {
	fullScreen = 'fullScreen',
	pageSheet = 'pageSheet',
	formSheet = 'formSheet',
}

export class UIViewController extends EventTarget {

	readonly className: string = "UIViewController";
	readonly isTransitioning = writable(false);
	renderedViewInstance:any;

	hidesNavigationBarWhenPushed = false;
	navigationItem: UINavigationItem = new UINavigationItem;
	tabBarItem: UITabBarItem = { title: "placeholder", icon: { name: "" } };
	presentingViewController?: UIViewController;
	modalPresentationStyle: UIModalPresentationStyle = UIModalPresentationStyle.pageSheet;

	constructor(readonly view: UIView, readonly options?: UIViewControllerOptions) {
		super();
		if (options?.hidesNavigationBarWhenPushed) {
			this.hidesNavigationBarWhenPushed = options.hidesNavigationBarWhenPushed;
		}
		if (options?.navigationItem) {
			this.navigationItem = options.navigationItem;
		}
		if (options?.tabBarItem) {
			this.tabBarItem = options.tabBarItem;
		}
	}

	get tabBarController(): UITabBarController | null {
		let parent: UIViewController | undefined = this;
		while (true) {
			if (!parent) return null;
			// 循環参照を避けるために instanceof は使用しません
			if (parent.className == "UITabBarController") return parent as UITabBarController;
			parent = parent.presentingViewController;
		}
	}
	get navigationController(): UINavigationController | null {
		let parent: UIViewController | undefined = this;
		while (true) {
			if (!parent) return null;
			// 循環参照を避けるために instanceof は使用しません
			if (parent.className == "UINavigationController") return parent as UINavigationController;
			parent = parent.presentingViewController;
		}
	}
	get sceneController(): UISceneController | null {
		let parent: UIViewController | undefined = this;
		while (true) {
			if (!parent) return null;
			// 循環参照を避けるために instanceof は使用しません
			if (parent.className == "UISceneController") return parent as UISceneController;
			parent = parent.presentingViewController;
		}
	}

	present(viewController: UIViewController) {
		const sc = this.sceneController;
		if (!sc) throw "UISceneControllerが見つかりません";
		sc.push(viewController);
	}
	dismiss() {
		const sc = this.sceneController;
		if (!sc) throw "UISceneControllerが見つかりません";
		sc.pop();
	}
}
