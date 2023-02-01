[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

### ╰┈➤ BALLBOT V3

Repository ini adalah lanjutan dari repository ballbotV2
Didalam repository ini ballbot menjadikan semuanya menjadi class 
dan Berat Ram Bot ini ringan sekali...

<audio src="/media/audio/kucing.mp3" autoplay controls></audio> 

<p align="center">
<img width="" src="https://img.shields.io/github/repo-size/bolaxd/ballbotV3?color=lightblue&label=Repo%20Size&style=for-the-badge&logo=appveyor">
</p>

> Minimal Star dulu untuk menggunakan Repository ini.
Bot ini masih di development [ Jadi agak sabar yahh ].
tetapi sistem dari bot ini sudah di optimalkan [ Tinggal Fitur ].
karena Bot ini sebelumnya dimasukan ke Github dalam Mode private.

### How to Install ?

Bot ini cocok di run di VPS, Panel, Rdp, Termux [ Replit belum support ]
Diperlukan ```Nodejs Versi 18``` keatas

#### 1. Termux | vps | termux

**follow the command below**

```
git clone https://github.com/bolaxd/ballbotV3
cd ballbotV3
npm install
npm test
```

### Bagaimana cara mensetting bot pertama kali?

Anda cukup membuka file ```config.json``` pada direktory root folder lalu anda bisa edit seperlu anda disitu

file ```config.json``` tersebut sudah di lengkapi auto save, jadi ketika anda memanggil file tersebut lalu anda menambahkan ```db[key] = value```
untuk contoh nya anda bisa lihat di beberapa file disana

### Bagaimana cara menambahkan Fitur?

Pertama yang harus kalian lihat didalam repo ini adalah letak plugin berada & letak handler untuk pemanggilan plugin
letak plugin terdapat di folder ```src/plugins/``` dan Untuk pemanggilan nya berada pada folder ```src/handler/message.handler.js```

Kemudian jika sudah di ketahui letak plugin dan handler nya lanjut anda harus memahami apa itu constructor javascript 
anda bisa mengunjungi Docs ini <a href="https://www.google.com/url?sa=t&source=web&rct=j&url=https://developer.mozilla.org/id/docs/Web/JavaScript/Reference/Classes/constructor&ved=2ahUKEwiCzLe2p_D8AhUucGwGHQn1BDUQFnoECBIQAQ&usg=AOvVaw3j1frsm7-FUgIQrpPEt8G0">Class and Constructor</a>
Anda Juga perlu paham apa itu ESM Anda bisa baca Pelajari disini <a href="https://www.google.com/url?sa=t&source=web&rct=j&url=https://nodejs.org/api/esm.html&ved=2ahUKEwiFs_K9qPD8AhWb7TgGHWqqC5cQFnoECAkQAQ&usg=AOvVaw372Gosks9CngBdfUXXnvHk">Esm Javascript</a>

Kemudian tambahkan Syntax seperti dibawah ini:
```js
class Main {
	constructor(Conn, Mek) {
		this.command = [] // Command
		this.category = "" // Category
		this.mainten = "false" // boolean type in string mode
		this.mid = async () => {
			let {Func, Logger, config} = Conn;
			// Disini adalah Isi plugin
		}
	}
}

export default Main;

```

Ribet yaa :V

Ya emang! Anda harus berjuang disini untuk membentuk fitur andam jika sebelum nya anda punya Bot yang memiliki Fitur anda bisa memindahkan disini
Dari Syntax diatas disini menjelaskan ```this``` ini adalah Object hasil function constructor yang dimana constructor adalah Function bawaan dari ```class javascript```
```this``` tersebut berisi command (array), category (string), mainten (string boolean), mid (function)
this.mid disini function yang di khususkan ketika anda menggunakan this.command, jadi ketika anda menggunakan this.mid tetapi anda tidak menggunakan this.command maka fitur tersebut tidak akan di eksekusi

## Dan bagaimana cara membuat Plugin terpanggil sebelum command?

untuk membuat plugin sebelum command di eksekusi anda cukup mengganti function ```this.mid``` tadi menjadi ```this.top```
dan anda tidak perlu menyertakan this.command, this.category, dan this.mainten

contoh nya seperti dibawah ini:

```js
class Main {
	constructor(Conn, Mek) {
		this.top = async () => {
			let {Func, Logger, config} = Conn;
			// Disini adalah Isi plugin
		}
	}
}

export default Main;
```
 Ini mudah sekali :V
 tapi ```PERLU DI INGAT```: Menambahkan plugin top disini harus benar sintaksis nya, dalam artian harus cek terlebih dahulu agar tidak terjadi spam error kirim ke owner setiap ada pesan baru yang masuk 
 Tetapi ini masih perlu saya tingkat kan, jadi mohon doa nya saja :) 
 
## dan bagaimana cara membuat custom Prefix?

disini saya agak menambahkan syntaksis lagi kepada ```plugin mid``` untuk membuat ```plugin custom```
contoh :
```js
class Main {
	constructor(Conn, Mek) {
		this.prefix = ">";
		this.category = "";
		this.mainten = "false";
		this.custom = async (query) => {
			let {Func, Logger, config} = Conn;
			// Disini adalah Isi plugin
		}
	}
}

export default Main;
```

tapi disini masih terdapat kekurangan, dimana saya membuat prefix ini harus berbeda, yang dimana jika sama maka akan tereksekusi semua
contoh Salah:
file 1 index.one.mjs 
```js
		this.prefix = ">>"
```
file 2 index.two.mjs 
```js
		this.prefix = ">"
```
Dari contoh diatas kita akan dibalas bot 2 kali, karena kesamaan caracter yang di gunakan untuk prefix tersebut

contoh benar :
file 1 index.one.mjs 
```js
		this.prefix = "=>"
```
file 2 index.two.mjs 
```js
		this.prefix = ">"
```
diatas sini adalah contoh benar, ketika prefix nya (```=```) dan file kedua awalan nya (```>```) maka ini jelas berbeda

## Bagaimana cara mengambil query setelah custom prefix ?

Nah ini tidak perlu di pikirkan lagi, saya telah membuat nya sebagai object kiriman dari function ```this.custom```
```js
		this.custom = async (query) => {
		// query == slice at custom prefix
```
Nah anda bisa menggunakan ```query``` diatas

Jika anda masih pusing dan kepala puyeng?? Anda bisa tanyakan saja di group kami! :v 

[![Grup WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/Joejcs0ebWl5Kqn97YEl4z)

### Coder
[![bolaxd](https://github.com/bolaxd.png?size=100)](https://github.com/bolaxd)

### Library Baileys Recoder By 
[![Amiruldev20](https://github.com/Amiruldev20.png?size=100)](https://github.com/Amiruldev20)
