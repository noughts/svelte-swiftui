import type { SvelteComponent } from "svelte";
import { quintOut } from "svelte/easing";
import { tweened } from "svelte/motion";
import { writable } from "svelte/store";
import { UINavigationController } from "./index.js";

export class UIView<Props extends DefaultProps = any>{

	readonly width = writable(0);
	readonly height = writable(0);
	readonly brightness = tweened(100, { easing: quintOut, duration: UINavigationController.animationDuration });
	readonly opacity = writable(1);
	readonly translateX = tweened(0, { easing: quintOut, duration: UINavigationController.animationDuration });
	readonly containerScrollTop = writable(0)
	readonly containerScrollLeft = writable(0);
	readonly scale = writable(1);
	readonly isUserInteractionEnabled = writable(true);

	readonly subviews: UIView[] = [];

	componentInstance: any;

	constructor(readonly component: SvelteUIComponent<Props>, readonly props?: Omit<Props, "viewController">) {
	}

	addSubView(view: UIView) {
		this.subviews.push(view);
	}
}


type DefaultProps = Record<string, any>;
type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>