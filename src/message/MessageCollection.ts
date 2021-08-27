import { Session } from "../Session";
import { User, UserCollection } from "../user";
import { Message } from "./Message";

export class MessageCollection {
	uc: UserCollection;

	constructor(private session: Session) {
		this.uc = new UserCollection(session);
	}

	async all() {
		let messages: Array<object> = await this.session.get("/messages");

		messages.forEach((message: object, i: number) => {
			messages[i] = Message.fromObject(message);
		});

		return messages;
	}

	async fromMe() {
		let all = await this.all();
		let me = await this.uc.me();

		return all.filter((message: Message) => message.fromId == me.id);
	}

	async fromUser(user: User) {
		let all = await this.all();

		return all.filter((message: Message) => message.fromId == user.id);
	}

	async fromOthers() {
		let all = await this.all();
		let me = await this.uc.me();

		return all.filter((message: Message) => message.toId == me.id);
	}

	async fromMeAndUser(user: User) {
		let all = await this.all();
		let me = await this.uc.me();

		return all.filter(
			(message: Message) =>
				(message.toId == me.id && message.fromId == user.id) ||
				(message.toId == user.id && message.fromId == me.id)
		);
	}

	async latest() {
		let all = await this.all();

		return all[all.length - 1];
	}
}
