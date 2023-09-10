<script lang="ts">
	import VStack from "$lib/VStack.svelte";
	import { getContext, onMount } from "svelte";
	import LandmarkRow from "./LandmarkRow.svelte";
	import type { NavigationContext } from "$lib/index.js";
	import NavigationView from "$lib/NavigationView.svelte";
	const navContext = getContext("navigation") as NavigationContext;
	// console.log(navContext)

	const landmarks = [{ name: "Turtle Rock" }, { name: "Silver Salmon Creek" }];

	let count = 0;
	setInterval(() => {
		count++;
	}, 100);
</script>

<div class="root">
	<NavigationView>
		<VStack>
			{#each landmarks as landmark}
				<LandmarkRow {landmark} />
			{/each}
			<div>{count}</div>
		</VStack>
	</NavigationView>
</div>

<style>
	.root {
		height: 100%;
		background-color: white;
	}
</style>
