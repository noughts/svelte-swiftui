<script lang="ts">
    import { UINavigationController } from "$lib/UINavigationController.js";
    import { UISceneController } from "$lib/UISceneController.js";
    import { UITabBarController } from "$lib/UITabBarController.js";
    import { UIViewController } from "$lib/UIViewController.js";
    import "../globals.css";
    import LandmarkList from "./LandmarkList.svelte";
    import Page1 from "./Page1.svelte";

    const landmarlList_vc = new UIViewController(LandmarkList, {});
    const nc = new UINavigationController(landmarlList_vc);
    const tbc = new UITabBarController([
        nc,
        new UIViewController(Page1, {}, { tabBarItem: { title: "Demo", icon: "home" } }),
    ]);
    const sceneController = new UISceneController(tbc);
</script>

<div class="root">
    <svelte:component this={sceneController.component} {...sceneController.props} viewController={sceneController} />
</div>

<style>
    .root {
        max-width: 480px;
        height: 100dvh;
        margin-left: auto;
        margin-right: auto;
    }
</style>
