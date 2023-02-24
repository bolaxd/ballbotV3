import { db } from "../index.js";

export default class User{
	constructor(Mek) {
		this.Mek = Mek;
	}
	Expose() {
		if (!this.Mek) return;
		let s = this.Mek.sender, user = db.user[s];
		if (!user) db.user[s] = {};
		if (user) {
			// TODO: Disini adalah nilai default dari database sebelum di muat
			if (!("afk" in user)) db.user[s].afk = -1;
			if (!("rafk" in user)) db.user[s].rafk = "";
		} else db.user[s] = {
			afk: -1,
			rafk: "",
		};
	}
}