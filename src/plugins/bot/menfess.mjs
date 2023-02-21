let menfess = {}, reply = {}

class Main{
	constructor(db, {Mek, Func, Conn, Fake}){
		this.command = ["menfes", "confes", "menfess", "confess"];
		this.category = "bot";
		this.mainten = "false";
		this.mid = async () => {
			let [a, b, c] = Mek.query.split("|");
			if (!a) return Func.sendteks(Mek.chat, `Masukan Nomor mu, contoh : .${Mek.command} 62xxxx | Iqbal | Hai sayang apakabar`, Mek)
			if (!b) return Func.sendteks(Mek.chat, `Masukan Nama mu, contoh : .${Mek.command} 62xxxx | Iqbal | Hai sayang apakabar`, Mek)
			if (!c) return Func.sendteks(Mek.chat, `Masukan Pesan mu, contoh : .${Mek.command} 62xxxx | Iqbal | Hai sayang apakabar`, Mek)
			if (c.length > 700) return Func.sendteks(Mek.chat, `Maaf Pesan anda terlalu panjang!`, Mek);
			let sender = a.replace(/[^0-9]/g, '') + "@s.whatsapp.net"
			let id = (await Func.sendbutton(sender, `*Anda Mendapatkan Pesan Menfess dari: ${b}*\n\n*Isi pesan:*\n${c}`, `Menfess Anonymous`, [["BALAS", `bales`]], Fake.fakeStatus("Menfess Message...", '')))?.key?.id
			menfess[id] = {
				to: sender, 
				from: Mek.sender,
				chat: Mek.chat,
				msg: c,
			}
			Func.sendteks(Mek.chat, `Pesan anda telah sukses terkirim, Silahkan tunggu beberapa saat untuk di balas...\nHarap jangan gunakan fitur ini untuk spam yaa :)`, Mek)
			return !0;
		}
		this.gold = async () => {
			let id = Mek.quoted?.id
			let id2 = Mek.sender
			if (Mek.quoted && Mek.mtype == "buttonsResponseMessage" && id in menfess) {
				Func.sendteks(Mek.chat, `Silahkan masukan pesan anda`, Mek)
				menfess[id2] = {
					id,
					msg: menfess[id].msg,
					to: menfess[id].to,
					from: menfess[id].from,
					chat: menfess[id].chat,
				}
				delete menfess[id]
				reply[id2] = true
				return !0
			}
			if (Mek.sender && (id2 in menfess) && reply[id2]) {
				if (Mek.quoted && Mek.mtype == "buttonsResponseMessage" && id in menfess) {
					delete menfess[id]
					return Func.sendteks(Mek.chat, `Satu satu dong bales nya...`, Mek)
				}
				Func.sendteks(menfess[id2].chat, `*@${menfess[id2].from.split("@")[0]} Anda mendapatkan pesan dari @${menfess[id2].to.split('@')[0]} Dari pesan anda sebelumnya:* \n${menfess[id2].msg}\n\n*Balasan:*\n${Mek.text}`, Fake.fakeStatus("Reply menfess...", ''), {mentions: [menfess[id2].to, menfess[id2].from]})
				Func.sendteks(Mek.chat, `Pesan anda telah terkirim`, Mek)
				delete menfess[id2]
				delete reply[id2]
			}
		}
	}
}

export default Main;