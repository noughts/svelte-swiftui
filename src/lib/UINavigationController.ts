import NavigationView from "./internal/NavigationView.svelte";
import { UIViewController } from "./UIViewController.js";

export class UINavigationController extends UIViewController{
	constructor(rootViewController:UIViewController){
		super(NavigationView, {rootViewController})
	}
}