import type { SvelteComponent } from "svelte";

export class UIView<Props extends DefaultProps = any>{
	constructor(readonly component: SvelteUIComponent<Props>, readonly props?: Omit<Props, "viewController">){

	}
}


type DefaultProps = Record<string, any>;
type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>