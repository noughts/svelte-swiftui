<script lang="ts">
	import { getContext } from "svelte";
	import type { Landmark } from "./Landmark.js";
	import type { NavigationContext } from "$lib/index.js";

	export let landmark: Landmark;

	const navContext = getContext<NavigationContext>("navigation");
	navContext.updateTitle("hoge");
	navContext.updateRightButtonItem({ title: "Close", bold: true, action:()=>{
		console.log(landmark);
	} });
</script>

<div class="root">
	<h1>Detail</h1>
	<h2>{landmark.name}</h2>
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
		background-color: white;
	}
</style>
