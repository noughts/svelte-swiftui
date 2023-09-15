<script lang="ts">
    import type { UIViewController } from "$lib/UIViewController.js";
	export let viewController:UIViewController;
</script>

<svelte:component this={viewController.view.component} {...viewController.view.props} {viewController} />