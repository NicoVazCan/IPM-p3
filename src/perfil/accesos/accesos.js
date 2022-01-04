const urlParams = new URLSearchParams(window.location.search);
var tbodyRef = document.querySelector('tbody#accesos');
var accesosAllCentros;
var select = document.querySelector('select#centros')


function filtrarAccesos(idCentro) {
    var accesos = [];
    for (const acceso of accesosAllCentros) {
        var aux = acceso['facility']
        if (aux['id'].toString() === idCentro) {
            accesos.push(acceso);
        }
    }
    return accesos;
}

function setTableWithAccesos(idCentro) {
    while (tbodyRef.childNodes.length) {
        tbodyRef.removeChild(tbodyRef.childNodes[0]);
    }

    for (const acceso of filtrarAccesos(idCentro)) {
        var newRow = tbodyRef.insertRow();

        for (let i = 0; i < 4; i++) {
            var newCell = newRow.insertCell();
            var text;

            text =
                i === 0? acceso['type']:
                    i === 1? acceso['timestamp'].substring(0, 10):
                        i === 2? acceso['timestamp'].substring(11, 16):
                            acceso['temperature'];

            var newText = document.createTextNode(text);
            newCell.appendChild(newText);
        }
    }
}

fetch('http://' + window.location.hostname
    + ':8080/api/rest/user_access_log/' +  urlParams.get('uuid'), {
    method: 'GET',
    headers: {
        'x-hasura-admin-secret': 'myadminsecretkey'
    }
})
    .then(response => response.json())
    .then(response => {
        accesosAllCentros = response['access_log']
        fetch('http://' + window.location.hostname
            + ':8080/api/rest/facilities', {
            method: 'GET',
            headers: {
                'x-hasura-admin-secret': 'myadminsecretkey'
            }
        })
            .then(response => response.json())
            .then(response => {
                for (const centro of response['facilities']) {
                    var opt = document.createElement('option');
                    opt.value = centro['id'];
                    opt.innerHTML = centro['name'];
                    opt.addEventListener('click', (event) =>
                        setTableWithAccesos(event.target.value));
                    select.appendChild(opt);
                }
                setTableWithAccesos(select.value);
            })
            .catch(() => location.href = '../../error');
    })
    .catch(() => location.href = '../../error');
