<script lang="ts">
	import { fly } from "svelte/transition";
	import type { UISceneController } from "../UISceneController.js";
	import "../svelte-swiftui.css";
	import View from "./View.svelte";
	export let viewController: UISceneController;
	const viewControllers = viewController.viewControllers;
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

<div class="SvelteScene">
	{#each $viewControllers as viewController, index}
		<div class="item" class:top={index == $viewControllers.length - 1} transition:fly={{ y: "100%", opacity: 1 }}>
			<View {viewController} />
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
