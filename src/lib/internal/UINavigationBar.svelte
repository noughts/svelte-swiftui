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
		
	}
	.title{
		font-size: 16px;
		font-weight: 600;
	}
</style>
