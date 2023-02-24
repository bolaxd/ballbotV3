import { EventEmitter } from "events";

export default new Map();

/**
 * GW kasih Infinity kenapa?
 * ya karna cache disini bakal nyimpen banyak data
 * gw gamau nantinya bakal ada pembatasan dari Nodejs itu sendiri
*/
EventEmitter.defaultMaxListeners = Infinity;