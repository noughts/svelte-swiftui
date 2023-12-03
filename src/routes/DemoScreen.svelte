<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	import VStack from "$lib/VStack.svelte";
	import { UIScrollView } from "$lib/index.js";
	export let title: string = "dummy";
	export let viewController: UIViewController;
	viewController.navigationItem.title = "Hello!!";
	viewController.navigationItem.rightBarButtonItem = {
		title: "Close",
		action: () => {
			viewController.dismiss();
		},
	};
	viewController.navigationItem.leftBarButtonItem = {
		title: "Change",
		bold: true,
		action: () => {
			console.log("Change");
		},
	};

	function onDismissButtonTap() {
		viewController.dismiss();
	}
</script>

<div class="root">
	<UIScrollView>
		<VStack spacing={32} style={{ padding: "16px" }}>
			<h1>{title}</h1>
			<div>page2</div>
			<button on:click={onDismissButtonTap}>Dismiss</button>
			<h1>{title}</h1>
			<div>page2</div>
			<button on:click={onDismissButtonTap}>Dismiss</button>
			<h1>{title}</h1>
			<div>page2</div>
			<button on:click={onDismissButtonTap}>Dismiss</button>
			<h1>{title}</h1>
			<div>page2</div>
			<button on:click={onDismissButtonTap}>Dismiss</button>
			<h1>{title}</h1>
			<div>page2</div>
			<button on:click={onDismissButtonTap}>Dismiss</button>
		</VStack>
	</UIScrollView>
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
		background-color: black;
	}
</style>
