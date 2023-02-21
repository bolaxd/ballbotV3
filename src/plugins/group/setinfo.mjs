class Main {
	constructor(db, {Func, Mek, Conn, Fake, Logger, Metadata}) {
		this.command = ["setinfo"];
		this.category = "group";
		this.mainten = "false";
		this.mid = async () => {
			let { isadmin, isbotadmin } = Metadata;
			if (!Mek.isGroup) return Func.sendteks(Mek.chat, Logger.JUST_GROUP, Mek)
			if (!isadmin) return Func.sendteks(Mek.chat, Logger.JUST_ADMIN, Mek);
			if (!isbotadmin) return Func.sendteks(Mek.chat, Logger.JUST_BOT_ADMIN, Mek);
			if (Mek.args[0] == 1) {
				Conn.groupSettingUpdate(Mek.chat, "locked")
				.then(v => Func.sendteks(Mek.chat, "Success Change set edit info to admin Only...", Mek))
				.catch(e => Func.sendteks(Mek.chat, `Im sorry! failed change set edit info`, Mek));
			} else if (Mek.args[0] == 2) {
				Conn.groupSettingUpdate(Mek.chat, "unlocked")
				.then(v => Func.sendteks(Mek.chat, "Success Change set edit info to all members...", Mek))
				.catch(e => Func.sendteks(Mek.chat, `Im sorry! failed change set edit info`, Mek));
			} else return Func.sendbutton(Mek.chat, `Silahkan Pilih Button dibawah untuk mengatur siapa yang dapat mengedit info group...`, `Group Set info`, [['ADMIN ONLY', `${Mek.cmd} 1`], ['ALL MEMBERS', `${Mek.cmd} 2`]], Fake.fakeStatus("Please choose one",''))
		}
	}
}

export default Main;