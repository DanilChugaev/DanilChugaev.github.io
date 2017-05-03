(function() {
    var scrolled = document.getElementsByClassName("scrolled"),
        arr      = [].slice.call(scrolled), /*преобразуем коллекцию в массив*/
        arrowTo  = document.getElementById("arrow-to-top"),
        speed    = 0.2; /*больше значение - меньше скорость прокрутки*/
    
    if(arr.length == 0) 
    	return;

    /*появление стрелки прокрутки при скролле*/
    window.onscroll = function() {
    	if(window.pageYOffset || document.documentElement.scrollTop != 0) {
    		arrowTo.classList.add("active");
    	} else {
    		arrowTo.classList.remove("active");
    	}
    }

    arr.forEach(function(item, i, arr) {
    	/*каждый элемент подписываем на событие клика*/
        item.addEventListener("click", function(event) {
            event.preventDefault(); /*отменяем стандартное поведение браузера у элемента*/

            var attr = this.getAttribute('href').slice(1),
                elem = document.getElementById(attr),
                position = elem.getBoundingClientRect().top,
                w = window.pageYOffset,
                start = null;

            /*прокручиваем до элемента с анимацией*/
            requestAnimationFrame(step);

            function step(time) {
            	
                if (start === null) 
                	start = time;

                var progress = time - start,
                    direct = (position < 0 ? Math.max(w - progress / speed, w + position) : Math.min(w + progress / speed, w + position));

                window.scrollTo(0, direct);

                if (direct != w + position) {
                    requestAnimationFrame(step);
                } else {
                    location.elem = elem;
                }
            }
        });
    });

})();
