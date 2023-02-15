let reply = false
class Main {
	constructor(db, { Mek, Fake, Func, Conn, Global}) {
		this.gold = async () => {
			let id = Mek.quoted?.id
			let id2 = Mek.sender
			if (Mek.quoted && Mek.mtype == "buttonsResponseMessage" && id in Conn.menfess) {
				Func.sendteks(Mek.chat, `Silahkan masukan pesan anda`, Mek)
				Conn.menfess[id2] = {
					id,
					msg: Conn.menfess[id].msg,
					to: Conn.menfess[id].to,
					from: Conn.menfess[id].from,
					chat: Conn.menfess[id].chat,
				}
				delete Conn.menfess[id]
				reply = true
				return !0
			}
			if (Mek.sender && id2 in Conn.menfess && reply) {
				if (Mek.quoted && Mek.mtype == "buttonsResponseMessage" && id in Conn.menfess) {
					delete Conn.menfess[id]
					return Func.sendteks(Mek.chat, `Satu satu dong bales nya...`, Mek)
				}
				Func.sendteks(Conn.menfess[id2].chat, `*@${Conn.menfess[id2].from.split("@")[0]} Anda mendapatkan pesan dari @${Conn.menfess[id2].to.split('@')[0]} Dari pesan anda sebelumnya:* \n${Conn.menfess[id2].msg}\n\n*Balasan:*\n${Mek.text}`, Fake.fakeStatus("Reply menfess...", ''), {mentions: [Conn.menfess[id2].to, Conn.menfess[id2].from]})
				Func.sendteks(Mek.chat, `Pesan anda telah terkirim`, Mek)
				delete Conn.menfess[id2]
				reply = false
			}
		}
	}
}

export default Main;