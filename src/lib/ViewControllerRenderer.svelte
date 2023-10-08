<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	export let viewController: UIViewController;
	const view = viewController.view;
	const brightness = view.brightness;
	const scale = view.scale;
	const translateX = view.translateX;
	const width = view.width;
</script>

<div
	bind:clientWidth={$width}
	class="View"
	style:filter="brightness({$brightness}%)"
	style:transform="scale({$scale}) translate({$translateX}, 0)"
>
	<svelte:component bind:this={view.componentInstance} this={view.component} {...view.props} {viewController} />

	{#each view.subviews as subview}
		<svelte:component this={subview.component} {...subview.props} {viewController} />
	{/each}
</div>

<style>
	.View {
		width: 100%;
		height: 100%;
	}
</style>
