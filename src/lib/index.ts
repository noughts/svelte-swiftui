import type { Property } from "csstype"

export { default as Scene } from "./Scene.svelte"
export { default as TabView } from "./TabView.svelte"
export { default as UITab } from "./UITab.svelte"
export { default as UITabBar } from "./UITabBar.svelte"
export { default as MaterialSymbol } from "./MaterialSymbol.svelte"
export { default as NavigationView } from "./NavigationView.svelte"
export { default as VStack } from "./VStack.svelte"
export { default as HStack } from "./HStack.svelte"
export { default as Spacer } from "./Spacer.svelte"

export type SceneContext = {
	theme: "light" | "dark"
	tintColor: Property.Color;
	push: (item: SceneItem) => void
	pop: () => void;
}

export type NavigationContext = {
	push: (item: SceneItem) => void
	pop: () => void;
}

export type SceneItem = {
	component: any;
	args: any;
}

export type UITabBarItem = {
	title: string
	icon: string
}