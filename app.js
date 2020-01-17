const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();


app.get('/api', (req, res) => {
    res.json({
        message: 'welcome api jwt example '
    })
});


app.post('/api/posts', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: " posts added .... ",
                authData
            })
        }
    })



})

//set up token when login
app.post('/api/login', (req, res) => {
    //dummy user
    const user = {
        id: 1,
        username: 'james',
        email: 'james@gmail.com'
    }
    jwt.sign({ user }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
        res.json({ token })
    });

})


//verify token 
//format of token
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        // split the space
        const bearer = bearerHeader.split(' ');
        // get the token from array
        const bearrerToken = bearer[1];
        //set the token 
        req.token = bearrerToken;
        //next middleware
        next();



    } else {
        res.sendStatus(403);
    }


}

app.listen(3000, () => console.log("server start in port :3000"));