document.querySelector('button#registrar')
    .addEventListener('click', (event) => {
        window.location.href = './registrar';
        event.preventDefault();
});

document.querySelector('button#login')
    .addEventListener('click', (event) => {
        const username = document.querySelector('input#username').value;
        const password = document.querySelector('input#password').value;

        fetch('http://localhost:8080/api/rest/login?' +
            'username=' + username + '&' +
            'password=' + password,
            {
            method: 'POST',
            headers: {
                'x-hasura-admin-secret': 'myadminsecretkey'
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response['users'].length) {
                    const user = response['users'][0];

                    window.location.href = './perfil?' +
                        'username=' + username + '&' +
                        'name=' + user['name'] + '&' +
                        'surname=' + user['surname'] + '&' +
                        'email=' + user['email'] + '&' +
                        'phone=' + user['phone'] + '&' +
                        'vacun=' + user['is_vaccinated'] + '&' +
                        'uuid=' + user['uuid'];
                } else {
                    document.querySelector('p#error').innerHTML = 'Apodo o contraseña incorrecto'
                }
            })
            .catch(error => console.error(error));

        event.preventDefault();
    });