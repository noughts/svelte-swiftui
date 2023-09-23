<script lang="ts" context="module">
	export type UIEdgeInsets = {
		top: number;
		bottom: number;
	};
</script>

<script lang="ts">
	export let contentInset: UIEdgeInsets = { top: 44, bottom: 49 };
	export let snap = false;
</script>

<div class="UIScrollView" class:snap>
	<div class="inner"
		style="padding-top: {contentInset.top}px; padding-bottom: calc({contentInset.bottom}px + env(safe-area-inset-bottom));"
	>
		<slot />
	</div>
</div>

<style>
	.UIScrollView {
		height: 100%;
		overflow-y: scroll;
	}
	.inner{
		height: 100%;
	}
	.snap {
		scroll-snap-type: y mandatory;
	}
</style>
