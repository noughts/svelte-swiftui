<script lang="ts">
	import { setContext } from "svelte";
	import type { SceneItem } from "./index.js";
	import { fly } from "svelte/transition";
	setContext("Navigation", { push, pop });

	let items: SceneItem[] = [];
	function push(item: SceneItem) {
		items = items.concat(item);
	}
	function pop() {
		const newAry = [...items];
		newAry.pop();
		items = newAry;
	}
</script>


<div class="root">
	<slot />
	{#each items as item}
		<div class="item" transition:fly={{ x: "100%", opacity: 1 }}>
			<svelte:component this={item.component} {...item.args} />
		</div>
	{/each}
</div>

<style>
	.root {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.item {
		position: absolute;
		inset: 0;
	}
</style>
