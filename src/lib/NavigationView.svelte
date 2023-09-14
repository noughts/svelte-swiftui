<script lang="ts">
	import { setContext } from "svelte";
	import { fly } from "svelte/transition";
	import type { UIViewController } from "./UIViewController.js";
	import type { NavigationContext } from "./index.js";
	import UiNavigationBar from "./internal/UINavigationBar.svelte";
	import { swipe } from "./internal/swipe.js";
	setContext<NavigationContext>("navigation", {
		push,
		pop,
	});

	export let rootViewController: UIViewController;
	let viewControllers: UIViewController[] = [rootViewController];
	let topComponent: any;
	function push(item: UIViewController) {
		viewControllers = viewControllers.concat(item);
	}
	function pop() {
		if (viewControllers.length <= 1) {
			return;
		}
		const newAry = [...viewControllers];
		newAry.pop();
		viewControllers = newAry;
	}
	export function getTopItem(): UIViewController {
		return viewControllers[viewControllers.length - 1];
	}
	export function getTopComponent() {
		return topComponent;
	}
	$: topItem = viewControllers[viewControllers.length - 1];
</script>

<div class="root">
	<div class="items">
		{#each viewControllers as viewController, index}
			{@const top = index == viewControllers.length - 1}
			<div
				class="item"
				use:swipe={{
					onSwipeRight() {
						pop();
					},
				}}
				class:top
				class:navBarHidden={viewController.hidesNavigationBarWhenPushed}
				transition:fly={{ x: "100%", opacity: 1 }}
			>
				<svelte:component
					this={viewController.component}
					{...viewController.props}
					{viewController}
					bind:this={topComponent}
				/>
			</div>
		{/each}
	</div>
	{#if !topItem.hidesNavigationBarWhenPushed}
		<div class="navBar" transition:fly={{ x: "100%", opacity: 1 }}>
			<UiNavigationBar items={viewControllers} on:backButtonTap={pop} />
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
