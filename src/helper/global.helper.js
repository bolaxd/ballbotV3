import got from "got"
import { color } from "@bolaxd/awokwok"

export default class Global {
	static async getBuffer(url) {
		return await got(url).buffer();
	}
	static async getJson(url) {
		return await got(url).json();
	}
	static async getText(url) {
		return await got(url).text();
	}
	static async getStream (url) {
		let data;
		try {
			let stream = await got.stream(url, { allowGetBody: true });
			stream.on("data", f => data += f);
			stream.end();
		} catch (e) {
			console.log(e);
		}
		return data;
	}
	static timers (date) {
		const seconds = Math.floor((date / 1000) % 60),
		minutes = Math.floor((date / (60 * 1000)) % 60), 
		hours = Math.floor((date / (60 * 60 * 1000)) % 24), 
		days = Math.floor((date / (24 * 60 * 60 * 1000)));
		return `${days ? `${days} Hari ` : ''}${hours ? `${hours} Jam ` : ''}${minutes ? `${minutes} Menit ` : ''}${seconds ? `${seconds} Detik` : ''}`;
	}
	static sizeString (des) {
		if (des === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(des) / Math.log(1024));
		return parseFloat((des / Math.pow(1024, i)).toFixed(0)) + ' ' + sizes[i];
	}
	static error (text) {
	return console.log(color.red(text));
	}
	static warn (text) {
	return console.log(color.yellow(text));
	}
	static success (text) {
	return console.log(color.green(text));
	}
	static info (text) {
	return console.log(color.cyan(text));
	}
	static out (text) {
	return process.exit();
	}
}
