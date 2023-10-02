<script lang="ts">
	import NavigationBarItemView from "./NavigationBarItemView.svelte";
	import type { UINavigationItem } from "./UINavigationItem.js";
	export let items:UINavigationItem[];
</script>

<div class="UINavigationBar uiChrome">
	{#each items as item, index}
		<div class="item">
			<NavigationBarItemView {item} showBackButton={index >= 1} on:backButtonTap />
		</div>
	{/each}
</div>

<style>
	.UINavigationBar {
		position: absolute;
		left:0;
		top:0px;
		right:0;
		height: 44px;
		flex-shrink: 0;
		border-bottom: solid 0.1px var(--ui-separator);
	}
	.item {
		position: absolute;
		inset: 0;
	}
</style>
