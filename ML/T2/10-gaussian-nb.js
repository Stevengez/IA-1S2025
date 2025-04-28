async function fit_predict() {
    const { GaussianNB, LabelEncoder, accuracyScore } = await import('https://luisespino.github.io/mlearnjs/mlearn.mjs');

    const alt = ["Yes", "Yes", "No", "Yes", "Yes", "No", "No", "No", "No", "Yes", "No", "Yes"];
    const bar = ["No", "No", "Yes", "No", "No", "Yes", "Yes", "No", "Yes", "Yes", "No", "Yes"];
    const fri = ["No", "No", "No", "Yes", "Yes", "No", "No", "No", "Yes", "Yes", "No", "Yes"];
    const hun = ["Yes", "Yes", "No", "Yes", "No", "Yes", "No", "Yes", "No", "Yes", "No", "Yes"];
    const pat = ["Some", "Full", "Some", "Full", "Full", "Some", "None", "Some", "Full", "Full", "None", "Full"];
    const price = ["$$$", "$", "$", "$", "$$$", "$$", "$", "$$", "$", "$$$", "$", "$"];
    const rain = ["No", "No", "No", "Yes", "No", "Yes", "Yes", "Yes", "Yes", "Yes", "No", "No"];
    const res = ["Yes", "No", "Yes", "No", "Yes", "Yes", "No", "No", "Yes", "No", "No", "No"];
    const type = ["French", "Thai", "Burger", "Thai", "French", "Italian", "Burger", "Thai", "Burger", "Italian", "Thai", "Burger"];
    const est = ["0-10", "30-60", "0-10", "10-30", "60", "0-10", "0-10", "0-10", "60", "10-30", "0-10", "30-60"];
    const ww = ["Yes", "No", "Yes", "Yes", "No", "Yes", "No", "Yes", "No", "Yes", "No", "Yes"]

    const table = alt.map((_, i) => [alt[i], bar[i], fri[i], hun[i], pat[i], price[i], rain[i], res[i], type[i], est[i], ww[i]]);

    showTable(table);

    const myLabelEncoder = await LabelEncoder(); 
    const encoder = new myLabelEncoder();

    const encAlt = encoder.fitTransform(alt);
    const encBar = encoder.fitTransform(bar);
    const encFri = encoder.fitTransform(fri);
    const encHun = encoder.fitTransform(hun);
    const encPat = encoder.fitTransform(pat);
    const encPrice = encoder.fitTransform(price);
    const encRain = encoder.fitTransform(rain);
    const encRes = encoder.fitTransform(res);
    const encType = encoder.fitTransform(type);
    const encEst = encoder.fitTransform(est);

    const encWW = encoder.fitTransform(ww);

    const features = encAlt.map((_, i) => [
        encAlt[i], encBar[i], encFri[i],
        encHun[i], encPat[i], encPrice[i],
        encRain[i], encRes[i], encType[i],
        encEst[i]
    ]);
     
    const myGaussianNB = await GaussianNB(); 
    const model = new myGaussianNB();
    
    model.fit(features, encWW);

    const encYPredict = model.predict(features)
    const yPredict = encoder.inverseTransform(encYPredict);

    const myAccuracyScore = await accuracyScore();
    const accuracy = myAccuracyScore(encWW, encYPredict);

    const log = document.getElementById('log');
    log.innerHTML = '<br><br>LabelEncoder:<br>'+JSON.stringify(features, null, 2);
    log.innerHTML += '<br><br>Predict:<br>'+ JSON.stringify(yPredict, null, 2);
    log.innerHTML += '<br><br>AccuracyScore: '+accuracy;
    log.innerHTML += '<br><br><strong>Descriptive tree:</strong><br>'+model.printTree(model.tree);
    log.innerHTML += '<br><br><strong>Gain track:</strong><br>'+model.gain;
}

function showTable(table) {
    let container = document.getElementById('table-container');

    // Crear el elemento de la tabla
    let tableElement = document.createElement('table');

    // Crear la cabecera de la tabla
    let header = tableElement.createTHead();
    let headerRow = header.insertRow();
    let headers = ['Alt', 'Bar', 'Fri', 'Hun', 'Pat', 'Price', 'Rain', 'Res', 'Type', 'Est', 'WillWait'];
    headers.forEach(headerText => {
        let cell = headerRow.insertCell();
        cell.textContent = headerText;
    });

    // Crear el cuerpo de la tabla
    let body = tableElement.createTBody();
    table.forEach(rowData => {
        let row = body.insertRow();
        rowData.forEach(cellData => {
            let cell = row.insertCell();
            cell.textContent = cellData;
        });
    });

    // Insertar la tabla en el contenedor
    container.appendChild(tableElement);
}

fit_predict();
