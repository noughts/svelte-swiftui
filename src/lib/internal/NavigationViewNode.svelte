<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	import View from "$lib/View.svelte";
	import { fly } from "svelte/transition";

	export let viewController: UIViewController;
	export let isTop:boolean = false;
</script>

<div
	class="NavigationViewNode"
	class:isTop
	transition:fly={{ x: "100%", opacity: 1 }}
	class:navBarHidden={viewController.hidesNavigationBarWhenPushed}
>
	<View {viewController} />
</div>

<style>
	.NavigationViewNode {
		position: absolute;
		inset: 0;

		transition-property: transform, filter;
		transition-duration: 0.3s;
		transform: translateX(-50%);
		filter: brightness(80%);
	}
	.navBarHidden {
		top: 0;
	}
	.isTop {
		transform: translateX(0);
		filter: brightness(100%);
	}
</style>
