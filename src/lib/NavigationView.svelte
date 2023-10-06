<script lang="ts">
	import type { UINavigationController } from "$lib/UINavigationController.js";
	import NavigationViewElement from "./internal/NavigationViewElement.svelte";

	export let viewController: UINavigationController;
	const viewControllers = viewController.viewControllers;
</script>

<div class="NavigationView">
	<slot />
	<div class="elements">
		{#each $viewControllers as viewController, index}
			<NavigationViewElement {viewController} isRoot={index == 0} />
		{/each}
	</div>
</div>

<style>
	.NavigationView {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.navBar {
		position: absolute;
		top: 0px;
		left: 0;
		right: 0;
		z-index: 2;
	}
	.elements {
		height: 100%;
		position: relative;
	}
</style>
