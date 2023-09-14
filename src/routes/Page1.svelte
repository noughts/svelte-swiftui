<script lang="ts">
    import type { UIViewController } from "$lib/UIViewController.js";

	export let viewController:UIViewController;

	function onPresentButtonTap() {
		/*
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
		*/
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
