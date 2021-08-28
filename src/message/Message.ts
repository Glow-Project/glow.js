import FormData = require("form-data");
import { Session } from "../Session";

/**
 * The `Message` ressource
 */
export class Message {
	constructor(
		public readonly id: number,
		public readonly body: string,
		public readonly fromId: number,
		public readonly toId: number,
		public readonly sentTimestamp: string
	) {}

	/**
	 *
	 * @param text The message-text you want to send
	 * @param toId The `id` of the receiver of the message
	 * @param session Your current `Session`
	 * @returns The `Message` object that was sent
	 */
	static async send(text: string, toId: number, session: Session) {
		let form = new FormData();
		form.append("to", toId);
		form.append("body", text);

		let msg = await session.post("message", form);

		return msg;
	}

	/**
	 *
	 * @param data The `JSON` data that was received from an API-call
	 * @returns A generated `Message` object
	 */
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
