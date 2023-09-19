<script lang="ts">
	import type { UITabBarController } from "$lib/UITabBarController.js";
	import View from "../View.svelte";
	import UiTabBar from "./UITabBar.svelte";
	export let viewController: UITabBarController;
	export let selection = 0;
	const viewControllers = viewController.viewControllers;
</script>

<div class="root">
	<div class="content">
		{#each viewControllers as vc, index (vc.tabBarItem?.title)}
			<div class="item" class:selected={index === selection}>
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
	.root {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex-grow: 2;
		overflow: hidden;
		position: relative;
	}
	.item {
		position: absolute;
		inset: 0;
		opacity: 0;
		pointer-events: none;
	}
	.selected {
		opacity: 1;
		pointer-events: auto;
	}
</style>
