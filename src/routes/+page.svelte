<script lang="ts">
	import UiTabBar from "$lib/UITabBar.svelte";
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0" />
</svelte:head>

<div class="root">
	<div class="content">content</div>
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
