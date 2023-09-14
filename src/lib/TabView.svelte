<script lang="ts">
	import type { Controller, TabBarItem } from "./index.js";
	import UiTabBar from "./internal/UITabBar.svelte";
	export let selection = 0;
	export let items: Controller[];
</script>

<div class="root">
	<div class="content">
		{#each items as item, index (item.tabBarItem?.title)}
			<div class="item" class:selected={index === selection}>
				<svelte:component this={item.component} {...item.props} />
			</div>
		{/each}
	</div>
	<UiTabBar
		items={items.map((x) => {
			return x.tabBarItem;
		})}
		bind:selection
	/>
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex-grow: 2;
		overflow: hidden;
		position: relative;
	}
	.item {
		position: absolute;
		inset: 0;
		opacity: 0;
		pointer-events: none;
	}
	.selected {
		opacity: 1;
		pointer-events: auto;
	}
</style>
