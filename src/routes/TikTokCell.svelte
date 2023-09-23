<script lang="ts">
	export let color:string;
</script>

<div class="root" style="background-color: {color};">{color}</div>

<style>
	.root{
		flex-shrink: 0;
		height: 100%;
		width: 100%;
		scroll-snap-align: center;
		scroll-snap-stop: always;
	}
</style>