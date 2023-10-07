<script lang="ts">
	import type { UINavigationController } from "$lib/UINavigationController.js";
	import NavigationViewElement from "./internal/NavigationViewElement.svelte";

	export let viewController: UINavigationController;
	export function getTopElement():NavigationViewElement{
		return topElement;
	}
	let topElement:any;
	const viewControllers = viewController.viewControllers;
</script>

<div class="NavigationView">
	<slot />
	<div class="elements">
		{#each $viewControllers as viewController, index}
			<NavigationViewElement bind:this={topElement} {viewController} isRoot={index == 0} />
		{/each}
	</div>
</div>

<style>
	.NavigationView {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.elements {
		height: 100%;
		position: relative;
	}
</style>
