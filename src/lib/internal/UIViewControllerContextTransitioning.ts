/*

独自のクラスでこのプロトコルを採用したり、このプロトコルを採用するオブジェクトを直接作成したりしないでください。
トランジションの間、そのトランジションに関わるアニメーターオブジェクトはUIKitから完全に設定されたコンテキストオブジェクトを受け取ります。
カスタムアニメーターオブジェクト - UIViewControllerAnimatedTransitioning または UIViewControllerInteractiveTransitioning プロトコルを採用するオブジェクト - は、単に提供されたオブジェクトから必要な情報を取得する必要があります。

コンテキストオブジェクトは、遷移に関わるビューとビューコントローラに関する情報をカプセル化します。
また、遷移の実行方法の詳細も含まれます。
インタラクティブなトランジションの場合、インタラクティブアニメーターオブジェクトは、アニメーションの進行状況を報告するためにこのプロトコルのメソッドを使用します。
アニメーションが始まると、インタラクティブアニメーターオブジェクトはコンテキストオブジェクトへのポインターを保存しなければならない。
ユーザーのインタラクションに基づいて、アニメーターオブジェクトはupdateInteractiveTransition(_:)、finishInteractiveTransition()、またはcancelInteractiveTransition()メソッドを呼び出して、アニメーションの完成に向けた進捗状況を報告する。
これらのメソッドは UIKit に情報を送信し、アニメーションのタイミングを調整します。

*/

import type { UIViewController } from "$lib/index.js";

export interface UIViewControllerContextTransitioning {
	viewControllerForKey: (key: "from" | "to") => UIViewController;
}