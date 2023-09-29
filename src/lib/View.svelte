<script lang="ts">
    import type { UIViewController } from "$lib/UIViewController.js";
	export let viewController:UIViewController;
	const tx = viewController.translateX;
	const ty = viewController.translateY;
</script>

<div class="View" style="transform: translate({$tx}, {$ty});">
	<svelte:component this={viewController.view.component} {...viewController.view.props} {viewController} />
</div>

<style>
	.View{
		width:100%;
		height: 100%;
		transition-property: filter transform;
		transition-duration: 0.3s;
	}
</style>


