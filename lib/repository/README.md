# Capta Repository Library

Tem como objetivo abstratir a conexão com do banco de dados para apps JS.

## Use

Install:

`npm install https://github.com/gabriel-capta/capta-libraries-js.git --save`

Instace Repository Code:

```javascript
    const {Repository} = require('../lib/capta-library.js');

    const connectionString = 
    const options = {
        client: 'mongodb', 
        connectionString: process.env.MONGODB_CONNECTION, 
        debug:true
    }
    const repository = new Repository(options);
//...
```

Get one document code:

```javascript
const id = "5ff320da452fb547dc9a2e6e";
const entity = await repository.collection('colection.name').get(id);

```

List any documents by filter query code:

```javascript
const projection = ["to","from", "subject", "date"];
const filter = {"from":"receiver@capta.com.br"};

const entities = await repository.projection(projection).list(filter);

```

Create document code:

```javascript
let entity = {filed1: "data 1", field2: "data 2"..};
const entity = await repository.insert(entity);

console.log(entity.id);

```

Delete document code:

```javascript
const deleted = await repository.delete("5ff320da452fb547dc9a2e6e");
console.log(deleted);

```

Em alguns cenários podesse trabalhar com parte do documento, visto que outras aplicações podem agregar outros nós ao documento que não dizer a sua aplicação, com isso pode-se manipular a DAO informando o nó a qual esta restrito a trabalhar, conforme exemplos abaixo

Get one document node code:

```javascript

    const entity = await repository.collection('colection.name').node('data.email').get("5ff320da452fb547dc9a2e6e");

```

Insert document node code:

```javascript
    let entity = {filed1: "data 1", field2: "data 2"..};
    const entity = await repository.collection('colection.name').node('data.email').insert(entity);

```

Update document node code:

```javascript
    let entity = {filed1: "data 1", field2: "data 2"..};
    const entity = await repository.collection('colection.name').node('data.email').update(entity, '60182965d6ff71150043ddc5');

```

