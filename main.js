import { db } from "./src/database/index.js";
import { color } from "@bolaxd/awokwok";
import { spawn } from "child_process";
import { createServer } from "http";
import { fileURLToPath } from "url";
import path from "path";

import Global from "./src/helper/global.helper.js";
import Start from "./src/index.js";

const start = new Start();

console.clear()
Global.info("Starting App...")
const packageCheck = async () => {
	let Package = [
		spawn("ffmpeg"),
		spawn("ffmpeg", [
		'-hide_banner',
		'-loglevel', 
		'error', 
		'-filter_complex', 
		'color',
		'-frames:v',
		'1',
		'-f', 
		'webp',
		'-'
		]),
		spawn("magick"), 
		spawn("convert"), 
		spawn("ffprobe"),
		spawn("find", ["--version"])
	]
	let check = await Promise.all(Package.map(send => Promise.race([
			new Promise((resolve) => send.on("close", (status)=> resolve(status !== 127))),
			new Promise((resolve) => send.on("error", (status)=> resolve(false))),
		])
		));
	let [ ffmpeg, ffmpegConfig, ffprobe, magick, convert, find ] = check
	if (!ffmpeg && !ffmpegConfig && !ffprobe) {
		Global.error("ffmpeg not installed, please install now with command: pkg install ffmpeg...")
		return Global.out()
	}
	if (!magick && !convert && !find) {
		Global.error("imagemagick not installed, please install now with command: pkg install imagemagick...")
		return Global.out()
	}
	serverUptime({ port: db.config.PORT, debug: true });
}
function serverUptime(options = {}) {
	let port = options.port ?? 8080;
	let customURL = db.config.router;
	let customResponse = db.config.message.toString();
	const request = async (req, res) => {
		if (options.debug) console.log(`${req.method.toLowerCase()} ${req.url}`);
		if (req.url === customURL) {
			res.writeHead(200);
			return res.end(customResponse);
		}
	};
	const server = createServer(request);
	server.on("error", async () => {
		setTimeout(async () => {
			db.config.PORT += 1;
			await serverUptime({ port: db.config.PORT, debug: true });
		}, 5000);
	});
	server.listen(port, () => {
		Global.success(`SERVER Running ON PORT ${port}`);
		start.bot();
	});
}

packageCheck();

