class Main {
	constructor(db, { Metadata, Func, Mek, Conn, Fake }) {
		this.command = ["hidetag", "htag", "h"];
		this.category = "group";
		this.mainten = "true";
		this.mid = async () => {
			let ment = Metadata.members.map(v => v.id).filter(v => !db.config.developer.map(v => v+ `@s.whatsapp.net`).includes(v));
			Func.sendteks(Mek.chat, Mek.query ? Mek.query : "", Fake.fakeStatus("Hidetag Group",""), { mentions: ment});
		}
	}
}

export default Main;