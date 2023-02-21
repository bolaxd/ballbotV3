process.on("uncaughtException", console.error);
import MakeWASocket, { useMultiFileAuthState } from "baileys";
import { Simple, Message, Connection } from "./handler/index.js";
import ConfigConnection, { LOG } from "./config/connection.config.js";
import { join } from "path";
import "./config/cache.config.js";
import * as Logger from "./config/logger.config.js";
import { db } from "./database/index.js";
import { Fake } from "./helper/index.js";

export default class Start{
	constructor () {
		this.store = MakeWASocket.makeInMemoryStore(LOG);
	}
	async bot() {
		const { state, saveCreds } = await useMultiFileAuthState(db.config?.sessionName);
		const Conn = MakeWASocket.default(Object.assign(new ConfigConnection(),
		{ auth: state }
		));
		this.store?.bind(Conn.ev);
		// ADD Your Cache Connection in here
		Conn.Func = new Simple(Conn, MakeWASocket);
		Conn.Logger = Logger;
		Conn.Fake = new Fake(db.config.botName, db.config.urlImage, db.config.url);
		// End Your cache Connection 
		Conn.ev.on("connection.update", async (UPDATE) =>
			new Connection(UPDATE, MakeWASocket).status(db, Start)
		);
		Conn.ev.on("messages.upsert", async (UPDATE) => 
			await new Message(UPDATE.messages[0], Conn, MakeWASocket).received()
		);
		Conn.ev.on("creds.update", saveCreds);
	}
}