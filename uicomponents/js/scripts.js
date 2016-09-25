// скрипт для проверки правильности ввода пароля и емэйла
//-----
// этот код реализован с помощью этой статьи
// http://ruseller.com/lessons.php?id=472&rub=28
//-----
// и этой статьи
// http://goldblog.com.ua/2009/03/proverka-paroley-na-javascript/
//-----
// за более подробной информацией иди туда
//-----
$(document).ready(function() 
{     
    var regular = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i; //регулярное выражение для проверки правильности ввода емэйла
    var email = $(".checkEmail");
    var emailComplexity = $(".email-complexity");

    var strPassword = "";     //содержит текст, введенный в качестве пароля
    var charPassword = "";     //charPassword - это массив, в котором содержатся все символы пароля
    var complexity = $(".password-complexity");     //complexity отвечает за связь с элементом span
    var indicator = $(".indicator");    //indicator отвечает за связь с элементом div
    var passwordCheck = $(".password-check");
    var inputPassword = $("#inputPassword");
    var checkPassword = $("#checkPassword");
    var minPasswordLength = 8;
    var baseScore = 0, score = 0;
    
    // массив, в котором будет содержаться количество дополнительных символов, заглавных букв, цифр и строчных букв
    var num = {};
    num.Excess = 0;
    num.Upper = 0;
    num.Numbers = 0;
    num.Symbols = 0;

    //массив bonus содержит количество бонусов за пароль (для подсчета уровня сложности пароля)
    var bonus = {};
    bonus.Excess = 3;
    bonus.Upper = 4;
    bonus.Numbers = 5;
    bonus.Symbols = 5;
    bonus.Combo = 0; 
    bonus.FlatLower = 0;
    bonus.FlatNumber = 0;
    
    outputResult();
    
    checkEmail.oninput = function () {
        if (!regular.test(checkEmail.value) && checkEmail.value != "") {
            checkEmail.style.borderColor = "#DB5449";
            emailComplexity.html("Введен некорректный емэйл").removeClass('content-item-default').addClass('content-item-weak');

        } else
            if (regular.test(checkEmail.value)) {
                checkEmail.style.borderColor = "#01D043";
                emailComplexity.html("Введен корректный емэйл").removeClass('content-item-weak content-item-default').addClass('content-item-strongest');
            } else 
            if (checkEmail.value == "") {
                checkEmail.style.borderColor = "gainsboro";
                emailComplexity.html("Введите корректный емэйл").removeClass('content-item-weak content-item-strongest').addClass(' content-item-default');
            }
    }
        

    // функция активируется при вводе паролей в поля для ввода
    inputPassword[0].oninput = function ()
    {                                                            
        init();

        if (charPassword.length >= minPasswordLength)
        {
          baseScore = 50; 
          analyzeString();    
          calcComplexity();       
        }
        else
        {
            baseScore = 0;
        }


        var width = 20*charPassword.length+20;    //высчитываем смещение индикатора в зависимости от количества символов
        
        if(width>0 && width<300)    //если индикатор не полностью выдвинут, тогда выдвигаем
        {                                                        
        	indicator[0].style.width=width+"px";
        } else
        if(width>=300)    //если индикатор полностью выдвинут, тогда дальше не выдвигаем
        {
        	indicator[0].style.width="300px";
        }

        // если в текстовом поле пусто, тогда не выдвигаем
        if (charPassword.length == 0)
        {
        	indicator[0].style.width="0px";
        }
        
        outputResult();
        check();
    }

    checkPassword[0].oninput = function ()
    {             
        check();
    }

    // Проверка правильности ввода пароля
    function check() {
        if (inputPassword.val() == checkPassword.val()) {
            passwordCheck.html("Пароли совпадают").removeClass("content-item-weak").addClass("content-item-strongest");
        } else
        if (inputPassword.val() != checkPassword.val()) {
            passwordCheck.html("Пароли не совпадают").removeClass("content-item-strongest").addClass("content-item-weak");
        }
        if (checkPassword.val() == "")
        {
            passwordCheck.html("");
        }
    }

    // функцию отслеживает все актуальные переменные и добавляет их в функцию checkVal
    function init()
    {                                                            
        strPassword= $("#inputPassword").val();
        charPassword = strPassword.split("");

        num.Excess = 0;
        num.Upper = 0;
        num.Numbers = 0;
        num.Symbols = 0;
        bonus.Combo = 0; 
        bonus.FlatLower = 0;
        bonus.FlatNumber = 0;
        baseScore = 0;
        score =0;
    }

    // Анализ введенного пароля
    function analyzeString ()
    {                                                               
        for (i=0; i<charPassword.length;i++)
        {
          if (charPassword[i].match(/[A-Z]/g)) {num.Upper++;}
          if (charPassword[i].match(/[0-9]/g)) {num.Numbers++;}
          if (charPassword[i].match(/(.*[!,@,#,$,%,^,&,*,?,_,~])/)) {num.Symbols++;} 
        }
  
        num.Excess = charPassword.length - minPasswordLength;
  
        if (num.Upper && num.Numbers && num.Symbols)
        {
            bonus.Combo = 25; 
        }
  
        else if ((num.Upper && num.Numbers) || (num.Upper && num.Symbols) || (num.Numbers && num.Symbols))
        {
            bonus.Combo = 15; 
        }
  
        if (strPassword.match(/^[\sa-z]+$/))
        { 
            bonus.FlatLower = -15;
        }
  
        if (strPassword.match(/^[\s0-9]+$/))
        { 
            bonus.FlatNumber = -35;
        }
    }

    // Подсчет уровня сложности
    function calcComplexity()
    {
        
        score = baseScore + (num.Excess*bonus.Excess) + (num.Upper*bonus.Upper) + (num.Numbers*bonus.Numbers) + (num.Symbols*bonus.Symbols) + bonus.Combo + bonus.FlatLower + bonus.FlatNumber;

    }   
    
    // оформляем вывод в соответствие со сложностью пароля
    function outputResult()
    {
        
        if ($("#inputPassword").val() == "")
        { 
          complexity.html("Введите пароль").removeClass('content-item-weak content-item-strong content-item-stronger content-item-strongest').addClass('content-item-default');
          indicator.removeClass('content-color-weak content-color-strong content-color-stronger content-color-strongest').addClass('content-color-default');
        }
        else if (charPassword.length < minPasswordLength)
        {
            complexity.html("Минимум " + minPasswordLength+ " символов!").removeClass('content-item-strong content-item-stronger content-item-strongest').addClass('content-item-weak');
            indicator.removeClass('content-color-strong content-color-stronger content-color-strongest').addClass('content-color-weak');
        }
        else if (score<50)
        {
            complexity.html("Слабый!").removeClass('content-item-strong content-item-stronger content-item-strongest').addClass('content-item-weak');
            indicator.removeClass('content-color-strong content-color-stronger content-color-strongest').addClass('content-color-weak');
        }
        else if (score>=50 && score<75)
        {
            complexity.html("Средний!").removeClass('content-item-stronger content-item-strongest').addClass('content-item-strong');
            indicator.removeClass('content-color-stronger content-color-strongest').addClass('content-color-strong');
        }
        else if (score>=75 && score<100)
        {
            complexity.html("Сложный!").removeClass('content-item-strongest').addClass('content-item-stronger');
            indicator.removeClass('content-color-strongest').addClass('content-color-stronger');
        }
        else if (score>=100)
        {
            complexity.html("Надежный!").addClass('content-item-strongest');
            indicator.addClass('content-color-strongest');
        }

        if (checkEmail.value == "") {
                checkEmail.style.borderColor = "gainsboro";
                emailComplexity.html("Введите корректный емэйл").removeClass('content-item-weak content-item-strongest').addClass(' content-item-default');
            }
    }

}); 
 