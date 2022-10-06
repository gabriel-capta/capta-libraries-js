'use strict';
let appName = null;
var cache = [];

module.exports = class LocalTrace {
    constructor(options) {
        console.log("CLASS TRACE CONTRUCTOR", options);
        this._debug = options.debug;
        appName = options.appName;
        this._libName = options.libName;
        this._printDate = options.printDate;

        setTimeout(async()=>{
            console.log("LocalTrace flush cache", new Date());
            LocalTrace._persist();
        },30*1000);
    }

    async log(...args) {
        if (this._debug) {
            const prefix = await this._prefix();
            console.log(prefix, ...args);
            const data = {
                collection:"trace-logs", 
                data: {
                    app: appName, 
                    entry: new Date(), 
                    type:"E", 
                    message: `${prefix}`
                }
            }
            cache.push(data);
        }
    }

    async error(...args) {
        const prefix = await this._prefix();
        console.error(prefix, ...args);
        cache.push({collection:"trace-logs", data: {app: appName, entry: new Date(), type:"E", message: eval(`${prefix} ${args}`)}});
    }

    async analytics(req, res, next) {
        
        const bDt = new Date();
        next();
        const eDt = new Date();
        console.log(req.route.path);
        const data = {
            app: appName,
            host: req.headers.host,
            uri: req.originalUrl,
            method: req.method,
            statusCode: res.statusCode,
            started: bDt,
            finished: eDt,
            latency: eDt.getTime() - bDt.getTime()
        }
        cache.push({collection:"trace-hits", data: data});
    }

    static async _persist(){
        const {Repository} = require('../capta-library.js')
        const repository = new Repository();
        // repository.collection(colectionName).insert(data);
        cache.forEach(d =>{
            repository.collection(d.collection).insert(d.data);
        });
        console.log("TRACE persist cache", cache);
        cache = [];
    }

    async _prefix() {
        let [date] = new Date().toLocaleString('pt-BR').split(', ');
        let prefix = (this._printDate) ? "[" + date + " " + appName : "[" + appName;
        prefix = (this._libName) ? prefix + " " + this._libName + "]" : prefix + "]";
        return prefix;
    }
}