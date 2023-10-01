import type { UIBarButtonItem } from "$lib/index.js";
import { writable } from "svelte/store";

export class UINavigationItem {
	title?: string;
	leftBarButtonItem?: UIBarButtonItem;
	rightBarButtonItem?: UIBarButtonItem;
	opacity? = writable(1);
}