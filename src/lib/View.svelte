<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	export let viewController: UIViewController;
	const brightness = viewController.brightness;
	const scale = viewController.scale;
	const translateX = viewController.translateX;
</script>

<div
	class="View"
	style:filter="brightness({$brightness}%)"
	style:transform="scale({$scale}) translate({$translateX}, 0)"
>
	<svelte:component
		this={viewController.view.component}
		{...viewController.view.props}
		{viewController}
	/>
</div>

<style>
	.View {
		width: 100%;
		height: 100%;
	}
</style>
