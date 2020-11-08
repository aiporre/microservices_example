const config = require('config');
const http = require('http')
const express = require('express')
const bodyparser = require('body-parser')
const Promise = require('promise')
const router = require('./router')

let appHost = config.get('app.host');
let appPort = config.get('app.port');


function create_app() {
    console.log('1');
    return new Promise( (resolve,reject) => {
        const app = express()
        app.use(bodyparser.json())
        app.use(express.urlencoded({extended: false}))
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
        // app.set('views', __dirname);
        resolve(app)
        }
    ).then(app => {
        console.log('2');
        return router(app);
    })

}


create_app().then( app => {
    // console.log('--> app', app)
    const server = http.createServer(app);
    server.listen(appPort, appPort, () => {
        console.log(`Server running at http://${appHost}:${appPort}/`);
    });
})

