import type { Property } from "csstype"
import type { UIViewController } from "./UIViewController.js"
import type { SvelteComponent } from "svelte"

export { default as HStack } from "./HStack.svelte"
export { default as MaterialSymbol } from "./MaterialSymbol.svelte"
export { default as Scene } from "./Scene.svelte"
export { default as Spacer } from "./Spacer.svelte"
export { default as Text } from "./Text.svelte"
export { default as VStack } from "./VStack.svelte"


type DefaultProps = Record<string, any>;

export type UITabBarItem = {
	title: string
	icon: string
}

export type UINavigationItem = {
	title: string;
	leftBarButtonItem?: UIBarButtonItem;
	rightBarButtonItem?: UIBarButtonItem;

}

export type SceneItem<Props extends DefaultProps = any> = {
	component: SvelteUIComponent<Props>
	props: Props;
	transition?: string;
}

export type TabBarItem<Props extends DefaultProps = any> = {
	title: string
	icon: string
	component: SvelteUIComponent<Props>
	props: Props;
}

export type SceneContext = {
	dark: boolean;
	tintColor: Property.Color;
	push: <Props extends DefaultProps>(item: UIViewController<Props>) => void;
	pop: () => void;
}

export type NavigationContext = {
	push: <Props extends DefaultProps>(item: UIViewController<Props>) => void
	pop: () => void;
}

export type UIBarButtonItem = {
	title?: string;
	icon?: string;
	bold?: boolean;
	action: Function;
}



type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>