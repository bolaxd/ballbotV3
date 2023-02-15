class Main {
	constructor({ user }, {Mek, Func, Fake}){
		this.command = ["afk"];
		this.category = "bot";
		this.mainten = "false";
		this.mid = async () => {
			user[Mek.sender].afk = Date.now();
			user[Mek.sender].rafk = Mek.query ? Mek.query : "Tanpa alasan";
			Func.sendteks(Mek.chat, `Kamu telah nge- AFK sekarang dengan alasan ${Mek.query ? Mek.query : "Tanpa alasan"}`, Fake.fakeStatus("Afk is Now", ''));
		};
	}
}

export default Main;