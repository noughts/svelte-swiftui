<script lang="ts">
	import type { SceneContext, SceneItem } from "$lib/index.js";
	import { getContext, type ComponentProps } from "svelte";
	import DemoScreen from "./DemoScreen.svelte";

	const sceneContext = getContext<SceneContext>("scene");

	function onPresentButtonTap() {
		sceneContext.push({ component: DemoScreen, props: { title: "a" } });
	}
</script>

<div class="root">
	<h1>Page1</h1>
	<button on:click={onPresentButtonTap}>present</button>
</div>

<style>
	.root{
		background-color: white;
		height: 100%;
	}
</style>