const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const Promise = require('promise')
const config = require('config')

function database(){
    return new Promise((resolve,reject) => {
        url = 'mongodb://' + config.db.host + ':' + config.db.port + '/';
        return MongoClient(url).connect( (err, client) => {
            console.log('mongo connection..')
            if(err){
                reject(err);
            } else{
                console.log('sending connection...' + url)
                resolve(client)
            }
        });
    })
}
save = function(data){
    return database().then(client => {
        // data._id = ObjectID();
        return new Promise( (resolve, reject) => {
            // do
            client.db(config.db.name).collection("users").insertOne(data, (err, res) => {
                if (err) {
                    console.log('error saving')
                    throw err;
                } else {
                    client.close();
                    console.log('data saved successfully')
                    resolve(data);
                }
            })
        })


    })
}
createCollection = function (collection){
    return database().then( client => {
        console.log('creating collection....')
        return new Promise( (resolve, reject) => {
            client.db(config.db.name).createCollection(collection, (err, res) => {
                if(err) throw err;
                console.log('collection created')
                client.close()
                resolve(res);
            })
        })
    })
}

getByUser = function (user) {
    return database().then(client => {
        var query = {user: user};
        console.log('query is :' + JSON.stringify(query));
        return new Promise((resolve, reject) => {
            client.db(config.db.name).collection("users").find(query).toArray(function (err, result) {
                console.log('----> ' + JSON.stringify( result[0]));
                if (err) throw err;
                if (result.length > 1) throw 'Database corrupted! Multiple users with same user name';
                client.close();
                if (result.length == 0) resolve(null);
                else resolve(result[0]);
            });
        })

        }
    )
}


getById = function (id) {
    return database().then(client => {
            var query = {_id: ObjectID(id)};
            console.log('query is :' + JSON.stringify(query));
            return new Promise((resolve, reject) => {
                client.db(config.db.name).collection("users").find(query).toArray(function (err, result) {
                    console.log('----> ' + JSON.stringify( result[0]));
                    if (err) throw err;
                    if (result.length > 1) throw 'Database corrupted! Multiple users with same user name';
                    client.close();
                    if (result.length == 0) resolve(null);
                    else resolve(result[0]);
                });
            })

        }
    )
}


module.exports = {getById, getByUser, save, createCollection};
