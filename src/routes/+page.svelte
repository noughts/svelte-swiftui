<script lang="ts">
    import { UINavigationController } from "$lib/UINavigationController.js";
    import { UISceneController } from "$lib/UISceneController.js";
    import { UITabBarController } from "$lib/UITabBarController.js";
    import { UIView } from "$lib/UIView.js";
    import { UIViewController } from "$lib/UIViewController.js";
    import View from "$lib/View.svelte";
    import "../globals.css";
    import HomeNav from "./HomeNav.svelte";
    import LandmarkList from "./LandmarkList.svelte";
    import Page1 from "./Page1.svelte";

    const sceneController = new UISceneController(
        new UITabBarController([
            new UINavigationController(new UIViewController(new UIView(LandmarkList)), new UIView(HomeNav)),
            new UIViewController(new UIView(Page1), { tabBarItem: { title: "Demo", icon: "home" } }),
        ])
    );
   
</script>

<div class="root">
    <View viewController={sceneController} />
</div>

<style>
    .root {
        max-width: 480px;
        height: 100dvh;
        margin-left: auto;
        margin-right: auto;
    }
</style>
