<script lang="ts">
	import { setContext } from "svelte";
    import Page1 from "../routes/Page1.svelte";
    import Page2 from "../routes/Page2.svelte";

	type Hoge = {
		klass:any;
		args:any;
	}
	const stack = [];

	setContext("Scene", {
		push,
		pop,
	});

	function push(val:Hoge) {
		console.log("push")
	}
	function pop() {}
</script>

<div>
	<slot />
	<svelte:component this={Page2} />
</div>
