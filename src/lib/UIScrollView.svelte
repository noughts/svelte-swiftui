<script lang="ts" context="module">
	export type UIEdgeInsets = {
		top: number;
		bottom: number;
	};
</script>

<script lang="ts">
	import type { Properties } from "csstype";
	import { styleToString } from "./internal/Util.js";
	export let style: Properties = {};
	export let contentInset: UIEdgeInsets = { top: 44, bottom: 49 };
	export let isPagingEnabled = false;
</script>

<div class="UIScrollView" class:isPagingEnabled style={styleToString(style)}>
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
</style>
