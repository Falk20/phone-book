const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
//пути для rest api

//обработка get-запроса для получения данных
router.get('/contact', function (req, res, next) {
    let id = req.query.id ? { id: req.query.id } : null;
    Contact.find(id).then((list) => {
        res.send(list);
    }).catch(next);
});
//обработка post-запроса для добавления данных
router.post('/contact', function (req, res, next) {
    Contact.create(req.body).then(function (list) {
        res.send(list);
    }).catch(next);
});
//обработка put-запроса для обновления данных
router.put('/contact', function (req, res, next) {
    Contact.updateOne({ id: req.body.id }, { $set: req.body }).then((list) => {
        res.send(list);
    }).catch(next);
});
//обработка delete-запроса для удаления данных
router.delete('/contact', function (req, res, next) {
    Contact.deleteOne(req.body).then(function (list) {
        res.send(list);
    }).catch(next);
});

module.exports = router;