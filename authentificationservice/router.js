const auth = require('./auth')
const passport = require("passport");

function router(app) {
    // home index
    app.get('/', (req, res) => {
        // obtain us and pa from request
        // ...
        res.render('index.html')
    });

    // register
    app.get('/register', (req, res) => {
        res.render('register.html')
    })
    app.post('/register', (req, res) => {
        try {
            userData = {user: req.body.name, email: req.body.email, password: req.body.password}
            console.log('saving new user: ' + JSON.stringify(userData))
            auth.save(userData).then( (val) => {
                console.log('saved??? ' + val)
                res.redirect('/')
            })
        } catch (e) {
            console.error('An error occurred: ' +  e)
            res.redirect('/register')
        }
    })

    // Login
    app.get('/login', (req, res) => {
        res.render('login.html')
    })
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }))

    app.get('/auth', (req, res) => {
        // obtain us and pa from request
        // ...
        auth.isCorrect("user1", "password1").then( valid => {
            console.log('=====> valid??? ' +  valid)
            if(valid) res.send('OK', 200);
            else res.send('FAIL', 500);
        })

    });
    return app
}

module.exports = router