<script lang="ts">
	import { fly } from "svelte/transition";
	import type { UIViewController } from "../UIViewController.js";
	import UiNavigationBar from "./UINavigationBar.svelte";
	import { swipe } from "./swipe.js";
	import type { UINavigationController } from "$lib/UINavigationController.js";

	export let viewController: UINavigationController;
	export let rootViewController: UIViewController;

	const viewControllers = viewController.viewControllers;
	const topViewController = viewController.topViewController;
	$: console.log($viewControllers)
</script>

<div class="root">
	<div class="items">
		{#each $viewControllers as viewController, index}
			{@const top = index == $viewControllers.length - 1}
			<div
				class="item"
				use:swipe={{
					onSwipeRight() {
						viewController.navigationController?.pop();
					},
				}}
				class:top
				class:navBarHidden={viewController.hidesNavigationBarWhenPushed}
				transition:fly={{ x: "100%", opacity: 1 }}
			>
				<svelte:component this={viewController.component} {...viewController.props} {viewController} />
			</div>
		{/each}
	</div>
	{#if !$topViewController.hidesNavigationBarWhenPushed}
		<div class="navBar" transition:fly={{ x: "100%", opacity: 1 }}>
			<UiNavigationBar
				items={$viewControllers.map((x) => x.navigationItem)}
				on:backButtonTap={viewController.navigationController?.pop}
			/>
		</div>
	{/if}
</div>

<style>
	.root {
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
	.items {
		position: relative;
		flex-grow: 2;
		overflow: hidden;
	}
	.item {
		position: absolute;
		inset: 0;
		top: 44px;
		overflow-y: scroll;
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
