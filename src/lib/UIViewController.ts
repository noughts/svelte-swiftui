import type { SvelteComponent } from "svelte";
import type { UINavigationItem, UITabBarItem } from "./index.js";
import type { UINavigationController } from "./UINavigationController.js";
import type { UISceneController } from "./UISceneController.js";

export class UIViewController<Props extends DefaultProps = any>{

	hidesNavigationBarWhenPushed = false;
	navigationItem: UINavigationItem = { title: "placeholder" };
	tabBarItem: UITabBarItem = { title: "placeholder", icon: "" };
	presentingViewController?: UIViewController;


	constructor(readonly component: SvelteUIComponent<Props>, readonly props: Omit<Props, "viewController">, readonly options?: {
		navigationItem?: UINavigationItem;
		tabBarItem?: UITabBarItem;
		hidesNavigationBarWhenPushed?: boolean;
	}) {
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

	get navigationController(): UINavigationController | null {
		let parent = this.presentingViewController;
		while (true) {
			if (!parent) return null;
			if (parent.constructor.name == "UINavigationController") return parent as UINavigationController;
			parent = parent.presentingViewController;
		}
	}
	get sceneController(): UISceneController | null {
		let parent = this.presentingViewController;
		while (true) {
			if (!parent) return null;
			if (parent.constructor.name == "UISceneController") {
				console.log(parent as UISceneController)
				return parent as UISceneController;
			}
			parent = parent.presentingViewController;
		}
	}

	present(viewController: UIViewController) {
		const sc = this.sceneController;
		console.log(sc)
		if (!sc) {
			throw "UISceneControllerが見つかりません";
		}
		sc.push(viewController);
	}
	dismiss() {

	}
}


type DefaultProps = Record<string, any>;
type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>