let ganti = {}

class Main {
	constructor(db, { Func, Mek, Conn, Lib, Logger}) {
		this.command = ["tomedia", "toimg", "tovid", "tomed"];
		this.category = "convert";
		this.mainten = "false";
		this.mid = async () => {
			if (Mek.quoted) {
				if (!/stickerMessage/.test(Mek.quoted.mtype)) return Func.sendteks(Mek.chat, Logger.CONVERT_MEDIA, Mek)
				let buff = await Mek.quoted.download();
				let conv = await Lib.toMedia(buff, Mek.quoted.isAnimated);
				Conn.sendMessage(Mek.chat, conv.isVideo ? { video: conv.buffer, caption: "sukses banh" } : { image: conv.buffer, caption: 'Sukse bang' }, { quoted: Mek });
				return !0
			}
			let i = Mek.sender
			Func.sendteks(Mek.chat, `Silahkan kirimkan Stiker yang ingin di konvert`, Mek)
			ganti[i] = Date.now()
			return !0
		};
		this.gold = async () => {
			let i = Mek.sender
			if ((i in ganti) && (Date.now() - ganti[i]) < 3600000) {
				if (!/stickerMessage/.test(Mek.mtype)) return Func.sendteks(Mek.chat, Logger.CONVERT_MEDIA, Mek)
				let buff = await Mek.download();
				let conv = await Lib.toMedia(buff, Mek.isAnimated);
				Conn.sendMessage(Mek.chat, conv.isVideo ? { video: conv.buffer, caption: "sukses banh" } : { image: conv.buffer, caption: 'Sukse bang' }, { quoted: Mek });
				delete ganti[i]
			}
		}
	}
}

export default Main;