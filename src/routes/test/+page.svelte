<script lang="ts">
	import { UINavigationController } from "$lib/UINavigationController.js";
	import { UIView } from "$lib/UIView.js";
	import { UIViewController } from "$lib/UIViewController.js";
	import { App } from "$lib/index.js";
	import "../../globals.css";
	import LandmarkList from "../LandmarkList.svelte";
</script>

<App viewController={new UINavigationController(new UIViewController(new UIView(LandmarkList)))} />
