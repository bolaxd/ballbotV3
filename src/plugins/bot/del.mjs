class Main {
	constructor ({ config }, {Mek, Func, Conn}) {
		this.command = ["del", "d", "delete"];
		this.category = "bot";
		this.mainten = "false";
		this.mid = () => {
			Conn.sendMessage(Mek.chat, { delete: { remoteJid: Mek.chat, fromMe: Mek.quoted && Mek.quoted.isBot ? true : false, id: Mek.quoted ? Mek.quoted.id : Mek.id, participant: Mek.quoted ? Mek.quoted.sender : Mek.sender}});
		};
	}
}

export default Main;