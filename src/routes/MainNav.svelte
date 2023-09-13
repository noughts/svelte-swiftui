<script lang="ts">
	import NavigationView from "$lib/NavigationView.svelte";
	import { createNaivationItem } from "$lib/index.js";
	import LandmarkList from "./LandmarkList.svelte";

	let nav: NavigationView;

	function onFabTap() {
		console.log(nav.getTopItem())
	}
</script>

<NavigationView
	bind:this={nav}
	rootItem={createNaivationItem({
		component: LandmarkList,
		props: {},
		title: "List",
		hidesNavigationBarWhenPushed: true,
	})}
/>
<button class="fab" on:click={onFabTap}>FAB</button>

<style>
	.fab {
		position: absolute;
		left: 22px;
		bottom: 22px;
		width: 56px;
		height: 56px;
		z-index: 10;
	}
</style>
