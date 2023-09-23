<script lang="ts">
	import "../../globals.css";
	let vvHeight = 0;
	let innerHeight = 0;
	setInterval(() => {
		if (window.visualViewport) {
			vvHeight = window.visualViewport.height;
		}
		innerHeight = window.innerHeight;
	}, 100);
</script>

<div class="root">
	<div>window.visualViewport.height: {vvHeight}</div>
	<div>window.innerHeihgt: {innerHeight}</div>
	<input />
</div>

<style>
	.root {
		max-width: 480px;
		height: 100dvh;
		overflow: hidden;
		margin-left: auto;
		margin-right: auto;
	}
</style>
