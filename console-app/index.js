const axios = require('axios');
const readline = require('readline');
const { v4 } = require('uuid');

async function getContacts() {
    let res = await axios.get('http://localhost:4000/api/contact');
    return await res.data;
}

async function createContact(contact) {
    if (!contact.name) {
        return 'Вы не ввели имя контакта';
    }
    if (!contact.phone) {
        return 'Вы не ввели телефон контакта';
    }
    if (contact.name && contact.phone && !Number.isNaN(+contact.phone)) {
        axios.post('http://localhost:4000/api/contact', contact);
        return `Контакт ${contact.name} с номером ${contact.phone} добавлен`;
    } else {
        return 'значения не прошли валидацию';
    }
};

async function deleteContact(contact) {
    await axios.delete('http://localhost:4000/api/contact', {
        data: contact
    });
    console.log(contact.name, 'удалён');
}

async function editContact(contact) {
    await axios.put('http://localhost:4000/api/contact', contact);
}

let contacts;

let init = async () => {
    contacts = await getContacts();
}

init();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    if (line.startsWith('/')) {
        let command = line.split(/\s+/);
        commands[command[0]](command.slice(1));
    }
});

const commands = {
    '/help'() {
        console.log(`/get [name] - показать соответсвующие контакты`);
        console.log(`/create - создать запись`);
        console.log(`/edit [number] - редактировать указанную запись`);
        console.log(`/delete [number] - удалить указанную запись`);
    },
    '/get'(params) {
        init();
        contacts.forEach((contact, index) => {
            if (contact.name.match(params[0])) {
                console.log(index + 1, contact.name, contact.phone);
            }
        });
    },
    '/create'() {
        let contact = {
            id: v4(),
        }
        rl.question(`Введите имя: \n`, (name) => {
            contact.name = name;

            rl.question(`Введите телефон: \n`, async (phone) => {
                contact.phone = phone;
                let message = await createContact(contact);
                console.log(message);
                init();
            });
        });
    },
    '/delete'(number) {
        if (number.length) {
            let contact = contacts[number[0] - 1];
            deleteContact(contact);
            init();
        } else {
            console.log("вы не ввели номер записи");
        }
    },
    '/edit'(number) {
        if (number.length) {
            let contact = contacts[number[0] - 1];

            rl.question(`Введите имя(${contact.name}): \n`, (name) => {
                if (name !== '') {
                    contact.name = name;
                }
                rl.question(`Введите телефон(${contact.phone}): \n`, (phone) => {
                    if (phone !== '') {
                        contact.phone = phone;
                    }
                    editContact(contact);
                    init();
                });
            });


        } else {
            console.log("Вы не ввели номер записи");
        }

    }
};