<script lang="ts">
    import type { Landmark } from "./Landmark.js";

	export let landmark:Landmark
</script>

<div class="root">{landmark.name}</div>

<style>
	.root{
		height: 44px;
		border-bottom: solid 0.5px gray;
	}
</style>