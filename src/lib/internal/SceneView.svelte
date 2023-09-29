<script lang="ts">
	import type { UISceneController } from "../UISceneController.js";
	import "../svelte-swiftui.css";
	import SceneViewElement from "./SceneViewElement.svelte";
	export let viewController: UISceneController;
	const viewControllers = viewController.viewControllers;

	function onTransitioning(e:CustomEvent<number>){
		console.log(e.detail)
		if( e.detail >= 1 ){
			viewController.pop();
		}
	}
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
		<SceneViewElement {viewController} root={index == 0} on:transitioning={onTransitioning} />
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
</style>
