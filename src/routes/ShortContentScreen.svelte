<script lang="ts">
	import UIScrollView from "$lib/UIScrollView.svelte";
    import type { UIViewController } from "$lib/index.js";
	export let viewController:UIViewController;
</script>

<div class="ShortContentScreen">
	<img class="bg" src="/cofee.jpg" alt="" />
	<UIScrollView style={{ backgroundColor: "rgba(0 0 0/80%)" }}>
		<div class="content">hoge</div>
	</UIScrollView>
</div>

<style>
	.ShortContentScreen {
		background-color: gray;
		height: 100%;
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	.content {
		color: white;
	}
	.bg {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
