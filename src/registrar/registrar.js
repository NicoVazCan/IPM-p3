
document.querySelector('input#sivacun').addEventListener('click', (event) => {
    document.querySelector('input#novacun').checked = false;
    event.preventDefault();
});

document.querySelector('input#novacun').addEventListener('click', (event) => {
    document.querySelector('input#sivacun').checked = false;
    event.preventDefault();
});

var name;
var surname;
var username;
var password;
var email;
var phone;
var siVacun;
var uuid;

document.querySelector('form#register').addEventListener('submit', (event) => {

    name = document.querySelector('input#name').value;
    surname = document.querySelector('input#surname').value;
    username = document.querySelector('input#username').value;
    password = document.querySelector('input#password').value;
    var pwdcheck = document.querySelector('input#pwdcheck').value;
    email = document.querySelector('input#email').value;
    phone = document.querySelector('input#phone').value;
    siVacun = document.querySelector('input#sivacun').checked;

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
           document.querySelector('p#result').innerHTML = response['access_token'];
        })
        .catch(error => document.querySelector('p#result').innerHTML = error.message);

    event.preventDefault();
});

document.querySelector('button#registrar')
    .addEventListener('click', (event) => {
        location.href = '../perfil' +
            'username=' + username + '&' +
            'name=' + name + '&' +
            'surname=' + surname + '&' +
            'email=' + email + '&' +
            'phone=' + phone + '&' +
            'vacun=' + siVacun + '&' +
            'uuid=' + uuid;
        event.preventDefault();
    });
