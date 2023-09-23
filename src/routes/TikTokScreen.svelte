<script lang="ts">
	import { UIScrollView } from "$lib/index.js";
	import TikTokCell from "./TikTokCell.svelte";

	const colors: string[] = ["red", "blue", "green", "yellow", "purple"];
</script>

<div class="root">
	<UIScrollView snap={true}>
		<div class="cells">
			{#each colors as color}
				<TikTokCell {color} />
			{/each}
		</div>
	</UIScrollView>
</div>

<style>
	.root {
		height: 100%;
		background-color: white;
	}
	.cells{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
