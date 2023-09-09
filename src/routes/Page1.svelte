<script lang="ts">
    import { getContext } from "svelte";
    import Page2 from "./Page2.svelte";

	const sceneContext = getContext("Scene") as any;
	function onPresentButtonTap() {
		sceneContext.push({component:Page2})
	}
</script>

<div>
	<h1>Page1</h1>
	<button on:click={onPresentButtonTap}>present</button>
</div>
