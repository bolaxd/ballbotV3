import { db } from "../index.js";

export class Schema{
	constructor(Mek) {
		this.Mek = Mek;
	}
	User() {
		if (!this.Mek) return;
		let sender = this.Mek.sender;
		let user = db[sender];
		if (typeof user !== "object") db[sender] = {};
		if (user) {
			// TODO: Disini adalah nilai default dari database sebelum di muat
			if (!("afk" in user)) db[sender].afk = -1;
			if (!("rafk" in user)) db[sender].rafk = "";
		} else db[sender] = {
			afk: -1,
			rafk: "",
		};
	}
}