<script lang="ts">
	import VStack from "$lib/VStack.svelte";
	import LandmarkRow from "./LandmarkRow.svelte";

	const landmarks = [{ name: "Turtle Rock" }, { name: "Silver Salmon Creek" }];
</script>

<div>
	<VStack>
		{#each landmarks as landmark}
			<LandmarkRow {landmark} />
		{/each}
	</VStack>
</div>
