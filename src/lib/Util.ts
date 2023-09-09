import type { Properties } from 'csstype';

export function styleToString(style: Properties) {
	const ary: string[] = [];
	Object.entries(style).forEach(([key, value]) => {
		ary.push(`${addMinus(camelToKebab(key))}:${value};`);
	});
	return ary.join(' ');
}

function camelToKebab(input: string): string {
	return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function addMinus(input: string): string {
	if (input.startsWith("webkit")) {
		return "-" + input;
	}
	return input;
}

export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}