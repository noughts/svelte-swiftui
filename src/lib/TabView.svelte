<script lang="ts">
	import UiTabBar from "$lib/UITabBar.svelte";
	export let selection = 0;
	console.log($$slots);
</script>

<div class="root">
	<div class="content">
		{#if selection == 0}
			<slot name="0" />
		{:else if selection == 1}
			<slot name="1" />
		{/if}
	</div>
	<UiTabBar />
</div>

<style>
	.root {
		width: 375px;
		height: 667px;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex-grow: 2;
	}
</style>
