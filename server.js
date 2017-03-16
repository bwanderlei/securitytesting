const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const SmashHost = require('./SmashHost');

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', (req, res) => {
    console.log('Smashing request: ', req.body);
    
    try {
        SmashHost(req.body);
    }
    catch (e) {
        console.log('Error thrown: ', e);
    }

    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

