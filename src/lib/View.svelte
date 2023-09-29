<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	export let viewController: UIViewController;
	const tx = viewController.translateX;
	const ty = viewController.translateY;
	const duration = viewController.transitionDuration;
	const brightness = viewController.brightness;
	$: style = `
	transform: translate(${$tx}, ${$ty});
	transition-duration: ${$duration}s;
	filter: brightness(${$brightness});
	`;
</script>

<div class="View" {style}>
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
		transition-property: filter transform;
	}
</style>
