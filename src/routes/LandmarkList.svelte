<script lang="ts">
	import VStack from "$lib/VStack.svelte";
    import { getContext } from "svelte";
	import LandmarkRow from "./LandmarkRow.svelte";
    import type { NavigationContext } from "$lib/index.js";
	const navContext = getContext("navigation") as NavigationContext;
	console.log(navContext)

	const landmarks = [{ name: "Turtle Rock" }, { name: "Silver Salmon Creek" }];
</script>

<div>
	<VStack>
		{#each landmarks as landmark}
			<LandmarkRow {landmark} />
		{/each}
	</VStack>
</div>
