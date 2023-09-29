<script lang="ts">
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

<div class="SceneView">
	{#each $viewControllers as viewController, index}
		<div
			class="view"
			class:topView={index == $viewControllers.length - 1}
			class:rootView={index == 0}
		>
			<View {viewController} />
		</div>
	{/each}
</div>

<style>
	.SceneView {
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
		border-radius: 10px 10px 0px 0px;
	}
	.rootView {
		top: 0;
		border-radius: 0;
	}
</style>
