<script lang="ts">
	import type { SceneContext, NavigationItem } from "$lib/index.js";
	import { fly } from "svelte/transition";
	import NavigationBarItemView from "./NavigationBarItemView.svelte";
	import { getContext, setContext } from "svelte";
	export let items: NavigationItem[];
	const { dark } = getContext<SceneContext>("scene");
</script>

<div class="root" class:dark>
	{#each items as item, index}
		<div class="item" class:top={index == items.length - 1} transition:fly={{ x: "50%" }}>
			<NavigationBarItemView {item} showBackButton={index >= 1} on:backButtonTap />
		</div>
	{/each}
</div>

<style>
	.root {
		position: relative;
		height: 44px;
		flex-shrink: 0;
		background-color: var(--ui-chrome-light);
		border-bottom: solid 0.1px rgba(0 0 0/15%);
	}
	.dark {
		background-color: var(--ui-chrome-dark);
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
