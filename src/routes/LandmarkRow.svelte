<script lang="ts">
	import type { Landmark } from "./Landmark.js";

	export let landmark: Landmark;
</script>

<button class="root">{landmark.name}</button>

<style>
	.root {
		all: unset;
		height: 44px;
		border-bottom: solid 0.5px gray;
	}
</style>
