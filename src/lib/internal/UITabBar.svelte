<script lang="ts">
    import type { UITabBarItem } from "$lib/index.js";
    import { createEventDispatcher } from "svelte";
	import UiTab from "./UITab.svelte";
	export let selection = 0;
	export let items: UITabBarItem[];
	function onTabClick(index: number) {
		selection = index;
	}
	const dispatch = createEventDispatcher();
</script>

<div class="UITabBar">
	<div class="tabs">
		{#each items as item, index (item.title)}
			<UiTab
				{item}
				selected={index == selection}
				on:click={(e) => {
					onTabClick(index);
					dispatch("didSelect", item);
				}}
			/>
		{/each}
	</div>
</div>

<style>
	.UITabBar {
		position: fixed;
		left:0;
		right:0;
		bottom:0;
		height: calc(49px + env(safe-area-inset-bottom));
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
		background-color: var(--ui-chrome);
		border-top: solid 0.1px var(--ui-separator);
	}
	.tabs {
		display: flex;
		height: 49px;
		align-items: center;
	}
</style>
