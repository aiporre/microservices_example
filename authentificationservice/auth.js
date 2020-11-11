const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./db')

function isCorrect(user, password) {
    console.log('@auth fcn')
    return db.getByUser(user).then(data => {
        console.log(' user auth....' + JSON.stringify(data));
        return true;
    });

}

function configuration(passport) {
    const verificationCallback = async function (user, password, done) {
        console.log('authentication called: user ', user, 'passworkd', password)
        db.getByUser(user).then(data => {
            if (data) return data;
            else throw 'Not Found';
        }).then(data => {
            console.log(' user auth....' + JSON.stringify(data));
            console.log(password + " != " + data.password)
            return bcrypt.compare(password, data.password);
        }).then(comp => {
            console.log('comparison request: ' +  comp)
            if (comp) return db.getByUser(user);//  retrieve data once again. Easiest for now!
            else return done(null, false, {message: "Password don't match"});
        }).then(data => {
            if (data) return done(null, data);
            else throw 'Not Found';
        }).catch(reason => {
            console.log('Authentication error: ' +  reason)
            if (reason === 'Not Found') {
                return done(null, false, {message: "Not found user with name : " + user});
            } else {
                return done(reason)
            }
        })
    }

    async function getUserById(id) {
        console.log('======> deserializing')
        console.log(id)
        return db.getById(id).then(data => data.user)
    }

    async function getIdByUser(user){
        console.log('======> serializing')
        console.log(user)
        return db.getByUser(user).then(data => data._id)
    }
    function serialize(user){
        console.log('======> serializing ' + user._id)
        return user._id;
    }

    async function deserialize(id){
        console.log('======> deserializing')
        let data = await db.getById(id)
        console.log(id + "==== INTO ===")
        console.log('---serialized id: ' +  JSON.stringify(data))
        return data;
    }


    passport.use(new LocalStrategy({usernameField: 'name'}, verificationCallback));
    passport.serializeUser((user, done) => done(null, serialize(user)))
    passport.deserializeUser((id, done) => done(null, deserialize(id)))
    return passport
}

function save(data) {
    // generate a hashed version of the password to store in the database
    console.log('saving new data @auth: ' + JSON.stringify(data))
    // save information in the database
    return bcrypt.hash(data.password, 10).then(hashedPassword => {
        data = {user: data.user, email: data.email, password: hashedPassword}
        console.log('saving new data: ' + JSON.stringify(data))
        return db.save(data)
    })

}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

module.exports = {configuration, isCorrect, save, checkAuthenticated, checkNotAuthenticated}