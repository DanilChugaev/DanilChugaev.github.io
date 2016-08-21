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
    input.onkeyup = function (text) {
        if (text.code == "Enter" || text.code == "Comma") { //если нажата клавиша энтер или запятая
            debugger
            checkAndPushEmail(text);    //проверяем емэйл и добавляем в массив
        }
        text = "";
    }

    //если текстовое поле теряет фокус
    input.onblur = function (text) {
        debugger
        checkAndPushEmail(text);    //проверяем емэйл и добавляем в массив
        text = "";
    }

    function checkAndPushEmail(text) {
        var check = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;  //переменная для проверки корректности ввода емэйла   
        var enter = text.target.value;

        if (enter != "") {
            $scope.list.items.push({ email: enter, done: false, count: $scope.list.items.length });
            input.value = "";
        }

        //проверяем корректность ввода емэйла
        if (!check.test(enter) && enter != "") {//если не корректный емэйл
            var archive = document.getElementById("archive");

            for (i = 0; i < $scope.list.items.length; i++) {
                if (enter == $scope.list.items[i].email) {
                    //необходимо i-тому элементу устанавливать класс ошибки
                    archive.classList.add("error"); //устанавливаем класс ошибки
                }
            }
        }
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
                    '<div id="archive" class="archive" ng-repeat="item in list.items">' +
                        '<span ng-bind="item.email"></span>' +
                        '<input class="checkbox" type="checkbox" ng-model="item.done" />' +
                        '<label for="checkbox" ng-click="deleteEmails(item)"></label>' +
                    '</div> <input id="input" type="text" ng-model="text" placeholder="add more people ..." />' +
                 '</div>' +
            '</div>'
    };
});
