
document.querySelector('input#sivacun').addEventListener('click', () => {
    document.querySelector('input#novacun').checked = false;
});

document.querySelector('input#novacun').addEventListener('click', () => {
    document.querySelector('input#sivacun').checked = false;
});


document.querySelector('form#register').addEventListener('submit', (event) => {

    var name = document.querySelector('input#name').value;
    var surname = document.querySelector('input#surname').value;
    var username = document.querySelector('input#username').value;
    var password = document.querySelector('input#password').value;
    var pwdcheck = document.querySelector('input#pwdcheck').value;
    var email = document.querySelector('input#email').value;
    var phone = document.querySelector('input#phone').value;
    var siVacun = document.querySelector('input#sivacun').checked;

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
    }).then(response => {
        document.querySelector('p#result').innerHTML = response['access_token'];
    }).catch(error => document.querySelector('p#result').innerHTML = error.message);

    event.preventDefault();
});











