
export { default as HStack } from "./HStack.svelte"
export { default as MaterialSymbol } from "./MaterialSymbol.svelte"
export { default as Spacer } from "./Spacer.svelte"
export { default as Text } from "./Text.svelte"
export { default as VStack } from "./VStack.svelte"
export { default as NavigationView } from "./NavigationView.svelte"
export { default as UIView } from "./UIView.svelte"

export type UITabBarItem = {
	title: string
	icon: string
}

export type UINavigationItem = {
	title: string;
	leftBarButtonItem?: UIBarButtonItem;
	rightBarButtonItem?: UIBarButtonItem;

}

export type UIBarButtonItem = {
	title?: string;
	icon?: string;
	bold?: boolean;
	action: Function;
}


