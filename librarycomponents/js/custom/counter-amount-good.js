(function() {
    /*
     *    счетчик
     */
    var amount = document.getElementsByClassName('amount-good'),
        lessAmount = document.getElementsByClassName('less-amount'),
        moreAmount = document.getElementsByClassName('more-amount');

    for(var i = 0; i < amount.length; i++) {
        amount[i].addEventListener('keydown', function(event) {
            if( (isNaN(event.key) || event.key == " ") && event.key != "Backspace" && event.key != "Delete" && event.key != "ArrowLeft" && event.key != "ArrowRight") {
                event.preventDefault();
            }
        });
    }
    for(var i = 0; i < lessAmount.length; i++) {
        lessAmount[i].addEventListener('click', function(event) {
            if(this.nextSibling.nextSibling.value == 1)
                return false;

            this.nextSibling.nextSibling.value--;
        });
    }
    for(var i = 0; i < moreAmount.length; i++) {
        moreAmount[i].addEventListener('click', function(event) {
            this.previousSibling.previousSibling.value++;
        });
    }
})();