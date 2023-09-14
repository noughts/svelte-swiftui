<script lang="ts">
	import { UIViewController } from "$lib/UIViewController.js";
	import VStack from "$lib/VStack.svelte";
	import type { Landmark } from "./Landmark.js";
	import LandmarkDetail from "./LandmarkDetail.svelte";
	import LandmarkRow from "./LandmarkRow.svelte";
	export let viewController: UIViewController;
	// console.log(viewController)

	const landmarks = [
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
	];

	function onCellTap(landmark: Landmark) {
		viewController.navigationController?.push(new UIViewController(LandmarkDetail, { landmark }));
	}

	let count = 0;
	setInterval(() => {
		count++;
	}, 100);
</script>

<div class="root">
	<VStack>
		<div>{count}</div>
		{#each landmarks as landmark}
			<LandmarkRow {landmark} on:click={(e) => onCellTap(landmark)} />
		{/each}
	</VStack>
</div>

<style>
	.root {
		height: 100%;
		background-color: white;
	}
</style>
