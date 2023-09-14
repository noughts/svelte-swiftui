<script lang="ts">
    import NavigationView from "$lib/NavigationView.svelte";
    import Scene from "$lib/Scene.svelte";
    import TabView from "$lib/TabView.svelte";
    import { UIViewController } from "$lib/UIViewController.js";
    import { createSceneItem } from "$lib/index.js";
    import "../globals.css";
    import DemoScreen from "./DemoScreen.svelte";

    const sceneRootItem = createSceneItem({
        component: TabView,
        props: {
            items: [
                {
                    component: NavigationView,
                    props: {
                        rootItem: {
                            component: DemoScreen,
                            props: {},
                            tabBarItem: {
                                title: "ホーム",
                                icon: "home",
                            },
                            navigationItem: {
                                title: "ホーム",
                            },
                        },
                    },
                    tabBarItem: {
                        title: "ホーム",
                        icon: "home",
                    },
                    navigationItem: {
                        title: "ホーム",
                    },
                },
                // createTabBarItem({
                //     component: MainNav,
                //     props: {},
                //     title: "ホーム",
                //     icon: "home",
                // }),
                // createTabBarItem({ title: "天気", icon: "partly_cloudy_day", component: Page1, props: {} }),
                // createTabBarItem({
                //     title: "クーポン",
                //     icon: "confirmation_number",
                //     component: Page1,
                //     props: {},
                // }),
                // createTabBarItem({ title: "検索", icon: "search", component: Page1, props: {} }),
                // createTabBarItem({ title: "プロフィール", icon: "account_circle", component: Page1, props: {} }),
            ],
        },
    });
   
    const demo_vc = new UIViewController(DemoScreen, { title: "hoge" });
    const nc = new UIViewController(NavigationView, {rootItem:demo_vc});
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
