interface SwipeActions {
	onSwipeLeft?: () => void;
	onSwipeRight?: () => void;
}

export function swipe(node: HTMLElement, { onSwipeLeft, onSwipeRight }: SwipeActions) {
	let startX: number;
	let startY: number;

	function handleStart(event: TouchEvent) {
		if (event.touches.length === 1) {
			startX = event.touches[0].clientX;
			startY = event.touches[0].clientY; // Y座標も保存
		}
	}

	function handleEnd(event: TouchEvent) {
		if (event.changedTouches.length === 1) {
			const endX = event.changedTouches[0].clientX;
			const endY = event.changedTouches[0].clientY; // Y座標も取得
			const diffX = endX - startX;
			const diffY = endY - startY;

			// Y軸の変動がX軸の変動よりも小さい場合だけ左右スワイプとして認識
			if (Math.abs(diffX) > Math.abs(diffY)) {
				if (diffX < -40 && onSwipeLeft) {
					onSwipeLeft();
				} else if (diffX > 40 && onSwipeRight) {
					onSwipeRight();
				}
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
