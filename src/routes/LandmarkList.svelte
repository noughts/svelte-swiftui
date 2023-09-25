<script lang="ts">
	import { UIView } from "$lib/UIView.js";
	import { UIViewController } from "$lib/UIViewController.js";
	import VStack from "$lib/VStack.svelte";
	import { onMount } from "svelte";
	import type { Landmark } from "./Landmark.js";
	import LandmarkDetail from "./LandmarkDetail.svelte";
	import LandmarkRow from "./LandmarkRow.svelte";
    import UIScrollView from "$lib/UIScrollView.svelte";
	export let viewController: UIViewController;
	let scrollView:UIScrollView;
	viewController.navigationItem.title = "Landmark List";
	viewController.navigationItem.leftBarButtonItem = {
		title:"Scroll2Bottom",
		action:()=>{
			scrollView.scrollToBottom();
		}
	}

	const landmarks = [
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "Turtle Rock" },
		{ name: "Silver Salmon Creek" },
		{ name: "End" },
	];

	onMount(() => {
		function handler(e: Event) {
			console.log(e);
		}
		viewController.tabBarController?.addEventListener("didSelect", handler);
		return () => {
			viewController.tabBarController?.removeEventListener("didSelect", handler);
		};
	});

	function onCellTap(landmark: Landmark) {
		viewController.navigationController?.push(new UIViewController(new UIView(LandmarkDetail, { landmark })));
	}

	let count = 0;
	setInterval(() => {
		count++;
	}, 100);
</script>

<div class="root">
	<UIScrollView bind:this={scrollView}>
		<VStack>
			<div class="count">{count}</div>
			{#each landmarks as landmark}
				<LandmarkRow {landmark} on:click={(e) => onCellTap(landmark)} />
			{/each}
		</VStack>
	</UIScrollView>
</div>

<style>
	.root {
		height: 100%;
		background-color: var(--bg-color);
	}
	.count {
		background-color: green;
		color: white;
		font-size: 16px;
		padding: 8px;
	}
</style>
