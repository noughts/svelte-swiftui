<script lang="ts">
	import { getContext } from "svelte";
	import type { Landmark } from "./Landmark.js";
	import type { NavigationContext } from "$lib/index.js";
	import MapView from "./MapView.svelte";

	export let landmark: Landmark;

	const navContext = getContext<NavigationContext>("navigation");
	navContext.updateRightButtonItem({
		title: "Close",
		bold: true,
		action: () => {
			console.log(landmark);
		},
	});

	function showMap() {
		navContext.push({ component: MapView, props: { landmark }, title: "Map" });
	}
</script>

<div class="root">
	<h1>Detail</h1>
	<h2>{landmark.name}</h2>
	<button on:click={showMap}>show map</button>
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
		background-color: white;
	}
</style>
