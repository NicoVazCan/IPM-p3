
document.querySelector('form#register').addEventListener('submit', (event) => {

        var name = document.querySelector('input#name').value;
        var surname = document.querySelector('input#surname').value;
        var username = document.querySelector('input#username').value;
        var password = document.querySelector('input#password').value;
        var pwdcheck = document.querySelector('input#pwdcheck').value;
        var pwdcheck = document.querySelector('input#phone').value;
        var pwdcheck = document.querySelector('input#').value;

        var data = {
            "username": "pepe",
            "password": "xx",
            "name": "Jose",
            "surname": "Garcia",
            "phone": "555555",
            "email": "pepe@pepe.com",
            "is_vaccinated": "true"
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