<script lang="ts">
    import Scene from "$lib/Scene.svelte";
    import TabView from "$lib/TabView.svelte";
    import "../globals.css";
    import LandmarkList from "./LandmarkList.svelte";
    import Page1 from "./Page1.svelte";

</script>

<div class="root">
    <Scene tintColor="blue">
        <TabView
            items={[
                { title: "ホーム", icon: "home", component: LandmarkList },
                { title: "天気", icon: "partly_cloudy_day", component: Page1 },
                { title: "クーポン", icon: "confirmation_number", component: LandmarkList },
                { title: "検索", icon: "search", component: Page1 },
                { title: "プロフィール", icon: "account_circle", component: Page1 },
            ]}
        />
    </Scene>
</div>

<style>
    .root {
        max-width: 480px;
        height: 100dvh;
        margin-left: auto;
        margin-right: auto;
    }
</style>
