<script lang="ts" context="module">
	export function getNavigationContext() {
		return getContext<NavigationContext>("navigation");
	}
</script>

<script lang="ts">
	import { getContext, setContext } from "svelte";
	import { fly } from "svelte/transition";
	import type { NavigationContext, NavigationItem, UIBarButtonItem } from "./index.js";
	import UiNavigationBar from "./internal/UINavigationBar.svelte";
	setContext<NavigationContext>("navigation", { push, pop, updateTitle, updateRightButtonItem });

	export let rootItem: NavigationItem;
	let items: NavigationItem[] = [rootItem];
	function push(item: NavigationItem) {
		items = items.concat(item);
	}
	function pop() {
		const newAry = [...items];
		newAry.pop();
		items = newAry;
	}
	function updateTitle(title: string) {
		const newItem = items[items.length - 1];
		newItem.title = title;
		items[items.length - 1] = newItem;
	}
	function updateRightButtonItem(item: UIBarButtonItem) {
		const newItem = items[items.length - 1];
		newItem.rightButtonItem = item;
		items[items.length - 1] = newItem;
	}
	$: topItem = items[items.length - 1];
</script>

<div class="root">
	{#if !topItem.hidesNavigationBarWhenPushed}
		<div class="navBar" transition:fly={{ x: "100%", opacity: 1 }}>
			<UiNavigationBar {items} on:backButtonTap={pop} />
		</div>
	{/if}
	<div class="items">
		{#each items as item, index}
			<div
				class="item"
				class:top={index == items.length - 1}
				class:navBarHidden={item.hidesNavigationBarWhenPushed}
				transition:fly={{ x: "100%", opacity: 1 }}
			>
				<svelte:component this={item.component} {...item.props} />
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
