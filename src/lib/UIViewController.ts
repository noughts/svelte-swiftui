import type { SvelteComponent } from "svelte";
import type { UINavigationItem, UITabBarItem } from "./index.js";
import type { UINavigationController } from "./UINavigationController.js";
import type { UISceneController } from "./UISceneController.js";

export class UIViewController<Props extends DefaultProps = any>{

	hidesNavigationBarWhenPushed = false;
	navigationItem: UINavigationItem = { title: "placeholder" };
	tabBarItem: UITabBarItem = { title: "placeholder", icon: "" };
	navigationController?:UINavigationController;
	sceneController?:UISceneController;


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

	present(viewController:UIViewController){

	}
}


type DefaultProps = Record<string, any>;
type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>