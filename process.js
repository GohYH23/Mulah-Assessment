function fetchCSV(file, parseCSV) {

    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch CSV: ' + response.status);
            }
            return response.text();
        })
        .then(csv => {
            parseCSV(csv);
        })
        .catch(error => {
            console.error('Error fetching CSV:', error);
        });
}

function parseCSV(csv) {
    var lines = csv.split('\n');
    var table1Body = document.getElementById('table1-body');
    for (var i = 0; i < lines.length; i++) {
        var cells = lines[i].split(',');
        var row = document.createElement('tr');
        for (var j = 0; j < cells.length; j++) {
            var cell = document.createElement('td');
            cell.textContent = cells[j];
            row.append(cell);
        }
        table1Body.append(row);
    }

    var alphaValue = parseInt(lines[5].split(',')[1]) + parseInt(lines[20].split(',')[1]);
    var betaValue = parseInt(lines[15].split(',')[1]) / parseInt(lines[7].split(',')[1]);
    var charlieValue = parseInt(lines[13].split(',')[1]) * parseInt(lines[12].split(',')[1]);

    document.getElementById("alpha-result").textContent = alphaValue;
    document.getElementById("beta-result").textContent = betaValue;
    document.getElementById("charlie-result").textContent = charlieValue;
}

fetchCSV('Table_Input.csv', parseCSV);