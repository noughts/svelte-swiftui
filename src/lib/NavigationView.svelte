<script lang="ts">
	import type { UINavigationController } from "$lib/UINavigationController.js";
	import NavigationViewElement from "./internal/NavigationViewElement.svelte";
	import UiNavigationBar from "./internal/UINavigationBar.svelte";

	export let viewController: UINavigationController;

	const viewControllers = viewController.viewControllers;
	const topViewController = viewController.topViewController;

	function back() {
		viewController.pop();
	}
</script>

<div class="NavigationView">
	<slot />
	<div class="views">
		{#each $viewControllers as viewController, index}
			<NavigationViewElement {viewController} isRoot={index == 0} />
		{/each}
	</div>
	{#if !$topViewController.hidesNavigationBarWhenPushed}
		<div class="navBar">
			<UiNavigationBar viewControllers={$viewControllers} on:backButtonTap={back} />
		</div>
	{/if}
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
	.views {
		height: 100%;
		position: relative;
	}
</style>
