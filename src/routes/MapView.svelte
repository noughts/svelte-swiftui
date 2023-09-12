<script lang="ts">
    import type { Landmark } from "./Landmark.js";

	export let landmark:Landmark;
</script>

<div class="root">
	Map of {landmark.name}
</div>

<style>
	.root{
		height: 100%;
		background-color: white;
	}
</style>