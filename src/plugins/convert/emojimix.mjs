class Main {
	constructor ({config}, {Mek, Func, Conn, Lib, Global}) {
		this.command = ["emojimix", "mix"];
		this.category = "convert";
		this.mainten = "false";
		this.mid = async () => {
			let [t1, t2] = Mek.query.split("+");
			if (!t1) return Func.sendteks(Mek.chat, 'Contoh penggunaan .emojimix 🥲+🥴', Mek)
			if (!encodeURIComponent(t1).startsWith('%F0%9F')) return Func.sendteks(Mek.chat, 'Itu bukan Emote!!, emote tuh gini "☺️"', Mek)
			if (!t2) return Func.sendteks(Mek.chat, 'Contoh penggunaan .emojimix 🥲+🥴', Mek)
			if (!encodeURIComponent(t2).startsWith('%F0%9F')) return Func.sendteks(Mek.chat, 'Itu bukan Emote!!, emote tuh gini "☺️"', Mek)
			let res = await Global.getJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(t1)}_${encodeURIComponent(t2)}`);
			if (res.results[0] === undefined) return Func.sendteks(Mek.chat, "Mix emoji tidak tersedia", Mek);
			let buffer = await Global.getBuffer(res.results[0].url)
			Conn.sendMessage(Mek.chat, { sticker: await Lib.toSticker(buffer) }, { quoted: Mek })
		}
	}
}

export default Main