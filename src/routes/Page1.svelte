<script lang="ts">
	import { getContext } from "svelte";
	import type { SceneContext } from "$lib/index.js";
	import LandmarkRow from "./LandmarkRow.svelte";
	import Page2 from "./Page2.svelte";
	import DemoScreen from "./DemoScreen.svelte";

	const sceneContext = getContext<SceneContext>("scene");
	function onPresentButtonTap() {
		// sceneContext.push({ component: Page2, args: { title: "hello" }  });
		sceneContext.push(DemoScreen, { header: "hoge" });
	}
</script>

<div>
	<h1>Page1</h1>
	<button on:click={onPresentButtonTap}>present</button>
</div>
