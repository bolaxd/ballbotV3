class Main {
	constructor({ config }, {Mek, Func, Logger, Fake}) {
		this.command = ["maintenance", "mt"]
		this.category = "owner"
		this.mainten = "false"
		this.mid = async () => {
			if (!Mek.isDev) return Func.sendteks(Mek.chat, Logger.JUST_DEV, Mek);
			if (Mek.args[0] == "aktif") {
				if (config.maintenance) return Func.sendteks(Mek.chat, Logger.SUDAH_AKTIF_MAIN, Mek)
				config.maintenance = true
				Func.sendteks(Mek.chat, `Sukses Menghidupkan nya`, Mek)
			} else if (Mek.args[0] == "mati") {
				if (!config.maintenance) return Func.sendteks(Mek.chat, Logger.SUDAH_MATI_MAIN, Mek)
				config.maintenance = false
				Func.sendteks(Mek.chat, `Sukses mematikan nya`, Mek)
			} else {
				let teks = !config.maintenance ? `Apakah kamu yakin ingin Menghidupkan mode Maintenance Bot?\nMode ini dapat meningkatkan Ram dan Cache seiring perubahan File Plugins dan Ketika File tersebut di import`
										: `Mode Maintenance sekarang aktif, apakah kamu ingin Mematikan nya?\nKonfirmasi button dibawah`
				let but = !config.maintenance ? [["Aktifkan Mode", `.${Mek.command} aktif`]]
										: [["Konfirmasi", `.${Mek.command} mati`]]
				Func.sendbutton(Mek.chat, teks, config.botName, but, Fake.fakeStatus("Mode Developer...", "")) 
			}
		}
	}
}

export default Main;
