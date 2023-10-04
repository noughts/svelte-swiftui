<script lang="ts">
	import { UINavigationController } from "$lib/UINavigationController.js";
	import { UIView } from "$lib/UIView.js";
	import { UIViewController } from "$lib/UIViewController.js";
	import View from "$lib/View.svelte";
	import "../../globals.css";
	import LandmarkList from "../LandmarkList.svelte";
</script>

<div class="root">
	<View
		viewController={new UINavigationController(new UIViewController(new UIView(LandmarkList)))}
	/>
</div>

<style>
	.root {
		max-width: 480px;
		height: 100dvh;
		margin-left: auto;
		margin-right: auto;
	}
</style>
