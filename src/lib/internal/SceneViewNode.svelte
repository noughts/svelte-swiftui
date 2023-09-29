<script lang="ts">
	import View from "$lib/View.svelte";
	import type { UIViewController } from "$lib/index.js";
	import { onMount } from "svelte";

	export let viewController: UIViewController;
	export let isRoot: boolean = false;
	let ref: HTMLDivElement;

	onMount(async () => {
		if (isRoot == false) {
			console.log(ref)
			ref.scrollTo({ behavior: "smooth", top:ref.clientHeight });
		}
	});
</script>

<div class="SceneViewNode" bind:this={ref}>
	{#if isRoot == false}
		<div class="spacer" />
	{/if}
	<div class="view">
		<View {viewController} />
	</div>
</div>

<style>
	.SceneViewNode {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
		overscroll-behavior: none;
	}
	.SceneViewNode::-webkit-scrollbar {
		display: none;
		-webkit-appearance: none;
	}
	.spacer {
		width: 100%;
		height: 100%;
		background-color: rgba(255 0 0/20%);
		scroll-snap-align: center;
		scroll-snap-stop: always;
	}
	.view {
		width: 100%;
		height: 100%;
		scroll-snap-align: center;
		scroll-snap-stop: always;
	}
</style>
