'use strict';

module.exports = class LoggerLocal{
    
    constructor(options){
        this._debug = options.debug;
        this._appName = options.appName;
        this._libName = options.libName;
        this._printDate = options.printDate;
    }
    
    async log (...args) {
        if(this._debug){
            const prefix = await this._prefix();
            console.log(prefix, ...args);
        }
    }

    async error (...args) {
        const prefix = await this._prefix();
        console.error(prefix, ...args);
    }

    async _prefix(){
        let [date] = new Date().toLocaleString('pt-BR').split(', ');
        let prefix = (this._printDate) ? "[" + date + " " + this._appName : "[" + this._appName ;
        return (this._libName) ? prefix + " " + this._libName + "]" :  prefix + "]";
    }
}