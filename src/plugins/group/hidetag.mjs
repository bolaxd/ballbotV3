class Main {
	constructor(db, { Metadata, Func, Mek, Conn, Fake, Logger }) {
		this.command = ["hidetag", "htag", "h"];
		this.category = "group";
		this.mainten = "true";
		this.mid = async () => {
			let { isadmin } = Metadata
			if (!Mek.isGroup) return Func.sendteks(Mek.chat, Logger.JUST_GROUP, Mek)
			if (!isadmin) return Func.sendteks(Mek.chat, Logger.JUST_ADMIN, Mek);
			let ment = Metadata.members.map(v => v.id).filter(v => !db.config.developer.map(v => v+ `@s.whatsapp.net`).includes(v));
			Func.sendteks(Mek.chat, Mek.query ? Mek.query : "", Fake.fakeStatus("Hidetag Group",""), { mentions: ment});
		}
	}
}

export default Main;