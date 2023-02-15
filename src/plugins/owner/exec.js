import { exec } from 'child_process';
import { format } from 'util'

class Main {
	constructor(db, {Func, Logger, Mek}) {
		this.prefix = "$";
		this.category = "owner"
		this.mainten = "false"
		this.custom = async (query) => {
			if (!Mek.isDev) return Func.sendteks(Mek.chat, Logger.JUST_DEV, Mek);
			await Func.sendteks(Mek.chat, "Executing...", Mek)
			exec(query, (stderr, stdout) => {
				if (stderr) return Func.sendteks(Mek.chat, format(stderr), Mek)
				if (stdout) return Func.sendteks(Mek.chat, format(stdout), Mek)
			})
		}
	}
}

export default Main;