import { Session } from "../Session";
import { User } from "./User";

export class UserCollection {
	constructor(private session: Session) {}

	async me() {
		return User.fromObject(await this.session.get("/user"));
	}

	async all() {
		let users: Array<Object> = await this.session.get("/users");

		users.forEach((user: object, i: number) => {
			users[i] = User.fromObject(user);
		});

		return users;
	}

	async getByName(name: string) {
		let all = await this.all();

		return all.filter((user: User) => user.name == name)[0];
	}

	async getById(id: number) {
		let all = await this.all();

		return all.filter((user: User) => user.id == id)[0];
	}

	async getByRank(rank: string) {
		let all = await this.all();

		return all.filter((user: User) => user.rank == rank);
	}
}
