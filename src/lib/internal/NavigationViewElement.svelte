<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	import View from "$lib/View.svelte";

	export let viewController: UIViewController;
	export let isRoot: boolean = false;

	let ref: HTMLDivElement;
	const containerScrollTop = viewController.containerScrollTop;
	const isTransitioning = viewController.isTransitioning;

	// tweenに合わせてスクロール
	$: if (ref && $isTransitioning) {
		ref.scrollTop = $containerScrollTop;
	}

	function onScroll(e: UIEvent & { currentTarget: HTMLDivElement }) {
		if ($isTransitioning) return;
		viewController.containerScrollTop.set(e.currentTarget.scrollTop);
	}
</script>

<div
	class="NavigationViewNode"
	bind:this={ref}
	on:scroll={onScroll}
	style:scroll-snap-type={$isTransitioning ? "none" : "x mandatory"} 
	class:navBarHidden={viewController.hidesNavigationBarWhenPushed}
>
	<div class="contents" class:isRoot>
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
		transition-property: transform, filter;
		transition-duration: 0.3s;
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
		width: 50%;
		height: 100%;
		scroll-snap-align: center;
		scroll-snap-stop: always;
	}
	.viewContainer.isRoot {
		width: 100%;
	}
	.spacer {
		width: 50%;
		height: 100%;
	}
	.navBarHidden {
		top: 0;
	}
</style>
