import { writable } from "svelte/store";

/*

パーセント駆動のインタラクティブな遷移オブジェクトは、アニメーションの設定と実行に UIViewControllerAnimatedTransitioning プロトコルを採用したカスタムオブジェクトである、遷移アニメーターデリゲートに依存しています。

この具象クラスを使用するには、インタラクティブな遷移コントローラを要求されたときに、ビューコントローラデリゲートからこのクラスのインスタンスを返します。
トランジションの進行に影響を与えるユーザーイベントが発生したら、 update(_:)、cancel()、finish() メソッドを呼び出して、現在の進行状況を反映させます。
たとえば、ジェスチャーの認識機能からこれらのメソッドを呼び出して、ジェスチャーの進行状況を反映させることができます。

UIPercentDrivenInteractiveTransition をサブクラス化することもできますが、その場合は、メソッドのオーバーライドのそれぞれを、メソッドのスーパー実装への呼び出しで開始する必要があります。

*/

export class UIPercentDrivenInteractiveTransition{
	readonly percentComplete = writable(0);
	readonly finished = writable(false);
	readonly cancelled = writable(false);

	// トランジションの完了率を更新する。
	update(percentComplete:number){
		this.percentComplete.set(percentComplete);
	}
	finish(){
		this.finished.set(true);
	}
	cancel(){
		this.cancelled.set(true);
	}

}