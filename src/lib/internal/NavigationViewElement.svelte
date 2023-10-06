<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	import ViewControllerRenderer from "$lib/ViewControllerRenderer.svelte";
	import { ScrollView, type CGPoint } from "$lib/index.js";
	import type { Property } from "csstype";
	import { cubicInOut, linear } from "svelte/easing";
	import { tween } from "./Util.js";

	export let viewController: UIViewController;
	export let isRoot: boolean = false;

	let scrollView: ScrollView;
	const containerScrollLeft = viewController.view.containerScrollLeft;
	const isTransitioning = viewController.isTransitioning;

	// tweenに合わせてスクロール
	$: if ($isTransitioning && scrollView) {
		scrollView.setContentOffset({ x: $containerScrollLeft, y: 0 });
	}

	function onScroll(e: CustomEvent<CGPoint>) {
		if ($isTransitioning) return;
		viewController.view.containerScrollLeft.set(e.detail.x);
	}
	async function willEndDragging(e: CustomEvent<CGPoint>) {
		const velocity = e.detail;
		scrollView.isUserInteractionEnabled = false;
		if (velocity.x > 5) {
			await tween(
				scrollView.getContentOffset()?.x,
				0,
				{ duration: 100, easing: linear },
				(x) => {
					if (!x) return;
					scrollView.setContentOffset({ x, y: 0 });
				}
			);
			viewController.navigationController?.pop(false);
		} else {
			await tween(
				scrollView.getContentOffset()?.x,
				390,
				{ duration: 200, easing: cubicInOut },
				(x) => {
					if (!x) return;
					scrollView.setContentOffset({ x, y: 0 });
				}
			);
			scrollView.isUserInteractionEnabled = true;
		}
	}
</script>

<div class="NavigationViewElement" class:navBarHidden={viewController.hidesNavigationBarWhenPushed}>
	<ScrollView
		bind:this={scrollView}
		bounces={false}
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
		/* background-color: rgba(255 0 0/10%); */
	}
	.navBarHidden {
		top: 0;
	}
</style>
