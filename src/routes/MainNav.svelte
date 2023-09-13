<script lang="ts">
	import NavigationView from "$lib/NavigationView.svelte";
	import { createNaivationItem } from "$lib/index.js";
    import type LandmarkDetail from "./LandmarkDetail.svelte";
	import LandmarkList from "./LandmarkList.svelte";

	let nav: NavigationView;

	function onFabTap() {
		const hoge = nav.getTopComponent() as LandmarkDetail;
		// console.log(hoge.getRnd())
		console.log(hoge)
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
