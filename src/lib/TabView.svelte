<script lang="ts">
	import UiTabBar from "$lib/UITabBar.svelte";
	import type { UITabBarItem } from "./UITabBarItem.js";
	export let selection = 0;
	export let items: UITabBarItem[];
	console.log($$slots);
</script>

<div class="root">
	<div class="content">
		{#if selection == 0}
			<slot name="0" />
		{:else if selection == 1}
			<slot name="1" />
		{/if}
	</div>
	<UiTabBar {items} bind:selection />
</div>

<style>
	.root {
		width: 375px;
		height: 667px;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex-grow: 2;
	}
</style>
