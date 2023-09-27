<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	import View from "$lib/View.svelte";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	export let viewController: UIViewController;
	export let isTop: boolean = false;
	export let isRoot: boolean = false;

	let scrollView_ref: HTMLDivElement;

	onMount(() => {
		scrollView_ref.scrollLeft = scrollView_ref.scrollWidth / 2;
	});

	function onScroll(e:UIEvent&{currentTarget:HTMLDivElement}){
		console.log(e.currentTarget.scrollLeft);
	}
</script>

<div
	class="NavigationViewNode"
	bind:this={scrollView_ref}
	on:scroll={onScroll}
	class:isTop
	transition:fly={{ x: "100%", opacity: 1 }}
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
		scroll-snap-type: x mandatory;
		overscroll-behavior: none;
		transition-property: transform, filter;
		transition-duration: 0.3s;
		transform: translateX(-50%);
		filter: brightness(80%);
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
	.isTop {
		transform: translateX(0);
		filter: brightness(100%);
	}
</style>
