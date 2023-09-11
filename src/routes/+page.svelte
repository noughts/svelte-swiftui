<script lang="ts">
    import Scene from "$lib/Scene.svelte";
    import TabView from "$lib/TabView.svelte";
    import type { DefaultProps, SceneItem, UITabBarItem } from "$lib/index.js";
    import "../globals.css";
    import LandmarkList from "./LandmarkList.svelte";
    import Page1 from "./Page1.svelte";

    const hoge:UITabBarItem = {title:"hoge", icon:"", node:{component:LandmarkList,props:{}}}
</script>

<div class="root">
    <Scene
        tintColor="blue"
        rootItem={{
            node: {
                component: TabView,
                props: {
                    items: [
                        { title: "ホーム", icon: "home", node: { component: LandmarkList } },
                        { title: "天気", icon: "partly_cloudy_day", node: { component: Page1 } },
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
