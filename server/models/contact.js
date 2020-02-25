const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: Number
    },
});

const Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;