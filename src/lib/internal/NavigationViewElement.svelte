<script lang="ts">
	import type { UIViewController } from "$lib/UIViewController.js";
	import ViewControllerRenderer from "$lib/ViewControllerRenderer.svelte";
	import { ScrollView, type CGPoint } from "$lib/index.js";
	import { onMount } from "svelte";
	import UiNavigationBar from "./UINavigationBar.svelte";

	export let viewController: UIViewController;
	export let isRoot: boolean = false;
	export function getScrollView(){
		return scrollView;
	}

	let scrollView: ScrollView;
	let isUserInteractionEnabled: boolean = true;


	function onScroll(e: CustomEvent<CGPoint>) {
		viewController.view.containerScrollLeft.set(e.detail.x);
	}
	async function willEndDragging(e: CustomEvent<CGPoint>) {
		isUserInteractionEnabled = false;
		return;
		const velocity = e.detail;

		if (velocity.x > 5) {
			await scrollView.scrollTo({ left: 0, behavior: "smooth" });
			viewController.navigationController?.pop(false);
		} else {
			await scrollView.scrollTo({ left: 390, behavior: "smooth" });
			scrollView.isUserInteractionEnabled = true;
		}
	}

	function back() {
		viewController.navigationController?.pop();
	}
</script>

<div
	class="NavigationViewElement"
	style:pointer-events={isUserInteractionEnabled ? "unset" : "none"}
	class:navBarHidden={viewController.hidesNavigationBarWhenPushed}
>
	<ScrollView
		bind:this={scrollView}
		bounces={false}
		isPagingEnabled={true}
		contentInset={{ top: 0, bottom: 0 }}
		showsScrollIndicator={false}
		on:willEndDragging={willEndDragging}
		on:didScroll={onScroll}
		scrollDirection="horizontal"
	>
		<div class="contents" class:isRoot>
			{#if isRoot == false}
				<div class="page spacer" />
			{/if}
			<div class="page viewContainer" class:isRoot>
				{#if !viewController.hidesNavigationBarWhenPushed}
					<UiNavigationBar item={viewController.navigationItem} on:backButtonTap={back} />
				{/if}
				<ViewControllerRenderer {viewController} />
			</div>
		</div>
	</ScrollView>
</div>

<style>
	.NavigationViewElement {
		position: absolute;
		inset: 0;
		background-color: rgba(255 0 0/10%);
	}
	.contents {
		display: flex;
		width: 200%;
		height: 100%;
	}
	.contents.isRoot {
		width: 100%;
	}
	.page {
		position:relative;
		width: 100%;
		height: 100%;
		scroll-snap-align: center;
		scroll-snap-stop: normal;
	}
	.viewContainer {
		height: 100%;
	}
	.viewContainer.isRoot {
		width: 100%;
	}
	.spacer {
		width: 100%;
		height: 100%;
	}
	.navBarHidden {
		top: 0;
	}
</style>
