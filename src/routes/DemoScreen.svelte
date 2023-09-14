<script lang="ts">
    import type { UIViewController } from "$lib/UIViewController.js";
    import { getSceneContext } from "$lib/index.js";

	export let title: string = "dummy";
	export let viewController:UIViewController;
	console.log(viewController)
	viewController.navigationItem.title = "Hello!!"
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
