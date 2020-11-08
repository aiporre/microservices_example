function auth(user, password) {
    console.log('@auth fcn')
    return db.getByUser(user).then(data => {
        console.log(' user auth....' +  JSON.stringify(data));
        return true;
    });
}