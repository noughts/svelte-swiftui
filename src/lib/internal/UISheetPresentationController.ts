export class UISheetPresentationController {
	readonly detents: Detent[] = [Detent.large()];
}

export class Detent {
	static large() {
		return new this("large");
	}
	constructor(readonly identifier: string) {

	}
}