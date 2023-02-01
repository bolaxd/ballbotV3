import { User, Group } from "../database/schema/index.js";
import { db } from "../database/index.js";
import { Parser } from "./index.js";
import { readdirSync } from "fs";
import { join } from "path";
import { format } from "util";

let rootPlugin = join("src", "plugins");
const foldersPlugin = readdirSync(rootPlugin, { withFileTypes: true }).filter(v => v.isDirectory());

const importDefault = (PATH, Conn, Mek) => new Promise(async (resolve, reject) => {
		let Extra = {}
		Extra.Mek = Mek
		Extra.Conn = Conn
		Extra.Func = Conn.Func
		Extra.Fake = Conn.Fake
		Extra.Logger = Conn.Logger
		let impor = await import(PATH);
		if (!impor.default) reject(new Error("Module tidak di export bentuk default..."));
		let plugin = await new impor.default(db, Extra);
		resolve(plugin);
});

export class Message{
	constructor(UPDATE, Conn){
		this.UPDATE = UPDATE;
		this.conn = Conn;
		this.Mek = new Parser(Conn, UPDATE);
	}
	async received() {
		new User(this.Mek).Expose();
		new Group(this.Mek).Expose();
		if (this.Mek?.isBot) return
		if (/status@broadcast/.test(this.Mek?.chat)) return
		foldersPlugin.map(async ({ name }) => {
			let files = readdirSync(join(rootPlugin, name));
			for await (let file of files) {
				try {
					if (!this.Mek.isDev && this.conn.developer) continue;
					let path = this.conn.developer ? join("..", "plugins", name, file) +  "?version=" + Date.now() : join("..", "plugins", name, file);
					let plugin = await importDefault(path, this.conn, this.Mek);
					if (plugin.top && typeof plugin.top === "function") plugin.top();
					if (plugin.mid && typeof plugin.mid === "function") {
						if (!plugin.command) continue;
						if (plugin.command.includes(this.Mek?.command)) plugin.mid()
					}
					if (plugin.custom && typeof plugin.custom === "function") {
						if (!plugin.prefix) continue;
						let query = this.Mek?.text?.slice((plugin.prefix.length));
						if (this.Mek?.text?.startsWith(plugin.prefix)) plugin.custom(query);
					}
				} catch(e) {
					this.conn.Func.sendteks(this.conn.config.developer[0] + "@s.whatsapp.net", 
					`*Error File : ${file}*\n` +
					`*Oleh : ${this.Mek?.sender.split('@')[0]}*\n\n` +
					`\`\`\`${await format(e)}\`\`\``, this.conn.Fake.fakeStatus(e.toString()));
				}
			}
		});
	}
}
