import { log } from "@bolaxd/awokwok";

class Console {
	constructor(Mek, UPDATE, Metadata){
		this.chat = Mek.chat;
		this.body = typeof Mek.text == "string" ? Mek.text : '';
		this.type = Mek.mtype;
		this.isgc = Mek.isGroup;
		this.cmd = Mek.cmd;
		this.query = Mek.query;
		this.sender = Mek.sender;
		this.iscmd = this.body.startsWith(Mek.preff)
		this.notif = UPDATE.messageStubType;
		this.subject = Metadata.metadata?.subject;
		this.decor = ['•≫', 'シ','જ','✾', '✼', '˚❀'];
		// TODO : function atau alat mempermudah
		this.cutting = (teks, ln) => teks.length > ln ? `${teks.substr(0, ln)}\n<More${teks.length - ln} Character>` : teks;
		this.pref = this.decor[Math.floor(Math.random() * this.decor.length)]
	}
	async run() {
		if (this.chat == "status@broadcast") return;
		if (!this.notif) {
			log(`${this.pref} ${this.iscmd ? `CMD: ${this.cmd}` : `BODY: ${this.cutting(this.body, 200) || this.type}`}`);
			log(`${this.pref} SENDER: ${this.sender.split('@')[0]}`);
			log(`${this.pref} CHAT: ${this.isgc ? this.subject : this.sender.split('@')[0]}`);
			log(`${this.pref} TIME: ${new Date().toDateString()}\n`);
		} else if (this.notif && this.isgc) {
			log(	'╔⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤╗')
			log(`   •❅───✧NOTIFICATION UPDATE GROUP✧───❅•`);
			log(this.subject)
			log(`${this.pref} Update: ${this.notif == 21 ? "Subject group" : this.notif == 22 ? "Profile group" : this.notif == 25 && this.notif == 26 ? "Settings group" : this.notif == 27 ? "Add group" : this.notif == 28 ? "kick group" : this.notif == 29 ? "promote group" : this.notif == 30 ? "demote group" : this.notif == 32 ? "Leave group" : ''}`)
			log(`${this.pref} TIME: ${new Date().toDateString()}`);
			log(	'╚⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤╝\n')
		}
	}
}

export default Console;