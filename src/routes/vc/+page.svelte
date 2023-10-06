<script lang="ts">
	import { UINavigationController } from "$lib/UINavigationController.js";
	import { UIView } from "$lib/UIView.js";
	import { UIViewController } from "$lib/UIViewController.js";
	import { App, ViewControllerRenderer } from "$lib/index.js";
	import "../../globals.css";
	import LandmarkList from "../LandmarkList.svelte";
</script>

<div class="root">
	<ViewControllerRenderer viewController={new UIViewController(new UIView(LandmarkList))} />
</div>


<style>
	.root{
		height:100dvh;
	}
</style>