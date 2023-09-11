<script lang="ts">
	import VStack from "$lib/VStack.svelte";
	import type { NavigationContext } from "$lib/index.js";
	import { getContext } from "svelte";
	import LandmarkRow from "./LandmarkRow.svelte";
	import type { Landmark } from "./Landmark.js";
	import LandmarkDetail from "./LandmarkDetail.svelte";
	const navContext = getContext("navigation") as NavigationContext;

	export let dummy: string;

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
		console.log(navContext);
		navContext.push({ component: LandmarkDetail, props: { landmark }, title: landmark.name });
	}

	let count = 0;
	setInterval(() => {
		count++;
	}, 100);
</script>

<div class="root">
	<VStack>
		<div>{dummy}</div>
		{#each landmarks as landmark}
			<LandmarkRow {landmark} on:click={(e) => onCellTap(landmark)} />
		{/each}
		<div>{count}</div>
	</VStack>
</div>

<style>
	.root {
		height: 100%;
		background-color: white;
	}
</style>
