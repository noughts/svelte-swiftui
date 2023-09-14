<script lang="ts">
	import { getContext, onMount, setContext } from "svelte";
	import { fly } from "svelte/transition";
	import type { SceneContext, SceneItem } from "./index.js";
	import "./svelte-swiftui.css";

	export let tintColor = "blue";
	export let theme: "light" | "dark" | "system" = "system";
	export let rootItem: SceneItem;

	setContext<SceneContext>("scene", { push, pop, dark: theme == "dark", tintColor });


	let items: SceneItem[] = [rootItem];
	function push(item: SceneItem) {
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

<div class="SvelteScene" >
	{#each items as item, index}
		<div class="item" class:top={index == items.length - 1} transition:fly={{ y: "100%", opacity: 1 }}>
			<svelte:component this={item.component} {...item.props} />
		</div>
	{/each}
</div>

<style>
	.SvelteScene {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: white;
		position: relative;
	}
	.item {
		position: absolute;
		inset: 0;
		transition: filter 0.3s;
		filter: brightness(80%);
	}
	.top {
		filter: brightness(100%);
	}
</style>
