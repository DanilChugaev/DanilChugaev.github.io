let TrafficLight = {
        state: 0,
        count: {
            0: 0,
            1: 0
        },
        setValue(state) {
            this.state = state;
            this.counterAdd(state);
        },
        getValue() {
            return this.state
        },
        counterAdd(state) {
            this.count[state]++;
        },
        getCounter() {
          return this.count
        },
        clearCounter() {
            this.count[0] = 0;
            this.count[1] = 0;
        }
    },
    Automate = {
        calculateValue(nowState, inputState, random) {

            if(random === 1) return 0;
            if(nowState === 0 && inputState === 0 && random === 1) return 0;
            if(nowState === 0 && inputState === 1) {
                if(random <= 0.4) {
                    return 1
                } else {
                    return 0
                }
            }
            if(nowState === 1 && inputState === 1) {
                if(random <= 0.5) {
                    return 0
                } else {
                    return 1
                }
            }

        }
    };
function $(selector) {
    return document.querySelector(selector);
}
function _$(selector) {
    return document.querySelectorAll(selector);
}

(() => {
    let
        startBtn                   = $('#startBtn'),
        info                       = $('#info'),
        randomState                = $('#random'),
        state                      = $('#state'),
        inputValue                 = $('#inputValue'),
        resultState0               = $('#resultState0'),
        resultState1               = $('#resultState1'),
        arrInputStateSecondRoad    = [].slice.call(_$('[name="secondRoad"]'));

    arrInputStateSecondRoad.forEach(item => {
        item.addEventListener('click', function () {
            inputValue.innerText = this.value;
        });
    });

    inputValue.innerText = 0;
    state.innerText = TrafficLight.getValue();

    startBtn.addEventListener('click', () => {
        let iteration       = 0,
            countIterations = $('#countIterations').value,
            time            = $('#timeIteration').value * 1000,
            data = {
                labels: ['0'],
                series: [
                    [0]
                ]
            };

        let chart = new Chartist.Line('.ct-chart', data);

        if(countIterations.innerText !== '') {
            info.innerText = 'старт дан';
            TrafficLight.clearCounter();

            let interval = setInterval(() => {
                $('#timeIteration').disabled = true;
                $('#countIterations').disabled = true;

                if(iteration < countIterations) {
                     let randomNumber = '',
                         nowState     = TrafficLight.getValue(),
                         inputState   = Number( $('#inputValue').innerText );

                    inputState !== 0 ? (randomNumber = Number( Math.random().toFixed(1) )) : ( randomNumber = 1 );

                    TrafficLight.setValue( Automate.calculateValue(nowState, inputState, randomNumber) );

                    /*выводим данные*/
                    randomState.innerText = randomNumber;
                    state.innerText = TrafficLight.getValue();
                    resultState0.innerText = TrafficLight.getCounter()[0];
                    resultState1.innerText = TrafficLight.getCounter()[1];
                    iteration++;

                    /*обновляем график*/
                    data.series[0].push( String(TrafficLight.getValue()) );
                    data.labels.push(iteration * ( time / 1000 ));
                    chart.update(data);
                } else {
                    clearInterval(interval);
                    $('#timeIteration').disabled = false;
                    $('#countIterations').disabled = false;
                    info.innerText = 'проход завершен'
                }
            }, time)
        }  else {
            info.innerText = 'введите количество итераций';
        }
    })


})();