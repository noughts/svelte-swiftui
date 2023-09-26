<script lang="ts">
    import { UIScrollView } from "$lib/index.js";
import type { Landmark } from "./Landmark.js";

	export let landmark:Landmark;
</script>

<div class="root">
	<UIScrollView style={{padding:"16px"}}>
		Map of {landmark.name}
	</UIScrollView>
	
</div>

<style>
	.root{
		height: 100%;
		background-color: var(--ui-bg-color);
	}
</style>