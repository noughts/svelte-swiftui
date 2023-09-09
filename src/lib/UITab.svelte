<script lang="ts">
	import MaterialSymbol from "./MaterialSymbol.svelte";
	import type { UITabBarItem } from "./UITabBarItem.js";

	export let item: UITabBarItem;
	export let selected: boolean = false;
	$: color = selected ? "blue" : "gray";
</script>

<button on:click class="root" style:color>
	<MaterialSymbol icon={item.icon} />
	<div class="name">{item.title}</div>
</button>

<style>
	.root {
		all: unset;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.name {
		font-size: 11px;
		font-weight: 600;
		font-feature-settings: "palt";
	}
</style>
