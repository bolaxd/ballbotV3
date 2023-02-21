let ganti = {}

class Main {
	constructor(db, { Func, Conn, Mek, Metadata, Logger }){
		this.command = ["setname", "gantinama"];
		this.category = "group";
		this.mainten = "false";
		this.mid = async () => {
			let { isadmin, isbotadmin } = Metadata;
			if (!Mek.isGroup) return Func.sendteks(Mek.chat, Logger.JUST_GROUP, Mek)
			if (!isadmin) return Func.sendteks(Mek.chat, Logger.JUST_ADMIN, Mek);
			if (!isbotadmin) return Func.sendteks(Mek.chat, Logger.JUST_BOT_ADMIN, Mek);
			if (Mek.query) {
				Conn.groupUpdateSubject(Mek.chat, Mek.query)
				.then(v => Func.sendteks(Mek.chat, "Success Change name group new...", Mek))
				.catch(e => Func.sendteks(Mek.chat, `Im sorry! failed change name group`, Mek));
				return !0;
			}
			let i = Mek.sender
			Func.sendteks(Mek.chat, "Silahkan masukan Nama group baru", Mek);
			ganti[i] = Mek.chat
			return !0
		};
		this.gold = async () => {
			let i = Mek.sender;
			if (i in ganti && ganti[i] == Mek.chat) {
				Conn.groupUpdateSubject(ganti[i], Mek.text)
				.then(v => {
					Func.sendteks(Mek.chat, "Success Change name group new...", Mek)
					delete ganti[i]
				})
				.catch(e => {
					Func.sendteks(Mek.chat, `Im sorry! failed change name group`, Mek)
					delete ganti[i]
				})
			}
		};
	}
}

export default Main;