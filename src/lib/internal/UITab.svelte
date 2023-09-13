<script lang="ts">
	import MaterialSymbol from "$lib/MaterialSymbol.svelte";

	import type { Property } from "csstype";
	import { getSceneContext, type TabBarItem } from "../index.js";
	const sceneContext = getSceneContext();

	export let item: TabBarItem;
	export let selected: boolean = false;
	let color: Property.Color;
	$: if (selected) {
		color = sceneContext.tintColor;
	} else {
		if( sceneContext.dark){
			color = "rgba(255 255 255/42%)"
		}else {
			color = "rgba(0 0 0/42%)"
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
