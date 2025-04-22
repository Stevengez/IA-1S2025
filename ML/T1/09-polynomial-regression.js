async function fit_predict_draw() {
    const { PolynomialRegression, joinArrays } = await import('https://luisespino.github.io/mlearnjs/mlearn.mjs');

    const myPolynomialRegression = await PolynomialRegression(); 
    const model = new myPolynomialRegression(3);
    

    const X = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const y = [641.2, 852.9, 1032.3, 837.9, 758.7, 820.2, 1024.3, 1464.5, 1539.7];

    model.fit(X, y);

    yPredict = model.predict(X)
    //console.log(yPredict);

    const myjoinArrays = await joinArrays();
    const arr = myjoinArrays('x', X, 'y', y, 'yPredict', yPredict);

    const log = document.getElementById('log');
    const yPred = yPredict.map(num => parseFloat(num.toFixed(2)));
    const mse = model.mse(y, yPredict);
    const r2 = model.r2(y, yPredict);
    log.innerHTML = 'X: '+X+'<br>y: '+y+'<br>yPredict: '+yPred;
    log.innerHTML += '<br>MSE: '+mse+'<br>R2: '+r2;

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);    
    function drawChart() {
        var data = google.visualization.arrayToDataTable(arr);
        var options = {
            series: {
                0: {type: 'scatter'},
                1: {type: 'line', curveType: 'function'}}
        };  
        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        chart.draw(data, options);         
    }
}

fit_predict_draw();