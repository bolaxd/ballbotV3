import { readdirSync, statSync } from "fs";
import { join } from "path";

class Main {
	constructor({ config, user, grup }, {Mek, Func, Logger, Fake, Global}) {
		this.command = ["dash", "dashboard"];
		this.category = "bot";
		this.mainten = "false";
		this.mid = async () => {
			let dir = readdirSync(config.sessionName), _b = 0, _c = dir.map(v=> _b += (statSync(join(config.sessionName, v))).size);
			let teks = `DASHBOARD\n\n`
							 +`Waktu Bot Mulai = ${Global.timers(process.uptime() * 1000)}\n`
							 +`Ram terpakai bot = ${Global.sizeString(process.memoryUsage().rss)}\n`
							 +`OS yang digunakan = ${process.platform + " " + process.arch}\n`
							 +`Total Session = ${dir.length} Files\n`
							 +`Size Session = ${Global.sizeString(_b)}\n`
			 				 +`Total Database user = ${Object.keys(user).length} Users\n`
						 	 +`Total Database group = ${Object.keys(grup).length} groups\n`
						 	 +`Total Hit Bot = ${config.hit} Hits\n`
			Func.sendteks(Mek.chat, teks, Fake.fakeStatus("Dashboard bot...", ''))
		}
	}
}

export default Main;