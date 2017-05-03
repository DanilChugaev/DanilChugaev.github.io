(function(){
    let lang = document.getElementById('js-lang-select'),
        langChild = lang.getElementsByTagName('input'),
        html = document.getElementsByTagName('html')[0];


    lang.addEventListener('click', function(event){
        /*
         *   Установка языкового атрибута
         *   Сохранение данных в localStorage
         **/
        if(event.target.value == 'ru') {
            html.setAttribute('lang', 'en');
            localStorage.setItem('lang', 'en');
            langChild[0].value = 'en';
        } else if(event.target.value == 'en') {
            html.setAttribute('lang', 'ru');
            localStorage.setItem('lang', 'ru');
            langChild[0].value = 'ru';
        }
    });

    if (localStorage.getItem('lang')) {
        /*
         *   Получение данных из localStorage и установка языкового атрибута при обновлении/загрузке страницы
         **/
        html.setAttribute('lang', localStorage.getItem('lang'));
        langChild[0].value = localStorage.getItem('lang');

        if(langChild[0].value == 'en') {
            langChild[0].checked = true;
        } else {
            langChild[0].checked = false;
        }
    }
})();