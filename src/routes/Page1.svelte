<script lang="ts">
	import { getContext } from "svelte";
	import LandmarkRow from "./LandmarkRow.svelte";
	import Page2 from "./Page2.svelte";
	import DemoScreen from "./DemoScreen.svelte";
    import type { NavigationContext, SceneContext } from "$lib/index.js";

	const sceneContext = getContext<SceneContext>("scene");
	function onPresentButtonTap() {
		sceneContext.push({ node: { component: DemoScreen } });
	}
</script>

<div>
	<h1>Page1</h1>
	<button on:click={onPresentButtonTap}>present</button>
</div>
