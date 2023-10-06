<script lang="ts">
	import ViewRenderer from "$lib/ViewControllerRenderer.svelte";
	import type { UIViewController } from "$lib/index.js";

	export let viewController: UIViewController;
	export let isRoot: boolean;
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

<!--  scroll-snap-type が設定されているとシステム起点のスクロールが正常に動作しないので切り替えてます -->
<div
	class="SceneViewNode"
	bind:this={ref}
	on:scroll={onScroll}
	style:scroll-snap-type={$isTransitioning ? "none" : "y mandatory"} 
>
	{#if isRoot == false}
		<div class="spacer" />
	{/if}
	<div class="view" class:isRoot>
		<View {viewController} />
	</div>
</div>

<style>
	.SceneViewNode {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		overscroll-behavior: none;
	}
	.SceneViewNode::-webkit-scrollbar {
		display: none;
		-webkit-appearance: none;
	}
	.spacer {
		width: 100%;
		height: 100%;
		/* background-color: rgba(255 0 0/10%); */
		scroll-snap-align: center;
	}
	.view {
		width: 100%;
		height: calc(100% - 22px);
		margin-top: 22px;
		scroll-snap-align: center;
		overflow: hidden;
		border-radius: 10px 10px 0px 0px;
	}
	.view.isRoot {
		border-radius: 0;
		height: 100%;
		margin-top: 0;
	}
</style>
