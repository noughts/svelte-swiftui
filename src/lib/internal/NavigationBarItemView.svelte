<script lang="ts">
	import Button from "$lib/Button.svelte";
	import MaterialSymbol from "$lib/MaterialSymbol.svelte";
	import type { UIViewController } from "$lib/index.js";
	import { createEventDispatcher } from "svelte";
	export let viewController:UIViewController;
	export let showBackButton: boolean;
	const item = viewController.navigationItem;

	const dispatch = createEventDispatcher();
</script>

<div class="NavigationBarItemView">
	{#if item.leftBarButtonItem}
		<Button
			on:click={(e) => item.leftBarButtonItem?.action()}
			bold={item.leftBarButtonItem.bold}
			title={item.leftBarButtonItem.title}
			icon={item.leftBarButtonItem.icon}
		/>
	{:else if showBackButton}
		<button class="backButton" on:click={(e) => dispatch("backButtonTap")}>
			<MaterialSymbol icon="arrow_back_ios" />
			<div class="backLabel">Back</div>
		</button>
	{:else}
		<div />
	{/if}

	{#if item.rightBarButtonItem}
		<Button
			on:click={(e) => item.rightBarButtonItem?.action()}
			bold={item.rightBarButtonItem.bold}
			title={item.rightBarButtonItem.title}
			icon={item.rightBarButtonItem.icon}
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
		color: var(--ui-text);
		font-size: 16px;
	}
	.backButton {
		all: unset;
		display: flex;
		align-items: center;
		color:var(--ui-tint-color);
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
