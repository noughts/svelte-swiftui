<script lang="ts">
	import type { NavigationItem } from "$lib/index.js";

	export let items: NavigationItem[];
	$: topItem = items[items.length - 1];
</script>

<div class="root">
	<div class="title">{topItem.title}</div>
</div>

<style>
	.root{
		position: relative;
		height: 44px;
		flex-shrink: 0;
		background-color: white;
		border-bottom: solid 0.1px rgba(0 0 0/15%);
	}
	.title{
		font-size: 16px;
		font-weight: 600;
		position: absolute;
		inset: 0;
		display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
	}
</style>
