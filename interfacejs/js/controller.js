"use strict"

let model = {
        items: [
            {
                email: "sidorov@mail.ru",
                done: false,
                count: 0,
                error: false
            }
        ]
    },
    emailApp = angular.module("jsApp", []),
    keyCodes = {
        enter: 13,
        ctrlPlusV: 17,
        comma: 188,
        slash: 191
    }

emailApp
.directive('emailsEditor', function () {
    return {
        // scope: {
        //     emailText: '@emailText',
        //     list: '@list'
        // },
        template:
            `<div class="emails-editor">
                <div class="archive" ng-repeat="item in list.items" ng-class="item.error==true ? \'error\':\'\'">
                    <span ng-bind="item.email"></span>
                    <input class="checkbox" type="checkbox" ng-model="item.done" />
                    <label for="checkbox" ng-click="deleteEmails(item)"></label>
                </div> 
                <input class="input" type="text" ng-model="emailText" ng-keyup="inputKeyup()" ng-blur="inputBlur()" placeholder="add more people ..." />
            </div>`,
    }
})
.controller("jsController", ['$scope', function ($scope) {
    $scope.list = model
    /*
    * Генерация рандомного емэйла
    * */
    $scope.generateRandom = () => {
        let random = "",
            possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for (var i = 0; i < Math.random() * possible.length; i++)
            random += possible.charAt(Math.floor(Math.random() * possible.length))

        return random + "@mail.ru"
    }
    /*
    * Добавление емэйла в массив
    * @param {string} email - по умолчанию генерируется рандомный емэйл
    * @param {boolean} error - по умолчанию ошибок нет
    * */
    $scope.addEmails = (email = $scope.generateRandom(), error = false) => {
        $scope.list.items.push({
            email,
            done: false,
            count: $scope.list.items.length,
            error
        })
    }
    /*
    * Отслеживание нажатой клавиши и дальнейшая проверка емэйла
    * */
    $scope.inputKeyup = () => {
        let keyCode = event.keyCode

        if (keyCode === keyCodes.enter
            || keyCode === keyCodes.slash
            || keyCode === keyCodes.comma
            || keyCode === keyCodes.ctrlPlusV)
        {
            if (keyCode === keyCodes.comma || keyCode === keyCodes.slash) {
                let str = $scope.emailText
                $scope.emailText = str.substring(0, str.length - 1)
            }
            $scope.checkAndPushEmail($scope.emailText)
        }
    }
    /*
    * Если текстовое поле теряет фокус вызываем функцию проверки емэйла на корректность
    * */
    $scope.inputBlur = () => {
        let text = $scope.emailText

        if (text !== "")
            $scope.checkAndPushEmail(text)
    }
    /*
    * Проверка емэйла на корректность ввода и дальнейшее добавление в массив
    * */
    $scope.checkAndPushEmail = email => {
        let check = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i,
            error = false

        if (!check.test(email) || email === "")
            error = true

        $scope.addEmails(email,error)

        $scope.emailText = ""
    }
    /*
    * Удаление емэйла из массива
    * */
    $scope.deleteEmails = text => {
        for (var i = 0; i < $scope.list.items.length; i++) {
            if (text.email === $scope.list.items[i].email)
                $scope.list.items.splice(i, 1)
        }
    }
    /*
    * Вывод количества введенных емэйлов
    * */
    $scope.getEmailsCount = () => alert("Количество емэйлов: " + $scope.list.items.length + " шт.")
}])