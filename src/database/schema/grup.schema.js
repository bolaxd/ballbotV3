import { db } from "../index.js";

export class Group{
	constructor(Mek) {
		this.Mek = Mek;
	}
	Expose() {
		if (!this.Mek) return;
		if (!this.Mek.isGc) return;
		let c = this.Mek.chat, chat = db.grup[c];
		if (typeof chat !== "object") db.grup[c] = {};
		if (chat) {
			// TODO: Disini adalah nilai default dari database sebelum di muat
			if (!("afk" in chat)) db.grup[c].afk = -1;
			if (!("rafk" in chat)) db.grup[c].rafk = "";
		} else db.grup[c] = {
			afk: -1,
			rafk: "",
		};
	}
}