<script lang="ts">
	import { getContext } from "svelte";
	import UiTab from "./UITab.svelte";
	import type { SceneContext, UITabBarItem } from "./index.js";
	export let selection = 0;
	export let items: UITabBarItem[];
	const { dark } = getContext<SceneContext>("scene");

	function onTabClick(index: number) {
		selection = index;
	}
</script>

<div class="root" class:dark>
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

<style>
	.root {
		height: 54px;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		border-top: solid 0.5px rgba(0 0 0/10%);
	}
	.dark {
		border-color: rgba(255 255 255/10%);
		background-color: #222;
	}
</style>
