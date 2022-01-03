var tbodyRef = document.querySelector('tbody#accesos');

for(var i = 0; i < 20; i++) {
    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();

// Insert a cell at the end of the row
    var newCell = newRow.insertCell();

// Append a text node to the cell
    var newText = document.createTextNode('new row');
    newCell.appendChild(newText);
}
