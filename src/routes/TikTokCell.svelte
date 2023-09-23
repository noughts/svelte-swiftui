<script lang="ts">
	export let color: string;
</script>

<div
	class="root"
	style="background-color: {color};">
	{color}
</div>

<style>
	.root {
		flex-shrink: 0;
		width: 100%;
		scroll-snap-align: start;
		scroll-snap-stop: always;
		height: calc(100dvh - 49px - env(safe-area-inset-bottom));
	}
</style>
