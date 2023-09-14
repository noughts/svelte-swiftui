<script lang="ts">
	import { setContext } from "svelte";
	import { fly } from "svelte/transition";
	import type { Controller, NavigationContext } from "./index.js";
	import UiNavigationBar from "./internal/UINavigationBar.svelte";
	import { swipe } from "./internal/swipe.js";
	setContext<NavigationContext>("navigation", {
		push,
		pop,
		getTopItem,
	});

	export let rootItem: Controller;
	let controllers: Controller[] = [rootItem];
	let topComponent: any;
	function push(item: Controller) {
		controllers = controllers.concat(item);
	}
	function pop() {
		if (controllers.length <= 1) {
			return;
		}
		const newAry = [...controllers];
		newAry.pop();
		controllers = newAry;
	}
	export function getTopItem(): Controller {
		return controllers[controllers.length - 1];
	}
	export function getTopComponent() {
		return topComponent;
	}
	$: topItem = controllers[controllers.length - 1];
</script>

<div class="root">
	{#if !topItem.hidesNavigationBarWhenPushed}
		<div class="navBar" transition:fly={{ x: "100%", opacity: 1 }}>
			<UiNavigationBar items={controllers} on:backButtonTap={pop} />
		</div>
	{/if}
	<div class="items">
		{#each controllers as controller, index}
			{@const top = index == controllers.length - 1}
			<div
				class="item"
				use:swipe={{
					onSwipeRight() {
						pop();
					},
				}}
				class:top
				class:navBarHidden={controller.hidesNavigationBarWhenPushed}
				transition:fly={{ x: "100%", opacity: 1 }}
			>
				<svelte:component
					this={controller.component}
					{...controller.props}
					{controller}
					bind:this={topComponent}
				/>
			</div>
		{/each}
	</div>
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
