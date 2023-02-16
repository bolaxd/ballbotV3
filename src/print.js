import lol from "lolcatjs";

lol.options.seed = Math.round(Math.random() * 1200);
lol.options.colors = true;

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
			lol.fromString(`${this.pref} ${this.iscmd ? `CMD: ${this.cmd}` : `BODY: ${this.cutting(this.body, 200) || this.type}`}`);
			lol.fromString(`${this.pref} SENDER: ${this.sender.split('@')[0]}`);
			lol.fromString(`${this.pref} CHAT: ${this.isgc ? this.subject : this.sender.split('@')[0]}`);
			lol.fromString(`${this.pref} TIME: ${new Date().toDateString()}`);
		} else if (this.notif && this.isgc) {
			lol.fromString(	'╔⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤╗')
			lol.fromString(`   •❅───✧NOTIFICATION UPDATE GROUP✧───❅•`);
			lol.fromString(this.subject)
			lol.fromString(`Update: ${this.notif == 21 ? "Subject group" : this.notif == 22 ? "Profile group" : this.notif == 25 && this.notif == 26 ? "Settings group" : this.notif == 27 ? "Add group" : this.notif == 28 ? "kick group" : this.notif == 29 ? "promote group" : this.notif == 30 ? "demote group" : this.notif == 32 ? "Leave group" : ''}`)
			lol.fromString(`${this.pref} TIME: ${new Date().toDateString()}`);
			lol.fromString(	'╚⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤╝')
		}
	}
}

export default Console;