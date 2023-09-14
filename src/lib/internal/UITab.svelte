<script lang="ts">
	import MaterialSymbol from "$lib/MaterialSymbol.svelte";
	import type { UITabBarItem } from "$lib/index.js";

	import type { Property } from "csstype";

	export let item: UITabBarItem;
	export let selected: boolean = false;
	let color: Property.Color;
	$: if (selected) {
		color = "red";
	} else {
		if (false) {
			color = "rgba(255 255 255/42%)";
		} else {
			color = "rgba(0 0 0/42%)";
		}
	}
</script>

<button on:click class="root" style:color>
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
	}
	.name {
		font-size: 9px;
		font-weight: 600;
		font-feature-settings: "palt";
	}
</style>
