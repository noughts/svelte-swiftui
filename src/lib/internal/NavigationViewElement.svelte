<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	import View from "$lib/View.svelte";
	import { UIScrollView, type CGPoint } from "$lib/index.js";
	import type { Property } from "csstype";

	export let viewController: UIViewController;
	export let isRoot: boolean = false;

	let scrollView: UIScrollView;
	const containerScrollLeft = viewController.containerScrollLeft;
	const isTransitioning = viewController.isTransitioning;
	let pointerEvents: Property.PointerEvents = "unset";
	let contentOffset: CGPoint = { x: 0, y: 0 };

	// tweenに合わせてスクロール
	$: if ($isTransitioning) {
		contentOffset = { x: $containerScrollLeft, y: 0 };
	}

	function onScroll(e: CustomEvent<CGPoint>) {
		if ($isTransitioning) return;
		viewController.containerScrollLeft.set(e.detail.x);
	}
	function onTouchEnd(e: any) {
		// pointerEvents = "none"
	}
</script>

<div
	class="NavigationViewElement"
	on:touchend={onTouchEnd}
	style:pointer-events={pointerEvents}
	class:navBarHidden={viewController.hidesNavigationBarWhenPushed}
>
	<UIScrollView
		bind:this={scrollView}
		contentInset={{ top: 0, bottom: 0 }}
		isPagingEnabled={$isTransitioning == false}
		{contentOffset}
		showsScrollIndicator={false}
		on:didScroll={onScroll}
		scrollDirection="horizontal"
	>
		<div class="contents" class:isRoot>
			{#if isRoot == false}
				<div class="page spacer" />
			{/if}
			{#if isRoot == false}
				<div class="page spacer" />
			{/if}
			<div class="page viewContainer" class:isRoot>
				<View {viewController} />
			</div>
		</div>
	</UIScrollView>
</div>

<style>
	.NavigationViewElement {
		position: absolute;
		inset: 0;
	}
	.contents {
		display: flex;
		width: 300%;
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
	.viewContainer{
		height:100%;
	}
	.viewContainer.isRoot {
		width: 100%;
	}
	.spacer {
		width: 100%;
		height: 100%;
		/* background-color: rgba(255 0 0/10%); */
	}
	.navBarHidden {
		top: 0;
	}
</style>
