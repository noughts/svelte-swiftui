<script lang="ts">
	import type { Properties } from 'csstype';
	import { styleToString } from '../utils/SvelteUtil';
	export let style: Properties = {};
	export let spacing = 0;
	style.gap = spacing + 'px';
</script>

<div class="VStack" style={styleToString(style)}>
	<slot />
</div>

<style>
	.VStack {
		display: flex;
		flex-direction: column;
	}
</style>
