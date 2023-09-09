<script lang="ts">
	import UiTabBar from "$lib/UITabBar.svelte";
</script>

<div class="root">
	<div class="content">
		<slot />
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
