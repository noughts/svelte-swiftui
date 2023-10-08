import type { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

export class UIView<Props extends DefaultProps = any>{

	readonly width = writable(0);
	readonly height = writable(0);
	readonly brightness = writable(100);
	readonly translateX = writable("0");
	readonly containerScrollTop = writable(0)
	readonly containerScrollLeft = writable(0);
	readonly scale = writable(1);
	readonly isUserInteractionEnabled = writable(true);

	readonly subviews:UIView[] = [];

	componentInstance:any;

	constructor(readonly component: SvelteUIComponent<Props>, readonly props?: Omit<Props, "viewController">) {

	}

	addSubView(view:UIView){
		this.subviews.push(view);
	}
}


type DefaultProps = Record<string, any>;
type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>