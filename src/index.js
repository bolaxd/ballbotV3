import MakeWASocket, { useMultiFileAuthState } from "baileys";
import Pino from "pino";

process.on("uncaughtException", console.error);
import SimpleImplementation from "./handler/simple.handler.js";
import ConfigConnection from "./config/connection.config.js";
import Connection from "./handler/connection.handler.js";
import Message from "./handler/message.handler.js";
import Fake from "./helper/fake.helper.js";

import "./config/cache.config.js";
import * as Logger from "./config/logger.config.js";
import { db } from "./database/index.js";

export default class Start{
	constructor () {
		this.store = MakeWASocket.makeInMemoryStore(Pino({ level: "silent" })).bind;
		this.configConnection = new ConfigConnection();
		this.conn = null;
		this.session = null;
	}
	async bot() {
		this.session = await useMultiFileAuthState(db.config?.sessionName);
		this.conn = MakeWASocket.default(
			Object.assign(this.configConnection,
		{ 
			auth: this.session.state
		})
		);
		this.store(this.conn.ev);
		// ADD Your Cache Connection in here
		this.conn.Func = new SimpleImplementation(this.conn, MakeWASocket);
		this.conn.Logger = Logger;
		this.conn.Fake = new Fake(db.config.botName, db.config.urlImage, db.config.url);
		// End Your cache Connection 
		this.conn.ev.on("connection.update", async (UPDATE) =>
			new Connection(UPDATE, MakeWASocket, Start).status(db)
		);
		this.conn.ev.on("messages.upsert", async (UPDATE) => 
			await new Message(UPDATE.messages[0], this.conn, MakeWASocket).received()
		);
		this.conn.ev.on("creds.update", this.session.saveCreds);
	}
}