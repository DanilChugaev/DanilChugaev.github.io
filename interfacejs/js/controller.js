var model = {
        items: [
            { email: "sidorov@mail.ru", done: false, count: 0 }
        ]
};

var emailApp = angular.module("jsApp", []);

emailApp.controller("jsController", ['$scope', function ($scope) {
    var input = document.getElementById("input");
    $scope.list = model;

    $scope.addEmails = function () {    //функция добавления рандомного емэйла в массив
        var random = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < Math.random() * possible.length; i++)
            random += possible.charAt(Math.floor(Math.random() * possible.length));

        $scope.list.items.push({ email: random + "@mail.ru", done: false, count: $scope.list.items.length })
    }

    /*отслеживание нажатой клавиши*/
    input.onkeyup = function (event) {
        //event.keyCode = 188 - запятая
        //event.keyCode = 191 - slash, находящийся рядом с правым shift
        //event.keyCode = 13 - enter
        if (event.keyCode == 13 || event.keyCode == 191 || event.keyCode == 188)
        {
            if (event.keyCode == 191 || event.keyCode == 188) {         //если нажата запятая или slash около правого shift
                var str = event.target.value;                           //необходимо обрезать строку при формировании ее в блок
                event.target.value = str.substring(0, str.length - 1)   //(удаляется последний символ)
            }                                                           
            checkAndPushEmail(event);   //проверяем емэйл и добавляем в массив
        }
        event = "";
    }

    //если текстовое поле теряет фокус
    input.onblur = function (text) {
        if (text.currentTarget.value != "") {
            checkAndPushEmail(text);    //проверяем емэйл и добавляем в массив
        }        
        text = "";
    }

    function checkAndPushEmail(text) {
        var check = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;  //переменная для проверки корректности ввода емэйла   
        var enter = text.target.value;

        //проверяем корректность ввода емэйла
        if (!check.test(enter) || enter == "") {//если не корректный емэйл
            $scope.list.items.push({ email: enter, done: false, count: $scope.list.items.length, error: true }); //устанавливаем класс ошибки
        } else {
            $scope.list.items.push({ email: enter, done: false, count: $scope.list.items.length, error: false });
        }
        $scope.$apply($scope.list.items);   //необходим для открытия видимости событий барузера в angularJS
        input.value = "";
    }

    //функция удаления емэйла из массива
    $scope.deleteEmails = function (text) {
        for (i = 0; i < $scope.list.items.length; i++) {
            if (text.email == $scope.list.items[i].email) {
                $scope.list.items.splice(i, 1);
            }
        }
    }

    //функция вывода количества введенных емэйлов
    $scope.getEmailsCount = function () {
        alert("Количество емэйлов: " + $scope.list.items.length + " шт.")
    }

}])

//код для создания реиспользуемой директивы <emails-editor>
.directive('emailsEditor', function () {
    return {
        template:
            '<div class="emails-editor">' +
                '<h1>Share "Board name" with others</h1>' +
                '<div class="emails-editor__input">' + 
                    '<div id="archive" class="archive" ng-repeat="item in list.items" ng-class="item.error==true ? \'error\':\'\'">' +
                        '<span ng-bind="item.email"></span>' +
                        '<input class="checkbox" type="checkbox" ng-model="item.done" />' +
                        '<label for="checkbox" ng-click="deleteEmails(item)"></label>' +
                    '</div> <input id="input" type="text" ng-model="text" placeholder="add more people ..." />' +                   
                 '</div>' +
            '</div>'
    };
});
