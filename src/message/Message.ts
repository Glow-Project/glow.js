export class Message {
	constructor(
		public readonly id: number,
		public readonly body: string,
		public readonly fromId: number,
		public readonly toId: number,
		public readonly sentTimestamp: string
	) {}

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
