<script lang="ts">
	import { setContext } from "svelte";
	import { fly } from "svelte/transition";
	import type { UIViewController } from "./UIViewController.js";
	import type { SceneContext } from "./index.js";
	import "./svelte-swiftui.css";

	export let tintColor = "blue";
	export let theme: "light" | "dark" | "system" = "system";
	export let rootViewController: UIViewController;

	setContext<SceneContext>("scene", { push, pop, dark: theme == "dark", tintColor });


	let viewControllers: UIViewController[] = [rootViewController];
	function push(item: UIViewController) {
		viewControllers = viewControllers.concat(item);
	}
	function pop() {
		const newAry = [...viewControllers];
		newAry.pop();
		viewControllers = newAry;
	}
</script>

<svelte:head>
	<meta
		name="viewport"
		content="viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>

<div class="SvelteScene" >
	{#each viewControllers as viewController, index}
		<div class="item" class:top={index == viewControllers.length - 1} transition:fly={{ y: "100%", opacity: 1 }}>
			<svelte:component this={viewController.component} {...viewController.props} {viewController} />
		</div>
	{/each}
</div>

<style>
	.SvelteScene {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: white;
		position: relative;
	}
	.item {
		position: absolute;
		inset: 0;
		transition: filter 0.3s;
		filter: brightness(80%);
	}
	.top {
		filter: brightness(100%);
	}
</style>
