import { jidDecode } from "@adiwajshing/baileys";

export default class Simpl {
	constructor(Conn){
		this.conn = Conn
	}
	/**
	 * Ini adalah mentions yang digunakan unuk deteksi content yang terdafat @62xxxx
	 * @param {String} content "input content teks bertype string"
	 * @returns {Array} "Output dari function ini adalah array berisi nomor yang di decode menjadi 62xx@s.whatsapp.net"
	 * Created BY bolaxd 
	 * Warning!!! jangan hapus WM anjing
	*/
	mentions (content) {
		return content.match("@") ? [...content.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + "@s.whatsapp.net") : []
	}
	/**
	 * Ini adalah create jid fungsi nya mendecode nomor yang 62xxx:3@s.whatsapp.net menjadi 62xxx@s.whatsapp.net 
	 * Jika tidak memiliki [ :angka ] maka dia mengembalikan default nya
	 * @param {String} chat "input chat teks bertype string"
	 * @returns {String} "Output dari function ini adalah string seperti ini: 62xx@s.whatsapp.net"
	 * Created BY bolaxd 
	 * Warning!!! jangan hapus WM anjing
	*/
	createJid(chat) {
		let decode = jidDecode(chat)
		if (/:\d+@/gi.test(chat)) return decode.user && decode.server && decode.user + '@' + decode.server || chat;
		else return chat;
	}
	/**
	 * Ini send message teks yang di simple kan agar tidak susah menambahkan "{text:" / "{quoted:";
	 * @param {String} chat "input chat teks bertype string"
	 * @param {String} teks "input teks teks bertype string"
	 * @param {Object} quoted "input quoted teks bertype Object"
	 * @returns {Object} "Output dari function ini menghasilkan Object message yang di hasilkan dari Conn.sendMessage"
	 * Created BY bolaxd 
	 * Warning!!! jangan hapus WM anjing
	*/
	sendteks (chat, teks, quoted, options = {}) {
		return this.conn.sendMessage(chat, { text: teks, ...options }, { quoted });
	}
	/**
	 * Ini send buku kontak yang di sederhanakan
	 * @param {String} chat "input chat teks bertype string"
	 * @param {String} teks "input teks teks bertype string"
	 * @param {Array} arr "input arr bertype string"
	 * @param {Object} quoted "input quoted teks bertype Object"
	 * @returns {Object} "Output dari function ini menghasilkan Object message yang di hasilkan dari Conn.sendMessage"
	 * Created BY bolaxd 
	 * Warning!!! jangan hapus WM anjing
	*/
	sendkontak (chat, teks, arr = [...[satu = "", dua = "", tiga = ""]], quoted = '', opts = {}) {
		return this.conn.sendMessage(chat, { contacts: { displayName: teks, contacts: arr.map(i => ({displayName: '', vcard: 'BEGIN:VCARD\n'+'VERSION:3.0\n'+'FN:'+i[0]+'\n'+'ORG:'+i[2]+';\n'+'TEL;type=CELL;type=VOICE;waid='+i[1]+':'+i[1]+'\n'+'END:VCARD' })) }, ...opts}, {quoted})
	}
	/**
	 * send list message yang se abrek abrek di rubah jadi array simple
	 * @param {String} chat "input chat teks bertype string"
	 * @param {String} teks "input teks teks bertype string"
	 * @param {String} foot "input footer bertype string"
	 * @param {Array} arr "input arr bertype string"
	 * @param {Object} quoted "input quoted teks bertype Object"
	 * @returns {Object} "Output dari function ini menghasilkan Object message yang di hasilkan dari Conn.sendMessage"
	 * Created BY bolaxd 
	 * Warning!!! jangan hapus WM anjing
	*/
	sendlist (chat, teks, foot, arr = [...[dis = '', id = '', des = '' ]], quoted = '') {
		return this.conn.sendMessage(chat, { text: teks, footer: foot, title: null, buttonText: 'Click Here', sections: [{title: this.conn?.config?.botName, rows: arr.map(u => ({ title: u[0], rowId: u[1], description: u[2] })) }]}, { quoted })
	}
	/**
	 * send template message [ url button, call button, button reply, dan button copy otp ]
	 * options dari type button yang akan di ingin kan ada di array index ke 0
	 * @param {String} chat "input chat teks bertype string"
	 * @param {String} teks "input teks teks bertype string"
	 * @param {String} foot "input footer bertype string"
	 * @param {Array} arr "input arr bertype string"
	 * @returns {Object} "Output dari function ini menghasilkan Object message yang di hasilkan dari Conn.sendMessage"
	 * Created BY bolaxd 
	 * Warning!!! jangan hapus WM anjing
	*/
	sendlink (chat, teks, foot, but = [...[type, text, content]], options = {}) {
		let tutu = but.map(v => {
			if (v[0] == "url") return ({ urlButton: {displayText: v[1], url: v[2] }});
			else if (v[0] == "call") return ({ callButton: {displayText: v[1], phoneNumber: v[2] }});
			else if (v[0] == "button") return ({ quickReplyButton: { displayText: v[1], id: v[2] }});
			else if (v[0] == "otp") return ({ urlButton: { displayText: v[1], url: "https://www.whatsapp.com/otp/copy/"+v[2] }});
		});
		return this.conn.sendMessage(chat, { text: teks, footer: foot, templateButtons: tutu });
	}
	/**
	 * send button message yang di sederhanakan dengan 2 isi array [text, id]
	 * @param {String} chat "input chat teks bertype string"
	 * @param {String} teks "input teks teks bertype string"
	 * @param {String} foot "input footer bertype string"
	 * @param {Array} arr "input arr bertype string"
	 * @param {Object} quoted "input quoted teks bertype Object"
	 * @returns {Object} "Output dari function ini menghasilkan Object message yang di hasilkan dari Conn.sendMessage"
	 * Created BY bolaxd 
	 * Warning!!! jangan hapus WM anjing
	*/
	sendbutton (chat, teks, foot, but = [...[content, id]], quoted = "", options = {}) {
		return this.conn.sendMessage(chat, {text: teks, footer: foot, })
	}
}
