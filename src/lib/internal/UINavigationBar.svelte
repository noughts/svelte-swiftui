<script lang="ts">
	import type { NavigationItem } from "$lib/index.js";
	import { fly } from "svelte/transition";
	import NavigationBarItemView from "./NavigationBarItemView.svelte";
	export let items: NavigationItem[];
</script>

<div class="root">
	{#each items as item, index}
		<div class="item" transition:fly>
			<NavigationBarItemView {item} showBackButton={index >= 1} on:backButtonTap />
		</div>
	{/each}
</div>

<style>
	.root {
		position: relative;
		height: 44px;
		flex-shrink: 0;
		background-color: white;
		border-bottom: solid 0.1px rgba(0 0 0/15%);
	}
	.item{
		position: absolute;
		inset:0;
	}
</style>
