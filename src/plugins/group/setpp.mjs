let ganti = {}

class Main {
	constructor(db, { Func, Conn, Mek, Metadata, Logger, Lib }){
		this.command = ["setpp", "setprofile"];
		this.category = "group";
		this.mainten = "false";
		this.mid = async () => {
			let { isadmin, isbotadmin } = Metadata;
			if (!Mek.isGroup) return Func.sendteks(Mek.chat, Logger.JUST_GROUP, Mek)
			if (!isadmin) return Func.sendteks(Mek.chat, Logger.JUST_ADMIN, Mek);
			if (!isbotadmin) return Func.sendteks(Mek.chat, Logger.JUST_BOT_ADMIN, Mek);
			if (/imageMessage/i.test(Mek.mtype)) {
				Func.createpp(Mek.chat, await Mek.download())
				.then(v => Func.sendteks(Mek.chat, "Success Change Profile group new...", Mek))
				.catch(e => Func.sendteks(Mek.chat, `Im sorry! failed change Profile group`, Mek));
				return !0;
			}
			let i = Mek.sender
			Func.sendteks(Mek.chat, "Silahkan Kirim Foto yang akan di bikin Profile group baru", Mek);
			ganti[i] = Mek.chat
			return !0
		};
		this.gold = async () => {
			let i = Mek.sender;
			if (i in ganti && ganti[i] == Mek.chat) {
				if (!/(image|sticker)Message/i.test(Mek.mtype)) return Func.sendteks(Mek.chat, `Silahkan kirimkan foto yang ingin di jadikan profile group`, Mek)
				let buffer = /stickerMessage/i.test(Mek.mtype) ? (await Lib.toMedia(await Mek.download(), false)).buffer : await Mek.download()
				Func.createpp(ganti[i], buffer)
				.then(v => {
					Func.sendteks(Mek.chat, "Success Change description group new...", Mek)
					delete ganti[i]
				})
				.catch(e => {
					Func.sendteks(Mek.chat, `Im sorry! failed change description group`, Mek)
					delete ganti[i]
				})
			}
		};
	}
}

export default Main;