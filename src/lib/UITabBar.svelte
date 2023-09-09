<script lang="ts">
	import UiTab from "./UITab.svelte";
</script>

<div class="root">
	<UiTab icon="home" name="ホーム" selected />
	<UiTab icon="partly_cloudy_day" name="天気" />
	<UiTab icon="confirmation_number" name="クーポン" />
	<UiTab icon="search" name="検索" />
	<UiTab icon="account_circle" name="プロフィール" />
</div>

<style>
	.root {
		height: 54px;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		border-top: solid 0.5px var(--separator);
		
	}
</style>
