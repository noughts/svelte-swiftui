<script lang="ts">
	import { UINavigationController } from "$lib/UINavigationController.js";
	import { UIView } from "$lib/UIView.js";
	import { UIViewController } from "$lib/UIViewController.js";
    import DemoScreen from "./DemoScreen.svelte";

	export let viewController: UIViewController;

	function onPresentButtonTap() {
		viewController.present(new UINavigationController(new UIViewController(new UIView(DemoScreen))));
	}
</script>

<div class="root">
	<h1>Page1</h1>
	<button on:click={onPresentButtonTap}>present</button>
</div>

<style>
	.root {
		background-color: black;
		height: 100%;
	}
</style>
