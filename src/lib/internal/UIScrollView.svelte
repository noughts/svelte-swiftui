<script lang="ts" context="module">
	export type UIEdgeInsets = {
		top: number;
		bottom: number;
	};
</script>

<script lang="ts">
	export let contentInset: UIEdgeInsets = { top: 0, bottom: 0 };
</script>

<div class="UIScrollView">
	<div style="padding-top: {contentInset.top}px; padding-bottom: {contentInset.bottom}px;">
		<slot />
	</div>
</div>

<style>
	.UIScrollView{
		height: 100%;
		overflow-y: scroll;	
	}
</style>
