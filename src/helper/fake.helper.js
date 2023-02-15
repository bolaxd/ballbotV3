export class Fake {
	constructor(content = "", thumbnail = "", source = "") {
		this.content = content;  /* content from constructor for fake function in bottom*/
		this.thumbnail = thumbnail;  /* thumbnail url from constructor for fake function in bottom*/
		this.source = source;  /* source url from constructor for fake function in bottom*/
	}
	/**
	 * Fake status, can you using this ?
	 * its simple to using fake from class
	 * @param {String} content "content is only string message in your reply"
	 * @param {String} thumbnail "thumbnail is url media images"
	 * @returns {Object} "returns object because quoted in baileys using object"
	*/
	fakeStatus(content = this.content, thumbnail = this.thumbnail || "") {
		return {
			key: {
				remoteJid: "status@broadcast",
				participant: "0@s.whatsapp.net",
			},
			message: {
				orderMessage: {
					itemCount: 2022,
					status: 1,
					surface: 1,
					message: content,
					orderTitle:``,
					thumbnail,
					sellerJid:"0@s.whatsapp.net"
				}
			}
		}
	};
	/**
	 * Fake thumbnail Large 
	 * you can use this fake with using params from constructor or with this param
	 * @param {String} content "yagitulahh pusinh nambahin gw asyu"
	 * @param {String} thumbnail "description"
	 * @param {String} Source "kontt"
	 * @returns {Object} ""
	*/
	fakeThumbLarge(content = this.content, thumbnail = this.thumbnail, source = this.source) {
		return {
			contextInfo: {
				isForwarded:true,
				forwardingScore: 9999,
				externalAdReply: {
					mediaType:1,
					title: content,
					thumbnail: { url: thumbnail},
					thumbnailUrl: thumbnail,
					sourceUrl: source,
					renderLargerThumbnail:true
				}
			}
		}
	};
}
