import { Boom } from "@hapi/boom";

export class Connection {
	constructor(UPDATE, MakeWASocket) {
		this.error = UPDATE.lastDisconnect?.error;
		this.connection = UPDATE.connection;
		this.loggedOut = MakeWASocket.DisconnectReason?.loggedOut;
		this.statusCode = new Boom(this.error).output?.statusCode;
	}
	status ({ config }, {Func, Logger, Fake}, Start) {
		if (this.connection == "close"){
			if (this.statusCode === this.loggedOut)
			new Start().bot(), console.log("Restarting...");
			else new Start().bot();
		} else if (this.connection == "connecting")
			console.log("Connecting...");
		else if (this.connection == "open")
			console.warn("Connected...")
			// Func.sendteks(config.developer[1] + "@s.whatsapp.net", Logger.TERKONEK, Fake.fakeStatus("Notification...", ''));
	}
}
