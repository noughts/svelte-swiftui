<script lang="ts">
    import type { UITabBarItem } from "$lib/index.js";
	import UiTab from "./UITab.svelte";
	export let selection = 0;
	export let items: UITabBarItem[];
	function onTabClick(index: number) {
		selection = index;
	}
</script>

<div class="root">
	<div class="tabs">
		{#each items as item, index (item.title)}
			<UiTab
				{item}
				selected={index == selection}
				on:click={(e) => {
					onTabClick(index);
				}}
			/>
		{/each}
	</div>
</div>

<style>
	.root {
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
