<script lang="ts">
	import MaterialSymbol from "$lib/MaterialSymbol.svelte";
	import type { NavigationItem, SceneContext } from "$lib/index.js";
	import { createEventDispatcher, getContext } from "svelte";
	const sceneContext = getContext<SceneContext>("scene");
	const dark = sceneContext.dark;
	const color = sceneContext.tintColor;
	export let item: NavigationItem;
	export let showBackButton: boolean;

	const dispatch = createEventDispatcher();
</script>

<div class="root" class:dark>
	{#if showBackButton}
		<button class="backButton" on:click={(e) => dispatch("backButtonTap")} style:color>
			<MaterialSymbol icon="arrow_back_ios" />
			<div class="backLabel">Back</div>
		</button>
	{:else}
		<div />
	{/if}
	<div />

	<div class="title">{item.title}</div>
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 8px;
		color: var(--ui-text-light);
	}
	.dark{
		color:var(--ui-text-dark);
	}
	.backButton {
		all: unset;
		display: flex;
		align-items: center;
		font-size: 16px;
	}
	.backLabel {
		margin-left: -8px;
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
