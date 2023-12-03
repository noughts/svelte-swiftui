<script lang="ts">
	import { fly } from "svelte/transition";
	import NavigationBarItemView from "./NavigationBarItemView.svelte";
	import type { UINavigationItem } from "./UINavigationItem.js";
	import { quintOut } from "svelte/easing";
	import { UINavigationController } from "$lib/index.js";
	export let items: UINavigationItem[];
</script>

<div class="UINavigationBar uiChrome">
	{#each items as item, index}
		<div
			class="item"
			class:top={index == items.length - 1}
			style:transition-duration={`${UINavigationController.animationDuration}ms`}
			style:transition-delay={`${UINavigationController.animationDelay}ms`}
			transition:fly={{
				x: "50%",
				easing: quintOut,
				duration: UINavigationController.animationDuration,
				delay: UINavigationController.animationDelay,
			}}
		>
			<NavigationBarItemView {item} showBackButton={index >= 1} on:backButtonTap />
		</div>
	{/each}
</div>

<style>
	.UINavigationBar {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		height: 44px;
		flex-shrink: 0;
		border-bottom: solid 0.1px var(--ui-separator);
	}
	.item {
		position: absolute;
		inset: 0;
		will-change: transform, opacity;
		transition-property: transform, opacity;
		transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
		transform: translateX(-50%);
		opacity: 0;
	}
	.top {
		transform: translateX(0);
		opacity: 1;
	}
</style>
