<script lang="ts">
	import { createNaivationItem, getSceneContext } from "$lib/index.js";
	import NavigationView from "$lib/NavigationView.svelte";
	import DemoScreen from "./DemoScreen.svelte";

	const sceneContext = getSceneContext();

	function onPresentButtonTap() {
		sceneContext.push({
			component: NavigationView,
			props: {
				rootItem: createNaivationItem({
					component: DemoScreen,
					title: "Demo",
					props: { title: "from Page 1" },
					rightButtonItem: {
						icon: "close",
						title: "Done",
						bold: true,
						action: () => {
							sceneContext.pop();
						},
					},
					leftButtonItem: {
						title: "キャラクター変更",
						action: () => {
							alert("キャラクター変更");
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
