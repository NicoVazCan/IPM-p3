
document.querySelector('input#sivacun').addEventListener('click', () => {
    document.querySelector('input#novacun').checked = false;
});

document.querySelector('input#novacun').addEventListener('click', () => {
    document.querySelector('input#sivacun').checked = false;
});

var name;
var surname;
var username;
var password;
var email;
var phone;
var siVacun;
var uuid;

document.querySelector('button#register').addEventListener('click', () => {

    name = document.querySelector('input#name').value;
    surname = document.querySelector('input#surname').value;
    username = document.querySelector('input#username').value;
    password = document.querySelector('input#password').value;
    email = document.querySelector('input#email').value;
    phone = document.querySelector('input#phone').value;
    siVacun = document.querySelector('input#sivacun').checked;
    if (name === '' || surname === '' || username === '' ||
        password === '' || email === '' || phone === '' ||
        (!siVacun && !document.querySelector('input#sivacun').checked)) {
        document.querySelector('p#error').innerHTML = 'Faltan entradas por rellenar'
        return;
    }
    if (password !== document.querySelector('input#pwdcheck').value) {
        document.querySelector('p#error').innerHTML = 'La contraseña se a repetido incorrectamente'
        return;
    }

    var data = {
        "username": username,
        "password": password,
        "name": name,
        "surname": surname,
        "phone": phone,
        "email": email,
        "is_vaccinated": siVacun
    };

    fetch('http://localhost:8080/api/rest/user', {
        method: 'POST',
        headers: {
            'x-hasura-admin-secret': 'myadminsecretkey',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            uuid = response['insert_users_one']['uuid'];

            location.href = '../perfil?' +
                'username=' + username + '&' +
                'name=' + name + '&' +
                'surname=' + surname + '&' +
                'email=' + email + '&' +
                'phone=' + phone + '&' +
                'vacun=' + siVacun + '&' +
                'uuid=' + uuid;
        })
        .catch(() => location.href = '../error');
});
