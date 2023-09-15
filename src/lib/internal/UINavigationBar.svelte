<script lang="ts">
	import { fly } from "svelte/transition";
	import NavigationBarItemView from "./NavigationBarItemView.svelte";
	import type { UINavigationItem } from "$lib/index.js";
	export let items: UINavigationItem[];
</script>

<div class="UINavigationBar">
	{#each items as item, index}
		<div class="item" class:top={index == items.length - 1} transition:fly={{ x: "50%" }}>
			<NavigationBarItemView {item} showBackButton={index >= 1} on:backButtonTap />
		</div>
	{/each}
</div>

<style>
	.UINavigationBar {
		width: 100%;
		position: relative;
		height: 44px;
		flex-shrink: 0;
		background-color: var(--ui-chrome);
		border-bottom: solid 0.1px var(--ui-separator);
	}
	.item {
		position: absolute;
		inset: 0;
		transition-property: transform, opacity;
		transition-duration: 0.3s;
		transform: translateX(-50%);
		opacity: 0;
	}
	.top {
		transform: translateX(0);
		opacity: 1;
	}
</style>
