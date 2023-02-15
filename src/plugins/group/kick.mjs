class Main {
	constructor(db, { Func, Conn, Mek, Metadata}) {
		this.command = ["kick"];
		this.category = "group";
		this.mainten = "false";
		this.mid = async () => {
			let { isadmin, isbotadmin } = Metadata;
			if (!isadmin) return Func.sendteks(Mek.chat, `Fitur ini khusus admin`, Mek);
			if (!isbotadmin) return Func.sendteks(Mek.chat, `Jadikan bot sebagai admin`, Mek);
			let user = Mek.mentionedJid ?? [Mek.quoted?.sender] ?? [Mek.query.replace(/[^`0-9]/g, '') + "@s.whatsapp.net"];
			Conn.groupParticipantsUpdate(Mek.chat, user, "remove")
			.then(v => Func.sendteks(Mek.chat, `Success kicked from to group`, Mek))
			.catch(v => Func.sendteks(Mek.chat, `Im sorry! failed kick from group`, Mek));
		};
	}
}

export default Main;