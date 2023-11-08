<script lang="ts">
	import type { UINavigationController } from "$lib/UINavigationController.js";
	import ViewControllerRenderer from "./ViewControllerRenderer.svelte";

	export let viewController: UINavigationController;
	const viewControllers = viewController.viewControllers;
</script>

<div class="NavigationView">
	<slot />
	<div class="elements">
		{#each $viewControllers as viewController, index}
			<ViewControllerRenderer {viewController} />
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
