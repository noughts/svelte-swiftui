<script lang="ts">
	import { ScrollView, UIViewController } from "$lib/index.js";
	import type { Landmark } from "./Landmark.js";
	export let viewController: UIViewController;
	export let landmark: Landmark;
</script>

<div class="root">
	<ScrollView style={{ padding: "16px" }}>
		Map of {landmark.name}
	</ScrollView>
</div>

<style>
	.root {
		height: 100%;
		background-color: var(--ui-bg-color);
	}
</style>
