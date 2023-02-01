process.on("uncaughtException", console.error);
import MakeWASocket, { useMultiFileAuthState } from "baileys";
import { Simple, Message, Connection } from "./handler/index.js";
import ConfigConnection, { LOG } from "./config/connection.config.js";
import { join } from "path";
import "./config/cache.config.js";
import * as Logger from "./config/logger.config.js";
import { db } from "./database/index.js";

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
		Conn.Func = new Simple(Conn, MakeWASocket);
		Conn.config = db.config;
		Conn.Logger = Logger;
		Conn.developer = false;
		Conn.ev.on("connection.update", async (UPDATE) =>
			new Connection(UPDATE, MakeWASocket).status(Conn, Start)
		);
		Conn.ev.on("messages.upsert", async (UPDATE) => {
			if (UPDATE.messages[0].key.fromMe) return;
			await new Message(UPDATE.messages[0], Conn).received();
		});
		Conn.ev.on("creds.update", saveCreds);
	}
}