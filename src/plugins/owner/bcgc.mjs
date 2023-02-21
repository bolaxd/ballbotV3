class Main {
	constructor(db, { Func, Conn, Mek, Fake, Logger}) {
		this.command = ['bcgc'];
		this.category = "owner";
		this.mainten = "false";
		this.mid = async () => {
			if (!Mek.isOwn) return Func.sendteks(Mek.chat, Logger.JUST_OWNER, Mek);
			let all = Object.keys(await Conn.groupFetchAllParticipating());
			for (let i of all) {
				await Func.sendteks(i, Mek.query + `\n\nDate: ${new Date().toLocaleString()}\nFrom: ${Mek.sender.split("@")[0]}`, Fake.fakeStatus("broadcast", ""));
			}
			Func.sendteks(Mek.chat, `Done...`, Mek);
		};
	}
}

export default Main;