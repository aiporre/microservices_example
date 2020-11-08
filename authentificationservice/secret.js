const db = require('./db')
const bcrypt = require('bcrypt')

secret_data = [{user: 'user1', password: 'password1', email: 'w1@mail.com'},
    {user: 'user2', password: 'password', email: 'w2@mail.com'},
    {user: 'user3', password: 'password', email: 'w3@mail.com'},
    {user: 'user4', password: 'password', email: 'w4@mail.com'},
    {user: 'admin', password: 'admin', email: 'w5@mail.com'}]

function populate() {
    return db.createCollection("users").then(res => {
        console.log('--- Saving : ', res)
        return Promise.all(secret_data.map(function(data){
            console.log('saving data.... -->' + JSON.stringify(data))

            return bcrypt.hash(data.password, 10)
                .then( hashPassword => {
                    data.password = hashPassword;
                    return db.save(data);;
                })
        }))
    })
        .then(res => {
            console.log('samples inserted:', res)
            return res;})
}

populate()

