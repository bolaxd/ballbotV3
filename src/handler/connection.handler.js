import { Spins, color } from "@bolaxd/awokwok";
import { Boom } from "@hapi/boom";

let after = false

export class Connection {
	constructor(UPDATE, MakeWASocket) {
		this.error = UPDATE.lastDisconnect?.error;
		this.connection = UPDATE.connection;
		this.loggedOut = MakeWASocket.DisconnectReason?.loggedOut;
		this.statusCode = new Boom(this.error).output?.statusCode;
		this.spin = new Spins({ frames: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "⚪", "⚫"], stream: process.stdout, speed: 200});
	}
	status ({ config }, Start) {
		if (this.connection == "close"){
			if (this.statusCode === this.loggedOut)
			new Start().bot();
			else new Start().bot();
		} else if (this.connection == "connecting") {
			if (!after) {
				this.spin.on(color.red("Waiting Server to Connect in Whatsapp..."));
				after = true
			}
		} else if (this.connection == "open") {
			this.spin.offPresist("🌐", color.cyan("Connection Server has connected to Whatsapp...\n"))
			after = false;
		}
	}
}
