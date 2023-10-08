<svelte:options accessors />

<script lang="ts">
	import type { Properties } from "csstype";
	import { sleep, styleToString, waitOneframe } from "./internal/Util.js";
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
	export async function scrollTo(options: ScrollToOptions) {
		console.log("scrollTo");
		root_ref.scrollTo(options);
		if (options.behavior != "smooth") {
			return;
		}
		while (true) {
			await sleep(50); // 1フレーム以下待つだけだと移動を検出できないので多めに。
			// console.log(velocity)
			if (velocity.x == 0 && velocity.y == 0) {
				break;
			}
		}
		console.log("完了");
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

	// 120hz端末でも60hzで呼ばれるので注意
	function onScroll(e: any) {
		const currentOffset = getContentOffset();
		console.log(currentOffset, prevContentOffset);
		velocity = {
			x: prevContentOffset.x - currentOffset.x,
			y: prevContentOffset.y - currentOffset.y,
		};
		prevContentOffset = currentOffset;
		dispatch("didScroll", currentOffset);

		// スクロール完了検知処理
	}
	let touchStartOffset: CGPoint = { x: 0, y: 0 };
	function onTouchStart() {
		touchStartOffset = getContentOffset();
	}
	function onTouchEnd(e: any) {
		const distance = calculateDistance(getContentOffset(), touchStartOffset);
		if (distance > 1) {
			dispatch("willEndDragging", velocity);
		}
	}

	onMount(() => {
		addEventListener("onEnterFrame", onEnterFrame);
		return () => {
			removeEventListener("onEnterFrame", onEnterFrame);
		};
	});

	function onEnterFrame() {
		console.log(getContentOffset())
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
