$(function(){
    /*
    * на странице "подписки и рассылки" скрытие окон с выбором даты и времени вне этих окон
    * */
    $(document).mouseup(function (e) {
        var container = $(".action-dayOfWeek,.action-hourOfDay");

        if($(e.target).parents('.action-bottom').length >0 ) {
            console.log('in window');
            e.preventDefault();
        } else {
            container.children('.action-bottom').hide();
        }
    });

    $('.action-dayOfWeek > label, .action-hourOfDay > label').on('click', function () {
        $this = $(this);

        $('.action-dayOfWeek .action-bottom, .action-hourOfDay .action-bottom').css('display', 'none');
        $this.parent().children('.action-bottom').css('display', 'block').css('position', 'absolute');

    });
});