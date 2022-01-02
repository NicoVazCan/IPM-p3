document.querySelector('button#registrar')
    .addEventListener('click', (event) => {
    location.replace('./registrar?name=pepe&');
});

document.querySelector('button#login')
    .addEventListener('click', (event) => {

        fetch('http://localhost:8080/api/rest/login?username=pepe&password=xx', {
            method: 'POST',
            headers: {
                'x-hasura-admin-secret': 'myadminsecretkey'
            },
        }).then(response => {
            fetch(response.json()).then(response =>
                location.replace('./perfil?name='+ response['users'][0]['name'] +'&'))
        }).catch(error => );
    });