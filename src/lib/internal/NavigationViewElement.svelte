<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	import View from "$lib/View.svelte";
	import { UIScrollView, type CGPoint } from "$lib/index.js";
	import type { Property } from "csstype";
    import { onMount } from "svelte";

	export let viewController: UIViewController;
	export let isRoot: boolean = false;

	let scrollView: UIScrollView;
	const containerScrollLeft = viewController.view.containerScrollLeft;
	const isTransitioning = viewController.isTransitioning;
	let pointerEvents: Property.PointerEvents = "unset";

	// tweenに合わせてスクロール
	$: if ($isTransitioning && scrollView) {
		scrollView.contentOffset = { x: $containerScrollLeft, y: 0 };
	}

	function onScroll(e: CustomEvent<CGPoint>) {
		if ($isTransitioning) return;
		viewController.view.containerScrollLeft.set(e.detail.x);
	}
	function willEndDragging(e:CustomEvent<CGPoint>){
		const velocity = e.detail;
		console.log("end", velocity)
		if( velocity.x > 5){

		}
	}
</script>

<div
	class="NavigationViewElement"
	style:pointer-events={pointerEvents}
	class:navBarHidden={viewController.hidesNavigationBarWhenPushed}
>
	<UIScrollView
		bind:this={scrollView}
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
