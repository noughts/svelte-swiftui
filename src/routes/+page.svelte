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
    import ShortContentScreen from "./ShortContentScreen.svelte";
    import TikTokScreen from "./TikTokScreen.svelte";
</script>

<div class="root">
    <View
        viewController={new UISceneController(
            new UITabBarController([
                new UINavigationController(new UIViewController(new UIView(LandmarkList)), null, {
                    tabBarItem: { title: "よく使う項目", icon: { name: "star", fill:true } },
                }),
                new UINavigationController(new UIViewController(new UIView(ShortContentScreen)), null, {
                    tabBarItem: { title: "履歴", icon: { name: "schedule", fill:true } },
                }),
                new UIViewController(new UIView(TikTokScreen), {
                    tabBarItem: { title: "TikTok", icon: { name: "star", fill:true } },
                }),
                new UINavigationController(
                    new UIViewController(new UIView(LandmarkList), { hidesNavigationBarWhenPushed: true }),
                    new UIView(HomeNav),
                    {
                        tabBarItem: { title: "wo/NavBar", icon: { name: "home" } },
                    }
                ),
                new UIViewController(new UIView(Page1), { tabBarItem: { title: "Demo", icon: { name: "star" } } }),
            ])
        )}
    />
</div>

<style>
    .root {
        max-width: 480px;
        height: 100dvh;
        margin-left: auto;
        margin-right: auto;
    }
</style>
