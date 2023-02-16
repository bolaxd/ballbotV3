class Main{
	constructor(db, {Mek, Func, Conn, Global, Lib, Fake, Logger}) {
		this.command = ["sticker", "stiker", "s"];
		this.category = "convert";
		this.mainten = "false";
		this.mid = async () => {
			if (!Mek.quots) return Func.sendteks(Mek.chat, Logger.CONVERT_STIKER, Mek);
			if (!/(image\/(jpe?g|png)|video\/(mp4|mov))/.test(Mek.mime)) return Func.sendteks(Mek.chat, Logger.CONVERT_STIKER, Mek);
			let buffer = Mek.quoted ? await Mek.quoted.download() : await Mek.download(),
			conv = await Lib.toSticker(buffer)
			Conn.sendMessage(Mek.chat, { sticker: conv }, { quoted: Fake.fakeStatus("Sticker Bot", "") });
		};
	}
}

export default Main;