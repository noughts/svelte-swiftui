<script lang="ts">
	import { setContext } from "svelte";
	import type { SceneItem } from "./index.js";
	setContext("Scene", { push, pop });

	let items: SceneItem[] = [];
	function push(item: SceneItem) {
		items = items.concat(item);
	}
	function pop() {
		const newAry = [...items];
		newAry.pop();
		items = newAry;
		console.log("pop", items);
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>

<div class="root">
	<slot />
	{#each items as item}
		<div class="item">
			<svelte:component this={item.component} {...item.args} />
		</div>
	{/each}
</div>

<style>
	.root {
		position: relative;
	}
	.item {
		position: absolute;
		inset: 0;
	}
</style>
