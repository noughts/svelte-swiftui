<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	export let viewController: UIViewController;
</script>

<div class="View">
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
