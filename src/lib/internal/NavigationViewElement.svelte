<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	import View from "$lib/View.svelte";
    import type { Property } from "csstype";

	export let viewController: UIViewController;
	export let isRoot: boolean = false;

	let ref: HTMLDivElement;
	const containerScrollLeft = viewController.containerScrollLeft;
	const isTransitioning = viewController.isTransitioning;
	let pointerEvents:Property.PointerEvents = "auto";

	// tweenに合わせてスクロール
	$: if (ref && $isTransitioning) {
		ref.scrollLeft = $containerScrollLeft;
	}

	function onScroll(e: UIEvent & { currentTarget: HTMLDivElement }) {
		if ($isTransitioning) return;
		viewController.containerScrollLeft.set(e.currentTarget.scrollLeft);
	}
	function onTouchEnd(e:any){
		// pointerEvents = "none"
	}
</script>

<div
	class="NavigationViewNode"
	bind:this={ref}
	on:scroll={onScroll}
	on:touchend={onTouchEnd}
	style:pointer-events={pointerEvents}
	style:scroll-snap-type={$isTransitioning ? "none" : "x mandatory"}
	class:navBarHidden={viewController.hidesNavigationBarWhenPushed}
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
</div>

<style>
	.NavigationViewNode {
		position: absolute;
		inset: 0;
		overflow-x: scroll;
		overscroll-behavior: none;
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
