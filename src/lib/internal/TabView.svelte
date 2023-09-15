<script lang="ts">
	import type { UIViewController } from "../UIViewController.js";
	import UiTabBar from "./UITabBar.svelte";
	import View from "./View.svelte";
	export let viewController: UIViewController;
	export let selection = 0;
	export let viewControllers: UIViewController[];
</script>

<div class="root">
	<div class="content">
		{#each viewControllers as viewController, index (viewController.tabBarItem?.title)}
			<div class="item" class:selected={index === selection}>
				<View {viewController} />
			</div>
		{/each}
	</div>
	<UiTabBar
		items={viewControllers.map((x) => {
			return x.tabBarItem;
		})}
		bind:selection
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
