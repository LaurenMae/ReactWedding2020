const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(require("body-parser").json());

app.listen(3001, function() {
    console.log('listening on 3001');
});

app.post('/insert', (req, res) => {
    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {
        if (err) {
            res.status(500).send(err);
        }
        const dbo = db.db('rsvp');
        dbo.collection(req.body.attendance).insertOne(req.body, (err) => {
            if (err) {
                res.status(500).send(err);
            }

            res.status(200).send('maybe it worked');
        });
    });
});