(function(){
    var maxSize  = document.querySelector('#maxSize'),
        minSize  = document.querySelector('#minSize'),
        maxWidth = document.querySelector('#maxWidth'),
        minWidth = document.querySelector('#minWidth'),
        maxValue = document.querySelector('#maxValue'),
        minValue = document.querySelector('#minValue'),
        result   = document.querySelector('#result'),
        clear   = document.querySelector('#clear'),
        output   = document.querySelector('#output-text'),
        history   = document.querySelector('#history'),
        selectViewport   = Array.from( document.querySelectorAll('[name="viewport"]') ),
        count    = 0;

        selectViewport.forEach(function(item) {
           item.addEventListener('click', function(event){
               var value = event.target.value;

               if(value == 'vh') {
                   maxValue.innerText = 'maxHeight';
                   minValue.innerText = 'minHeight';
               } else if(value == 'vw') {
                   maxValue.innerText = 'maxWidth';
                   minValue.innerText = 'minWidth';
               }
           });
        });

        clear.addEventListener('click', function() {
            var outputNow   = document.querySelector('#output-text');
            outputNow.value = '';
        });

        result.addEventListener('click', function() {
            count++;

            var divHistory      = document.createElement('div'),
                divItem         = divHistory.cloneNode(true),
                divItemCount    = divHistory.cloneNode(true),
                divItemValue     = divHistory.cloneNode(true),
                divItemContent  = divHistory.cloneNode(true),
                divContentM     = divHistory.cloneNode(true),
                divContentB     = divHistory.cloneNode(true),
                divContentY     = divHistory.cloneNode(true),

                viewportValue        = document.querySelector('.viewport__input:checked').value;

            // debugger;

            divHistory.setAttribute('class', 'history__item history__item--' + count + '');
            divItem.setAttribute('class', 'item item__title');
            divItemCount.setAttribute('class', 'item item__count');
            divItemValue.setAttribute('class', 'item item__value');
            divItemContent.setAttribute('class', 'item item__content');
            divContentM.setAttribute('class', 'content content__m');
            divContentB.setAttribute('class', 'content content__b');
            divContentY.setAttribute('class', 'content content__y');

            var maxSizeVal =  maxSize.value,
                minSizeVal =  minSize.value,
                maxWidthVal = maxWidth.value,
                minWidthVal = minWidth.value,

                m = ( maxSizeVal - minSizeVal ) / ( maxWidthVal - minWidthVal ),
                b = minSizeVal - m * minWidthVal,
                y = m * 100 + b,
                m_out = (m * 100).toFixed(2),
                b_out = (b).toFixed(2);

            var outputResultValue = ' calc( '+ m_out + viewportValue +' + ' + b_out + 'px )';

            divItemCount.innerHTML = '[' + count + ']';
            divItemValue.innerHTML = outputResultValue;
            divContentM.innerHTML = 'm = ( ' + maxSizeVal + ' - ' + minSizeVal +' ) / ( ' + maxWidthVal + ' - ' + minWidthVal + ' )';
            divContentB.innerHTML = 'b = ' + minSizeVal +' - ' + m + ' * ' + minWidthVal + ' )';
            divContentY.innerHTML = 'y = ' + m + ' * 100' + viewportValue + ' + ' + b + ' = ' + m_out + viewportValue +' + ' + b_out + '';

            output.value += '['+ count +'] ' + outputResultValue + '\n';


            divItem.appendChild(divItemCount);
            divItem.appendChild(divItemValue);
            divHistory.appendChild(divItem);
            divItemContent.appendChild(divContentM);
            divItemContent.appendChild(divContentB);
            divItemContent.appendChild(divContentY);
            divHistory.appendChild(divItemContent);

            history.insertBefore(divHistory, history.children[0]);
        });
})();
