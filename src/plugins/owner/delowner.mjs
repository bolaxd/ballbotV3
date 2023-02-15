class Main {
	constructor({ config }, {Conn, Mek, Func, Logger}) {
		this.command = ["odel", "delowner", "ownerdel"];
		this.category = "owner";
		this.mainten = "false";
		this.mid = async function () {
			if (!Mek.isDev) return Func.sendteks(Mek.chat, Logger.JUST_DEV, Mek);
			let user = Mek.mentionedJid[0] ? Mek.mentionedJid[0].split("@")[0] : Mek.quoted.sender ? Mek.quoted.sender.split("@")[0] : Mek.query.replace(/[^0-9]/g, '');
			if (!user) return Func.sendteks(Mek.chat, `User tidak valid`, Mek);
			let i = config.owner.findIndex(v => v == user);
			if (i === -1) return Func.sendteks(Mek.chat, `User tidak menjadi owner`, Mek);
			config.owner.splice(i, 1);
			Func.sendteks(Mek.chat, `Sukses Menghapus ${user} sebagai owner`, Mek);
		};
	}
}

export default Main;
