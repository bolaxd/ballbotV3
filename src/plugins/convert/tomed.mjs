class Main {
	constructor(db, { Func, Mek, Conn, Lib, Logger}) {
		this.command = ["tomedia"];
		this.category = "convert";
		this.mainten = "false";
		this.mid = async () => {
			if (!Mek.quoted) return Func.sendteks(Mek.chat, Logger.CONVERT_MEDIA, Mek);
			if (!/webp/.test(Mek.mime)) return Func.sendteks(Mek.chat, Logger.CONVERT_MEDIA, Mek)
			let buff = await Mek.quoted.download();
			let conv = await Lib.toMedia(buff, Mek.quoted.isAnimated);
			Conn.sendMessage(Mek.chat, conv.isVideo ? { video: conv.buffer, caption: "sukses banh" } : { image: conv.buffer, caption: 'Sukse bang' }, { quoted: Mek });
		};
	}
}

export default Main;