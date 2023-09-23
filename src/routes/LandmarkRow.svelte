<script lang="ts">
	import type { Landmark } from "./Landmark.js";

	export let landmark: Landmark;
</script>

<button on:click class="root">{landmark.name}</button>

<style>
	.root {
		all: unset;
		height: 44px;
		color: var(--high-emphasis);
		border-bottom: solid 0.5px var(--separator);
	}
</style>
