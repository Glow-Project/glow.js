import FormData = require("form-data");
import { Session } from "../Session";

export class Message {
	constructor(
		public readonly id: number,
		public readonly body: string,
		public readonly fromId: number,
		public readonly toId: number,
		public readonly sentTimestamp: string
	) {}

	static async send(text: string, toId: number, session: Session) {
		let form = new FormData();
		form.append("to", toId);
		form.append("body", text);

		let msg = await session.post("message", form);

		return msg;
	}

	static fromObject(data: object) {
		return new Message(
			data["id"],
			data["body"],
			data["from_id"],
			data["to_id"],
			data["sent_timestamp"]
		);
	}
}
