<script lang="ts">
	import { getContext } from "svelte";
    import UiTab from "./UITab.svelte";
    import type { SceneContext, UITabBarItem } from "$lib/index.js";
	export let selection = 0;
	export let items: UITabBarItem[];
	const { dark } = getContext<SceneContext>("scene");

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
		background-color: #f5f5f5;
		border-top: solid 0.1px rgba(0 0 0/15%);
	}
	.tabs {
		display: flex;
		height: 49px;
		align-items: center;
	}
	.dark {
		border-color: rgba(255 255 255/15%);
		background-color: #131313;
	}
</style>
