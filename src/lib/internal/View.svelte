<script lang="ts">
    import type { UIView } from "$lib/UIView.js";
    import type { UIViewController } from "$lib/UIViewController.js";

	export let viewController:UIViewController;
</script>

<svelte:component this={viewController.view.component} {...viewController.view.props} {viewController} />