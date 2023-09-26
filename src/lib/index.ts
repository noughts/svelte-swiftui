
export { default as HStack } from "./HStack.svelte"
export { default as MaterialSymbol } from "./MaterialSymbol.svelte"
export { default as Spacer } from "./Spacer.svelte"
export { default as Text } from "./Text.svelte"
export { default as VStack } from "./VStack.svelte"
export { default as NavigationView } from "./NavigationView.svelte"
export { default as View } from "./View.svelte"
export { default as UIScrollView } from "./UIScrollView.svelte"
export { UISceneController } from "./UISceneController.js"
export { UIViewController } from "./UIViewController.js"
export { UIView } from "./UIView.js"
export { UITabBarController } from "./UITabBarController.js"
export { UINavigationController } from "./UINavigationController.js"

export type UITabBarItem = {
	title: string
	icon: {
		name: string;
		fill?: boolean;
		weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	}
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


