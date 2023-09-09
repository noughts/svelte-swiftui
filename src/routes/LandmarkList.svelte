<script lang="ts">
    import LandmarkRow from "./LandmarkRow.svelte";

	const landmarks = [
		{name:"Turtle Rock"},
		{name:"Silver Salmon Creek"}
	]
</script>

<div>
	{#each landmarks as landmark}
		<LandmarkRow {landmark} />
	{/each}
</div>