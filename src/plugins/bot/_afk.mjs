class Main {
	constructor({ user }, { Mek, Fake, Func, Global}) {
		this.gold = async () => {
			if (user[Mek.sender].afk > -1) {
				Func.sendteks(Mek.chat, `Kamu telah berhenti nge- AFK\nAlasan nge AFK : ${user[Mek.sender].rafk}\nKurun Waktu : ${Global.timers(Date.now() - user[Mek.sender].afk)}`, Fake.fakeStatus("Stoping AFK", ''))
				user[Mek.sender].afk = -1
				user[Mek.sender].rafk = ""
			}
			for (let u of [...new Set([...(Mek.mentionedJid || []), ...(Mek.quoted ? [Mek.quoted.sender] : [])])]) {
				if (!user[u]) continue;
				if (user[u] && user[u].afk <= -1) continue;
				Func.sendteks(Mek.chat, `STOP...\nJangan tag dia! dan jangan Reply dia\nDia bisa terbangun dari AFK...\nDia AFK sejak ${Global.timers(Date.now() - user[u].afk)} yang lalu...\nAlasan dia nge- AFK adalah: ${user[u].rafk}`, Mek)
			}
		}
	}
}

export default Main;