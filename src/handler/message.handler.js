import { join } from "path";
import { format } from "util";
import { readdirSync } from "fs";
import { Library } from "../lib/lib.js";
import { db } from "../database/index.js";
import { Global } from "../helper/index.js";
import { Parser, Notification } from "./index.js";
import { Metadata } from "../config/cache.config.js";
import { User, Group } from "../database/schema/index.js";
import Console from "../print.js";

export class Message{
	constructor(UPDATE, Conn, MakeWASocket){
		this.UPDATE = UPDATE;
		this.conn = Conn;
		this.Mek = new Parser(Conn, UPDATE, MakeWASocket);
		this.notif = new Notification(this.Mek, this.conn, this.UPDATE);
		this.rootPlugin = join("src", "plugins");
		this.foldersPlugin = readdirSync(this.rootPlugin, { withFileTypes: true }).filter(v => v.isDirectory())
	}
	async received() {
		new User(this.Mek).Expose();
		new Group(this.Mek).Expose();
		this.notif.metadata()
		if (this.Mek?.isBot) return
		if (/status@broadcast/.test(this.Mek?.chat)) return
		await new Console(this.Mek, this.UPDATE, (await this.notif.getMeta())).run();
		// console.log(this.Mek);
		this.foldersPlugin.map(async ({ name }) => {
			let files = await readdirSync(join(this.rootPlugin, name));
			for (let file of files) {
				try {
					if (!this.Mek.isDev && db.config.maintenace) {
						if (this.Mek.command) this.conn.Func.sendteks(this.Mek.chat, this.conn.Logger.MAINTENANCE, this.Mek)
						continue;
					}
					let path = db.config.maintenace ? join("..", "plugins", name, file) +  "?update=" + Date.now() : join("..", "plugins", name, file);
					let Extra = {}
					Extra.Mek = this.Mek
					Extra.Conn = this.conn
					Extra.Func = this.conn.Func
					Extra.Fake = this.conn.Fake
					Extra.Metadata = await this.notif.getMeta()
					Extra.Logger = this.conn.Logger
					Extra.Lib = new Library()
					Extra.Global = Global
					let impor = await import(path);
					if (!impor.default) return
					let plugin = await new impor.default(db, Extra);
					if (plugin.gold && typeof plugin.gold === "function") plugin.gold();
					if (plugin.mid && typeof plugin.mid === "function") {
						if (!plugin.command) continue;
						if (plugin.command.includes(this.Mek?.command) && this.Mek?.args[0] == "-i") {
							this.conn.Func.sendlink(this.Mek.chat, `╰┈➤ 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐂𝐨𝐦𝐦𝐚𝐧𝐝\n\n𝐂𝐨𝐦𝐦𝐚𝐧𝐝: ${plugin.command.join(", ")}\n𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲:  ${plugin.category}\n𝐌𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐜𝐞 𝐅𝐢𝐭𝐮𝐫: ${plugin.mainten}\n 𝐅𝐢𝐥𝐞 𝐏𝐥𝐮𝐠𝐢𝐧: ${file}`, 'Deskriptor command', [["otp", "𝐒𝐚𝐥𝐢𝐧 𝐂𝐨𝐦𝐦𝐚𝐧𝐝", this.Mek?.preff + this.Mek?.command]]);
							continue
						} 
						if (plugin.command.includes(this.Mek?.command)) {
							plugin.mid()
							db.config.hit += 1
						}
					}
					if (plugin.custom && typeof plugin.custom === "function") {
						if (!plugin.prefix) continue;
						let query = this.Mek?.text?.slice((plugin.prefix.length));
						if (this.Mek?.text?.startsWith(plugin.prefix)) plugin.custom(query);
					}
				} catch(e) {
					this.conn.Func.sendteks(db.config.developer[0] + "@s.whatsapp.net", 
					`*Error File : ${file}*\n` +
					`*Oleh : ${this.Mek?.sender.split('@')[0]}*\n\n` +
					`\`\`\`${await format(e)}\`\`\``, this.conn.Fake.fakeStatus(e, ''));
				}
			}
		});
	}
}
