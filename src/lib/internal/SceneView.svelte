<script lang="ts">
	import { fly } from "svelte/transition";
	import type { UISceneController } from "../UISceneController.js";
	import View from "../View.svelte";
	import "../svelte-swiftui.css";
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
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<div class="SvelteScene">
	{#each $viewControllers as viewController, index}
		<div
			class="view"
			class:topView={index == $viewControllers.length - 1}
			class:rootView={index == 0}
			transition:fly={{ y: "100%", opacity: 1 }}
		>
			<View {viewController} />
		</div>
	{/each}
</div>

<style>
	.SvelteScene {
		width: 100%;
		height: 100%;
		background-color: white;
		position: relative;
		overflow: hidden;
	}
	.view {
		position: absolute;
		inset: 0;
		top: 22px;
		overflow: hidden;
		border-radius: 16px 16px 0px 0px;
		transition-property: filter transform;
		transition-duration: 0.3s;
		filter: brightness(80%);
		/* transform: scale(0.95); */
	}
	.rootView{
		top:0;
		border-radius:0;
	}
	.topView {
		filter: brightness(100%);
		/* transform: scale(1); */
	}
</style>
