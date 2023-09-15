<script lang="ts">
	import type { Property } from "csstype";
	import MaterialSymbol from "./MaterialSymbol.svelte";
	export let title: string | null = null;
	export let icon: string | null = null;
	export let bold: boolean = false;
</script>

<button class="button" on:click class:bold>
	{#if icon}
		<MaterialSymbol {icon} />
	{/if}
	{#if title}
		<div>{title}</div>
	{/if}
</button>

<style>
	.button {
		all: unset;
		display: flex;
		align-items: center;
		font-feature-settings: "palt";
		color:var(--ui-tint-color);
	}
	.button.bold {
		font-weight: 600;
	}
</style>
