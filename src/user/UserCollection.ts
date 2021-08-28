import { Session } from "../Session";
import { User } from "./User";

/**
 * Get Users
 */
export class UserCollection {
	constructor(private session: Session) {}

	/**
	 *
	 * @returns The `User` of the current `Session`
	 */
	async me() {
		return User.fromObject(await this.session.get("/user"));
	}

	/**
	 *
	 * @returns All `User`s existing in the `GLOW` API
	 */
	async all() {
		let users: Array<Object> = await this.session.get("/users");

		users.forEach((user: object, i: number) => {
			users[i] = User.fromObject(user);
		});

		return users;
	}

	/**
	 *
	 * @param name The `name` of the `User` you want to find
	 * @returns The corrosponding `User`
	 */
	async getByName(name: string) {
		let all = await this.all();

		return all.filter((user: User) => user.name == name)[0];
	}

	/**
	 *
	 * @param id The `id` of the `User` you want to find
	 * @returns The corrosponding `User`
	 */
	async getById(id: number) {
		let all = await this.all();

		return all.filter((user: User) => user.id == id)[0];
	}

	/**
	 *
	 * @param rank The `rank` of the `User`s you want to find
	 * @returns The corrosponding `User`
	 */
	async getByRank(rank: string) {
		let all = await this.all();

		return all.filter((user: User) => user.rank == rank);
	}
}
