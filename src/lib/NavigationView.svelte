<script lang="ts">
	import type { UINavigationController } from "$lib/UINavigationController.js";
	import { get } from "svelte/store";
	import NavigationViewElement from "./internal/NavigationViewElement.svelte";

	export let viewController: UINavigationController;
	export function getTopElement(): NavigationViewElement {
		const topVC = get(viewController.topViewController);
		return topVC.navigationElementInstance;
	}
	const viewControllers = viewController.viewControllers;
</script>

<div class="NavigationView">
	<slot />
	<div class="elements">
		{#each $viewControllers as viewController, index}
			<NavigationViewElement
				bind:this={viewController.navigationElementInstance}
				{viewController}
				isRoot={index == 0}
			/>
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
