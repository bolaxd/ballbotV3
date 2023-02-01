import { format } from "util";
import { exec } from 'child_process';

class Main {
	constructor({ Func, Logger, config}, Mek) {
		this.command = ["push"]
		this.category = "owner"
		this.mainten = "false"
		this.mid = async function () {
			if (!Mek.isDev) return Func.sendteks(Mek.chat, Logger.JUST_DEV, Mek);
			await Func.sendteks(Mek.chat, "Wait for updating github...", Mek);
			await exec(`git config --global user.email ${config.githubEmail} && git config --global user.name ${config.githubName} && git add . && git commit -m ${Date.now()} && git push`, (stderr, stdout) => {
				if (stderr) return Func.sendteks(Mek.chat, format(stderr).toString(), Mek);
				if (stdout) return Func.sendteks(Mek.chat, format(stdout).toString(), Mek);
			});
		}
	}
}

export default Main;
