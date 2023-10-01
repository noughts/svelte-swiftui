<script lang="ts">
	import type { UIViewController } from "$lib/index.js";
	import NavigationBarItemView from "./NavigationBarItemView.svelte";
	export let viewControllers:UIViewController[];
</script>

<div class="UINavigationBar uiChrome">
	{#each viewControllers as viewController, index}
		<div class="item">
			<NavigationBarItemView {viewController} showBackButton={index >= 1} on:backButtonTap />
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
		opacity: 0;
	}
</style>
