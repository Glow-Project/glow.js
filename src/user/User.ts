import { Message } from "../message";
import { Session } from "../Session";

/**
 * The `User` ressource
 */
export class User {
	/**
	 *
	 * @param name The `name` of the User
	 * @param id The `id` of the User
	 * @param rank The `rank` of the User
	 */
	constructor(
		public readonly name: string,
		public readonly id: number,
		public readonly rank: string
	) {}

	/**
	 *
	 * @param text The message you want to send
	 * @param session Your current `Session`
	 * @returns The `Message` object that was sent
	 */
	async sendMessage(text: string, session: Session) {
		let msg = await Message.send(text, this.id, session);

		return msg;
	}

	/**
	 *
	 * @param data The `JSON` data that was received from an API-call
	 * @returns A generated `User` object
	 */
	static fromObject(data: object) {
		return new User(data["name"], data["id"], data["rank"]);
	}
}
