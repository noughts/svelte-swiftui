<script lang="ts">
	import { UIScrollView, UIView, UIViewController, VStack } from "$lib/index.js";
	import { onMount } from "svelte";
	import type { Landmark } from "./Landmark.js";
	import LandmarkDetail from "./LandmarkDetail.svelte";
	import LandmarkRow from "./LandmarkRow.svelte";
	export let viewController: UIViewController;
	let scrollView: UIScrollView;
	viewController.navigationItem.title = "Landmark List";
	viewController.navigationItem.leftBarButtonItem = {
		title: "Scroll2Bottom",
		action: () => {
			scrollView.scrollToBottom();
		},
	};

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
		viewController.navigationController?.push(
			new UIViewController(new UIView(LandmarkDetail, { landmark }))
		);
	}

	let lastFrameTimestamp = 0;
	let diff = 0;
	setInterval(() => {
		const current = new Date().getTime();
		diff = current - lastFrameTimestamp;
		lastFrameTimestamp = current;
	}, 1000);
</script>

<div class="LandmarkList">
	<UIScrollView
		bind:this={scrollView}
		contentInset={{ top: viewController.hidesNavigationBarWhenPushed ? 0 : 44, bottom: 49 }}
	>
		<VStack>
			<div class="count">{diff}</div>
			{#each landmarks as landmark}
				<LandmarkRow {landmark} on:click={(e) => onCellTap(landmark)} />
			{/each}
		</VStack>
	</UIScrollView>
</div>

<style>
	.LandmarkList {
		height: 100%;
		width: 100%;
		background-color: var(--bg-color);
	}
	.count {
		background-color: green;
		color: white;
		font-size: 16px;
		padding: 8px;
	}
</style>
