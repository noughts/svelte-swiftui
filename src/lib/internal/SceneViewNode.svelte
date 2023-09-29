<script lang="ts">
	import View from "$lib/View.svelte";
	import type { UIViewController } from "$lib/index.js";
	import { onMount } from "svelte";

	export let viewController: UIViewController;
	export let root: boolean = false;
	let ref: HTMLDivElement;

	onMount(async () => {
		if (root == false) {
			ref.scrollTo({ behavior: "smooth", top: ref.clientHeight });
		}
	});
</script>

<div class="SceneViewNode" bind:this={ref}>
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
		border-radius: 10px 10px 0px 0px;
	}
	.view.root {
		border-radius: 0;
		height: 100%;
		margin-top: 0;
	}
</style>
