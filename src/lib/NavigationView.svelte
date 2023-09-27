<script lang="ts">
	import type { UINavigationController } from "$lib/UINavigationController.js";
	import { fly } from "svelte/transition";
	import NavigationViewNode from "./internal/NavigationViewNode.svelte";
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
		{#each $viewControllers as vc, index}
			<NavigationViewNode viewController={vc} isRoot={index == 0} isTop={index == $viewControllers.length - 1} />
		{/each}
	</div>
	{#if !$topViewController.hidesNavigationBarWhenPushed}
		<div class="navBar" transition:fly={{ x: "100%", opacity: 1 }}>
			<UiNavigationBar items={$viewControllers.map((x) => x.navigationItem)} on:backButtonTap={back} />
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
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}
	.views {
		height: 100%;
		position: relative;
	}
</style>
