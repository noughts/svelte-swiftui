<script lang="ts">
    import Scene from "$lib/Scene.svelte";
    import TabView from "$lib/TabView.svelte";
    import type { UITabBarItem } from "$lib/UITabBarItem.js";
    import Page1 from "./Page1.svelte";
    import Page2 from "./Page2.svelte";
    import "./globals.css";

    const items: UITabBarItem[] = [
        { title: "ホーム", icon: "home" },
        { title: "天気", icon: "partly_cloudy_day" },
        { title: "クーポン", icon: "confirmation_number" },
        { title: "検索", icon: "search" },
        { title: "プロフィール", icon: "account_circle" },
    ];
</script>

<div class="root">
    <Scene>
        <TabView {items} selection={0}>
            <Page1 slot="0" />
            <Page2 slot="1" />
        </TabView>
    </Scene>
</div>

<style>
    .root {
        background-color: #ddd;
    }
</style>
