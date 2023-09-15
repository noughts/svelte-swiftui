<script lang="ts">
	import type { UINavigationController } from "$lib/UINavigationController.js";
	import NavigationView from "$lib/internal/NavigationView.svelte";

	export let viewController: UINavigationController;
</script>

<NavigationView {viewController}>
	<button class="fab">FAB</button>
</NavigationView>

<style>
	.fab {
		position: absolute;
		width: 88px;
		height: 88px;
		left: 22px;
		bottom: 22px;
		z-index: 100;
	}
</style>
