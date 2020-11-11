if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const config = require('config');
const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const Promise = require('promise');
const router = require('./router');
const cors = require('cors');
const methodOverride = require('method-override')

const flash = require('express-flash');
const session = require('express-session');
let appHost = config.get('app.host');
let appPort = config.get('app.port');

const passport = require('passport')
const configuration = require('./auth').configuration
configuration(passport)



function create_app() {
    console.log('1');
    return new Promise( (resolve,reject) => {
        const app = express()
        app.use(express.static(__dirname + '/public'));
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
        app.use(cors())
        app.use(bodyparser.json())
        app.use(express.urlencoded({extended: false}))
        app.use(flash())
        app.use(session({
            secret : process.env.SESSION_SECRET,
            resave: false, // resave if nothing is change
            saveUninitialized: false // empty value when no initiazliation
        }))
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(methodOverride('_method'))


        resolve(app)
        }
    ).then(app => {
        console.log('2');
        return router(app);
    })

}



create_app().then( app => {
    const server = http.createServer(app);
    server.listen(appPort, appPort, () => {
        console.log(`Server running at http://${appHost}:${appPort}/`);
    });
})

