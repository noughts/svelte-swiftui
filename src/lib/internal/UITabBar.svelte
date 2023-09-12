<script lang="ts">
	import { getSceneContext, type TabBarItem } from "$lib/index.js";
	import UiTab from "./UITab.svelte";
	export let selection = 0;
	export let items: TabBarItem[];
	const { dark } = getSceneContext();

	function onTabClick(index: number) {
		selection = index;
	}
</script>

<div class="root" class:dark>
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
		background-color: var(--ui-chrome-light);
		border-top: solid 0.1px rgba(0 0 0/15%);
	}
	.tabs {
		display: flex;
		height: 49px;
		align-items: center;
	}
	.dark {
		border-color: rgba(255 255 255/15%);
		background-color: var(--ui-chrome-dark);
	}
</style>
