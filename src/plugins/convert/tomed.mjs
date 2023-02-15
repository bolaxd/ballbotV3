class Main {
	constructor(db, { Func, Mek, Conn, Lib}) {
		this.command = ["tomedia"];
		this.category = "convert";
		this.mainten = "false";
		this.mid = async () => {
			if (!Mek.quoted) return Func.sendteks(Mek.chat, `reply stiker yang ingin dikonvert menjadi media image / video`, Mek);
			if (!/webp/.test(Mek.mime)) return Func.sendteks(Mek.chat, `Reply media stiker!`, Mek)
			let buff = await Mek.quoted.download();
			let conv = await Lib.toMedia(buff, Mek.quoted.isAnimated);
			Conn.sendMessage(Mek.chat, conv.isVideo ? { video: conv.buffer, caption: "sukses banh" } : { image: conv.buffer, caption: 'Sukse bang' }, { quoted: Mek });
		};
	}
}

export default Main;