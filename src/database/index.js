import { readFileSync, accessSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dirr = join(dirname(fileURLToPath(import.meta.url)), "file");
const dbName = "database.json"
const file = {
	user: join(dirr, "user." + dbName),
	grup: join(dirr, "grup." + dbName),
	config: join(".", "config.json"),
}
try { 
	accessSync(file.user); /* check is file */ }
catch (e) { 
	writeFileSync(file.user, JSON.stringify({}, null, 2)); /* Write Default */ }
try { 
	accessSync(file.grup); /* check is file */ }
catch (e) { 
	writeFileSync(file.grup, JSON.stringify({}, null, 2)); /* Write Default */ }
try { 
	accessSync(file.config); /* check is file */ }
catch (e) { 
	writeFileSync(file.config, JSON.stringify({}, null, 2)); /* Write Default */ }

export let db = {
	user: JSON.parse(readFileSync(file.user)),
	grup: JSON.parse(readFileSync(file.grup)),
	config: JSON.parse(readFileSync(file.config)),
};

setInterval(async() => {
	writeFileSync(file.user, JSON.stringify(db.user, null, 2)); /* Write from read file db user */ 
	writeFileSync(file.grup, JSON.stringify(db.grup, null, 2)); /* Write from read file db grup */ 
	writeFileSync(file.config, JSON.stringify(db.config, null, 2)); /* Write from read file db bot */ 
}, 990);