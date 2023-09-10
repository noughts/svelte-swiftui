<script lang="ts">
	import type { UINavigationItem } from "$lib/index.js";

	export let items: UINavigationItem[];
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
