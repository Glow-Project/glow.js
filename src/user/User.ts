import { Message } from "../message";
import { Session } from "../Session";

export class User {
	constructor(
		public readonly name: string,
		public readonly id: number,
		public readonly rank: string
	) {}

	async sendMessage(text: string, session: Session) {
		let msg = await Message.send(text, this.id, session);

		return msg;
	}

	static fromObject(data: object) {
		return new User(data["name"], data["id"], data["rank"]);
	}
}
