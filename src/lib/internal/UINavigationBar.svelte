<script lang="ts">
	import type { NavigationItem } from "$lib/index.js";
	import { createEventDispatcher } from "svelte";

	export let items: NavigationItem[];
	$: topItem = items[items.length - 1];
	$: showBackButton = items.length > 1;

	const dispatch = createEventDispatcher();
</script>

<div class="root">
	{#if showBackButton}
		<button class="backButton" on:click={(e) => dispatch("backButtonTap")}>Back</button>
	{:else}
		<div />
	{/if}
	<div />

	<div class="title">{topItem.title}</div>
</div>

<style>
	.root {
		position: relative;
		height: 44px;
		flex-shrink: 0;
		background-color: white;
		border-bottom: solid 0.1px rgba(0 0 0/15%);

		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.title {
		font-size: 16px;
		font-weight: 600;
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}
</style>
