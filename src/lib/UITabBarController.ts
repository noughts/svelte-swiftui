import TabView from "./internal/TabView.svelte";
import { UIViewController } from "./UIViewController.js";

export class UITabBarController extends UIViewController{

	constructor(viewControllers:UIViewController[]){
		super(TabView, {viewControllers});
		viewControllers.forEach(x=>{
			x.presentingViewController = this;
		})
	}

}