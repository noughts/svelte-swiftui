<script lang="ts">
    import { UINavigationController } from "$lib/UINavigationController.js";
    import { UITabBarController } from "$lib/UITabBarController.js";
    import { UIView } from "$lib/UIView.js";
    import { UIViewController } from "$lib/UIViewController.js";
    import { App } from "$lib/index.js";
    import "../globals.css";
    import Fab from "./Fab.svelte";
    import LandmarkList from "./LandmarkList.svelte";
    import ModalTestScreen from "./ModalTestScreen.svelte";
    import ShortContentScreen from "./ShortContentScreen.svelte";
    import TikTokScreen from "./TikTokScreen.svelte";
</script>

<App
    viewController={new UITabBarController([
        new UINavigationController(
            new UIViewController(new UIView(LandmarkList), {
                hidesNavigationBarWhenPushed: true,
            }),
            new UIView(Fab),
            {
                tabBarItem: { title: "wo/NavBar", icon: { name: "home" } },
            }
        ),
        new UINavigationController(new UIViewController(new UIView(LandmarkList)), null, {
            tabBarItem: {
                title: "よく使う項目",
                icon: { name: "partly_cloudy_day", fill: false },
            },
        }),
        new UIViewController(new UIView(ModalTestScreen), {
            tabBarItem: { title: "Modal", icon: { name: "star", weight: 400 } },
        }),

        new UINavigationController(new UIViewController(new UIView(ShortContentScreen)), null, {
            tabBarItem: { title: "履歴", icon: { name: "search", fill: true } },
        }),
        new UIViewController(new UIView(TikTokScreen), {
            tabBarItem: { title: "TikTok", icon: { name: "star", fill: true } },
        }),
    ])}
/>
