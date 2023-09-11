<script lang="ts">
    import NavigationView from "$lib/NavigationView.svelte";
    import Scene from "$lib/Scene.svelte";
    import TabView from "$lib/TabView.svelte";
    import { createNaivationItem, createNode, createSceneItem, createTabBarItem } from "$lib/index.js";
    import "../globals.css";
    import LandmarkList from "./LandmarkList.svelte";
    import Page1 from "./Page1.svelte";

    const item1 = createTabBarItem({
        component: NavigationView,
        props: {
            rootItem: createNaivationItem({ title: "ホーム", component: LandmarkList, props: { dummy: "hoge" } }),
        },
        title: "ホーム",
        icon: "home",
    });
</script>

<div class="root">
    <Scene
        tintColor="blue"
        rootItem={{
            node: {
                component: TabView,
                props: {
                    items: [
                        item1,
                        { title: "天気", icon: "partly_cloudy_day", component: Page1 },
                        { title: "クーポン", icon: "confirmation_number", node: { component: LandmarkList } },
                        { title: "検索", icon: "search", node: { component: Page1 } },
                        { title: "プロフィール", icon: "account_circle", node: { component: Page1 } },
                    ],
                },
            },
        }}
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
