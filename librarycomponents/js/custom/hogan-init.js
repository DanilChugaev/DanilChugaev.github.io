/*
 <form>

 <div class="positions">
 <div class="new-position"></div>
 </div>

 <a href="add" class="add" data-index="0">Добавить позицию</a>


 <input required class="form__required" type="text" placeholder="Ваше имя">
 <input required class="form__required" placeholder="Телефон" id="mask-phone" type="tel" name="tel" pattern="^\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$" placeholder="+7 (___) ___ __ __">
 <input required class="form__required" type="email" pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" placeholder="Э-почта">
 <textarea required placeholder="Комментарий" class="form__textarea form__required" rows="5"></textarea>


 <input type="submit" class="submit" value="Отправить заявку">
 </form>



<script type="text/html" id="templateSelect">
    {{#listSelect}}
<a href="delete" data-index="{{index}}" class="delete" style="display: {{display}};">Убрать позицию</a>
<ul class="form__select" data-index="{{index}}">
    <li>
    <div class="select__type">Наименование: MONOLIT (Россия)</div>
<div class="selection__content" name="product[{{index}}][name]">MONOLIT (Россия)</div>
    </li>
    <li>
    <div class="select__type">Мощность трансформатора, кВА:</div>
<div class="selection__content">
    <select class="js-select" name="product[{{index}}][transformerPower]">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    </select>
    </div>
    </li>
    <li>
    <div class="select__type">Номинальное напряжение обмотки, ВН:</div>
<div class="selection__content">
    <select class="js-select" name="product[{{index}}][ratedWindingVoltage-vn]">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    </select>
    </div>
    </li>
    <li>
    <div class="select__type">Номинальное напряжение обмотки, НН:</div>
<div class="selection__content">
    <input type="text" class="form__input--text" name="product[{{index}}][ratedWindingVoltage-nn]">
    </div>
    </li>
    <li>
    <div class="select__type">Схема соединения обмоток:</div>
<div class="selection__content">
    <select class="js-select" name="product[{{index}}][connectionSchemeWindings]">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    </select>
    </div>
    </li>
    <li>
    <div class="select__type">Кол-во трансформаторов, шт.:</div>
<div class="selection__content">
    <input type="text" class="form__input--text" name="product[{{index}}][numberTransformers]">
    </div>
    </li>
    <li>
    <div class="select__type">Степень защиты оболочки:</div>
<div class="selection__content">
    <select class="js-select" name="product[{{index}}][degreeProtectionShell]">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    </select>
    </div>
    </li>
    <li>
    <div class="select__type">Система принудительного охлаждения:</div>
<div class="selection__content">
    <label class="label__for-input"><input class="form__input--radio" type="radio" name="product[{{index}}][ForcedCoolingSystem]"><span class="form__span">нет</span></label>
    <label class="label__for-input"><input class="form__input--radio" type="radio" name="product[{{index}}][ForcedCoolingSystem]"><span class="form__span">да</span></label>
    </div>
    </li>
    <li>
    <div class="select__type">Щит тепловой защиты:</div>
<div class="selection__content">
    <label class="label__for-input"><input class="form__input--radio" type="radio" name="product[{{index}}][ThermalProtectionShield]"><span class="form__span">нет</span></label>
    <label class="label__for-input"><input class="form__input--radio" type="radio" name="product[{{index}}][ThermalProtectionShield]"><span class="form__span">да</span></label>
    </div>
    </li>
    <li>
    <div class="select__type">Шумовиброгасящие опоры:</div>
<div class="selection__content">
    <label class="label__for-input"><input class="form__input--radio" type="radio" name="product[{{index}}][NoiseAbsorbingSupports]"><span class="form__span">нет</span></label>
    <label class="label__for-input"><input class="form__input--radio" type="radio" name="product[{{index}}][NoiseAbsorbingSupports]"><span class="form__span">да</span></label>
    </div>
    </li>
    </ul>
    {{/listSelect}}
</script>*/

/*

 Style
.submit {
    box-sizing: border-box;
    border: 1px solid currentColor!important;
}
.submit:hover {
    border: 1px solid #e03d3f!important;
}

.form__select {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;

    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;

    margin: 20px 0;
}
.form__select li {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;

    margin-bottom: 10px;
}
.form__select li div {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;

    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;

    width: 50%;
}
.form__select li .label__for-input {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex

    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;

    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    margin-right: 10px;
}
.form__input--radio {
    margin: 0!important;
    padding: 0!important;
    width: inherit!important;
}
.form__input--text {
    width: inherit!important;
    border-width: 1px!important;
    padding: 5px!important;
    margin: 0!important;
}
.form__span {
    padding: 0!important;
    position: static!important;
    font-size: 15px!important;
    margin-left: 5px;
}

.selection__content span{
    padding-top: 0!important;
    font-size: inherit !important;
    position: static!important;
}

.selection__content .select2 {
    width: 250px!important;
    position: relative !important;
    margin-left: 50px;
}
.selection__content .select2 .select2-selection__arrow{
    position: absolute!important;
}

.form__textarea {
    resize: vertical!important;
}

.form__required {
    width: 100%!important;
    border-width: 1px!important;
}

.positions {
}

form .add {
    margin-bottom: 20px;
    display: inline-block;
}
form .delete {
    margin-bottom: -10px;
    display: inline-block;
}

.new-position {
    background-color: #F9F9F9;
    position: relative;
    opacity: 0.99;
    z-index: 1000;
    transform:translateY(0);
}

.animation {
    animation: fadeIn 0.5s ease-in-out forwards;
}
.animation-reverse {
    animation: fadeOut 0.5s ease-in-out forwards;

}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform:translateY(-350px);
    }
    to {
        opacity: 0.99;
        transform:translateY(0);
    }
}
@keyframes fadeOut {
    from {
        opacity: 0.99;
        margin-top: 0px;
    }
    to {
        opacity: 0;
        margin-top: -391px;
    }
}

*/



// <script type = "text/javascript" >

/*
* вместе с шаблонностью реализована возможность добавления удаления блоков этих шаблонов
* + анимация
* */
(function(){
    var content  = document.getElementsByClassName('new-position')[0],
        data     = {
            listSelect: [{
                index: 0,
                display: 'none'
            }]
        },
        source   = document.getElementById('templateSelect').innerHTML,
        template = Hogan.compile(source),
        output   = template.render(data);

    content.innerHTML = output;
})();

$(".js-select").select2();

$(function(){
    $("body").on('click', '.add', function (event) {
        event.preventDefault();

        var oldPosition = Number( $('.add').attr('data-index') ),
            newPosition = oldPosition + 1,
            zIndex     = 1000 - newPosition;

        newElement = $('<div class="new-position animation" style="z-index:'+zIndex+';"></div>').appendTo('.positions'),
            data     = {
                listSelect: [{
                    index: newPosition,
                    display: 'flex'
                }]
            },
            source   = document.getElementById('templateSelect').innerHTML,
            template = Hogan.compile(source),
            output   = template.render(data);

        $('.positions .new-position:eq('+newPosition+')').html(output);
        $('.new-position:eq('+newPosition+') .form__select').attr('data-index',newPosition);
        $('.add').attr('data-index',newPosition);
        $(".js-select").select2();

        setTimeout(function(){
            $('.positions .new-position:eq('+newPosition+')').removeClass('animation');
        }, 1000);

    });
    $("body").on('click', '.delete', function (event) {
        event.preventDefault();

        var oldPosition = Number( $(this).attr('data-index') );
        $('.form__select[data-index="'+oldPosition+'"]').parent().addClass('animation-reverse');

        setTimeout(function(){
            $('.form__select[data-index="'+oldPosition+'"]').parent().remove();

            var elements = $('.form__select');
            $('.add').attr('data-index', elements.length - 1 );
            // debugger
            for(var i = 0; i < elements.length; i++) {
                $('.form__select:eq('+i+')').attr('data-index', i);
                $('.positions .new-position:eq('+i+')').css('z-index', 1000-i);
                $('.delete:eq('+i+')').attr('data-index', i);
            }
        }, 1200);


    });


});
// </script >