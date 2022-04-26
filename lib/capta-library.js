'use strict';
const Mongo = require('./repository/mongo')
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

exports.Logger = class Logger{
    
    constructor(options){
        
        options = (options) ? options : properties.looger;
        options.appName = (options.appName) ? options.appName : packageJson.packageJson;
        
        return new LoggerLocal(options);
    }
}
