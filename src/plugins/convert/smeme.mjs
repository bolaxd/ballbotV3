class Main {
	constructor(db, { Func, Mek, Global, Lib, Conn, Fake}){
		this.command = ["smeme"];
		this.category = "convert";
		this.mainten = "false";
		this.mid = async () => {
			if (!/image/.test(Mek.mime)) return Func.sendteks(Mek.chat, `Reply image or sticker with command .${Mek.command} text1|text2 or send image with capt command .${Mek.command} text1|text2`, Mek)
			let [a, b] = Mek.query.split("|")
			let buffer = Mek.quoted ? await Mek.quoted.download() : await Mek.download();
			if (/(image\/webp|video\/mp4)/.test(Mek.mime)) buffer = (await Lib.toMedia(buffer, false)).buffer;
			let tes = await Lib.toUrl(buffer);
			let smemes = await Global.getBuffer(`https://api.memegen.link/images/custom/${encodeURIComponent(a)}/${encodeURIComponent(b)}.png?background=${tes}`)
			Conn.sendMessage(Mek.chat, { sticker: await Lib.toSticker(smemes) }, { quoted: Fake.fakeStatus("Smeme Bot", "") });
		};
	}
}

export default Main;