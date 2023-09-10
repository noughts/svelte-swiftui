<script lang="ts">
	import { SvelteComponent, setContext } from "svelte";
	import type { SceneContext, SceneItem, SvelteUIComponent } from "./index.js";
	import { fly } from "svelte/transition";

	export let tintColor = "blue";
	export let dark: boolean = false;
	export let rootItem: SceneItem;

	setContext<SceneContext>("scene", { push, pop, dark, tintColor });

	let items: SceneItem[] = [rootItem];
	function push(component:SvelteUIComponent, props:any) {
		items = items.concat(item);
	}
	function pop() {
		const newAry = [...items];
		newAry.pop();
		items = newAry;
	}
</script>

<svelte:head>
	<meta
		name="viewport"
		content="viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>

<div class="root">
	{#each items as item}
		<div class="item" transition:fly={{ y: "100%", opacity: 1 }}>
			<svelte:component this={item.component.class} {...item.component.args} />
		</div>
	{/each}
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: white;
		position: relative;
	}
	.item {
		position: absolute;
		inset: 0;
	}
</style>
