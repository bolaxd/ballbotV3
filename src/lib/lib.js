import { exec } from "child_process";
import { writeFileSync, readFileSync, unlinkSync } from "fs";
import { join } from "path";
import { fileTypeFromBuffer } from "file-type";
import ff from "fluent-ffmpeg";

export class Library {
	constructor() {
		this.png = join("tmp", "up" + ".png")
		this.webp = join("tmp", "ul" + ".webp")
		this.mp4 = join("tmp", 'uo' + ".mp4")
		this.gif = join("tmp", 'uk' + ".gif")
	}
	toSticker(bufferIn) {
		return new Promise(async (resolve, reject) => {
			let extension = (await fileTypeFromBuffer(bufferIn)).ext
			if (/(jpeg|png|jpg)/i.test(extension)) {
				await writeFileSync(this.png, bufferIn)
				await ff(this.png)
				.input(this.png)
				.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
				.toFormat('webp')
				.save(this.webp)
				.on("end", async () => {
					let b = await readFileSync(this.webp)
					await unlinkSync(this.png)
					await unlinkSync(this.webp)
					resolve(b)
				})
				.on("error", (u) => {
					unlinkSync(this.png)
					reject(u);
				});
			} else if (/(mp4|mov|avi)/i.test(extension)) {
				await writeFileSync(this.mp4, bufferIn);
				await ff(this.mp4)
				.input(this.mp4)
				.addOutputOptions(["-vcodec","libwebp","-vf","scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse","-loop","0","-ss","00:00:00","-t","00:00:10","-preset","default","-an","-vsync","0"])
				.toFormat('webp')
				.save(this.webp)
				.on("end", async () => {
					let b = await readFileSync(this.webp);
					await unlinkSync(this.mp4);
					await unlinkSync(this.webp);
					resolve(b);
				})
				.on("error", (u) => {
					unlinkSync(this.mp4);
					reject(u);
				});
			} else return reject("Buffer Not readed...");
		});
	}
	
	toMedia(bufferIn, isAnimated) {
		return new Promise(async (resolve, reject) => {
			let extension = (await fileTypeFromBuffer(bufferIn)).ext
			// if (!/webp/i.test(extension)) return reject("Hanya bisa webp")
			await writeFileSync(this.webp, bufferIn)
			if (isAnimated) {
				await exec(`convert ${this.webp} ${this.gif}`, async (err) => {
					if (err) {
						await unlinkSync(this.webp)
						return reject(err);
					}
					await exec(`ffmpeg -i ${this.gif} -pix_fmt yuv420p -c:v libx264 -movflags +faststart -filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2' ${this.mp4}`, async (err) => {
						if (err) {
							await unlinkSync(this.webp)
							await unlinkSync(this.gif)
							return reject(err);
						}
						let buff = await readFileSync(this.mp4);
						await unlinkSync(this.webp);
						await unlinkSync(this.gif);
						await unlinkSync(this.mp4);
						resolve({buffer: buff, isVideo: true});
					});
				});
			} else if (!isAnimated) {
				await exec(`ffmpeg -i ${this.webp} ${this.png}`, async (err) => {
					if (err) {
						await unlinkSync(this.webp)
						return reject(err)
					}
					let buff = await readFileSync(this.png);
					await unlinkSync(this.webp);
					await unlinkSync(this.png);
					resolve({buffer: buff, isVideo: false});
				});
			}
		})
	}
}
