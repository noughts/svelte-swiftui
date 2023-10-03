<script lang="ts" context="module">
	export type UIEdgeInsets = {
		top: number;
		bottom: number;
	};
</script>

<script lang="ts">
	import type { Properties } from "csstype";
	import { styleToString } from "./internal/Util.js";
	import { createEventDispatcher } from "svelte";
	import type { CGPoint } from "./index.js";
	let root_ref: HTMLDivElement;
	export let style: Properties = {};
	export let contentInset: UIEdgeInsets = { top: 44, bottom: 49 };
	export let isPagingEnabled = false;
	export let showsScrollIndicator = true;
	export function scrollToTop() {
		root_ref.scrollTop = 0;
	}
	export function scrollToBottom() {
		root_ref.scrollTop = root_ref.scrollHeight;
	}
	export let contentOffset: CGPoint = { x: 0, y: 0 };
	$: if (root_ref) {
		root_ref.scrollLeft = contentOffset.x;
		root_ref.scrollTop = contentOffset.y;
	}
	const dispatch = createEventDispatcher();
</script>

<div
	class="UIScrollView"
	bind:this={root_ref}
	on:scroll
	class:noScrollIndicator={showsScrollIndicator == false}
	class:isPagingEnabled
	style={styleToString(style)}
>
	<div
		style="padding-top: {contentInset.top}px; padding-bottom: calc({contentInset.bottom}px + env(safe-area-inset-bottom));"
	>
		<slot />
	</div>
</div>

<style>
	.UIScrollView {
		position: relative;
		height: 100%;
		overflow: scroll;
		/* overscroll-behavior: none; */
	}
	.isPagingEnabled {
		scroll-snap-type: both mandatory;
	}
	.noScrollIndicator::-webkit-scrollbar {
		display: none;
		-webkit-appearance: none;
	}
</style>
