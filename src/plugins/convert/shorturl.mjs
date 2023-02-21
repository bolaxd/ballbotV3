let shortt = {};
let BASE_URL = "https://tinyurl.com/api-create.php"

class Main {
	constructor(db, { Func, Global, Mek}) {
		this.command = ["short", "shorturl"];
		this.category = "convert";
		this.mainten = "false";
		this.mid = async () => {
			if (Mek.query) {
				if (!/^https?:\/\//.test(Mek.query)) return Func.sendteks(Mek.chat, `URL tidak Valid!, Coba ulangi`, Mek);
				await Global.getText(BASE_URL + "?url=" + Mek.query)
				.then(v => Func.sendteks(Mek.chat, `URL Short: ${v}\nURL awal: ${Mek.query}`, Mek))
				.catch(v => Func.sendteks(Mek.chat, `Sorry Failed to shorting url because this server has not could`, Mek));
				return !0
			}
			let i = Mek.sender
			shortt[i] = Date.now()
			Func.sendteks(Mek.chat, `Masukan URL yang ingin di perpendek...`, Mek)
			return !0
		}
		this.gold = async () => {
			let s = Mek.sender
			if (s in shortt && (Date.now() - shortt[s]) < 3600000) {
				if (!/^https?:\/\//.test(Mek.text)) return Func.sendteks(Mek.chat, `URL tidak Valid!, Coba ulangi`, Mek);
				await Global.getText(BASE_URL + "?url=" + Mek.text)
				.then(v => {
					Func.sendteks(Mek.chat, `URL Short: ${v}\nURL awal: ${Mek.text}`, Mek)
					delete shortt[s]
				})
				.catch(v => {
					Func.sendteks(Mek.chat, `Sorry Failed to shorting url because this server has not could`, Mek)
					delete shortt[s]
				});
			}
		}
	}
}

export default Main;