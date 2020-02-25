const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/api');

const mainPage = express.static('../client/dist');

const app = express();

mongoose.connect('mongodb+srv://falk:0gbf@cluster0-agd3x.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

mongoose.connection.once('open', function () {
    console.log('connetion has been made, now make fireworks...');
}).on('error', function (error) {
    console.log('Connection error:', error);
});

app.use(cors());

app.use(mainPage);

app.use(bodyParser.json());

app.use('/api', routes);

app.use(function (err, req, res, next) {
    res.status(422).send({ error: err._message });
});

app.listen(process.env.port || 4000, function () {
    console.log('Now listening for requests');
});