<script lang="ts">
    import type { SceneContext } from "$lib/index.js";
    import { getContext } from "svelte";

	export let title: string = "dummy title";
	const context = getContext<SceneContext>("scene");

	function onDismissButtonTap(){
		context.pop();
	}
</script>

<div class="root">
	<h1>{title}</h1>
	<div>page2</div>
	<button on:click={onDismissButtonTap}>Dismiss</button>
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
		background-color: rgba(0 255 255/50%);
	}
</style>
