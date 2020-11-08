// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
//
// MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("auth");
//     dbo.collection("users").find({user: 'user1'}).toArray( function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });


const db = require('./db')


var user = db.getByUser('user1').then( result => {
    console.log('------>>' + JSON.stringify(result))
})
