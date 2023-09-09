<script lang="ts">
	import { setContext } from "svelte";
	import type { SceneItem } from "./index.js";

	let items: SceneItem[] = [];

	setContext("Scene", { push, pop });

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

<div class="root">
	<slot />
	{#each items as item}
		<div class="item">
			<svelte:component this={item.component} {...item.args} />
		</div>
	{/each}
</div>

<style>
	.root{
		position: relative;
	}
	.item{
		position: absolute;
		inset:0;
	}
</style>