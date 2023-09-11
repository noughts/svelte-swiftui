<script lang="ts">
	import { getContext } from "svelte";
	import LandmarkRow from "./LandmarkRow.svelte";
	import Page2 from "./Page2.svelte";
	import DemoScreen from "./DemoScreen.svelte";
	import type { DefaultProps, NavigationContext, SceneContext, SceneItem, SvelteNode, SvelteUIComponent } from "$lib/index.js";

	const sceneContext = getContext<SceneContext>("scene");

	const sceneItem: SceneItem = { node: { component: DemoScreen, props: { aaa: 1 } } };

	function onPresentButtonTap() {
		sceneContext.push({ node: { component: DemoScreen, props: { header: "a" } } });
	}


</script>

<div>
	<h1>Page1</h1>
	<button on:click={onPresentButtonTap}>present</button>
</div>
