
export { default as Scene } from "./Scene.svelte"
export { default as TabView } from "./TabView.svelte"
export { default as UITab } from "./UITab.svelte"
export { default as UITabBar } from "./UITabBar.svelte"
export { default as MaterialSymbol } from "./MaterialSymbol.svelte"
export { default as NavigationView } from "./NavigationView.svelte"

export type SceneContext = {
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