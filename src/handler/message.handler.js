//import { User, Grup, Bot } from "../database/schema/index.js";
import { Fake } from "../helper/index.js";
import { Parser } from "./index.js";
import { readdirSync } from "fs";
import { join } from "path";
import { format } from "util";
let rootPlugin = join("src", "plugins");
const foldersPlugin = readdirSync(rootPlugin, { withFileTypes: true }).filter(v => v.isDirectory());
export class Message{
	constructor(UPDATE, Conn){
		this.UPDATE = UPDATE;
		this.conn = Conn;
		this.Mek = new Parser(Conn, UPDATE);
	}
	async received() {
		if (this.Mek?.fromMe) return
		if (/status@broadcast/.test(this.Mek?.chat)) return
		console.log(this.Mek);
		foldersPlugin.map(async ({ name }) => {
			let files = readdirSync(join(rootPlugin, name));
			for await (let file of files) {
				try {
					if (!this.Mek.isDev && this.conn.developer) continue;
					let path = this.conn.developer ? "../" + join("plugins", name, file) +  "?version=" + Date.now() : "../" + join("plugins", name, file);
					let imporr = await import(path);
					if (!imporr.default) continue;
					let plugin = new imporr.default(this.conn, this.Mek);
					if (plugin.top && typeof plugin.top === "function") plugin.top();
					if (plugin.mid && typeof plugin.mid === "function") {
						if (!plugin.command) continue;
						if (plugin.command.includes(this.Mek?.command)) plugin.mid()
					}
					if (plugin.custom && typeof plugin.custom === "function") {
						if (!plugin.prefix) continue;
						let tek = this.Mek?.text
						let query = tek.slice((plugin.prefix.length + 1))
						if (tek.startsWith(plugin.prefix)) plugin.custom(query)
					}
				} catch(e) {
					this.conn.Func.sendteks(this.conn.config.developer[0] + "@s.whatsapp.net", 
					`*Error File : ${file}*\n\n` +
					`\`\`\`${await format(e)}\`\`\``, new Fake().fakeStatus(e.toString()));
				}
			}
		});
	}
}
