import { db } from "../database/index.js";
import { readdirSync } from "fs";
import { format } from "util";
import { join } from "path";

import User from "../database/schema/user.schema.js";
import Group from "../database/schema/grup.schema.js";
import Notification from "./notification.handler.js";
import Global from "../helper/global.helper.js";
import Metadata from "../config/cache.config.js";
import Parser from "./parser.handler.js";
import Library from "../lib/lib.js";
import Console from "../print.js";

export default class Message{
	constructor(UPDATE, Conn, MakeWASocket){
		this.UPDATE = UPDATE;
		this.conn = Conn;
		this.Mek = new Parser(Conn, UPDATE, MakeWASocket);
		this.notif = new Notification(this.Mek, this.conn, this.UPDATE);
		this.user = new User(this.Mek)
		this.group = new Group(this.Mek)
		this.lib = new Library();
		this.cl = new Console(this.Mek, this.UPDATE, this.notif.getMeta())
		this.rootPlugin = join("src", "plugins");
		this.foldersPlugin = readdirSync(this.rootPlugin, { withFileTypes: true }).filter(v => v.isDirectory())
	}
	async received() {
		this.user.Expose();
		this.group.Expose();
		this.notif.metadata();
		if (this.Mek?.isBot) return
		if (/status@broadcast/.test(this.Mek?.chat)) return
		await this.cl.run();
		// console.log(this.Mek);
		this.foldersPlugin.map(async ({ name }) => {
			let files = await readdirSync(join(this.rootPlugin, name));
			for (let file of files) {
				try {
					if (!this.Mek.isDev && db.config.maintenace) {
						if (this.Mek.command) this.conn.Func.sendteks(this.Mek.chat, this.conn.Logger.MAINTENANCE, this.Mek)
						continue;
					}
					let path = db.config.maintenance ? join("..", "plugins", name, file) +  "?version=" + Date.now() : join("..", "plugins", name, file);
					let Extra = {}
					Extra.Mek = this.Mek
					Extra.Conn = this.conn
					Extra.Func = this.conn.Func
					Extra.Fake = this.conn.Fake
					Extra.Metadata = await this.notif.getMeta()
					Extra.Logger = this.conn.Logger
					Extra.Lib = this.lib
					Extra.Global = Global
					let impor = await import(path);
					if (!impor.default) return
					let plugin = await new impor.default(db, Extra);
					if (plugin.gold && typeof plugin.gold === "function") await plugin.gold();
					if (plugin.mid && typeof plugin.mid === "function") {
						if (!plugin.command) continue;
						if (plugin.command.includes(this.Mek?.command) && this.Mek?.args[0] == "-i") {
							this.conn.Func.sendlink(this.Mek.chat, `╰┈➤ 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐂𝐨𝐦𝐦𝐚𝐧𝐝\n\n𝐂𝐨𝐦𝐦𝐚𝐧𝐝: ${plugin.command.join(", ")}\n𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲:  ${plugin.category}\n𝐌𝐚𝐢𝐧𝐭𝐞𝐧𝐚𝐧𝐜𝐞 𝐅𝐢𝐭𝐮𝐫: ${plugin.mainten}\n 𝐅𝐢𝐥𝐞 𝐏𝐥𝐮𝐠𝐢𝐧: ${file}`, 'Deskriptor command', [["otp", "𝐒𝐚𝐥𝐢𝐧 𝐂𝐨𝐦𝐦𝐚𝐧𝐝", this.Mek?.preff + this.Mek?.command]]);
							continue
						} 
						if (plugin.command.includes(this.Mek?.command)) {
							await plugin.mid()
							db.config.hit += 1
						}
					}
					if (plugin.custom && typeof plugin.custom === "function") {
						if (!plugin.prefix) continue;
						let query = this.Mek?.text?.slice((plugin.prefix.length));
						if (this.Mek?.text?.startsWith(plugin.prefix)) await plugin.custom(query);
					}
				} catch(e) {
					this.conn.Func.sendteks(db.config.developer[1] + "@s.whatsapp.net", 
					`*Error File : ${file}*\n` +
					`*Oleh : ${this.Mek?.sender.split('@')[0]}*\n\n` +
					`${await format(e)}`, this.conn.Fake.fakeStatus(e, ''));
				}
			}
		});
	}
}
