<script lang="ts">
	import { UISceneController, ViewControllerRenderer, type UIViewController } from "./index.js";

	export let viewController: UIViewController;
	const scene_vc = new UISceneController(viewController);
</script>

<div class="root">
	<ViewControllerRenderer viewController={scene_vc} />
</div>

<style>
	.root {
		max-width: 480px;
		height: 100dvh;
		margin-left: auto;
		margin-right: auto;
	}
</style>
