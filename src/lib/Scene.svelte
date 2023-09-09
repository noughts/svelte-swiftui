<script lang="ts">
	import { setContext } from "svelte";
	import type { SceneItem } from "./index.js";

	let items: SceneItem[] = [];

	setContext("Scene", { push, pop });

	function push(item: SceneItem) {
		items = items.concat(item);
	}
	function pop() {
		items = items.slice();
	}
</script>

<div>
	<slot />
	{#each items as item}
		<svelte:component this={item.component} {...item.args} />
	{/each}
</div>
