<script lang="ts">
	import View from "$lib/View.svelte";
	import type { UIViewController } from "$lib/index.js";
	import { createEventDispatcher, onMount } from "svelte";
	import { cubicOut } from "svelte/easing";
	import { tweened } from "svelte/motion";

	export let viewController: UIViewController;
	export let root: boolean = false;
	let ref: HTMLDivElement;

	const dispatch = createEventDispatcher();
	const tween = tweened(0, { duration: 333, easing: cubicOut });
	let scrollSnapType = "none";

	onMount(async () => {
		if (root == false) {
			await tween.set(ref.clientHeight);
			scrollSnapType = "y mandatory";
		}
	});
	$: if (ref) {
		ref.scrollTo(0, $tween);
	}

	function onScroll(e: UIEvent & { currentTarget: HTMLDivElement }) {
		const pos = e.currentTarget.clientHeight - e.currentTarget.scrollTop;
		const pct = pos / e.currentTarget.clientHeight;
		dispatch("transitioning", pct);
	}
</script>

<div
	class="SceneViewNode"
	bind:this={ref}
	on:scroll={onScroll}
	style:scroll-snap-type={scrollSnapType}
>
	{#if root == false}
		<div class="spacer" />
	{/if}
	<div class="view" class:root>
		<View {viewController} />
	</div>
</div>

<style>
	.SceneViewNode {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		/* scroll-snap-type: y mandatory; */
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
		scroll-snap-stop: always;
	}
	.view {
		width: 100%;
		height: calc(100% - 22px);
		margin-top: 22px;
		scroll-snap-align: center;
		scroll-snap-stop: always;
		overflow: hidden;
		border-radius: 10px 10px 0px 0px;
	}
	.view.root {
		border-radius: 0;
		height: 100%;
		margin-top: 0;
	}
</style>
