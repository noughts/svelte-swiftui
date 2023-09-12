<script lang="ts">
	import Button from "$lib/Button.svelte";
	import MaterialSymbol from "$lib/MaterialSymbol.svelte";
	import { getSceneContext, type NavigationItem } from "$lib/index.js";
	import { createEventDispatcher } from "svelte";
	const sceneContext = getSceneContext();
	const dark = sceneContext.dark;
	const color = sceneContext.tintColor;
	export let item: NavigationItem;
	export let showBackButton: boolean;

	const dispatch = createEventDispatcher();
</script>

<div class="NavigationBarItemView" class:dark>
	{#if item.leftButtonItem}
		<Button
			on:click={(e) => item.leftButtonItem?.action()}
			{color}
			bold={item.leftButtonItem.bold}
			title={item.leftButtonItem.title}
			icon={item.leftButtonItem.icon}
		/>
	{:else if showBackButton}
		<button class="backButton" on:click={(e) => dispatch("backButtonTap")} style:color>
			<MaterialSymbol icon="arrow_back_ios" />
			<div class="backLabel">Back</div>
		</button>
	{:else}
		<div />
	{/if}

	{#if item.rightButtonItem}
		<Button
			on:click={(e) => item.rightButtonItem?.action()}
			{color}
			bold={item.rightButtonItem.bold}
			title={item.rightButtonItem.title}
			icon={item.rightButtonItem.icon}
		/>
	{:else}
		<div />
	{/if}

	<div class="title">{item.title}</div>
</div>

<style>
	.NavigationBarItemView {
		width: 100%;
		height: 100%;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 8px;
		color: var(--ui-text-light);
		font-size: 16px;
	}
	.dark {
		color: var(--ui-text-dark);
	}
	.backButton {
		all: unset;
		display: flex;
		align-items: center;
	}
	.backLabel {
		margin-left: -8px;
	}
	.title {
		font-weight: 600;
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}
</style>
