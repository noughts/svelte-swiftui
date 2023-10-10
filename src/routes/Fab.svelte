<script lang="ts">
    import { UIView } from "$lib/UIView.js";
    import { UIViewController } from "$lib/UIViewController.js";
    import DemoScreen from "./DemoScreen.svelte";

    export let viewController: UIViewController;

    function onFabClick() {
        viewController.present(new UIViewController(new UIView(DemoScreen), {}));
    }
</script>

<button class="fab" on:click={onFabClick}>FAB</button>

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
