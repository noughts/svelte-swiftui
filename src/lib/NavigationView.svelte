<script lang="ts">
	import { fly } from "svelte/transition";
	import ViewControllerRenderer from "./ViewControllerRenderer.svelte";
	import { UINavigationController, type UIViewController } from "./index.js";
	import UiNavigationBar from "./internal/UINavigationBar.svelte";
	import { swipe } from "./internal/swipe.js";
	import { quintOut } from "svelte/easing";

	export let viewController: UINavigationController;

	const viewControllers = viewController.viewControllers;
	const topViewController = viewController.topViewController;

	function back() {
		viewController.pop();
	}
	function onChildMount(vc: UIViewController) {
		viewController.onChildMount(vc);
	}
</script>

<div class="NavigationView">
	<slot />
	<div class="views">
		{#each $viewControllers as vc}
			<div
				class="item"
				use:swipe={{
					onSwipeRight: back,
				}}
				class:navBarHidden={vc.hidesNavigationBarWhenPushed}
			>
				<ViewControllerRenderer
					viewController={vc}
					on:mount={(e) => {
						onChildMount(vc);
					}}
				/>
			</div>
		{/each}
	</div>
	{#if !$topViewController.hidesNavigationBarWhenPushed}
		<div
			class="navBar"
			transition:fly={{
				x: "100%",
				opacity: 1,
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
	}
	.navBarHidden {
		top: 0;
	}
</style>
