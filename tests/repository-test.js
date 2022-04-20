const {Repository} = require('../lib/capta-library.js');

var readTest = async function (){

    //const connectionString = process.env.MONGODB_CONNECTION || "mongodb+srv://add_admin:Addvisor2020@cluster0.jex0n.mongodb.net/add";
    const connectionString = process.env.MONGODB_CONNECTION || "mongodb+srv://admin:Capta2022@cluster0.zvrhh.mongodb.net/capta";
    const options = {client: 'mongodb', connectionString:connectionString, debug:true, collection:'test-collection'}

    const repository = new Repository(options);
    const entity =  await repository.insert({test: 'capta-libraries-js', date: new Date()});
    //const user = await repository.get('605cd51522606db9ca650e64');
    console.log(entity );

}();