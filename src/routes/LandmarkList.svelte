<script lang="ts">
	import VStack from "$lib/VStack.svelte";
    import { getNavigationContext } from "$lib/index.js";
    import { onMount } from "svelte";
	import type { Landmark } from "./Landmark.js";
	import LandmarkDetail from "./LandmarkDetail.svelte";
	import LandmarkRow from "./LandmarkRow.svelte";
	const navContext = getNavigationContext();

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
		navContext.push({
			component: LandmarkDetail,
			props: { landmark },
			title: landmark.name,
		});
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
