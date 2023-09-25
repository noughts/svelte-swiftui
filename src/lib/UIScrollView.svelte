<script lang="ts" context="module">
	export type UIEdgeInsets = {
		top: number;
		bottom: number;
	};
</script>

<script lang="ts">
	import type { Properties } from "csstype";
	import { styleToString } from "./internal/Util.js";
	let root_ref: HTMLDivElement;
	export let style: Properties = {};
	export let contentInset: UIEdgeInsets = { top: 44, bottom: 49 };
	export let isPagingEnabled = false;
	export let showsScrollIndicator = true;
	export function scrollToTop(){
		root_ref.scrollTop = 0;
	}
	export function scrollToBottom(){
		root_ref.scrollTop = root_ref.scrollHeight;
	}
</script>

<div
	class="UIScrollView"
	bind:this={root_ref}
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
		overflow-y: scroll;
	}
	.isPagingEnabled {
		scroll-snap-type: y mandatory;
	}
	.noScrollIndicator::-webkit-scrollbar {
		display: none;
		-webkit-appearance: none;
	}
</style>
