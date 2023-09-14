// swipe.ts
interface SwipeActions {
	onSwipeLeft?: () => void;
	onSwipeRight?: () => void;
}

export function swipe(node: HTMLElement, { onSwipeLeft, onSwipeRight }: SwipeActions) {
	let startX: number;

	function handleStart(event: TouchEvent) {
		if (event.touches.length === 1) {
			startX = event.touches[0].clientX;
		}
	}

	function handleEnd(event: TouchEvent) {
		if (event.changedTouches.length === 1) {
			const endX = event.changedTouches[0].clientX;
			const diffX = endX - startX;

			if (diffX < -40 && onSwipeLeft) {
				onSwipeLeft();
			} else if (diffX > 40 && onSwipeRight) {
				onSwipeRight();
			}
		}
	}

	node.addEventListener('touchstart', handleStart);
	node.addEventListener('touchend', handleEnd);

	return {
		destroy() {
			node.removeEventListener('touchstart', handleStart);
			node.removeEventListener('touchend', handleEnd);
		}
	};
}
