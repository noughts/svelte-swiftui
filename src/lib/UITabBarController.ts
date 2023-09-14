import TabView from "./internal/TabView.svelte";
import { UIViewController } from "./UIViewController.js";

export class UITabBarController extends UIViewController{

	constructor(viewControllers:UIViewController[]){
		super(TabView, {viewControllers});
		console.log(this.sceneController)
		viewControllers.forEach(x=>{
			x.sceneController = this.sceneController;
		})
	}

}