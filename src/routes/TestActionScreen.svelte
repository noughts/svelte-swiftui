<script lang="ts">
    import type { UIViewController } from "$lib/index.js";

	let val = 0;
	export let viewController:UIViewController;

	function testAction(node: HTMLDivElement, prop: number) {
		return {
			update(newProp: number) {
				node.style.transform = `translateX(${newProp*100}px)`;
			},
			destroy() {},
		};
	}
</script>

<div class="root">
	<div>{val}</div>
	<input type="range" min={0} max={1} step="0.01" bind:value={val} />
	<div use:testAction={val} class="box" />
</div>

<style>
	.root {
		height: 100%;
		background-color: var(--bg-color);
	}
	.box {
		width: 100px;
		height: 100px;
		background-color: green;
	}
</style>
