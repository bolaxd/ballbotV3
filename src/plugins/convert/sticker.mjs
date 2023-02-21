let ganti = {}

class Main{
	constructor(db, {Mek, Func, Conn, Global, Lib, Fake, Logger}) {
		this.command = ["sticker", "stiker", "s"];
		this.category = "convert";
		this.mainten = "false";
		this.mid = async () => {
			if (Mek.mime && (/(image|video)/.test(Mek.mime) || /(image|video)/.test(Mek.quoted.mime))) {
				let buffer = Mek.quoted ? await Mek.quoted.download() : await Mek.download(),
				conv = await Lib.toSticker(buffer)
				Conn.sendMessage(Mek.chat, { sticker: conv }, { quoted: Fake.fakeStatus("Sticker Bot", "") });
				return !0
			}
			let i = Mek.sender
			ganti[i] = Date.now();
			Func.sendteks(Mek.chat, `Kirim Image / video nya...`, Mek)
			return !0
		};
		this.gold = async () => {
			let i = Mek.sender
			if (i in ganti && (Date.now() -ganti[i]) < 3600000) {
			if (!/(image|video)/.test(Mek.mtype)) return Func.sendteks(Mek.chat, `Kirim Image / video nya...`, Mek)
				let conv = await Lib.toSticker(await Mek.download())
				Conn.sendMessage(Mek.chat, { sticker: conv }, { quoted: Fake.fakeStatus("Sticker Bot", "") });
				delete ganti[i]
			}
		}
	}
}

export default Main;