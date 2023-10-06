<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	import ViewControllerRenderer from "$lib/ViewControllerRenderer.svelte";
	import { ScrollView, type CGPoint } from "$lib/index.js";
	import { cubicInOut, linear } from "svelte/easing";
	import { tween } from "./Util.js";
	import { onMount } from "svelte";

	export let viewController: UIViewController;
	export let isRoot: boolean = false;

	let scrollView: ScrollView;
	const containerScrollLeft = viewController.view.containerScrollLeft;
	const isTransitioning = viewController.isTransitioning;

	onMount(() => {
		scrollView.scrollTo({ left: 390, behavior: "smooth" });
	});

	function onScroll(e: CustomEvent<CGPoint>) {
		if ($isTransitioning) return;
		viewController.view.containerScrollLeft.set(e.detail.x);
	}
	async function willEndDragging(e: CustomEvent<CGPoint>) {
		return;
		const velocity = e.detail;
		scrollView.isUserInteractionEnabled = false;
		if (velocity.x > 5) {
			await scrollView.scrollTo({ left: 0, behavior: "smooth" });
			viewController.navigationController?.pop(false);
		} else {
			await scrollView.scrollTo({ left: 390, behavior: "smooth" });
			scrollView.isUserInteractionEnabled = true;
		}
	}
</script>

<div class="NavigationViewElement" class:navBarHidden={viewController.hidesNavigationBarWhenPushed}>
	<ScrollView
		bind:this={scrollView}
		bounces={false}
		isPagingEnabled={true}
		contentInset={{ top: 0, bottom: 0 }}
		showsScrollIndicator={false}
		on:willEndDragging={willEndDragging}
		on:didScroll={onScroll}
		scrollDirection="horizontal"
	>
		<div class="contents" class:isRoot>
			{#if isRoot == false}
				<div class="page spacer" />
			{/if}
			<div class="page viewContainer" class:isRoot>
				<ViewControllerRenderer {viewController} />
			</div>
		</div>
	</ScrollView>
</div>

<style>
	.NavigationViewElement {
		position: absolute;
		inset: 0;
	}
	.contents {
		display: flex;
		width: 200%;
		height: 100%;
	}
	.contents.isRoot {
		width: 100%;
	}
	.page {
		width: 100%;
		height: 100%;
		scroll-snap-align: center;
		scroll-snap-stop: normal;
	}
	.viewContainer {
		height: 100%;
	}
	.viewContainer.isRoot {
		width: 100%;
	}
	.spacer {
		width: 100%;
		height: 100%;

	}
	.navBarHidden {
		top: 0;
	}
</style>
