<script lang="ts">
	import { UINavigationController } from "$lib/UINavigationController.js";
	import { fly } from "svelte/transition";
	import UiNavigationBar from "./internal/UINavigationBar.svelte";
	import { swipe } from "./internal/swipe.js";
	import ViewControllerRenderer from "./ViewControllerRenderer.svelte";
	import { quintOut } from "svelte/easing";

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
				style:transition-duration={`${UINavigationController.animationDuration}ms`}
				style:transition-delay={`${UINavigationController.animationDelay}ms`}
				use:swipe={{
					onSwipeRight: back,
				}}
				class:top
				class:navBarHidden={vc.hidesNavigationBarWhenPushed}
				transition:fly={{
					x: "100%",
					opacity: 1,
					delay: UINavigationController.animationDelay,
					easing: quintOut,
					duration: UINavigationController.animationDuration,
				}}
			>
				<ViewControllerRenderer viewController={vc} />
			</div>
		{/each}
	</div>
	{#if !$topViewController.hidesNavigationBarWhenPushed}
		<div
			class="navBar"
			transition:fly={{
				x: "100%",
				opacity: 1,
				delay: UINavigationController.animationDelay,
				easing: quintOut,
				duration: UINavigationController.animationDuration,
			}}
		>
			<UiNavigationBar
				items={$viewControllers.map((x) => x.navigationItem)}
				on:backButtonTap={back}
			/>
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
	.item {
		position: absolute;
		inset: 0;

		will-change: transform, filter;
		transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
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
