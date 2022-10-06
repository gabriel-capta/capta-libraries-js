'use strict';
const Mongo = require('./repository/mongo')
const LocalTrace = require('./logger/local-trace')

const rootPath = require.resolve("mongodb").split("node_modules")[0];
const properties = require(rootPath + "capta.json");
const packageJson = require(rootPath + "package.json");


exports.Repository = class Repository {

    constructor(options){
        options = (options) ? options : properties.repository;
        const client = (options.client) ? options.client : 'mongodb';
    
        let repository = null;
        switch (client) {
            case 'mongodb':
                repository = new Mongo(options);
                break;
            case 'hanadb':
                repository = new Mongo(options);
                break;
            default:
                repository = new Mongo(options);
        }
        return repository;
    }
}

exports.Trace = new class Trace{
    
    constructor(){
        const options = (properties.trace) ? properties.trace : {};
        options.appName = (options.appName) ? options.appName : packageJson.name;
        options.debug = (options.debug) ? options.debug : true;
        options.printDate = (options.printDate) ? options.printDate : true;
        return new LocalTrace(options);
    }
    
}();