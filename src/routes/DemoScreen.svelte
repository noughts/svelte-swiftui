<script lang="ts">
    import { getSceneContext } from "$lib/index.js";

	export let title: string;
	const context = getSceneContext();

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
		background-color: white;
	}
</style>
