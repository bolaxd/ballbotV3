import { db } from "./src/database/index.js";
import { createServer } from "http";
import { fileURLToPath } from "url";
import path from "path";
import Start from "./src/index.js";
// import yargs from 'yargs'

const start = new Start();

function serverUptime(options = {}) {
	let port = options.port ?? 8080;
	let customURL = db.config.router;
	let customResponse = db.config.message.toString();
	const request = async (req, res) => {
		if (options.debug) console.log(`::debug:: [repl-uptime] => ${req.method.toLowerCase()} ${req.url}`);
		if (req.url === customURL) {
			res.writeHead(200);
			return res.end(customResponse);
		}
	};
	const server = createServer(request);
	server.on("error", async () => {
		console.log("Maaf PORT error!!!\nTunggu sebentar sedang membangun Port Baru");
		setTimeout(async () => {
			await console.clear();
			db.config.PORT += 1
			await serverUptime({ port: db.config.PORT, debug: true });
		}, 5000)
	});
	server.listen(port, () => {
		console.clear();
		console.log(`::debug:: [repl-uptime] => Server listening on port ${port}\nSilahkan Kunjungi Link Lokal dibawah ini:\nhttp://localhost:${port}`);
		start.bot();
	});
}
serverUptime({ port: db.config.PORT, debug: true });
