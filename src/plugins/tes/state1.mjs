class Main {
	constructor(db, {Mek, Func, Logger}) {
		this.command = ["tes1"]
		this.category = "tes"
		this.mainten = "false"
		this.mid = async function () {
			Func.sendteks(Mek.chat, "Tes Sukses!!", Mek);
		}
	}
}

export default Main;
