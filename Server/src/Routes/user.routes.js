const { onRegister, onLogin } = require("../Controllers/user.controllers");
module.exports = (app)=>{
    //Api for creating new user in the system
    app.post('/register',onRegister);
    //Api for login
    app.post('/login',onLogin);
}