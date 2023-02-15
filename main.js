import { db } from "./src/database/index.js";
import { createServer } from "http";
import { fileURLToPath } from "url";
import path from "path";
import Start from "./src/index.js";
import { spawn } from "child_process";

const start = new Start();

console.clear();
console.log("Check package...");
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
	let [ffmpeg, ffmpegConfig, magick, convert, ffprobe, find] = check
	if (!ffmpeg && !ffmpegConfig && !ffprobe) return console.error("FFMPEG Tidak di install !\nMohon install terlelbih dahulu dengan mengetikkan: pkg install ffmpeg")
	if (!magick && !convert && !find) return console.error("IMAGEMAGICK Tidak di install !\nMohon install terlelbih dahulu dengan mengetikkan: pkg install imagemagick")
	console.log("Check package success...")
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
		console.log("PORT error, Build in again PORT");
		setTimeout(async () => {
			db.config.PORT += 1
			await serverUptime({ port: db.config.PORT, debug: true });
		}, 5000)
	});
	server.listen(port, () => {
		console.clear();
		console.log(`Server listening on port ${port}`);
		start.bot();
	});
}

packageCheck()

