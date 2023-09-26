<script lang="ts">
	import UiScrollView from "$lib/UIScrollView.svelte";
	import { UIView } from "$lib/UIView.js";
	import { UIViewController } from "$lib/UIViewController.js";
    import { VStack } from "$lib/index.js";
	import type { Landmark } from "./Landmark.js";
	import MapView from "./MapView.svelte";

	export let viewController: UIViewController;
	export let landmark: Landmark;
	export let rnd = Math.random();
	export function getRnd() {
		return rnd;
	}
	viewController.navigationItem.title = landmark.name;
	viewController.navigationItem.rightBarButtonItem = {
		title: "Debug",
		bold: true,
		action: () => {
			console.log(landmark);
		},
	};

	function showMap() {
		viewController.navigationController?.push(new UIViewController(new UIView(MapView, { landmark })));
	}
</script>

<div class="root">
	<UiScrollView>
		<VStack spacing={16} style={{padding:"16px"}}>
			<h1>Detail</h1>
			<h2>{landmark.name}</h2>
			<div>{rnd}</div>
			<button on:click={showMap}>show map</button>
			<h1>Detail</h1>
			<h2>{landmark.name}</h2>
			<div>{rnd}</div>
			<button on:click={showMap}>show map</button>
			<h1>Detail</h1>
			<h2>{landmark.name}</h2>
			<div>{rnd}</div>
			<button on:click={showMap}>show map</button>
			<h1>Detail</h1>
			<h2>{landmark.name}</h2>
			<div>{rnd}</div>
			<button on:click={showMap}>show map</button>
			<h1>Detail</h1>
			<h2>{landmark.name}</h2>
			<div>{rnd}</div>
			<button on:click={showMap}>show map</button>
			<h1>Detail</h1>
			<h2>{landmark.name}</h2>
			<div>{rnd}</div>
			<button on:click={showMap}>show map</button>
			<h1>Detail</h1>
			<h2>{landmark.name}</h2>
			<div>{rnd}</div>
			<button on:click={showMap}>show map</button>
		</VStack>

	</UiScrollView>
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
		background-color: var(--ui-bg-color);
	}
</style>
