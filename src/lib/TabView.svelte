<script lang="ts">
	import UiTabBar from "$lib/UITabBar.svelte";
    import type { UITabBarItem } from "./index.js";
	export let selection = 0;
	export let items: UITabBarItem[];
	export let tabBarStyle = {
		color:"white",
	}
	// console.log($$slots);
</script>

<div class="root">
	<div class="content">
		{#if selection == 0}
			<slot name="0" />
		{:else if selection == 1}
			<slot name="1" />
		{/if}
	</div>
	<UiTabBar {items} bind:selection --color={tabBarStyle.color} />
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
	}
</style>
