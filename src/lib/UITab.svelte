<script lang="ts">
	import { getContext } from "svelte";
	import MaterialSymbol from "./MaterialSymbol.svelte";
	import type { SceneContext, UITabBarItem } from "./index.js";
	import type { Property } from "csstype";
	const sceneContext = getContext<SceneContext>("scene");

	export let item: UITabBarItem;
	export let selected: boolean = false;
	// $: color = selected ? sceneContext.tintColor : "gray";
	let color: Property.Color;
	$: if (selected) {
		color = sceneContext.tintColor;
	} else {
		if( sceneContext.dark){
			color = "rgba(255 255 255/50%)"
		}else {
			color = "rgba(0 0 0/50%)"
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
