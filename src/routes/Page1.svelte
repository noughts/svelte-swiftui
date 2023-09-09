<script lang="ts">
    import { getContext } from "svelte";

	const sceneContext = getContext("Scene") as any;
	function onPresentButtonTap() {
		sceneContext.push()
	}
</script>

<div>
	<h1>Page1</h1>
	<button on:click={onPresentButtonTap}>present</button>
</div>
