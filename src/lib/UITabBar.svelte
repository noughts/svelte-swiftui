<script lang="ts">
	import UiTab from "./UITab.svelte";
    import type { UITabBarItem } from "./index.js";
	export let selection = 0;
	export let items: UITabBarItem[];

	function onTabClick(index:number){
		selection = index;
	}
</script>

<div class="root">
	{#each items as item, index (item.title)}
		<UiTab {item} selected={index == selection} on:click={e=>{onTabClick(index)}} />
	{/each}
</div>

<style>
	.root {
		height: 54px;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		border-top: solid 0.5px var(--separator);
		background-color: var(--color);
	}
</style>
