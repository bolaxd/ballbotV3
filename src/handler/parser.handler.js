import { db } from "../database/index.js";

export default class Parser {
	constructor(Conn, U, MakeWASocket) {
		if (!U) return console.log("Invalid Update message baileys");
		if (!Conn) return console.log("Invalid connection from baileys");
		this.key = U.key;
		this.messageTimestamp = U.messageTimestamp;
		this.pushName = U.pushName;
		this.message = U.message;
		this.dlMessage = async function(mess) {
			try {
				let mime = (mess.msg || mess).mimetype || '', messageType = mess.mtype ? mess.mtype.replace(/Message/gi, '') : mime.split('/')[0], buffer = Buffer.from([]);
				const stream = await MakeWASocket.downloadContentFromMessage(mess, messageType);
				for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
				return buffer
			} catch (e) { console.log(e) };
		}
		this.getContentType = (content) => {
	    if (content) {
	        const keys = Object.keys(content);
	        const key = keys.find(k => (k === 'conversation' || k.endsWith('Message')) && k !== 'senderKeyDistributionMessage');
	        return key;
	    }
		}
		this.findAdmin = arr => arr.filter((v) => v.admin !== null).map((i) => i.id);
		if (U.key) {
			this.id = U.key.id;
			this.chat = U.key.remoteJid;
			this.fromMe = U.key.fromMe;
			this.isGroup = this.chat.endsWith("@g.us");
			this.isPC = this.chat.endsWith("@s.whatsapp.net");
			this.sender = Conn.Func.createJid(this.fromMe && Conn.user?.id || U.key.participant || this.chat || "");
			this.isBot = (this.id.startsWith("BAE5") || this.id.startsWith("30EB")) && this.id.length < 31
			this.isDev = db.config?.developer.map(val => val + "@s.whatsapp.net").includes(this.sender);
			this.isOwn = this.isDev && db.config?.owner.map(val => val + "@s.whatsapp.net").includes(this.sender);
			this.isMod = this.isDev && this.isOwn && db.config?.moderator.map(val => val + "@s.whatsapp.net").includes(this.sender);
		}
		if (U.message) {
			if (U.message?.messageContextInfo) delete U.message.messageContextInfo;
			if (U.message?.senderKeyDistributionMessage) delete U.message.senderKeyDistributionMessage;
			this.mtype = this.getContentType(U.message);
			this.msg = (this.mtype == "viewOnceMessageV2" ? U.message[this.mtype].message[this.getContentType(U.message[this.mtype].message)] : U.message[this.mtype])
			// if (this.msg["call"]) return
			let c
			if (this.msg?.contextInfo) {
				this.quoted = this.msg?.contextInfo?.quotedMessage
				this.mentionedJid = this.msg?.contextInfo?.mentionedJid
				c = this.quoted
			}
			if (this.msg?.url) this.download = () => this.dlMessage(this.msg)
			if (this.quoted) {
				let type = Object.keys(this.quoted)[0]
				this.quoted = this.quoted[type]
				if (['productMessage'].includes(type)) type = Object.keys(this.quoted)[0], this.quoted = this.quoted[type]
				if (typeof this.quoted === 'string') this.quoted = { text: this.quoted }
				this.quoted.mtype = type
				this.quoted.id = this.msg?.contextInfo?.stanzaId
				this.quoted.chat = this.msg?.contextInfo?.remoteJid || this.chat
				this.quoted.isBot = this.quoted.id ? (this.quoted.id.startsWith("BAE5") || this.quoted.id.startsWith("30EB")) && this.quoted.id.length < 31 : false
				this.quoted.sender = Conn.Func.createJid(this.msg.contextInfo?.participant)
				this.quoted.fromMe = this.quoted.sender === (Conn.user && Conn.user?.id)
				this.quoted.text = this.quoted.text || this.quoted.caption || this.quoted.conversation || this.quoted.contentText || this.quoted.selectedDisplayText || this.quoted.title || ''
				this.quoted.mentionedJid = this.msg.contextInfo ? this.msg.contextInfo.mentionedJid : []
				this.quoted.download = () => this.dlMessage(this.quoted)
			}
			
			this.text = this.msg?.text || this.msg?.caption || this.message?.conversation || this.msg?.contentText || this.msg?.selectedDisplayText || this.msg?.title || ''
			let cmdd = (this.mtype === 'conversation') ? this.message.conversation: (this.mtype == 'imageMessage') ? this.message.imageMessage.caption : (this.mtype == 'videoMessage') ? this.message.videoMessage.caption: (this.mtype == 'extendedTextMessage') ? this.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
			this.preff = /^[/\.!#]/.test(cmdd) ? cmdd.match(/^[/\.!#]/) : '/'
			this.cmd = (this.mtype === 'conversation' && this.message.conversation.startsWith(this.preff)) ? this.message.conversation : (this.mtype == 'imageMessage' && this.message.imageMessage.caption.startsWith(this.preff)) ? this.message.imageMessage.caption : (this.mtype == 'videoMessage' && this.message.videoMessage.caption.startsWith(this.preff)) ? this.message.videoMessage.caption : (this.mtype == 'extendedTextMessage' && this.message.extendedTextMessage.text.startsWith(this.preff)) ? this.message.extendedTextMessage.text : (this.mtype == 'buttonsResponseMessage' && this.message.buttonsResponseMessage.selectedButtonId) ? this.message.buttonsResponseMessage.selectedButtonId : (this.mtype == 'listResponseMessage') ? this.message.listResponseMessage.singleSelectReply.selectedRowId: (this.mtype == 'templateButtonReplyMessage' && this.message.templateButtonReplyMessage.selectedId) ? this.message.templateButtonReplyMessage.selectedId : (this.mtype === 'messageContextInfo') ? (this.message.buttonsResponseMessage?.selectedButtonId || this.message.listResponseMessage?.singleSelectReply.selectedRowId || this.text): ''
			this.args = this.cmd.trim().split(/ +/).slice(1);
			this.query = this.args.join(" ");
			this.command = this.cmd.slice(1).trim().split(/ +/).shift().toLowerCase();
			this.quots = this.quoted ? this.quoted : this;
			this.mime = (this.quots.msg || this.quots).mimetype || this.quots.mediaType || "";
		}
	}
}
