import { format } from "util";
import { exec } from 'child_process';

class Main {
	constructor(db, { Func, Logger, Mek}) {
		this.command = ["pull"]
		this.category = "owner"
		this.mainten = "false"
		this.mid = async function () {
			if (!Mek.isDev) return Func.sendteks(Mek.chat, Logger.JUST_DEV, Mek);
			await Func.sendteks(Mek.chat, "Wait for updating server...", Mek);
			await exec('git pull', (stderr, stdout) => {
				if (stderr) return Func.sendteks(Mek.chat, format(stderr), Mek);
				if (stdout) return Func.sendteks(Mek.chat, format(stdout), Mek);
			})
		}
	}
}

export default Main;
