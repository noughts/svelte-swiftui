import NavigationView from "./internal/NavigationView.svelte";
import { UIViewController } from "./UIViewController.js";

export class UINavigationController extends UIViewController{

	viewControllers:UIViewController[] = [];

	constructor(rootViewController:UIViewController){
		super(NavigationView, {rootViewController})
		rootViewController.navigationController = this;
		this.viewControllers = [rootViewController];
	}

	push(viewController:UIViewController){
		console.log("push", viewController)
		this.viewControllers = this.viewControllers.concat(viewController);
	}
	pop(){
		if (this.viewControllers.length <= 1) {
			return;
		}
		const newAry = [...this.viewControllers];
		newAry.pop();
		this.viewControllers = newAry;
	}
}