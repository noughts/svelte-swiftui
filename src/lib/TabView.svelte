<script lang="ts">
	import type { UITabBarItem } from "./index.js";
    import UiTabBar from "./internal/UITabBar.svelte";
	export let selection = 0;
	export let items: UITabBarItem[];
</script>

<div class="root">
	<div class="content">
		{#each items as item, index (item.title)}
			<div class="item" class:selected={index === selection}>
				<svelte:component this={item.component.class} {...item.component.args} />
			</div>
		{/each}
	</div>
	<UiTabBar {items} bind:selection />
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
	}
	.selected{
		opacity: 1;
	}
</style>
