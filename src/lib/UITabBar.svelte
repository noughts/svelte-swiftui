<script lang="ts">
	import UiTab from "./UITab.svelte";
	import type { UITabBarItem } from "./UITabBarItem.js";
	export let selection = 0;
	export let items: UITabBarItem[];
</script>

<div class="root">
	{#each items as item, index (item.title)}
		<UiTab {item} selected={index == selection} />
	{/each}
</div>

<style>
	.root {
		height: 54px;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		border-top: solid 0.5px var(--separator);
	}
</style>
