const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const newsTable = require('./query/queriesNews');
const accountTable = require('./query/queriesAccount');
const cors = require('cors');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        info: "Node.js + Express.js + PostgresQL"
    });
})

app.get('/files/*', (req, res) => {
    res.status(200).download("./" + req.path);
})

app.get('/topNews', (req, res) => {
    newsTable.getTopNews()
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(error));
});

app.get('/allNews', (req, res) => {
    newsTable.getAllNews()
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(error));
});

app.post('/addNews', (req, res) => {
    newsTable.addNews(req.body)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(error));
});

app.post('/deleteNews', (req, res) => {
    newsTable.deleteNews(req.body)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(error));
});

app.post('/checkUser', (req, res) => {
    accountTable.checkUser(req.body)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(error));
});

app.post('/addUser', (req, res) => {
    accountTable.addUser(req.body)
        .then(response => res.status(200).send(response))
        .catch(error => res.status(500).send(error));
});

app.listen(port, () => {
    console.log('Server is up on ' + port);
});