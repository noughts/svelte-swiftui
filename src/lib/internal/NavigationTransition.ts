import { cubicOut } from "svelte/easing";

interface TransitionOptions {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number; // easing関数は数値を引数にとり、数値を返す関数とします。
	x?: any;
	y?: any;
	opacity?: number;
}

export function pushTransition(
	node: HTMLElement,
	{ delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }: TransitionOptions = {}
) {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	const [xValue, xUnit] = split_css_unit(x);
	const [yValue, yUnit] = split_css_unit(y);
	const result = {
		delay,
		duration,
		easing,
		css: (t: number, u: number) => {
			const out = `
transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
opacity: ${target_opacity - od * u}
`.trim();
			console.log(out)
			return out;
		}
	};
	console.log(result)
	return result;
}

function split_css_unit(value: any) {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return split ? [parseFloat(split[1]), split[2] || 'px'] : [/** @type {number} */ (value), 'px'];
}