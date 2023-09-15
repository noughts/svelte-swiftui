<script lang="ts">
	import MaterialSymbol from "$lib/MaterialSymbol.svelte";
	import type { UITabBarItem } from "$lib/index.js";
	export let item: UITabBarItem;
	export let selected: boolean = false;
</script>

<button on:click class="root" class:selected>
	<MaterialSymbol icon={item.icon} />
	<div class="name">{item.title}</div>
</button>

<style>
	.root {
		all: unset;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: gray;
	}
	.name {
		font-size: 9px;
		font-weight: 600;
		font-feature-settings: "palt";
	}
	.selected {
		color: var(--ui-tint-color);
	}
</style>
