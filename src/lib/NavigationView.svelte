<script lang="ts">
	import type { UINavigationController } from "$lib/UINavigationController.js";
	import { fly } from "svelte/transition";
	import UiNavigationBar from "./internal/UINavigationBar.svelte";
	import { swipe } from "./internal/swipe.js";
	import View from "./View.svelte";

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
			{@const top = index == $viewControllers.length - 1}
			<div
				class="item"
				use:swipe={{
					onSwipeRight: back,
				}}
				class:top
				class:navBarHidden={vc.hidesNavigationBarWhenPushed}
				transition:fly={{ x: "100%", opacity: 1 }}
			>
				<View viewController={vc} />
			</div>
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
		display: flex;
		flex-direction: column;
	}
	.navBar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}
	.views {
		position: relative;
		flex-grow: 2;
	}
	.item {
		position: absolute;
		inset: 0;
		top: 44px;

		transition-property: transform, filter;
		transition-duration: 0.3s;
		transform: translateX(-50%);
		filter: brightness(80%);
	}
	.navBarHidden {
		top: 0;
	}
	.top {
		transform: translateX(0);
		filter: brightness(100%);
	}
</style>
