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
			let id = (await Func.sendbutton(sender, `*Anda Mendapatkan Pesan Menfess dari : ${a}*\n\n*Isi pesan:*\n${c}`, `Menfess Anonymous`, [["BALAS", `bales`]], Fake.fakeStatus("Menfess Message...", '')))?.key?.id
			Conn.menfess[id] = {
				to: sender, 
				from: Mek.sender,
				chat: Mek.chat,
				msg: c,
			}
			Func.sendteks(Mek.chat, `Pesan anda telah sukses terkirim, Silahkan tunggu beberapa saat untuk di balas...\nHarap jangan gunakan fitur ini untuk spam yaa :)`, Mek)
		}
	}
}

export default Main;