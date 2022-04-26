'use strict';
const Mongo = require('./repository/mongo')
const properties = require("./../capta.json");

exports.Repository = class Repository {

    constructor(options){
        
        console.log("Capta Properties", properties);
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

var _loadFile = async (uri) => {
    return await (await fetch(uri)).json();
};
