<script lang="ts">
    import { UINavigationController } from "$lib/UINavigationController.js";
    import { UISceneController } from "$lib/UISceneController.js";
    import { UITabBarController } from "$lib/UITabBarController.js";
    import { UIViewController } from "$lib/UIViewController.js";
    import "../globals.css";
    import HomeNav from "./HomeNav.svelte";
    import LandmarkList from "./LandmarkList.svelte";
    import Page1 from "./Page1.svelte";

    const sceneController = new UISceneController(
        new UITabBarController([
            new UINavigationController(new UIViewController(LandmarkList, {}), HomeNav),
            new UIViewController(Page1, {}, { tabBarItem: { title: "Demo", icon: "home" } }),
        ])
    );
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
