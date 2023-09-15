<!-- NavigationView 継承サンプル -->

<script lang="ts">
	import NavigationView from "$lib/NavigationView.svelte";
	import type { UINavigationController } from "$lib/UINavigationController.js";
	import { UIViewController } from "$lib/UIViewController.js";
	import DemoScreen from "./DemoScreen.svelte";

	export let viewController: UINavigationController;

	function onFabClick() {
		viewController.present(new UIViewController(DemoScreen, {}));
	}
</script>

<NavigationView {viewController}>
	<button class="fab" on:click={onFabClick}>FAB</button>
</NavigationView>

<style>
	.fab {
		position: absolute;
		width: 88px;
		height: 88px;
		left: 22px;
		bottom: 22px;
		z-index: 100;
	}
</style>
