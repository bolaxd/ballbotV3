class Main {
	constructor ({ config }, {Mek, Func, Conn}) {
		this.command = ["del", "d", "delete"];
		this.category = "bot";
		this.mainten = "false";
		this.mid = () => {
			if (Mek.quoted && Mek.quoted.isBot) {
				Conn.sendMessage(Mek.chat, { delete: { remoteJid: Mek.chat, fromMe: true, id: Mek.quoted.id, participant: Mek.quoted.sender}});
			} else {
				Conn.sendMessage(Mek.chat, { delete: { remoteJid: Mek.chat, fromMe: false, id: Mek.quoted.id ? Mek.quoted.id : Mek.id, participant: Mek.quoted.sender ? Mek.quoted.sender : Mek.sender}});
			}
		};
	}
}

export default Main;