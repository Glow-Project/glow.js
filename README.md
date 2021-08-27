# glow.js

Interact with the GLOW-API

## Example

```ts
const glow = require("glow-wrapper");

async function run() {
	let session = await glow.Session.login("TestUser", "TestPassword");

	let uc = glow.UserCollection(session);

	let me = uc.me();

	console.log(me.name);
}

run();
```

```
TestUser
```

## Installation

```
$ npm i glow-wrapper
```
