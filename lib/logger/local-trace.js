'use strict';
let appName = null;
var cache = [];

module.exports = class LocalTrace {
    constructor(options) {
        this._debug = options.debug;
        appName = options.appName;
        this._libName = options.libName;
        this._printDate = options.printDate;
        
        setInterval(async()=>{
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
                    type:"I", 
                    message: `${args}`
                }
            }
            cache.push(data);
        }
    }

    async error(...args) {
        const prefix = await this._prefix();
        console.error(prefix, ...args);
        
        const data = {
            collection:"trace-logs", 
            data: {
                app: appName, 
                entry: new Date(), 
                type:"E", 
                message: `${args}`
            }
        }
        cache.push({collection:"trace-logs", data: data});
    }

    async analytics(req, res, next) {
        
        const bDt = new Date();
        next();
        const eDt = new Date();
        
        const data = {
            app: appName,
            host: req.headers.host,
            path: req.route.path,
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
        
        cache.forEach(d =>{
            const repository = new Repository();
            repository.collection(d.collection).insert(d.data);
        });
        cache = [];
    }

    async _prefix() {
        let [date] = new Date().toLocaleString('pt-BR').split(', ');
        let prefix = (this._printDate) ? "[" + date + " " + appName : "[" + appName;
        prefix = (this._libName) ? prefix + " " + this._libName + "]" : prefix + "]";
        return prefix;
    }
}