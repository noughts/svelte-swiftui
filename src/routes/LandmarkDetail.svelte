<script lang="ts">
    import type { Landmark } from "./Landmark.js";

	export let landmark:Landmark;
</script>

<div class="root">
	<h1>Detail</h1>
	<h2>{landmark.name}</h2>
</div>

<style>
	.root{
		width: 100%;
		height: 100%;
	}
</style>