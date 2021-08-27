export class User {
	constructor(
		public readonly name: string,
		public readonly id: number,
		public readonly rank: string
	) {}

	static fromObject(data: object) {
		return new User(data["name"], data["id"], data["rank"]);
	}
}
