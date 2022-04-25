'use strict';
const Mongo = require('./repository/mongo')

exports.Repository = class Repository {

    constructor(options){
        const properties = await (await fetch("./capta.json")).json();
        console.log("Capta Properties", properties);

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
