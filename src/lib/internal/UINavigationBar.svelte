<script lang="ts">
	import NavigationBarItemView from "./NavigationBarItemView.svelte";
	import type { UINavigationItem } from "./UINavigationItem.js";
	export let item: UINavigationItem;
	export let showBackButton = false;
</script>

<div class="UINavigationBar uiChrome">
	<div class="item">
		<NavigationBarItemView {item} {showBackButton} on:backButtonTap />
	</div>
</div>

<style>
	.UINavigationBar {
		position: absolute;
		left: 0;
		top: 0px;
		right: 0;
		height: 44px;
		flex-shrink: 0;
		z-index:5;
		border-bottom: solid 0.1px var(--ui-separator);
	}
	.item {
		position: absolute;
		inset: 0;
	}
</style>
