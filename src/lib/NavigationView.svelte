<script lang="ts">
	import { setContext } from "svelte";
	import { fly } from "svelte/transition";
	import type { NavigationContext, NavigationItem, SceneItem } from "./index.js";
	import UiNavigationBar from "./internal/UINavigationBar.svelte";
	setContext<NavigationContext>("navigation", { push, pop });

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
</script>

<div class="root">
	<UiNavigationBar {items} />
	<div class="items">
		{#each items as item}
			<div class="item" transition:fly={{ x: "100%", opacity: 1 }}>
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
	.items{
		position: relative;
		flex-grow: 2;
		overflow: hidden;
	}
	.item {
		position: absolute;
		inset: 0;
		overflow-y: scroll;
	}
</style>
