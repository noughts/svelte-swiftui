<script lang="ts">
	import type { Properties, Property } from "csstype";
    import { styleToString } from "./internal/Util.js";
	export let style: Properties = {};
	export let spacing: number = 0;
	export let alignItems: Property.AlignItems = "stretch";
	export let justifyContent: Property.JustifyContent = "flex-start"
	style.gap = `${spacing}px`;
	style.alignItems = alignItems;
	style.justifyContent = justifyContent;
</script>

<div class="HStack" style={styleToString(style)}>
	<slot />
</div>

<style>
	.HStack {
		display: flex;
	}
</style>
