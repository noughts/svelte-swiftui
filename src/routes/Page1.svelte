<script lang="ts">
	import { createNaivationItem, type SceneContext, type SceneItem } from "$lib/index.js";
	import { getContext, type ComponentProps } from "svelte";
	import DemoScreen from "./DemoScreen.svelte";
	import NavigationView from "$lib/NavigationView.svelte";

	const sceneContext = getContext<SceneContext>("scene");

	function onPresentButtonTap() {
		sceneContext.push({
			component: NavigationView,
			props: {
				rootItem: createNaivationItem({
					component: DemoScreen,
					title: "Demo",
					props: { title: "from Page 1" },
					rightButtonItem: {
						title: "Close",
						action: () => {
							sceneContext.pop();
						},
					},
					leftButtonItem: {
						title: "キャラクター変更",
						action: () => {
							alert("キャラクター変更")
						},
					},
				}),
			},
		});
	}
</script>

<div class="root">
	<h1>Page1</h1>
	<button on:click={onPresentButtonTap}>present</button>
</div>

<style>
	.root {
		background-color: white;
		height: 100%;
	}
</style>
