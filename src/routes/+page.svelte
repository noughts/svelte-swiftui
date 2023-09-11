<script lang="ts">
    import NavigationView from "$lib/NavigationView.svelte";
    import Scene from "$lib/Scene.svelte";
    import TabView from "$lib/TabView.svelte";
    import { createNaivationItem, createSceneItem, createTabBarItem } from "$lib/index.js";
    import "../globals.css";
    import LandmarkList from "./LandmarkList.svelte";
    import Page1 from "./Page1.svelte";

    const sceneRootItem = createSceneItem({
        component: TabView,
        props: {
            items: [
                createTabBarItem({
                    component: NavigationView,
                    props: {
                        rootItem: createNaivationItem({
                            title: "ホーム",
                            component: LandmarkList,
                            props: {},
                        }),
                    },
                    title: "ホーム",
                    icon: "home",
                }),
                createTabBarItem({ title: "天気", icon: "partly_cloudy_day", component: Page1, props: {} }),
                createTabBarItem({
                    title: "クーポン",
                    icon: "confirmation_number",
                    component: LandmarkList,
                    props: {},
                }),
                createTabBarItem({ title: "検索", icon: "search", component: Page1, props: {} }),
                createTabBarItem({ title: "プロフィール", icon: "account_circle", component: Page1, props: {} }),
            ],
        },
    });
</script>

<div class="root">
    <Scene tintColor="blue" rootItem={sceneRootItem} />
</div>

<style>
    .root {
        max-width: 480px;
        height: 100dvh;
        margin-left: auto;
        margin-right: auto;
    }
</style>
