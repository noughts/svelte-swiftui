<script lang="ts">
	import UiScrollView from "$lib/UIScrollView.svelte";
	import { UIView } from "$lib/UIView.js";
	import { UIViewController } from "$lib/UIViewController.js";
	import { VStack } from "$lib/index.js";
	import type { Landmark } from "./Landmark.js";
	import MapView from "./MapView.svelte";
	import {DateTime} from "luxon"

	export let viewController: UIViewController;
	export let landmark: Landmark;
	viewController.navigationItem.title = landmark.name;
	viewController.navigationItem.rightBarButtonItem = {
		title: "Debug",
		bold: true,
		action: () => {
			console.log(landmark);
		},
	};


	let nullArray: any[] = new Array(10).fill(null);

	function showMap() {
		viewController.navigationController?.push(
			new UIViewController(new UIView(MapView, { landmark })),
		);
	}
</script>

<div class="LandmarkDetail">
	<UiScrollView>
		<VStack spacing={16} style={{ padding: "16px" }}>
			{#each nullArray as tmp}
				<h1>Detail</h1>
				<h2>{landmark.name}</h2>
				<div>{DateTime.fromISO("2023-11-23T11:22").plus({hour:2})}</div>
				<button on:click={showMap}>show map</button>
			{/each}
		</VStack>
	</UiScrollView>
</div>

<style>
	.LandmarkDetail {
		width: 100%;
		height: 100%;
		background-color: var(--ui-bg-color);
	}
</style>
