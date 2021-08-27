const glow = require("../dist");

async function test() {
	let s = await glow.Session.login("tch1b0", "tch1b0");

	console.log(await s.valid());

	let mc = new glow.MessageCollection(s);

	let messages = await mc.fromMe();

	console.log(messages);
}

test();
