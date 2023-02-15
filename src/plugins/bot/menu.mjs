class Main {
	constructor(db, {Mek, Func, Conn, Fake}) {
		this.command = ["menu", "help"];
		this.category = "bot";
		this.mainten = "false";
		this.mid = async () => {
			let decor = `❏`,
			w = (mnu, desc) => `${decor} ${Mek.preff+mnu} ${desc ? `*${desc}*` : ''}\n`,
			menus = `( :̲̅:̲̅:[̲̅: -- Ｍｅｎｕ -- :]̲̅:̲̅:̲̅:̲̅)`
			+ `\n\n: ̗̀➛ UTAMA\n`
			+w("dashboard")
			+w("delete", "reply msg")
			+w("afk", "<reason>")
			+w("menfess", "<number>|<name>|<text>")
			
			+ `\n\n: ̗̀➛ KONVERT\n`
			+w("sticker", "image or video")
			+w("tomedia", "reply sticker")
			+w("emojimix", "<emote>+<emote>")
			
			+ `\n\n: ̗̀➛ GROUP\n`
			+w("hidetag", "<opsional-txt>")
			+w("tagall", "<opsional-txt>")
			+w("add", "<@tag or reply or number>")
			+w("kick", "<@tag or reply or number>")
			+w("promote", "<@tag or reply or number>")
			+w("demote", "<@tag or reply or number>")
			
			+ `\n\nKet:\n${decor} Pilih lah menu yang tersedia diatas!\n${decor} Ketik command menggunakan prefix (awalan bot)\n${decor} jangan sertakan tanda <> saat mengetikan command\n${decor} untuk memunculkan deakripsi ketik command dengan -i, contoh .stiker -i`
			Func.sendlink(Mek.chat, menus, db.config.botName, [["url", "Github", "https://github.com/bolaxd"]])
		}
	}
}

export default Main;