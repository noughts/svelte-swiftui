
export { default as HStack } from "./HStack.svelte"
export { default as MaterialSymbol } from "./MaterialSymbol.svelte"
export { default as NavigationView } from "./NavigationView.svelte"
export { default as Spacer } from "./Spacer.svelte"
export { default as Text } from "./Text.svelte"
export { UINavigationController } from "./UINavigationController.js"
export { UISceneController } from "./UISceneController.js"
export { default as UIScrollView } from "./UIScrollView.svelte"
export { UITabBarController } from "./UITabBarController.js"
export { UIView } from "./UIView.js"
export { UIViewController } from "./UIViewController.js"
export { default as VStack } from "./VStack.svelte"
export { default as ViewControllerRenderer } from "./ViewControllerRenderer.svelte"

export type UITabBarItem = {
	title: string
	icon: {
		name: string;
		fill?: boolean;
		weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	}
}


export type UIEdgeInsets = {
	top: number;
	bottom: number;
};
export type UIBarButtonItem = {
	title?: string;
	icon?: string;
	bold?: boolean;
	action: Function;
}

export type CGPoint = {
	x:number;
	y:number;
}

