import type { Property } from "csstype"
import type { SvelteComponent, ComponentProps } from 'svelte'

export { default as Scene } from "./Scene.svelte"
export { default as TabView } from "./TabView.svelte"
export { default as MaterialSymbol } from "./MaterialSymbol.svelte"
export { default as NavigationView } from "./NavigationView.svelte"
export { default as VStack } from "./VStack.svelte"
export { default as HStack } from "./HStack.svelte"
export { default as Spacer } from "./Spacer.svelte"

export type DefaultProps = Record<string, any>;

export type SvelteNode<Props extends DefaultProps> = {
	component: SvelteUIComponent<Props, any, any>
	props?: Props;
}

export type SceneItem<Props extends DefaultProps = any> = {
	node: SvelteNode<Props>;
	transition?: string;
}

export type UITabBarItem<Props extends DefaultProps = any> = {
	title: string
	icon: string
	node: SvelteNode<Props>;
}

export type SceneContext = {
	dark: boolean;
	tintColor: Property.Color;
	push: <Props extends DefaultProps>(item: SceneItem<Props>) => void;
	// _push: <Props extends DefaultProps>(component: SvelteUIComponent<Props, any, any>, props?: Props) => void;
	pop: () => void;
}

export type NavigationContext = {
	push: <Props extends DefaultProps>(item: NavigationItem<Props>) => void
	pop: () => void;
}




export type NavigationItem<Props extends DefaultProps = any> = {
	title: string;
	node: SvelteNode<Props>;
}

export type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>