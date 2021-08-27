import { Session } from "../Session";
import { User, UserCollection } from "../user";
import { Message } from "./Message";

export class MessageCollection {
	constructor(private session: Session) {}

	async all() {
		let messages: Array<object> = await this.session.get("/messages");

		messages.forEach((message: object, i: number) => {
			messages[i] = Message.fromObject(message);
		});

		return messages;
	}

	async fromMe() {
		let all = await this.all();
		let uc = new UserCollection(this.session);
		let me = await uc.me();

		return all.filter((message: Message) => message.fromId == me.id);
	}

	async fromOthers() {
		let all = await this.all();
		let uc = new UserCollection(this.session);
		let me = await uc.me();

		return all.filter((message: Message) => message.toId == me.id);
	}

	async latest() {
		let all = await this.all();

		return all[all.length - 1];
	}
}
