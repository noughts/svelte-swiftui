import type { Property } from "csstype"
import type { SvelteComponent } from 'svelte'

export { default as Scene } from "./Scene.svelte"
export { default as TabView } from "./TabView.svelte"
export { default as MaterialSymbol } from "./MaterialSymbol.svelte"
export { default as NavigationView } from "./NavigationView.svelte"
export { default as VStack } from "./VStack.svelte"
export { default as HStack } from "./HStack.svelte"
export { default as Spacer } from "./Spacer.svelte"

type DefaultProps = Record<string, any>;

export type Node<Props extends DefaultProps> = {
	component: SvelteUIComponent<Props, any, any>
	props?: Props;
}

export type SceneItem<Props extends DefaultProps> = {
	node:Node<Props>;
	transition?:string;
}

export type SceneContext = {
	dark: boolean;
	tintColor: Property.Color;
	push: <Props extends DefaultProps>(item:SceneItem<Props>) =>void;
	_push: <Props extends DefaultProps>
		(component: SvelteUIComponent<Props, any, any>, props?: Props) => void;
	pop: () => void;
}

export type NavigationContext = {
	push: (item: NavigationItem) => void
	pop: () => void;
}


export type UITabBarItem = {
	title: string
	icon: string
	component: SvelteUIComponent;
	args?: any;
}

export type NavigationItem = {
	title: string;
	component: SvelteUIComponent;
	args?: any;
}

export type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>