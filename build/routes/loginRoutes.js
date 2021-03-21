"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
var requireAuth = function (req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    else {
        res.status(403).send('Not authorized');
    }
};
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'hi@hi.com' && password === '1234') {
        // mark this person as logged in
        req.session = { loggedIn: true };
        //redirect this person
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n    <div>\n      <div>You are Logged In</div>\n      <a href='/logout'>Logout</a>\n    </div>\n    ");
    }
    else {
        res.send("\n    <div>\n      <div>You are not logged In</div>\n      <a href='/login'>Login</a>\n    </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send("\n    <div>\n      <div>Welcome to protected Route</div>\n     \n    </div>\n    ");
});
