document.querySelector('button#registrar')
    .addEventListener('click', () => {
    location.replace('./registrar?name=pepe&');
});

document.querySelector('button#login')
    .addEventListener('click', () => {
        const username = document.querySelector('input#surname').value;
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
                if (response['users'] !== []) {
                    const user = response['users'][0];

                    location.replace('./perfil?' +
                        'name=' + user['name'] + '&' +
                        'surname=' + user['surname'] + '&' +
                        'email=' + user['email'] + '&' +
                        'phone=' + user['is_vaccinated'] + '&' +
                        'uuid=' +user['uuid']
                    );
                }
            })
            .catch(error => console.error(error));
    });