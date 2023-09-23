<script lang="ts">
	import type { UITabBarController } from "$lib/UITabBarController.js";
	import View from "../View.svelte";
	import UiTabBar from "./UITabBar.svelte";
	export let viewController: UITabBarController;
	export let selection = 0;
	const viewControllers = viewController.viewControllers;
</script>

<div class="TabView">
	<div class="views">
		{#each viewControllers as vc, index (vc.tabBarItem?.title)}
			<div class="view" class:selected={index === selection}>
				<View viewController={vc} />
			</div>
		{/each}
	</div>

	<UiTabBar
		items={viewControllers.map((x) => {
			return x.tabBarItem;
		})}
		bind:selection
		on:didSelect={(e) => viewController.dispatchEvent(e)}
	/>
</div>

<style>
	.TabView {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.views {
		flex-grow: 2;
		position: relative;
		background-color: red;
	}
	.view {
		position: absolute;
		inset: 0;
		opacity: 0;
		pointer-events: none;
		padding-bottom: 49px;
	}
	.selected {
		opacity: 1;
		pointer-events: auto;
	}
</style>
