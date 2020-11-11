const auth = require('./auth')
const passport = require("passport");


function router(app) {
    // add method override to the the app
    // home index
    app.get('/', auth.checkAuthenticated,(req, res) => {
        // obtain us and pa from request
        // ...
        res.render('index.html')
    });

    app.get('/home', auth.checkAuthenticated,(req, res) => {
        // obtain us and pa from request
        // ...
        res.redirect('/')
    });

    app.get('/dashboard', auth.checkAuthenticated,(req, res) => {
        // obtain us and pa from request
        // ...
        res.redirect('http://localhost:8080')
    });

    // register
    app.get('/register', auth.checkAuthenticated, (req, res) => {
        res.render('register.html')
    })
    app.post('/register', auth.checkAuthenticated, (req, res) => {
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
    app.get('/login', auth.checkNotAuthenticated, (req, res) => {
        res.render('login.html')
    })
    app.post('/login', auth.checkNotAuthenticated,
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

    app.delete('/logout', (req, res) => {
        req.logOut()
        res.redirect('/login')
    })
    return app
}

module.exports = router