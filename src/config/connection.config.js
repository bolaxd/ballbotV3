import Pino from "pino";
import { db } from "../database/index.js";

/**
 * Using config connection see in docs @adiwajsing/baileys 
 * Using level silent from pino query string 
 * by Bolaxd github 
 * you cannot edit this [ warning!!! ]
*/
const LOG = Pino({ level: "silent" })

export default class ConnectionConfig {
	constructor() {
		let _d = db.config?.isOnline, _c = db.config?.longQR
		this.logger = LOG
		this.markOnlineOnConnect = _d;
		this.printQRInTerminal = true
		this.generateHighQualityLinkPreview = true 
		this.qrTimeout = _c;
		this.browser = ["bolaxd", "safari", "1.0.0"]
		this.patchMessageBeforeSending = (message) => { // Supaya list message dan button template work
			const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
			if (requiresPatch) message = { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {} }, ...message } } };
			return message;
		}
	}
}
