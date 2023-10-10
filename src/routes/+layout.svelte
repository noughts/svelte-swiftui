<script lang="ts">
	function onFrame() {
		dispatchEvent(new Event("onEnterFrame"));
		requestAnimationFrame(onFrame);
	}

	// 関数の初回呼び出し
	requestAnimationFrame(onFrame);
</script>

<slot />