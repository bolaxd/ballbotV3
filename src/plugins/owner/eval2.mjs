import got from "got";
import cheerio from "cheerio";
import { format, inspect } from "util";

class Main {
	constructor({Func, Logger, config}, Mek) {
		this.prefix = "=>"; // Only Regex
		this.category = "owner"
		this.mainten = "false"
		this.custom = async (query) => {
			if (!Mek.isDev) return Func.sendteks(Mek.chat, Logger.JUST_DEV, Mek);
			try {
				let evaling = await eval(`(async () => {${query}})();`)
				Func.sendteks(Mek.chat, typeof evaling != 'string' ? inspect(evaling) : format(evaling), Mek)
			} catch(e) {
				Func.sendteks(Mek.chat, await format(e) + '\n\n*Anda Sepertinya Harus banyak belajar bangg*\n*Jangan Asal tempel code*', Mek)
			}
		}
	}
}

export default Main;
