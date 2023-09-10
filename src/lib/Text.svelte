<script lang="ts">
	import type { Properties } from 'csstype';
    import { styleToString } from './internal/Util.js';
	export let maxLines = 0;
	export let fontSize = 15;
	export let style: Properties = {};
	if( maxLines > 0 ){
		style.display = "-webkit-box";
		style.WebkitLineClamp = maxLines;
		style.WebkitBoxOrient = "vertical";
		style.overflow = "hidden";
	}
	style.fontSize = fontSize + "px";
</script>

<div style={styleToString(style)}><slot /></div>

