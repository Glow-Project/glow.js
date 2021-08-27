export class BadRequest extends Error {
	constructor() {
		super(
			"400 Bad Request - You may have forgotten to send some parameters"
		);
	}
}

export class Forbidden extends Error {
	constructor() {
		super("403 Forbidden - You don't have access to this content");
	}
}

export class NotFound extends Error {
	constructor() {
		super("404 Not Found - The route you entered is somehow wrong");
	}
}
