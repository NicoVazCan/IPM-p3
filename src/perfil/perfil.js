const urlParams = new URLSearchParams(window.location.search);

document.querySelector('#name').innerHTML = urlParams.get('name');
document.querySelector('#surname').innerHTML = urlParams.get('surname');
document.querySelector('#username').innerHTML = urlParams.get('username');
document.querySelector('#email').innerHTML = urlParams.get('email');
document.querySelector('#phone').innerHTML = urlParams.get('phone');
document.querySelector('#vacun').innerHTML = urlParams.get('is_vaccinated')? 'Sí': 'No';

document.querySelector('img#qr').src = 'https://api.qrserver.com/v1/create-qr-code/?data=' +
    urlParams.get('name') + ',' + urlParams.get('surname') + ',' + urlParams.get('uuid') +
    '&amp;size=100x100';

document.querySelector('button#accesos')
    .addEventListener('click', () => {
        window.location.href = './accesos?uuid=' + urlParams.get('uuid');
    });