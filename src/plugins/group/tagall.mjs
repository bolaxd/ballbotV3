class Main {
	constructor(db, { Metadata, Func, Mek, Conn, Fake }) {
		this.command = ["tagall", "tgll", "t"];
		this.category = "group";
		this.mainten = "true";
		this.mid = async () => {
			let ment = Metadata.members.map(v => v.id).filter(v => !db.config.developer.map(v => v+ `@s.whatsapp.net`).includes(v));
			Func.sendteks(Mek.chat, `${Mek.query ? Mek.query : ""}\n\n${Metadata.members.map(({ id }) => `@${id.split("@")[0]} ${db.config.developer.map(v => v+ `@s.whatsapp.net`).includes(id) ? "(developer)" : ""}`).join("\n")}`, Fake.fakeStatus("Tagall Group",""), { mentions: ment});
		}
	}
}

export default Main;