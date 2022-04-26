const {Repository} = require('../lib/capta-library.js');

var readTest = async function (){

    //const connectionString = process.env.MONGODB_CONNECTION || "mongodb+srv://add_admin:Addvisor2020@cluster0.jex0n.mongodb.net/add";
    const connectionString = process.env.MONGODB_CONNECTION || "mongodb+srv://admin:Capta2022@cluster0.zvrhh.mongodb.net/capta";
    const options = {client: 'mongodb', connectionString:connectionString, debug:true, collection:'test-collection'}

    const repository = new Repository();
    const entity =  await repository.collection('test-collection').insert({test: 'capta-libraries-js', date: new Date()});
    //const user = await repository.get('605cd51522606db9ca650e64');
    console.log(entity );

}();

var intialMailAccount = async function (){

    //const connectionString = process.env.MONGODB_CONNECTION || "mongodb+srv://add_admin:Addvisor2020@cluster0.jex0n.mongodb.net/add";
    const connectionString = process.env.MONGODB_CONNECTION || "mongodb+srv://admin:Capta2022@cluster0.zvrhh.mongodb.net/capta";
    const options = {client: 'mongodb', connectionString:connectionString, debug:true, collection:'mail.account'}

    const repository = new Repository(options);
    const account = {
        account: "tecban@addvisor.com.br",
        password: "Addvisor098!",
        protocol: "IMAP",
        host: "email-ssl.com.br",
        port: 993,
        ssl: true,
        listener: true,
        enable: true,
    };
    /*
    const account = {
        account: "apresent.csc@addvisor.com.br",
        password: "Addvisor@2017",
        protocol: "IMAP",
        host: "email-ssl.com.br",
        port: 993,
        ssl: true,
        listener: true,
        enable: true,
    };
    */
    const entity =  await repository.insert(account);
    console.log("Mail Account", entity);

} //Não rodar
