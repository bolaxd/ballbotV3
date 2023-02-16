import { Metadata } from "../config/cache.config.js";

export class Notification {
	constructor(Mek, Conn, UPDATE) {
		this.debug = false; // Jika ini dirubah false maka console tidak akan muncul
		this.log = (text) => this.debug ? console.log(text) : null
		this.metadata = async () => {
			let bot = await Conn.Func.createJid(Conn.user.id)
			if (Mek.isGroup) {
				if (!Metadata.has(Mek.chat)) {
					Metadata.set(Mek.chat, await Conn.groupMetadata(Mek.chat).catch(_ => {}));
					this.log(`Creating metadata group in id: ${Mek.chat}`);
					return !0
				}
				switch (UPDATE.messageStubType) {
					case 21: {
						let i = Metadata.get(Mek.chat);
						i.subject = UPDATE.messageStubParameters.join();
						i.subjectOwner = UPDATE.key.participant;
						i.subjectTime = Date.now();
						Metadata.set(Mek.chat, i);
						this.log(`Synchronize metadata ${Mek.chat}\n---> UPDATE:\n± subject\n± subjectOwner\n± subjectTime`);
						} break;
					case 25: {
						let i = Metadata.get(Mek.chat), rstrc;
						if (UPDATE.messageStubParameters.includes("off")) rstrc = false; 
						else if (UPDATE.messageStubParameters.includes("on")) rstrc = true;
						i.restrict = rstrc;
						Metadata.set(Mek.chat, i);
						this.log(`Synchronize metadata ${Mek.chat}\n---> UPDATE:\n± restrict`);
					} break;
					case 26: {
						let i = Metadata.get(Mek.chat), annc;
						if (UPDATE.messageStubParameters.includes("off")) annc = false; 
						else if (UPDATE.messageStubParameters.includes("on")) annc = true;
						i.announce = annc;
						Metadata.set(Mek.chat, i);
						this.log(`Synchronize metadata ${Mek.chat}\n---> UPDATE:\n± announce`);
					} break;
					case 27:
					case 71: {
						let i = Metadata.get(Mek.chat);
						UPDATE.messageStubParameters.map(o => i.participants.push({id: o, admin: null}), i.size += 1);
						Metadata.set(Mek.chat, i);
						this.log(`Synchronize metadata ${Mek.chat}\n\n---> UPDATE:\n± participants\n± size`);
					} break;
					case 28: 
					case 32: {
						if (UPDATE.messageStubParameters.includes(bot)) {
							Metadata.delete(Mek.chat)
							this.log(`Deleting metadata ${Mek.chat}\n\n---> BOT has been kicked from group`);
							return !0
						}
						let i = Metadata.get(Mek.chat);
						UPDATE.messageStubParameters.map(p => i.size -= 1, i.participants.splice(i.participants.findIndex(v=> v.id == p), 1));
						Metadata.set(Mek.chat, i);
						this.log(`Synchronize metadata ${Mek.chat}\n\n---> UPDATE:\n± participants\n± size`);
					} break;
					case 29: {
						let i = Metadata.get(Mek.chat);
						UPDATE.messageStubParameters.map(p => i.participants.splice(i.participants.findIndex(v=> v.id == p), 1), i.participants.push({id: p, admin: "admin"}));
						Metadata.set(Mek.chat, i);
						this.log(`Synchronize metadata ${Mek.chat}\n\n---> UPDATE:\n± participants\n± size`);
					} break;
					case 30: {
						let i = Metadata.get(Mek.chat);
						UPDATE.messageStubParameters.map(p => i.participants.splice(i.participants.findIndex(v=> v.id == p), 1), i.participants.push({id: p, admin: null}));
						Metadata.set(Mek.chat, i);
						this.log(`Synchronize metadata ${Mek.chat}\n\n---> UPDATE:\n± participants\n± size`);
					} break;
					default: {
						let eph = Mek.msg?.ephemeralExpiration
						if (/protocolMessage/.test(Mek.mtype) && Mek.msg?.type == 3) {
							let i = Metadata.get(Mek.chat);
							i.ephemeralDuration = eph
							Metadata.set(Mek.chat, i);
							this.log(`Synchronize metadata ${Mek.chat}\n\n---> UPDATE:\n± ephemeralDuration`);
						}
					}
				}
			}
		}
		this.getMeta = async () => {
			if (!Metadata.has(Mek.chat)) return { message: "initial metadata is being loaded" }
			let metadata = Mek.isGroup ? Metadata.get(Mek.chat) : {} || {},
			members = Mek.isGroup ? metadata?.participants : [] || [],
			admins = Mek.isGroup ? Mek.findAdmin(members) : [] || [],
			bot = await Conn.Func.createJid(Conn.user.id)
			return {
				metadata,
				members,
				admins,
				isadmin: Mek.isGroup ? admins.includes(Mek.sender) : null,
				isbotadmin: Mek.isGroup ? admins.includes(bot) : null,
			}
		}
	}
}