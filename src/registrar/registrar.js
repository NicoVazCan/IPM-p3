
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
    var email_length = email.length;
    var postion_of_at = email.indexOf('@');
    var prequency_of_at = (email.split("@").length) - 1;

    if (name === '' || surname === '' || username === '' ||
        password === '' || email === '' || phone === '' ||
        (!siVacun && !document.querySelector('input#sivacun').checked)) {
        document.querySelector('p#error').innerHTML = 'Faltan entradas por rellenar';
        return;
    }
    if (password !== document.querySelector('input#pwdcheck').value) {
        document.querySelector('p#error').innerHTML = 'La contraseña se a repetido incorrectamente';
        return;
    }
    if(email < 6){
        document.querySelector('p#error').innerHTML = "Email demasiado corto";
        return;
    }
    if(email.length > 254){
        document.querySelector('p#error').innerHTML = "Email demasiado largo";
        return;
    }
    if(postion_of_at < 0){
        document.querySelector('p#error').innerHTML = "Falta el @ del email";
        return;
    }
    if(postion_of_at === 0){
        document.querySelector('p#error').innerHTML = "Esta el @ pero en primera posición";
        return;
    }
    if((email_length-1) === postion_of_at){
        document.querySelector('p#error').innerHTML = "Esta el @ pero en última posición";
        return;
    }
    if(prequency_of_at > 1){
        document.querySelector('p#error').innerHTML = "Solo puede haber un @";
        return;
    }
    if(!phone.match(/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})$/)) {
        document.querySelector('p#error').innerHTML = "Teléfono incorrecto (formato XXX-XXX-XXX)";
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

    fetch('http://' + window.location.hostname
        + ':8080/api/rest/user', {
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
