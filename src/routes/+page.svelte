<script lang="ts">
    import NavigationView from "$lib/NavigationView.svelte";
    import Scene from "$lib/Scene.svelte";
    import TabView from "$lib/TabView.svelte";
    import type { UITabBarItem } from "$lib/index.js";
    import "../globals.css";
    import LandmarkList from "./LandmarkList.svelte";
    import Page2 from "./Page2.svelte";

    const items: UITabBarItem[] = [
        { title: "ホーム", icon: "home" },
        { title: "天気", icon: "partly_cloudy_day" },
        { title: "クーポン", icon: "confirmation_number" },
        { title: "検索", icon: "search" },
        { title: "プロフィール", icon: "account_circle" },
    ];
</script>

<div class="root">
    <Scene tintColor="red" >
        <TabView {items} selection={0}>
            <NavigationView slot="0">
                <LandmarkList />
            </NavigationView>
            <Page2 slot="1" />
        </TabView>
    </Scene>
</div>

<style>
    .root {
        background-color: #eee;
        width: 100%;
		height: 100dvh;
        margin-left: auto;
        margin-right: auto;
    }
</style>
