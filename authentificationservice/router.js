const auth = require('./auth')
const bcrypt = require("bcrypt");

function router(app) {
    app.get('/', (req, res) => {
        // obtain us and pa from request
        // ...
        res.render('index.html')
    });

    app.get('/register', (req, res) => {
        res.render('register.html')
    })
    app.post('/register', (req, res) => {
        try {
            // generate a hashed version of the password to store in the database
            const hashedPassword = bcrypt.hash(req.body.password, 5)
            // save information in the database
        } catch (e) {

        }
        console.log(req.body.name);
    })

    app.get('/login', (req, res) => {
        res.render('login.html')
    })
    app.post('/login', (req, res) => {
        console.log(req.body.name);
    })

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
}

module.exports = router