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
        return db.getByUser(user).then(data => {
            if (data) return data;
            else throw 'Nof Found';
        }).then(data => {
            console.log(' user auth....' + JSON.stringify(data));
            return bcrypt.compare(password, data.password);
        }).then(comp => {
            if (comp) done(null, user);
            else done(null, false, {message: "Password don't match"});
        }).catch(reason => {
            if (reason === 'Not Found') {
                done(null, false, {message: "Not found user with name : " + user});
            } else {
                done(reason)
            }
        })
    }

    async function getUserById(id) {
        return db.getById(id)
    }

    passport.use(new LocalStrategy(verificationCallback));
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
    return passport
}

function save(data) {
    // generate a hashed version of the password to store in the database
    console.log('saving new data @auth: ' + JSON.stringify(data))
    // save information in the database
    return bcrypt.hash(data.password, 5).then(hashedPassword => {
        data = {user: data.user, email: data.email, password: hashedPassword}
        console.log('saving new data: ' + JSON.stringify(data))
        return db.save(data)
    })

}

module.exports = {configuration, isCorrect, save}