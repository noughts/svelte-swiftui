import type { SvelteComponent } from "svelte";
import type { UINavigationItem, UITabBarItem } from "./index.js";
import type { UINavigationController } from "./UINavigationController.js";
import type { UISceneController } from "./UISceneController.js";

export class UIViewController<Props extends DefaultProps = any>{

	hidesNavigationBarWhenPushed = false;
	navigationItem: UINavigationItem = { title: "placeholder" };
	tabBarItem: UITabBarItem = { title: "placeholder", icon: "" };
	presentingViewController?: UIViewController;


	constructor(readonly component: SvelteUIComponent<Props>, readonly props?: Omit<Props, "viewController">, readonly options?: {
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
		let parent: UIViewController | undefined = this;
		while (true) {
			if (!parent) return null;
			if (parent.constructor.name == "UINavigationController") return parent as UINavigationController;
			parent = parent.presentingViewController;
		}
	}
	get sceneController(): any {
		let parent: UIViewController | undefined = this;
		while (true) {
			if (!parent) return null;
			if (parent.constructor.name == "UISceneController") return parent as UISceneController;
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


type DefaultProps = Record<string, any>;
type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>