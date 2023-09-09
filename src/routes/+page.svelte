<script lang="ts">
    import TabView from "$lib/TabView.svelte";
    import Page1 from "./Page1.svelte";
    import Page2 from "./Page2.svelte";
</script>

<TabView selection={0}>
    <Page1 slot="0" />
    <Page2 slot="1" />
</TabView>
