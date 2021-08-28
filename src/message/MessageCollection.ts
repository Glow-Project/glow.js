import { Session } from "../Session";
import { User, UserCollection } from "../user";
import { Message } from "./Message";

/**
 * Get Messages
 */
export class MessageCollection {
	uc: UserCollection;

	/**
	 *
	 * @param session Your current `Session`
	 */
	constructor(private session: Session) {
		this.uc = new UserCollection(session);
	}

	/**
	 *
	 * @returns An `Array` containing all the messages you ever **received** or **sent**
	 */
	async all() {
		let messages: Array<object> = await this.session.get("/messages");

		messages.forEach((message: object, i: number) => {
			messages[i] = Message.fromObject(message);
		});

		return messages;
	}

	/**
	 *
	 * @returns An `Array` containing all the messages you ever **sent**
	 */
	async fromMe() {
		let all = await this.all();
		let me = await this.uc.me();

		return all.filter((message: Message) => message.fromId == me.id);
	}

	/**
	 *
	 * @param user The `User` you want to get the messages from
	 * @returns An `Array` containing all the messages the `User` ever **sent** to you
	 */
	async fromUser(user: User) {
		let all = await this.all();

		return all.filter((message: Message) => message.fromId == user.id);
	}

	/**
	 *
	 * @returns An `Array` containing all the messages you ever **received**
	 */
	async fromOthers() {
		let all = await this.all();
		let me = await this.uc.me();

		return all.filter((message: Message) => message.toId == me.id);
	}

	/**
	 *
	 * @param user The `User` you want to get the messages from
	 * @returns An `Array` containing all the messages the `User` ever **sent** to you and the messages you **sent** to the User
	 */
	async fromMeAndUser(user: User) {
		let all = await this.all();
		let me = await this.uc.me();

		return all.filter(
			(message: Message) =>
				(message.toId == me.id && message.fromId == user.id) ||
				(message.toId == user.id && message.fromId == me.id)
		);
	}

	/**
	 *
	 * @returns The latest message you **sent or received**
	 */
	async latest() {
		let all = await this.all();

		return all[all.length - 1];
	}
}
