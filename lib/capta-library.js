'use strict';
const Mongo = require('./repository/mongo')

exports.Repository = class Repository {

    constructor(options){

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
