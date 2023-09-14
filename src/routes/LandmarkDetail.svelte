<script lang="ts">
	import { UIViewController } from "$lib/UIViewController.js";
	import type { Landmark } from "./Landmark.js";
	import MapView from "./MapView.svelte";

	export let viewController: UIViewController;
	export let landmark: Landmark;
	export let rnd = Math.random();
	export function getRnd() {
		return rnd;
	}

	viewController.navigationItem.rightBarButtonItem = {
		title: "Debug",
		bold: true,
		action: () => {
			console.log(landmark);
		},
	};

	function showMap() {
		console.log(viewController.navigationController)
		viewController.navigationController?.push(new UIViewController(MapView, { landmark }));
	}
</script>

<div class="root">
	<h1>Detail</h1>
	<h2>{landmark.name}</h2>
	<div>{rnd}</div>
	<button on:click={showMap}>show map</button>
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
		background-color: white;
	}
</style>
