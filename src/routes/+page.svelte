<script lang="ts">
    import Scene from "$lib/Scene.svelte";
    import { UINavigationController } from "$lib/UINavigationController.js";
    import { UIViewController } from "$lib/UIViewController.js";
    import "../globals.css";
    import DemoScreen from "./DemoScreen.svelte";
   
    const demo_vc = new UIViewController(DemoScreen, { title: "hoge" });
    const nc = new UINavigationController(demo_vc);
</script>

<div class="root">
    <Scene tintColor="#ff00cc" theme="light" rootViewController={nc} />
</div>

<style>
    .root {
        max-width: 480px;
        height: 100dvh;
        margin-left: auto;
        margin-right: auto;
    }
</style>
