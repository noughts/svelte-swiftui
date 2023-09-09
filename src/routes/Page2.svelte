<script lang="ts">
    import type { SceneContext } from "$lib/index.js";
    import { getContext } from "svelte";

	export let title: string = "dummy title";
	const context = getContext("Scene") as SceneContext;

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
		background-color: rgba(255 255 255/50%);
	}
</style>
