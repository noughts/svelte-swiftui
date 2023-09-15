import TabView from "./internal/TabView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController } from "./UIViewController.js";

export class UITabBarController extends UIViewController{

	constructor(viewControllers:UIViewController[]){
		super(new UIView(TabView, {viewControllers}));
		viewControllers.forEach(x=>{
			x.presentingViewController = this;
		})
	}

}