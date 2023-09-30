<script lang="ts">
	import View from "$lib/View.svelte";
	import type { UIViewController } from "$lib/index.js";
	import { createEventDispatcher, onMount } from "svelte";
    import type { PresentTransitionDelegate } from "./PresentTransitionDelegate.js";

	export let viewController: UIViewController;
	export let isRoot: boolean;
	export let isTop:boolean;
	let ref: HTMLDivElement;

	const transitionDelegate = viewController.transitioningDelegate as PresentTransitionDelegate;
	const percentComplete = transitionDelegate.interactionController.percentComplete
	const brightness = viewController.brightness;


	const dispatch = createEventDispatcher();
	
	let scrollSnapType = "none"; // スナップが有効だとintroのtransitionが反映されないので初期値は無効にする。

	// tweenに合わせてスクロール
	$: if (ref) {
		ref.scrollTo(0, $percentComplete);
	}

	function onScroll(e: UIEvent & { currentTarget: HTMLDivElement }) {
		const pos = e.currentTarget.clientHeight - e.currentTarget.scrollTop;
		const pct = 1 - pos / e.currentTarget.clientHeight;
		dispatch("transitioning", pct);
	}
</script>

<div
	class="SceneViewNode"
	bind:this={ref}
	on:scroll={onScroll}
	style:scroll-snap-type={scrollSnapType}
>
	{#if isRoot == false}
		<div class="spacer" />
	{/if}
	<div class="view" class:isRoot style:filter="brightness({brightness}%)" class:isTop >
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
		background-color: rgba(255 0 0/10%);
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
	.view.isTop{
		filter:brightness(100%) !important;
	}
</style>
