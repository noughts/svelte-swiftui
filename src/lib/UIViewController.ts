import type { ComponentType, SvelteComponent } from "svelte";
import type { UINavigationItem, UITabBarItem } from "./index.js";

export class UIViewController<Props extends DefaultProps = any>{

	constructor(readonly component?: SvelteUIComponent<Props>, readonly props?: Omit<Props, "viewController">, readonly options?: {
		navigationItem: UINavigationItem;
		tabBarItem: UITabBarItem;
		hidesNavigationBarWhenPushed?: boolean;
	}) {

	}
	get navigationItem(): UINavigationItem {
		if (this.options?.navigationItem) this.options.navigationItem;
		return { title: "" }
	}
	get tabBarItem(): UITabBarItem {
		if (this.options?.tabBarItem) this.options.tabBarItem;
		return { title: "", icon: "" };
	}
}
type DefaultProps = Record<string, any>;
type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>