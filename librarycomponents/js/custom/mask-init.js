window.onload = function() {
    MaskedInput({
        elm: document.getElementById('mask-phone'),
        format: '+7 (___) ___-__-__',
        separator: '+7 ()-'
    });
};