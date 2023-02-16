class Main {
	constructor(db, { Func, Conn, Mek, Metadata, Logger}) {
		this.command = ["demote"];
		this.category = "group";
		this.mainten = "false";
		this.mid = async () => {
			let { isadmin, isbotadmin } = Metadata;
			if (!Mek.isGroup) return Func.sendteks(Mek.chat, Logger.JUST_GROUP, Mek)
			if (!isadmin) return Func.sendteks(Mek.chat, Logger.JUST_ADMIN, Mek);
			if (!isbotadmin) return Func.sendteks(Mek.chat, Logger.JUST_BOT_ADMIN, Mek);
			let user = Mek.mentionedJid ?? [Mek.quoted?.sender] ?? [Mek.query.replace(/[^`0-9]/g, '') + "@s.whatsapp.net"];
			Conn.groupParticipantsUpdate(Mek.chat, user, "demote")
			.then(v => Func.sendteks(Mek.chat, `Success demote member to admin in group`, Mek))
			.catch(v => Func.sendteks(Mek.chat, `Im sorry! failed to demote member in group`, Mek));
		};
	}
}

export default Main;