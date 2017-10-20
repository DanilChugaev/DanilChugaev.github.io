'use strict';

function randomInteger(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}
function throwCoin() {
    /*
    * 1 - орел
    * 2 - решка
    * */
    return randomInteger(1, 2);
}
function throwCoub() {
    /*
    * 10 - 1
    * 20 - 2
    * 30 - 3
    * 40 - 4
    * 50 - 5
    * 60 - 6
    * */
    return randomInteger(1, 6) * 10;
}

var Game = {
    state: 0,
    count: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    },
    setValue: function setValue(state) {
        this.state = state;
        this.counterAdd(state);
    },
    getValue: function getValue() {
        return this.state;
    },
    counterAdd: function counterAdd(state) {
        this.count[state]++;
    },
    getCounter: function getCounter() {
        return this.count;
    },
    clearCounter: function clearCounter() {
        this.state = 0;
        this.count[1] = 0;
        this.count[2] = 0;
        this.count[3] = 0;
        this.count[4] = 0;
        this.count[5] = 0;
    }
},
    Automate = {
    calculateValue: function calculateValue(nowState, inputState) {
        debugger;
        //бросает монетку и остается на решке либо бросает кубик и попадает на решку
        if ((nowState === 2 || nowState === 4) && inputState === 2) return 2;

        //бросает кубик либо монетку и попадает на орла а далее будет кидать кубик либо стартовое значение
        if ((nowState === 1 || nowState === 2 || nowState === 4) && inputState === 1) return 1;

        //бросает кубик и попадает в состояние 3
        if ((nowState === 1 || nowState === 3) && (inputState === 30 || inputState === 40)) return 3;

        //бросает кубик и попадает в состояние 4
        if ((nowState === 3 || nowState === 1) && (inputState === 10 || inputState === 20 || inputState === 60)) return 4;

        //бросает кубик и попадает в состояние 5 и затем выходит из игры
        if ((nowState === 1 || nowState === 3) && inputState === 50) return 5;
    }
};
function $(selector) {
    return document.querySelector(selector);
}
function _$(selector) {
    return document.querySelectorAll(selector);
}

(function () {
    var startBtn = $('#startBtn'),
        info = $('#info'),
        s1 = $('#s1'),
        //орел
    s2 = $('#s2'),
        //решка
    s3 = $('#s3'),
        //3,4
    s4 = $('#s4'),
        //1,2,6
    s5 = $('#s5'); //5

    startBtn.addEventListener('click', function () {
        var iteration = 0,
            countIterations = $('#countIterations').value,
            data = {
            labels: ['s1', 's2', 's3', 's4', 's5'],
            series: []
        };

        if (countIterations.innerText !== '') {
            info.innerText = 'старт дан';
            Game.clearCounter();

            $('#countIterations').disabled = true;
            countIterations = Number(countIterations);

            while (iteration < countIterations && Game.getValue() !== 5) {
                debugger;
                var nowState = Game.getValue(),
                    inputState = '';

                if (nowState === 0) {
                    inputState = throwCoin();
                    nowState = inputState;
                } else if (nowState === 4 || nowState === 2) {
                    inputState = throwCoin();
                } else {
                    inputState = throwCoub();
                }
                debugger;
                Game.setValue(Automate.calculateValue(nowState, inputState));
                iteration++;
                debugger;
            }
            $('#countIterations').disabled = false;
            info.innerText = 'проход завершен';

            var series1 = Game.getCounter()[1],
                series2 = Game.getCounter()[2],
                series3 = Game.getCounter()[3],
                series4 = Game.getCounter()[4],
                series5 = Game.getCounter()[5],
                sum = series1 + series2 + series3 + series4 + series5;

            data.series.push(series1);
            data.series.push(series2);
            data.series.push(series3);
            data.series.push(series4);
            data.series.push(series5);

            // debugger
            s1.innerText = series1;
            s2.innerText = series2;
            s3.innerText = series3;
            s4.innerText = series4;
            s5.innerText = series5;

            var options = {
                labelOffset: 20,
                labelInterpolationFnc: function labelInterpolationFnc(value, index) {
                    return value + ' ' + '~' + Math.round(data.series[index] / sum * 100) + '%';
                }
            };

            var chart = new Chartist.Pie('.ct-chart', data, options);
        } else {
            info.innerText = 'введите количество итераций';
        }
    });
})();