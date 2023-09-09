<script lang="ts">
    import MaterialSymbol from "./MaterialSymbol.svelte";

	export let icon: string;
	export let name: string;
	export let selected: boolean = false;
	const color = selected ? "blue" : "gray";
</script>

<div class="root" style:color="{color}">
	<MaterialSymbol {icon} />
	<div class="name">{name}</div>
</div>

<style>
	.root {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.name {
		font-size: 11px;
		font-weight: 600;
		font-feature-settings: "palt";
	}
</style>
