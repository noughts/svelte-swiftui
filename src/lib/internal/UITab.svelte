<script lang="ts">
	import MaterialSymbol from "$lib/MaterialSymbol.svelte";
	import type { UITabBarItem } from "$lib/index.js";
	export let item: UITabBarItem;
	export let selected: boolean = false;
</script>

<button on:click class="root" class:selected>
	<MaterialSymbol icon={item.icon.name} fill={item.icon.fill} opticalSize={30} weight={item.icon.weight} />
	<div class="name">{item.title}</div>
</button>

<style>
	.root {
		all: unset;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 3px;
		padding-top: 4px;
		color: gray;
	}
	.name {
		font-size: 9.5px;
		font-weight: 500;
		line-height: 1;
	}
	.selected {
		color: var(--ui-tint-color);
	}
</style>
