/*
 * реализовать переключатель (tab-selection) чтобы кода было минимум и была возможность работать как с помощью js, так и спомощью css
 * */
(function () {
    var input = document.getElementsByClassName('input-radio'),
        content = document.getElementsByClassName('radio-info');

    for (var i = 0; i < input.length; i++) {

        input[i].addEventListener('click', function () {
            var tab = this.dataset.tab;

            for (var i = 0; i < content.length; i++) {
                if (content[i].classList.contains(tab)) {
                    content[i].style.display = 'block';
                } else {
                    content[i].style.display = 'none';
                }
            }
        });
    }
/*коммент*/
})();
