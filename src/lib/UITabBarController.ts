import TabView from "./internal/TabView.svelte";
import { UIView } from "./UIView.js";
import { UIViewController } from "./UIViewController.js";

export class UITabBarController extends UIViewController{

	constructor(readonly viewControllers:UIViewController[]){
		super(new UIView(TabView));
		viewControllers.forEach(x=>{
			x.presentingViewController = this;
			x.tabBarController = this;
		})
	}

}