<svelte:options accessors />

<script lang="ts">
	import type { Properties } from "csstype";
	import { sleep, styleToString, waitForNextFrame } from "./internal/Util.js";
	import { createEventDispatcher, onMount, tick } from "svelte";
	import { calculateDistance, type CGPoint, type UIEdgeInsets } from "./index.js";
	let root_ref: HTMLDivElement;
	export let style: Properties = {};
	export let contentInset: UIEdgeInsets = { top: 44, bottom: 49 };
	export let isPagingEnabled = false;
	export let showsScrollIndicator = true;
	export let bounces = true;
	export let scrollDirection: "vertical" | "horizontal" = "vertical";
	export function scrollToTop() {
		root_ref.scrollTop = 0;
	}
	let isDragging = false;
	let _scrollingByScrollTo = false;
	export async function scrollTo(options: ScrollToOptions) {
		root_ref.scrollTo(options);
		if (options.behavior != "smooth") {
			return;
		}
		_scrollingByScrollTo = true;
		while (true) {
			await waitForNextFrame();
			if (velocity.x == 0 && velocity.y == 0) {
				break;
			}
		}
		console.log("完了");
		_scrollingByScrollTo = false;
	}
	export function scrollToBottom(animated: boolean = true) {
		if (animated) {
			scrollTo({ top: root_ref.scrollHeight, behavior: "smooth" });
		} else {
			root_ref.scrollTop = root_ref.scrollHeight;
		}
	}

	export function setContentOffset(offset: CGPoint) {
		root_ref.scrollLeft = offset.x;
		root_ref.scrollTop = offset.y;
	}
	export function getContentOffset(): CGPoint {
		return { x: root_ref.scrollLeft, y: root_ref.scrollTop };
	}

	const dispatch = createEventDispatcher();

	let prevContentOffset: CGPoint = { x: 0, y: 0 };
	let velocity: CGPoint = { x: 0, y: 0 };

	let touchStartOffset: CGPoint = { x: 0, y: 0 };

	function onTouchStart() {
		isDragging = true;
		touchStartOffset = getContentOffset();
	}
	function onTouchEnd(e: any) {
		isDragging = false;
		const distance = calculateDistance(getContentOffset(), touchStartOffset);
		if (distance > 1) {
			dispatch("willEndDragging", velocity);
		}
	}

	// onScroll だと発行タイミングの関係上 velocity が 0 になるのを検出できないので onEnterFrame で処理します。
	// なお、onScroll でも 120hz は対応してないので onEnterFrame を使う弊害はありません。
	onMount(() => {
		addEventListener("onEnterFrame", _observeStartScroll);
		root_ref.addEventListener("scrollend", onScrollEnd);
		// addEventListener("onEnterFrame", _deceleratingDetection);
		return () => {
			removeEventListener("onEnterFrame", _observeStartScroll);
			root_ref.removeEventListener("scrollend", onScrollEnd);
			// removeEventListener("onEnterFrame", _deceleratingDetection);
		};
	});

	let _isScrolling = false;
	function onScroll(e:any) {
		const currentOffset = getContentOffset();
		velocity = {
			x: prevContentOffset.x - currentOffset.x,
			y: prevContentOffset.y - currentOffset.y,
		};
		prevContentOffset = currentOffset;
		dispatch("didScroll", currentOffset);
	}

	// システムによるスクロールが終了したときにも呼ばれます。
	function onScrollEnd(e:any){
		_isScrolling = false;
		console.log(e)
		dispatch("didEndDecelerating", getContentOffset());
	}

	function _observeStartScroll() {
		if (isDragging) return;
		if (velocity.x != 0 || velocity.y != 0) {
			isDragging = true;
			_isScrolling = true;
			dispatch("willBeginDragging");
			return;
		}
	}

	const contentStyle =
		contentInset.top == 0 && contentInset.bottom == 0
			? "height: 100%;"
			: `padding-top: ${contentInset.top}px;
				padding-bottom: calc(${contentInset.bottom}px + env(safe-area-inset-bottom));
	 `;
</script>

<div
	class="UIScrollView"
	bind:this={root_ref}
	on:scroll={onScroll}
	on:touchstart={onTouchStart}
	on:touchend={onTouchEnd}
	class:noScrollIndicator={showsScrollIndicator == false}
	class:isPagingEnabled
	style={styleToString(style)}
	style:overscroll-behavior={bounces ? "unset" : "none"}
	style:overflow-y={scrollDirection == "vertical" ? "scroll" : "hidden"}
	style:overflow-x={scrollDirection == "horizontal" ? "scroll" : "hidden"}
>
	<div style={contentStyle}>
		<slot />
	</div>
</div>

<style>
	.UIScrollView {
		position: relative;
		height: 100%;
	}
	.isPagingEnabled {
		scroll-snap-type: both mandatory;
	}
	.noScrollIndicator::-webkit-scrollbar {
		display: none;
		-webkit-appearance: none;
	}
</style>
