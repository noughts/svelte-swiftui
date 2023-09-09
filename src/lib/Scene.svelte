<script lang="ts">
	import { setContext } from "svelte";
	import Page1 from "../routes/Page1.svelte";
	import Page2 from "../routes/Page2.svelte";
	import type { SceneItem } from "./index.js";

	let items: SceneItem[] = [];

	setContext("Scene", {
		push,
		pop,
	});

	function push(item: SceneItem) {
		items = items.concat(item);
	}
	function pop() {}
</script>

<div>
	<slot />
	{#each items as item}
		<svelte:component this={item.component} />
	{/each}
</div>
