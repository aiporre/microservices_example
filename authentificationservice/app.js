const config = require('config');
const http = require('http');
const express = require('express')
const bodyparser = require('body-parser')
const Promise = require('promise')

const db = require('./db')
let appHost = config.get('app.host');
let appPort = config.get('app.port');


function create_app() {
    console.log('1');
    return new Promise( (resolve,reject) => {
        const app = express()
        app.use(bodyparser.json())
        resolve(app)
        }
    ).then(app => {
        console.log('2');
        return route(app);
    })

    function route(app) {
        app.get('/', (req, res) => {
            // obtain us and pa from request
            // ...
            res.send('This is auth service', 200)
        });

        app.get('/auth', (req, res) => {
            // obtain us and pa from request
            // ...
            auth("user1", "password1").then( valid => {
                console.log('=====> valid??? ' +  valid)
                if(valid) res.send('OK', 200);
                else res.send('FAIL', 500);
            })

        });
        return app

        function auth(user, password) {
            console.log('@auth fcn')
            return db.getByUser(user).then(data => {
                console.log(' user auth....' +  JSON.stringify(data));
                return  true;
            });

        }
    }
}


create_app().then( app => {
    const server = http.createServer(app);
    server.listen(appPort, appPort, () => {
        console.log(`Server running at http://${appHost}:${appPort}/`);
    });
})

