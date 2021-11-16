/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/img/bomb.png":
/*!**************************!*\
  !*** ./src/img/bomb.png ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "img/bomb.png");

/***/ }),

/***/ "./src/img/flag.png":
/*!**************************!*\
  !*** ./src/img/flag.png ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "img/flag.png");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/builder/constants.ts":
/*!**********************************!*\
  !*** ./src/builder/constants.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AREA_STRUCTURE": () => (/* binding */ AREA_STRUCTURE)
/* harmony export */ });
/**
 * Относительные координаты соседних ячеек области
 *
 * #1#2#3#
 * #8-+-4#
 * #7#6#5#
 */
var AREA_STRUCTURE = {
    0: { x: -1, y: -1 },
    1: { x: 0, y: -1 },
    2: { x: 1, y: -1 },
    3: { x: 1, y: 0 },
    4: { x: 1, y: 1 },
    5: { x: 0, y: 1 },
    6: { x: -1, y: 1 },
    7: { x: -1, y: 0 },
};


/***/ }),

/***/ "./src/builder/index.ts":
/*!******************************!*\
  !*** ./src/builder/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LevelBuilder": () => (/* binding */ LevelBuilder)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/builder/constants.ts");

var LevelBuilder = /** @class */ (function () {
    function LevelBuilder(generator) {
        this.generator = generator;
    }
    /**
     * Билдит уровень
     *
     * @param {GameSettings} settings - настройки игры
     *
     * @returns {MapStructure}
     */
    LevelBuilder.prototype.build = function (settings) {
        var _a = this.getSelectedLevel(settings.levels), fieldSize = _a.fieldSize, bombCount = _a.bombCount;
        this.fieldSize = fieldSize;
        this.bombCount = bombCount;
        this.canvasSize = settings.canvasSize;
        var map = this.generateMapStructure();
        return map;
    };
    /**
     * Возвращает выбранный уровень сложности из списка
     *
     * @param {ComplexityList} levels - список уровней сложности
     *
     * @returns {Complexity}
     */
    LevelBuilder.prototype.getSelectedLevel = function (levels) {
        var selectedLevel;
        for (var key in levels) {
            // @ts-ignore
            if (levels[key].selected) {
                // @ts-ignore
                selectedLevel = levels[key];
            }
        }
        return selectedLevel;
    };
    /**
     * Генерирует структуру поля для выбранного уровня сложности
     *
     * @param {Size} canvasSize - размер канваса в пикселях
     * @param {number} fieldSize - размер игрового поля в клетках
     * @param {number} bombCount - количество бомб на игровом поле
     *
     * @returns {MapStructure}
     */
    LevelBuilder.prototype.generateMapStructure = function () {
        var mapStructure = {
            pixelsCountInCell: this.canvasSize.width / this.fieldSize,
            bombCount: this.bombCount,
            cells: {},
            bombPositions: [],
            fieldSize: this.fieldSize,
        };
        mapStructure.bombPositions = this.generateRandomBombPositions(this.fieldSize * this.fieldSize);
        for (var y = 0; y < this.fieldSize; y++) {
            for (var x = 0; x < this.fieldSize; x++) {
                var row = y;
                var cell = x;
                if (!mapStructure.cells[row]) {
                    mapStructure.cells[row] = {};
                }
                var hasBomb = mapStructure.bombPositions.includes(x + y * this.fieldSize);
                var area = this.generateCellArea({ x: x, y: y });
                var cellStructure = {
                    y: row,
                    x: cell,
                    area: area,
                };
                if (hasBomb) {
                    cellStructure.hasBomb = hasBomb;
                }
                else {
                    cellStructure.value = this.calcBombsAroundCells(area, mapStructure.bombPositions);
                }
                mapStructure.cells[row][cell] = cellStructure;
            }
        }
        console.log(mapStructure);
        return mapStructure;
    };
    /**
     * Генерирует область ячеек с их координатами вокруг выбранной ячейки на основе ее координат
     *
     * @param {number} x - координата 'x' ячейки
     * @param {number} y - координата 'y' ячейки
     *
     * @returns {AreaStructure}
     */
    LevelBuilder.prototype.generateCellArea = function (_a) {
        var x = _a.x, y = _a.y;
        var area = {};
        // 8 - количество ячеек вокруг центральной
        for (var index = 0; index < 8; index++) {
            /** Проверяем, не выходит ли ячейка за левую и верхнюю границы поля */
            // @ts-ignore
            if (x + _constants__WEBPACK_IMPORTED_MODULE_0__.AREA_STRUCTURE[index].x < 0 || y + _constants__WEBPACK_IMPORTED_MODULE_0__.AREA_STRUCTURE[index].y < 0) {
                continue;
            }
            /** Проверяем, не выходит ли ячейка за правую и нижнюю границы поля */
            // @ts-ignore
            if (x + _constants__WEBPACK_IMPORTED_MODULE_0__.AREA_STRUCTURE[index].x >= this.fieldSize || y + _constants__WEBPACK_IMPORTED_MODULE_0__.AREA_STRUCTURE[index].y >= this.fieldSize) {
                continue;
            }
            // @ts-ignore
            area[index] = {
                // @ts-ignore
                x: x + _constants__WEBPACK_IMPORTED_MODULE_0__.AREA_STRUCTURE[index].x,
                // @ts-ignore
                y: y + _constants__WEBPACK_IMPORTED_MODULE_0__.AREA_STRUCTURE[index].y,
            };
        }
        return area;
    };
    /**
     * Генерирует рандомные позиции для расположения бомб на поле
     *
     * @param {number} cellsCount - количество ячеек на поле
     *
     * @returns {number[]}
     */
    LevelBuilder.prototype.generateRandomBombPositions = function (cellsCount) {
        var bombPositions = [];
        for (var index = 0; index < this.bombCount; index++) {
            var randomPosition = this.generator.getRandomArbitrary(1, cellsCount);
            while (bombPositions.includes(randomPosition)) {
                randomPosition = this.generator.getRandomArbitrary(1, cellsCount);
            }
            bombPositions.push(randomPosition);
        }
        return bombPositions.sort(function (a, b) { return a - b; });
    };
    /**
     * Считает количество бомб вокруг ячейки
     *
     * @param {AreaStructure} area
     * @param {number[]} bombPositions
     *
     * @returns {number}
     */
    LevelBuilder.prototype.calcBombsAroundCells = function (area, bombPositions) {
        var result = 0;
        for (var key in area) {
            // @ts-ignore
            var cell = area[key];
            if (bombPositions.includes(cell.x + cell.y * this.fieldSize)) {
                result += 1;
            }
        }
        return result;
    };
    return LevelBuilder;
}());



/***/ }),

/***/ "./src/context/index.ts":
/*!******************************!*\
  !*** ./src/context/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasContextProvider": () => (/* binding */ CanvasContextProvider)
/* harmony export */ });
var CanvasContextProvider = /** @class */ (function () {
    function CanvasContextProvider(elementSource, pixelRatioSource, settings) {
        this.elementSource = elementSource;
        this.pixelRatioSource = pixelRatioSource;
        this.settings = settings;
        this.canvas = null;
        this.context = null;
        var canvas = this.elementSource.getElement("canvas");
        if (!canvas)
            throw new Error("Failed to find a canvas.");
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.normalizeScale();
    }
    CanvasContextProvider.prototype.getInstance = function () {
        return this.context;
    };
    CanvasContextProvider.prototype.listenCanvasClick = function (callback) {
        // @ts-ignore
        this.canvas.addEventListener("click", callback);
    };
    CanvasContextProvider.prototype.listenCanvasContextMenu = function (callback) {
        // @ts-ignore
        this.canvas.addEventListener("contextmenu", callback);
    };
    CanvasContextProvider.prototype.normalizeScale = function () {
        if (!this.canvas || !this.context)
            return;
        var ratio = this.pixelRatioSource.devicePixelRatio || 1;
        var _a = this.settings.canvasSize, width = _a.width, height = _a.height;
        this.canvas.width = width * ratio;
        this.canvas.height = height * ratio;
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.context.imageSmoothingEnabled = false;
        this.context.scale(ratio, ratio);
    };
    return CanvasContextProvider;
}());



/***/ }),

/***/ "./src/dom/index.ts":
/*!**************************!*\
  !*** ./src/dom/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DomSource": () => (/* binding */ DomSource)
/* harmony export */ });
var DomSource = /** @class */ (function () {
    function DomSource(window) {
        this.window = window;
    }
    DomSource.prototype.createElement = function (name) {
        return this.window.document.createElement(name);
    };
    DomSource.prototype.getElement = function (id) {
        return this.window.document.getElementById(id);
    };
    DomSource.prototype.afterLoad = function (callback) {
        this.window.document.addEventListener("DOMContentLoaded", function (event) {
            callback(event);
        });
    };
    return DomSource;
}());



/***/ }),

/***/ "./src/drawer/constants.ts":
/*!*********************************!*\
  !*** ./src/drawer/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_COLOR": () => (/* binding */ DEFAULT_COLOR),
/* harmony export */   "DEFAULT_WIDTH": () => (/* binding */ DEFAULT_WIDTH),
/* harmony export */   "MAIN_BG_COLOR": () => (/* binding */ MAIN_BG_COLOR),
/* harmony export */   "INITIAL_FIELD_BG_COLOR": () => (/* binding */ INITIAL_FIELD_BG_COLOR),
/* harmony export */   "FLAG_BG_COLOR": () => (/* binding */ FLAG_BG_COLOR),
/* harmony export */   "TEXT_COLOR": () => (/* binding */ TEXT_COLOR)
/* harmony export */ });
var DEFAULT_COLOR = '#000000';
var DEFAULT_WIDTH = 1;
var MAIN_BG_COLOR = '#212121';
var INITIAL_FIELD_BG_COLOR = '#6666FF';
var FLAG_BG_COLOR = 'lightgray';
var TEXT_COLOR = 'white';


/***/ }),

/***/ "./src/drawer/index.ts":
/*!*****************************!*\
  !*** ./src/drawer/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasDrawer": () => (/* binding */ CanvasDrawer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/drawer/constants.ts");

var CanvasDrawer = /** @class */ (function () {
    function CanvasDrawer(contextProvider, fileProvider) {
        this.contextProvider = contextProvider;
        this.fileProvider = fileProvider;
        this.context = null;
        this.context = this.contextProvider.getInstance();
        if (!this.context)
            throw new Error("Failed to access the drawing context.");
        this.bomb = fileProvider.getImage('bomb');
        this.flag = fileProvider.getImage('flag');
    }
    CanvasDrawer.prototype.drawLine = function (_a, _b) {
        var start = _a.start, end = _a.end;
        var _c = _b === void 0 ? {} : _b, color = _c.color, width = _c.width;
        if (!this.context)
            return;
        this.context.strokeStyle = color !== null && color !== void 0 ? color : _constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_COLOR;
        this.context.lineWidth = width !== null && width !== void 0 ? width : _constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_WIDTH;
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();
    };
    CanvasDrawer.prototype.drawSquare = function (_a, _b, color) {
        var x = _a.x, y = _a.y;
        var width = _b.width, height = _b.height;
        if (!this.context)
            return;
        this.context.fillStyle = color ? color : _constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_FIELD_BG_COLOR;
        this.context.fillRect(x, y, width, height);
    };
    CanvasDrawer.prototype.drawNumber = function (_a, _b, value) {
        var x = _a.x, y = _a.y;
        var width = _b.width, height = _b.height;
        this.drawSquare({ x: x, y: y }, { width: width, height: height }, _constants__WEBPACK_IMPORTED_MODULE_0__.MAIN_BG_COLOR);
        // this.drawBorders({ x, y }, { width, height }, 'lightgrey')
        // нарисовать бордеры
        this.context.font = height / 2 + "px Arial";
        this.context.fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.TEXT_COLOR;
        this.context.fillText(String(value), x + (width / 2.5), y + (height / 1.5));
    };
    CanvasDrawer.prototype.drawBomb = function (_a, _b) {
        var x = _a.x, y = _a.y;
        var width = _b.width, height = _b.height;
        this.drawSquare({ x: x, y: y }, { width: width, height: height });
        this.context.drawImage(this.bomb, x + (width / 4), y + (height / 4), width / 2, height / 2);
    };
    CanvasDrawer.prototype.drawFlag = function (_a, _b) {
        var x = _a.x, y = _a.y;
        var width = _b.width, height = _b.height;
        this.drawSquare({ x: x, y: y }, { width: width, height: height }, _constants__WEBPACK_IMPORTED_MODULE_0__.FLAG_BG_COLOR);
        this.context.drawImage(this.flag, x + (width / 4), y + (height / 4), width / 2, height / 2);
    };
    return CanvasDrawer;
}());



/***/ }),

/***/ "./src/game/index.ts":
/*!***************************!*\
  !*** ./src/game/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sapper": () => (/* binding */ Sapper)
/* harmony export */ });
/* harmony import */ var _drawer_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../drawer/constants */ "./src/drawer/constants.ts");

var Sapper = /** @class */ (function () {
    function Sapper(settings, contextProvider, drawer, elementSource, builder, generator) {
        this.settings = settings;
        this.contextProvider = contextProvider;
        this.drawer = drawer;
        this.elementSource = elementSource;
        this.builder = builder;
        this.generator = generator;
        this.select = null;
        this.button = null;
        this.resultContainer = null;
        this.gameContainer = null;
        this.canvas = null;
        this.select = elementSource.getElement('select-level');
        this.button = elementSource.getElement('start-game');
        this.gameContainer = elementSource.getElement('game-container');
        this.canvas = elementSource.getElement('canvas');
        this.resultContainer = elementSource.getElement('result-container');
    }
    /**
     * Инициализируем данные игры
     *
     * @returns {void}
     */
    Sapper.prototype.init = function () {
        var _this = this;
        this.elementSource.afterLoad(function (event) {
            for (var key in _this.settings.levels) {
                var option = _this.elementSource.createElement('option');
                option.textContent = key;
                option.value = key;
                // @ts-ignore
                option.selected = _this.settings.levels[key].selected;
                _this.select.appendChild(option);
            }
            _this.select.addEventListener('change', _this.changeLevel.bind(_this), false);
            _this.button.addEventListener('click', _this.start.bind(_this), false);
        });
    };
    /**
     * Стартуем игру
     *
     * @returns {void}
     */
    Sapper.prototype.start = function () {
        this.system = this.builder.build(this.settings);
        this.cellSize = {
            width: this.system.pixelsCountInCell,
            height: this.system.pixelsCountInCell,
        };
        this.changeVisibilityElements();
        this.makeInitialFill();
        this.contextProvider.listenCanvasClick(this.checkClick.bind(this));
        this.contextProvider.listenCanvasContextMenu(this.checkContextMenu.bind(this));
    };
    /**
     * Меняет уровень после смены в селекте
     *
     * @param {Event} event - DOM событие
     *
     * @returns {void}
     */
    Sapper.prototype.changeLevel = function (event) {
        for (var key in this.settings.levels) {
            // @ts-ignore
            this.settings.levels[key].selected = false;
        }
        // @ts-ignore
        this.settings.levels[event.target.value].selected = true;
    };
    /**
     * Меняет видимость игровых элементов на странице
     *
     * @returns {void}
     */
    Sapper.prototype.changeVisibilityElements = function () {
        this.button.style.display = 'none';
        this.select.style.display = 'none';
        this.gameContainer.style.display = 'flex';
        this.canvas.style.display = 'block';
    };
    /**
     * Заполняет весь канвас по умолчанию
     *
     * @returns {void}
     */
    Sapper.prototype.makeInitialFill = function () {
        var size = this.settings.canvasSize;
        this.drawer.drawSquare({
            x: 0,
            y: 0,
        }, size);
    };
    Sapper.prototype.checkClick = function (_a) {
        var offsetX = _a.offsetX, offsetY = _a.offsetY;
        var cell = this.getCell(offsetX, offsetY);
        if (cell.hasBomb) {
            // рисуем бомбу в указанной клетке
            this.openBombCell(cell);
            // рисуем все остальные бомбы
            this.openAllBombs();
            // стопорим игру
            this.stopGame();
        }
        else if (cell.value !== 0) {
            // рисуем клетку с цифрой
            this.openNumberSquare(cell);
        }
        else {
            // рисуем пустую клетку
            this.openEmptySquare(cell);
            // проходимся по соседям и рисуем клетки до того момента, пока не появится в клетке цифра
            this.recursiveOpenArea(cell);
        }
    };
    Sapper.prototype.checkContextMenu = function (event) {
        event.preventDefault();
        var cell = this.getCell(event.offsetX, event.offsetY);
        if (!cell.isOpen) {
            if (!cell.hasFlag) {
                this.setFlag(cell);
            }
            else {
                this.removeFlag(cell);
            }
        }
    };
    Sapper.prototype.getCell = function (offsetX, offsetY) {
        var x = this.generator.getFloorNumber(offsetX / this.system.pixelsCountInCell);
        var y = this.generator.getFloorNumber(offsetY / this.system.pixelsCountInCell);
        return this.system.cells[y][x];
    };
    Sapper.prototype.recursiveOpenArea = function (cell) {
        for (var index in cell.area) {
            var systemCell = this.system.cells[cell.area[index].y][cell.area[index].x];
            if (!systemCell.isOpen && systemCell.value !== undefined) {
                if (systemCell.value === 0) {
                    this.openEmptySquare(systemCell);
                    this.recursiveOpenArea(systemCell);
                }
                else {
                    this.openNumberSquare(systemCell);
                    continue;
                }
            }
            else {
                continue;
            }
        }
    };
    Sapper.prototype.openEmptySquare = function (cell) {
        this.drawer.drawSquare({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize, _drawer_constants__WEBPACK_IMPORTED_MODULE_0__.MAIN_BG_COLOR);
        cell.isOpen = true;
    };
    Sapper.prototype.openNumberSquare = function (cell) {
        this.drawer.drawNumber({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize, cell.value);
        cell.isOpen = true;
    };
    Sapper.prototype.openBombCell = function (cell) {
        this.drawer.drawBomb({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize);
        cell.isOpen = true;
    };
    Sapper.prototype.openAllBombs = function () {
        var _a = this.system, bombPositions = _a.bombPositions, cells = _a.cells, fieldSize = _a.fieldSize;
        for (var y = 0; y < Object.keys(cells).length; y++) {
            for (var x = 0; x < Object.keys(cells[y]).length; x++) {
                if (bombPositions.includes(x + y * fieldSize)) {
                    this.openBombCell(cells[y][x]);
                }
            }
        }
    };
    Sapper.prototype.setFlag = function (cell) {
        this.drawer.drawFlag({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize);
        cell.hasFlag = true;
    };
    Sapper.prototype.removeFlag = function (cell) {
        this.drawer.drawSquare({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize, _drawer_constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_FIELD_BG_COLOR);
        cell.hasFlag = false;
    };
    Sapper.prototype.calcPixelWidth = function (x) {
        return Number(x) * this.cellSize.width;
    };
    Sapper.prototype.calcPixelHeight = function (y) {
        return Number(y) * this.cellSize.height;
    };
    Sapper.prototype.stopGame = function () {
        var _this = this;
        // показываем кнопку рестарта
        this.resultContainer.style.display = 'flex';
        setTimeout(function () {
            _this.resultContainer.classList.add('result-container--is-visible');
        }, 50);
    };
    return Sapper;
}());



/***/ }),

/***/ "./src/generator/index.ts":
/*!********************************!*\
  !*** ./src/generator/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Generator": () => (/* binding */ Generator)
/* harmony export */ });
var Generator = /** @class */ (function () {
    function Generator(getRandom, getFloor) {
        this.getRandom = getRandom;
        this.getFloor = getFloor;
    }
    /**
     * Возвращает рандомное целое число в определенном промежутке
     *
     * @param {number} min - минимальное число промежутка
     * @param {number} max - максимальное число промежутка
     *
     * @returns {number}
     */
    Generator.prototype.getRandomArbitrary = function (min, max) {
        return this.getFloorNumber(this.getRandom() * (max - min)) + min;
    };
    /**
     * Округляет число до целого
     *
     * @param {number} n - исходное число
     *
     * @returns {number}
     */
    Generator.prototype.getFloorNumber = function (n) {
        return this.getFloor(n);
    };
    return Generator;
}());



/***/ }),

/***/ "./src/settings/index.ts":
/*!*******************************!*\
  !*** ./src/settings/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "settings": () => (/* binding */ settings)
/* harmony export */ });
/* harmony import */ var _levels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./levels */ "./src/settings/levels.ts");

/** Основные настройки игры */
var settings = {
    canvasSize: {
        width: 800,
        height: 800,
    },
    levels: _levels__WEBPACK_IMPORTED_MODULE_0__.levels,
};


/***/ }),

/***/ "./src/settings/levels.ts":
/*!********************************!*\
  !*** ./src/settings/levels.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "levels": () => (/* binding */ levels)
/* harmony export */ });
/** Список уровней сложности игры */
var levels = {
    beginner: {
        name: 'beginner',
        bombCount: 10,
        fieldSize: 20,
        selected: false,
    },
    easy: {
        name: 'easy',
        bombCount: 15,
        fieldSize: 10,
        selected: true,
    },
    medium: {
        name: 'medium',
        bombCount: 40,
        fieldSize: 10,
        selected: false,
    },
    hard: {
        name: 'hard',
        bombCount: 100,
        fieldSize: 20,
        selected: false,
    },
    huge: {
        name: 'huge',
        bombCount: 220,
        fieldSize: 32,
        selected: false,
    },
    extreme: {
        name: 'extreme',
        bombCount: 150,
        fieldSize: 20,
        selected: false,
    },
};


/***/ }),

/***/ "./src/source/index.ts":
/*!*****************************!*\
  !*** ./src/source/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileSource": () => (/* binding */ FileSource)
/* harmony export */ });
/* harmony import */ var _img_bomb_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../img/bomb.png */ "./src/img/bomb.png");
/* harmony import */ var _img_flag_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/flag.png */ "./src/img/flag.png");


var FileSource = /** @class */ (function () {
    function FileSource() {
        this.imageNameArr = [];
        this.imageArr = [];
    }
    FileSource.prototype.getImage = function (name) {
        // if (this.imageNameArr.includes(name)) {
        //     // @ts-ignore
        //     return this.imageArr[name];
        // }
        var img = new Image();
        img.src = "img/" + name + ".png";
        // this.imageNameArr.push(name);
        // this.imageArr.push(img);
        return img;
    };
    return FileSource;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _builder_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./builder/index */ "./src/builder/index.ts");
/* harmony import */ var _context_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context/index */ "./src/context/index.ts");
/* harmony import */ var _dom_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom/index */ "./src/dom/index.ts");
/* harmony import */ var _drawer_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawer/index */ "./src/drawer/index.ts");
/* harmony import */ var _game_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game/index */ "./src/game/index.ts");
/* harmony import */ var _generator_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./generator/index */ "./src/generator/index.ts");
/* harmony import */ var _settings_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings/index */ "./src/settings/index.ts");
/* harmony import */ var _source_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./source/index */ "./src/source/index.ts");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");









var pixelRatioSource = {
    devicePixelRatio: 1,
};
var fileProvider = new _source_index__WEBPACK_IMPORTED_MODULE_7__.FileSource();
var domSource = new _dom_index__WEBPACK_IMPORTED_MODULE_2__.DomSource(window);
var contextProvider = new _context_index__WEBPACK_IMPORTED_MODULE_1__.CanvasContextProvider(domSource, pixelRatioSource, _settings_index__WEBPACK_IMPORTED_MODULE_6__.settings);
var drawer = new _drawer_index__WEBPACK_IMPORTED_MODULE_3__.CanvasDrawer(contextProvider, fileProvider);
var generator = new _generator_index__WEBPACK_IMPORTED_MODULE_5__.Generator(Math.random, Math.floor);
var builder = new _builder_index__WEBPACK_IMPORTED_MODULE_0__.LevelBuilder(generator);
var sapper = new _game_index__WEBPACK_IMPORTED_MODULE_4__.Sapper(_settings_index__WEBPACK_IMPORTED_MODULE_6__.settings, contextProvider, drawer, domSource, builder, generator);
sapper.init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZitDO0FBQ1M7QUFDaEI7QUFDTTtBQUNSO0FBQ1E7QUFDRjtBQUNBO0FBRXRCO0FBRXRCLElBQU0sZ0JBQWdCLEdBQUc7SUFDckIsZ0JBQWdCLEVBQUUsQ0FBQztDQUN0QjtBQUVELElBQU0sWUFBWSxHQUFHLElBQUkscURBQVUsRUFBRSxDQUFDO0FBQ3RDLElBQU0sU0FBUyxHQUFHLElBQUksaURBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxJQUFNLGVBQWUsR0FBRyxJQUFJLGlFQUFxQixDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxxREFBUSxDQUFDLENBQUM7QUFDekYsSUFBTSxNQUFNLEdBQUcsSUFBSSx1REFBWSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUMvRCxJQUFNLFNBQVMsR0FBRyxJQUFJLHVEQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekQsSUFBTSxPQUFPLEdBQUcsSUFBSSx3REFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVDLElBQU0sTUFBTSxHQUFHLElBQUksK0NBQU0sQ0FBQyxxREFBUSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUU1RixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW1nL2JvbWIucG5nIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9pbWcvZmxhZy5wbmciLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2luZGV4LnNjc3M/MjA2ZiIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvYnVpbGRlci9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2J1aWxkZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2NvbnRleHQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2RvbS9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZHJhd2VyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZHJhd2VyL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9nYW1lL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9nZW5lcmF0b3IvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3NldHRpbmdzL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9zZXR0aW5ncy9sZXZlbHMudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3NvdXJjZS9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvYm9tYi5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL2ZsYWcucG5nXCI7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgQXJlYVN0cnVjdHVyZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKlxuICog0J7RgtC90L7RgdC40YLQtdC70YzQvdGL0LUg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0YHQvtGB0LXQtNC90LjRhSDRj9GH0LXQtdC6INC+0LHQu9Cw0YHRgtC4XG4gKiBcbiAqICMxIzIjMyNcbiAqICM4LSstNCNcbiAqICM3IzYjNSNcbiAqL1xuZXhwb3J0IGNvbnN0IEFSRUFfU1RSVUNUVVJFOiBBcmVhU3RydWN0dXJlID0ge1xuICAgIDA6IHsgeDogLTEsIHk6IC0xIH0sXG4gICAgMTogeyB4OiAwLCB5OiAtMSB9LFxuICAgIDI6IHsgeDogMSwgeTogLTEgfSxcbiAgICAzOiB7IHg6IDEsIHk6IDAgfSxcbiAgICA0OiB7IHg6IDEsIHk6IDEgfSxcbiAgICA1OiB7IHg6IDAsIHk6IDEgfSxcbiAgICA2OiB7IHg6IC0xLCB5OiAxIH0sXG4gICAgNzogeyB4OiAtMSwgeTogMCB9LFxufSIsImltcG9ydCB7IENvbXBsZXhpdHksIENvbXBsZXhpdHlMaXN0LCBHYW1lU2V0dGluZ3MgfSBmcm9tIFwiLi4vc2V0dGluZ3MvdHlwZXNcIjtcbmltcG9ydCB7IEFyZWFTdHJ1Y3R1cmUsIE1hcFN0cnVjdHVyZSwgU3lzdGVtQnVpbGRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBBUkVBX1NUUlVDVFVSRSB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgTWF0aEdlbmVyYXRvciB9IGZyb20gXCIuLi9nZW5lcmF0b3IvdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIExldmVsQnVpbGRlciBpbXBsZW1lbnRzIFN5c3RlbUJ1aWxkZXIge1xuICAgIHByaXZhdGUgZmllbGRTaXplOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBib21iQ291bnQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGNhbnZhc1NpemU6IFNpemU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0b3I6IE1hdGhHZW5lcmF0b3IsXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICog0JHQuNC70LTQuNGCINGD0YDQvtCy0LXQvdGMXG4gICAgICogXG4gICAgICogQHBhcmFtIHtHYW1lU2V0dGluZ3N9IHNldHRpbmdzIC0g0L3QsNGB0YLRgNC+0LnQutC4INC40LPRgNGLXG4gICAgICogXG4gICAgICogQHJldHVybnMge01hcFN0cnVjdHVyZX1cbiAgICAgKi9cbiAgICBwdWJsaWMgYnVpbGQoc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyk6IE1hcFN0cnVjdHVyZSB7XG4gICAgICAgIGNvbnN0IHsgZmllbGRTaXplLCBib21iQ291bnQgfSA9IHRoaXMuZ2V0U2VsZWN0ZWRMZXZlbChzZXR0aW5ncy5sZXZlbHMpO1xuXG4gICAgICAgIHRoaXMuZmllbGRTaXplID0gZmllbGRTaXplO1xuICAgICAgICB0aGlzLmJvbWJDb3VudCA9IGJvbWJDb3VudDtcbiAgICAgICAgdGhpcy5jYW52YXNTaXplID0gc2V0dGluZ3MuY2FudmFzU2l6ZTtcblxuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLmdlbmVyYXRlTWFwU3RydWN0dXJlKCk7XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXRgiDQstGL0LHRgNCw0L3QvdGL0Lkg0YPRgNC+0LLQtdC90Ywg0YHQu9C+0LbQvdC+0YHRgtC4INC40Lcg0YHQv9C40YHQutCwXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wbGV4aXR5TGlzdH0gbGV2ZWxzIC0g0YHQv9C40YHQvtC6INGD0YDQvtCy0L3QtdC5INGB0LvQvtC20L3QvtGB0YLQuFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtDb21wbGV4aXR5fVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRMZXZlbChsZXZlbHM6IENvbXBsZXhpdHlMaXN0KTogQ29tcGxleGl0eSB7XG4gICAgICAgIGxldCBzZWxlY3RlZExldmVsOiBDb21wbGV4aXR5O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBsZXZlbHMpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGlmIChsZXZlbHNba2V5XS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBzZWxlY3RlZExldmVsID0gbGV2ZWxzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRMZXZlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQk9C10L3QtdGA0LjRgNGD0LXRgiDRgdGC0YDRg9C60YLRg9GA0YMg0L/QvtC70Y8g0LTQu9GPINCy0YvQsdGA0LDQvdC90L7Qs9C+INGD0YDQvtCy0L3RjyDRgdC70L7QttC90L7RgdGC0LhcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1NpemV9IGNhbnZhc1NpemUgLSDRgNCw0LfQvNC10YAg0LrQsNC90LLQsNGB0LAg0LIg0L/QuNC60YHQtdC70Y/RhVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmaWVsZFNpemUgLSDRgNCw0LfQvNC10YAg0LjQs9GA0L7QstC+0LPQviDQv9C+0LvRjyDQsiDQutC70LXRgtC60LDRhVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBib21iQ291bnQgLSDQutC+0LvQuNGH0LXRgdGC0LLQviDQsdC+0LzQsSDQvdCwINC40LPRgNC+0LLQvtC8INC/0L7Qu9C1XG4gICAgICogXG4gICAgICogQHJldHVybnMge01hcFN0cnVjdHVyZX1cbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlTWFwU3RydWN0dXJlKCk6IE1hcFN0cnVjdHVyZSB7XG4gICAgICAgIGNvbnN0IG1hcFN0cnVjdHVyZTogTWFwU3RydWN0dXJlID0ge1xuICAgICAgICAgICAgcGl4ZWxzQ291bnRJbkNlbGw6IHRoaXMuY2FudmFzU2l6ZS53aWR0aCAvIHRoaXMuZmllbGRTaXplLFxuICAgICAgICAgICAgYm9tYkNvdW50OiB0aGlzLmJvbWJDb3VudCxcbiAgICAgICAgICAgIGNlbGxzOiB7fSxcbiAgICAgICAgICAgIGJvbWJQb3NpdGlvbnM6IFtdLFxuICAgICAgICAgICAgZmllbGRTaXplOiB0aGlzLmZpZWxkU2l6ZSxcbiAgICAgICAgfTtcblxuICAgICAgICBtYXBTdHJ1Y3R1cmUuYm9tYlBvc2l0aW9ucyA9IHRoaXMuZ2VuZXJhdGVSYW5kb21Cb21iUG9zaXRpb25zKHRoaXMuZmllbGRTaXplICogdGhpcy5maWVsZFNpemUpO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5maWVsZFNpemU7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmZpZWxkU2l6ZTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93OiBudW1iZXIgPSB5O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGw6IG51bWJlciA9IHg7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1hcFN0cnVjdHVyZS5jZWxsc1tyb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcFN0cnVjdHVyZS5jZWxsc1tyb3ddID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGhhc0JvbWI6IGJvb2xlYW4gPSBtYXBTdHJ1Y3R1cmUuYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyh4ICsgeSAqIHRoaXMuZmllbGRTaXplKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhcmVhOiBBcmVhU3RydWN0dXJlID0gdGhpcy5nZW5lcmF0ZUNlbGxBcmVhKHsgeCwgeSB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxTdHJ1Y3R1cmU6IGFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgeTogcm93LCBcbiAgICAgICAgICAgICAgICAgICAgeDogY2VsbCxcbiAgICAgICAgICAgICAgICAgICAgYXJlYSxcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzQm9tYikge1xuICAgICAgICAgICAgICAgICAgICBjZWxsU3RydWN0dXJlLmhhc0JvbWIgPSBoYXNCb21iO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxTdHJ1Y3R1cmUudmFsdWUgPSB0aGlzLmNhbGNCb21ic0Fyb3VuZENlbGxzKGFyZWEsIG1hcFN0cnVjdHVyZS5ib21iUG9zaXRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtYXBTdHJ1Y3R1cmUuY2VsbHNbcm93XVtjZWxsXSA9IGNlbGxTdHJ1Y3R1cmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhtYXBTdHJ1Y3R1cmUpO1xuXG4gICAgICAgIHJldHVybiBtYXBTdHJ1Y3R1cmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JPQtdC90LXRgNC40YDRg9C10YIg0L7QsdC70LDRgdGC0Ywg0Y/Rh9C10LXQuiDRgSDQuNGFINC60L7QvtGA0LTQuNC90LDRgtCw0LzQuCDQstC+0LrRgNGD0LMg0LLRi9Cx0YDQsNC90L3QvtC5INGP0YfQtdC50LrQuCDQvdCwINC+0YHQvdC+0LLQtSDQtdC1INC60L7QvtGA0LTQuNC90LDRglxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0g0LrQvtC+0YDQtNC40L3QsNGC0LAgJ3gnINGP0YfQtdC50LrQuFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0g0LrQvtC+0YDQtNC40L3QsNGC0LAgJ3knINGP0YfQtdC50LrQuFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtBcmVhU3RydWN0dXJlfVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVDZWxsQXJlYSh7IHgsIHkgfTogQ2VsbCk6IEFyZWFTdHJ1Y3R1cmUge1xuICAgICAgICBjb25zdCBhcmVhOiBBcmVhU3RydWN0dXJlID0ge307XG4gICAgXG4gICAgICAgIC8vIDggLSDQutC+0LvQuNGH0LXRgdGC0LLQviDRj9GH0LXQtdC6INCy0L7QutGA0YPQsyDRhtC10L3RgtGA0LDQu9GM0L3QvtC5XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA4OyBpbmRleCsrKSB7XG4gICAgICAgICAgICAvKiog0J/RgNC+0LLQtdGA0Y/QtdC8LCDQvdC1INCy0YvRhdC+0LTQuNGCINC70Lgg0Y/Rh9C10LnQutCwINC30LAg0LvQtdCy0YPRjiDQuCDQstC10YDRhdC90Y7RjiDQs9GA0LDQvdC40YbRiyDQv9C+0LvRjyAqL1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCA8IDAgfHwgeSArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS55IDwgMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiog0J/RgNC+0LLQtdGA0Y/QtdC8LCDQvdC1INCy0YvRhdC+0LTQuNGCINC70Lgg0Y/Rh9C10LnQutCwINC30LAg0L/RgNCw0LLRg9GOINC4INC90LjQttC90Y7RjiDQs9GA0LDQvdC40YbRiyDQv9C+0LvRjyAqL1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCA+PSB0aGlzLmZpZWxkU2l6ZSB8fCB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnkgPj0gdGhpcy5maWVsZFNpemUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgYXJlYVtpbmRleF0gPSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHg6IHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCxcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgeTogeSArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS55LFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JPQtdC90LXRgNC40YDRg9C10YIg0YDQsNC90LTQvtC80L3Ri9C1INC/0L7Qt9C40YbQuNC4INC00LvRjyDRgNCw0YHQv9C+0LvQvtC20LXQvdC40Y8g0LHQvtC80LEg0L3QsCDQv9C+0LvQtVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjZWxsc0NvdW50IC0g0LrQvtC70LjRh9C10YHRgtCy0L4g0Y/Rh9C10LXQuiDQvdCwINC/0L7Qu9C1XG4gICAgICogXG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVSYW5kb21Cb21iUG9zaXRpb25zKGNlbGxzQ291bnQ6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICAgICAgY29uc3QgYm9tYlBvc2l0aW9uczogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5ib21iQ291bnQ7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCByYW5kb21Qb3NpdGlvbjogbnVtYmVyID0gdGhpcy5nZW5lcmF0b3IuZ2V0UmFuZG9tQXJiaXRyYXJ5KDEsIGNlbGxzQ291bnQpO1xuXG4gICAgICAgICAgICB3aGlsZSAoYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyhyYW5kb21Qb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICByYW5kb21Qb3NpdGlvbiA9IHRoaXMuZ2VuZXJhdG9yLmdldFJhbmRvbUFyYml0cmFyeSgxLCBjZWxsc0NvdW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYm9tYlBvc2l0aW9ucy5wdXNoKHJhbmRvbVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib21iUG9zaXRpb25zLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodGH0LjRgtCw0LXRgiDQutC+0LvQuNGH0LXRgdGC0LLQviDQsdC+0LzQsSDQstC+0LrRgNGD0LMg0Y/Rh9C10LnQutC4XG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcmVhU3RydWN0dXJlfSBhcmVhXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gYm9tYlBvc2l0aW9uc1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjQm9tYnNBcm91bmRDZWxscyhhcmVhOiBBcmVhU3RydWN0dXJlLCBib21iUG9zaXRpb25zOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZWEpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBhcmVhW2tleV07XG5cbiAgICAgICAgICAgIGlmIChib21iUG9zaXRpb25zLmluY2x1ZGVzKGNlbGwueCArIGNlbGwueSAqIHRoaXMuZmllbGRTaXplKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59IiwiaW1wb3J0IHsgRWxlbWVudFNvdXJjZSwgUGl4ZWxSYXRpb1NvdXJjZSB9IGZyb20gXCIuLi9kb20vdHlwZXNcIjtcbmltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5ncy90eXBlc1wiO1xuaW1wb3J0IHsgRHJhd2luZ0NvbnRleHQsIERyYXdpbmdDb250ZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzQ29udGV4dFByb3ZpZGVyIGltcGxlbWVudHMgRHJhd2luZ0NvbnRleHRQcm92aWRlciB7XG4gICAgcHJpdmF0ZSBjYW52YXM6IE51bGxhYmxlPEhUTUxDYW52YXNFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBjb250ZXh0OiBOdWxsYWJsZTxEcmF3aW5nQ29udGV4dD4gPSBudWxsO1xuICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZWxlbWVudFNvdXJjZTogRWxlbWVudFNvdXJjZSxcbiAgICAgIHByaXZhdGUgcGl4ZWxSYXRpb1NvdXJjZTogUGl4ZWxSYXRpb1NvdXJjZSxcbiAgICAgIHByaXZhdGUgc2V0dGluZ3M6IEdhbWVTZXR0aW5nc1xuICAgICkge1xuICAgICAgY29uc3QgY2FudmFzID0gdGhpcy5lbGVtZW50U291cmNlLmdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBpZiAoIWNhbnZhcykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgYSBjYW52YXMuXCIpO1xuICBcbiAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgdGhpcy5ub3JtYWxpemVTY2FsZSgpO1xuICAgIH1cbiAgXG4gICAgcHVibGljIGdldEluc3RhbmNlKCk6IERyYXdpbmdDb250ZXh0IHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGxpc3RlbkNhbnZhc0NsaWNrKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGlzdGVuQ2FudmFzQ29udGV4dE1lbnUoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgY2FsbGJhY2spO1xuICAgIH1cbiAgXG4gICAgcHJpdmF0ZSBub3JtYWxpemVTY2FsZSgpOiB2b2lkIHtcbiAgICAgIGlmICghdGhpcy5jYW52YXMgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuO1xuICBcbiAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5waXhlbFJhdGlvU291cmNlLmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5zZXR0aW5ncy5jYW52YXNTaXplO1xuICBcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGggKiByYXRpbztcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodCAqIHJhdGlvO1xuICBcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgXG4gICAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmNvbnRleHQuc2NhbGUocmF0aW8sIHJhdGlvKTtcbiAgICB9XG4gIH0iLCJpbXBvcnQgeyBFbGVtZW50U291cmNlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIERvbVNvdXJjZSBpbXBsZW1lbnRzIEVsZW1lbnRTb3VyY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdpbmRvdzogV2luZG93KSB7fVxuXG4gIHB1YmxpYyBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZyk6IE51bGxhYmxlPEhUTUxFbGVtZW50PiB7XG4gICAgcmV0dXJuIHRoaXMud2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWxlbWVudChpZDogc3RyaW5nKTogTnVsbGFibGU8SFRNTEVsZW1lbnQ+IHtcbiAgICByZXR1cm4gdGhpcy53aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICB9XG5cbiAgcHVibGljIGFmdGVyTG9hZChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgY2FsbGJhY2soZXZlbnQpO1xuICAgIH0pO1xuICB9XG59IiwiZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09MT1I6IENvbG9yID0gJyMwMDAwMDAnO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfV0lEVEg6IExlbmd0aCA9IDE7XG5leHBvcnQgY29uc3QgTUFJTl9CR19DT0xPUjogQ29sb3IgPSAnIzIxMjEyMSc7XG5leHBvcnQgY29uc3QgSU5JVElBTF9GSUVMRF9CR19DT0xPUjogQ29sb3IgPSAnIzY2NjZGRic7XG5leHBvcnQgY29uc3QgRkxBR19CR19DT0xPUjogQ29sb3IgPSAnbGlnaHRncmF5JztcbmV4cG9ydCBjb25zdCBURVhUX0NPTE9SOiBDb2xvciA9ICd3aGl0ZSc7IiwiaW1wb3J0IHsgRHJhd2luZ0NvbnRleHQsIERyYXdpbmdDb250ZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi4vY29udGV4dC90eXBlc1wiO1xuaW1wb3J0IHsgU291cmNlUHJvdmlkZXIgfSBmcm9tIFwiLi4vc291cmNlL3R5cGVzXCI7XG5pbXBvcnQgeyBERUZBVUxUX0NPTE9SLCBERUZBVUxUX1dJRFRILCBNQUlOX0JHX0NPTE9SLCBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SLCBURVhUX0NPTE9SLCBGTEFHX0JHX0NPTE9SIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBCcnVzaFNldHRpbmdzLCBEcmF3ZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzRHJhd2VyIGltcGxlbWVudHMgRHJhd2VyIHtcbiAgICBwcml2YXRlIGNvbnRleHQ6IERyYXdpbmdDb250ZXh0ID0gbnVsbDtcbiAgICBwcml2YXRlIGJvbWI6IGFueTtcbiAgICBwcml2YXRlIGZsYWc6IGFueTtcbiAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGNvbnRleHRQcm92aWRlcjogRHJhd2luZ0NvbnRleHRQcm92aWRlcixcbiAgICAgIHByaXZhdGUgZmlsZVByb3ZpZGVyOiBTb3VyY2VQcm92aWRlclxuICAgICkge1xuICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgIGlmICghdGhpcy5jb250ZXh0KSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gYWNjZXNzIHRoZSBkcmF3aW5nIGNvbnRleHQuXCIpO1xuXG4gICAgICB0aGlzLmJvbWIgPSBmaWxlUHJvdmlkZXIuZ2V0SW1hZ2UoJ2JvbWInKTtcbiAgICAgIHRoaXMuZmxhZyA9IGZpbGVQcm92aWRlci5nZXRJbWFnZSgnZmxhZycpO1xuICAgIH1cbiAgXG4gICAgcHVibGljIGRyYXdMaW5lKFxuICAgICAgeyBzdGFydCwgZW5kIH06IExpbmUsXG4gICAgICB7IGNvbG9yLCB3aWR0aCB9OiBCcnVzaFNldHRpbmdzID0ge31cbiAgICApOiB2b2lkIHtcbiAgICAgIGlmICghdGhpcy5jb250ZXh0KSByZXR1cm47XG4gIFxuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3IgPz8gREVGQVVMVF9DT0xPUjtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3aWR0aCA/PyBERUZBVUxUX1dJRFRIO1xuICBcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oc3RhcnQueCwgc3RhcnQueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZC54LCBlbmQueSk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdTcXVhcmUoeyB4LCB5IH06IENlbGwsIHsgd2lkdGgsIGhlaWdodCB9OiBTaXplLCBjb2xvcj86IHN0cmluZyk6IHZvaWQge1xuICAgICAgaWYgKCF0aGlzLmNvbnRleHQpIHJldHVybjtcblxuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yID8gY29sb3IgOiBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpXG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdOdW1iZXIoeyB4LCB5IH06IENlbGwsIHsgd2lkdGgsIGhlaWdodCB9OiBTaXplLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICB0aGlzLmRyYXdTcXVhcmUoeyB4LCB5IH0sIHsgd2lkdGgsIGhlaWdodCB9LCBNQUlOX0JHX0NPTE9SKTtcbiAgICAgIC8vIHRoaXMuZHJhd0JvcmRlcnMoeyB4LCB5IH0sIHsgd2lkdGgsIGhlaWdodCB9LCAnbGlnaHRncmV5JylcbiAgICAgIC8vINC90LDRgNC40YHQvtCy0LDRgtGMINCx0L7RgNC00LXRgNGLXG5cbiAgICAgIHRoaXMuY29udGV4dC5mb250ID0gYCR7aGVpZ2h0IC8gMn1weCBBcmlhbGA7XG5cdFx0ICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gVEVYVF9DT0xPUjtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChTdHJpbmcodmFsdWUpLCB4ICsgKHdpZHRoIC8gMi41KSwgeSArIChoZWlnaHQgLyAxLjUpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhd0JvbWIoeyB4LCB5IH06IENlbGwsIHsgd2lkdGgsIGhlaWdodCB9OiBTaXplKTogdm9pZCB7XG4gICAgICB0aGlzLmRyYXdTcXVhcmUoeyB4LCB5IH0sIHsgd2lkdGgsIGhlaWdodCB9KTtcbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5ib21iLCB4ICsgKHdpZHRoIC8gNCksIHkgKyAoaGVpZ2h0IC8gNCksIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdGbGFnKHsgeCwgeSB9OiBDZWxsLCB7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSk6IHZvaWQge1xuICAgICAgdGhpcy5kcmF3U3F1YXJlKHsgeCwgeSB9LCB7IHdpZHRoLCBoZWlnaHQgfSwgRkxBR19CR19DT0xPUik7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuZmxhZywgeCArICh3aWR0aCAvIDQpLCB5ICsgKGhlaWdodCAvIDQpLCB3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgZHJhd0JvcmRlcnMoeyB4LCB5IH06IENlbGwsIHsgd2lkdGgsIGhlaWdodCB9OiBTaXplLCBjb2xvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gICB0aGlzLmRyYXdMaW5lKHtcbiAgICAvLyAgICAgc3RhcnQ6IHtcbiAgICAvLyAgICAgICB4OiB4LFxuICAgIC8vICAgICAgIHk6IHksXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGVuZDoge1xuICAgIC8vICAgICAgIHg6IHggKyB3aWR0aCxcbiAgICAvLyAgICAgICB5OiB5LFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgfSwgeyBjb2xvciB9KVxuICAgIC8vIH1cbiAgfSIsImltcG9ydCB7IE1hcFN0cnVjdHVyZSwgU3lzdGVtQnVpbGRlciB9IGZyb20gJy4uL2J1aWxkZXIvdHlwZXMnO1xuaW1wb3J0IHsgRHJhd2luZ0NvbnRleHRQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHQvdHlwZXMnO1xuaW1wb3J0IHsgRWxlbWVudFNvdXJjZSB9IGZyb20gJy4uL2RvbS90eXBlcyc7XG5pbXBvcnQgeyBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SLCBNQUlOX0JHX0NPTE9SIH0gZnJvbSAnLi4vZHJhd2VyL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBEcmF3ZXIgfSBmcm9tICcuLi9kcmF3ZXIvdHlwZXMnO1xuaW1wb3J0IHsgTWF0aEdlbmVyYXRvciB9IGZyb20gJy4uL2dlbmVyYXRvci90eXBlcyc7XG5pbXBvcnQgeyBHYW1lU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy90eXBlcyc7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFNhcHBlciBpbXBsZW1lbnRzIEdhbWUge1xuICAgIHByaXZhdGUgc2VsZWN0OiBOdWxsYWJsZTxIVE1MU2VsZWN0RWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgYnV0dG9uOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgcmVzdWx0Q29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgZ2FtZUNvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGNhbnZhczogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIHN5c3RlbTogTWFwU3RydWN0dXJlO1xuICAgIHByaXZhdGUgY2VsbFNpemU6IFNpemU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzZXR0aW5nczogR2FtZVNldHRpbmdzLFxuICAgICAgICBwcml2YXRlIGNvbnRleHRQcm92aWRlcjogRHJhd2luZ0NvbnRleHRQcm92aWRlcixcbiAgICAgICAgcHJpdmF0ZSBkcmF3ZXI6IERyYXdlcixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50U291cmNlOiBFbGVtZW50U291cmNlLFxuICAgICAgICBwcml2YXRlIGJ1aWxkZXI6IFN5c3RlbUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgZ2VuZXJhdG9yOiBNYXRoR2VuZXJhdG9yLFxuICAgICkge1xuICAgICAgICB0aGlzLnNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD5lbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ3NlbGVjdC1sZXZlbCcpO1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnc3RhcnQtZ2FtZScpO1xuICAgICAgICB0aGlzLmdhbWVDb250YWluZXIgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ2dhbWUtY29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5yZXN1bHRDb250YWluZXIgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ3Jlc3VsdC1jb250YWluZXInKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQuNGA0YPQtdC8INC00LDQvdC90YvQtSDQuNCz0YDRi1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRTb3VyY2UuYWZ0ZXJMb2FkKChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnNldHRpbmdzLmxldmVscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IDxIVE1MT3B0aW9uRWxlbWVudD50aGlzLmVsZW1lbnRTb3VyY2UuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cbiAgICAgICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBrZXk7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0ga2V5O1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0aGlzLnNldHRpbmdzLmxldmVsc1trZXldLnNlbGVjdGVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VMZXZlbC5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zdGFydC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0YLQsNGA0YLRg9C10Lwg0LjQs9GA0YNcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXJ0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN5c3RlbSA9IHRoaXMuYnVpbGRlci5idWlsZCh0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5jZWxsU2l6ZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2VWaXNpYmlsaXR5RWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5tYWtlSW5pdGlhbEZpbGwoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0UHJvdmlkZXIubGlzdGVuQ2FudmFzQ2xpY2sodGhpcy5jaGVja0NsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNvbnRleHRQcm92aWRlci5saXN0ZW5DYW52YXNDb250ZXh0TWVudSh0aGlzLmNoZWNrQ29udGV4dE1lbnUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JzQtdC90Y/QtdGCINGD0YDQvtCy0LXQvdGMINC/0L7RgdC70LUg0YHQvNC10L3RiyDQsiDRgdC10LvQtdC60YLQtVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRE9NINGB0L7QsdGL0YLQuNC1XG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VMZXZlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2V0dGluZ3MubGV2ZWxzKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmxldmVsc1trZXldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2V0dGluZ3MubGV2ZWxzW2V2ZW50LnRhcmdldC52YWx1ZV0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCc0LXQvdGP0LXRgiDQstC40LTQuNC80L7RgdGC0Ywg0LjQs9GA0L7QstGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlVmlzaWJpbGl0eUVsZW1lbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLnNlbGVjdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLmdhbWVDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JfQsNC/0L7Qu9C90Y/QtdGCINCy0LXRgdGMINC60LDQvdCy0LDRgSDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZUluaXRpYWxGaWxsKCkge1xuICAgICAgICBjb25zdCBzaXplOiBTaXplID0gdGhpcy5zZXR0aW5ncy5jYW52YXNTaXplO1xuXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdTcXVhcmUoe1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sIHNpemUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tDbGljayh7IG9mZnNldFgsIG9mZnNldFkgfTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsKG9mZnNldFgsIG9mZnNldFkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNlbGwuaGFzQm9tYikge1xuICAgICAgICAgICAgLy8g0YDQuNGB0YPQtdC8INCx0L7QvNCx0YMg0LIg0YPQutCw0LfQsNC90L3QvtC5INC60LvQtdGC0LrQtVxuICAgICAgICAgICAgdGhpcy5vcGVuQm9tYkNlbGwoY2VsbCk7XG4gICAgICAgICAgICAvLyDRgNC40YHRg9C10Lwg0LLRgdC1INC+0YHRgtCw0LvRjNC90YvQtSDQsdC+0LzQsdGLXG4gICAgICAgICAgICB0aGlzLm9wZW5BbGxCb21icygpO1xuICAgICAgICAgICAgLy8g0YHRgtC+0L/QvtGA0LjQvCDQuNCz0YDRg1xuICAgICAgICAgICAgdGhpcy5zdG9wR2FtZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGNlbGwudmFsdWUgIT09IDApIHtcbiAgICAgICAgICAgIC8vINGA0LjRgdGD0LXQvCDQutC70LXRgtC60YMg0YEg0YbQuNGE0YDQvtC5XG4gICAgICAgICAgICB0aGlzLm9wZW5OdW1iZXJTcXVhcmUoY2VsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDRgNC40YHRg9C10Lwg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1xuICAgICAgICAgICAgdGhpcy5vcGVuRW1wdHlTcXVhcmUoY2VsbCk7XG4gICAgICAgICAgICAvLyDQv9GA0L7RhdC+0LTQuNC80YHRjyDQv9C+INGB0L7RgdC10LTRj9C8INC4INGA0LjRgdGD0LXQvCDQutC70LXRgtC60Lgg0LTQviDRgtC+0LPQviDQvNC+0LzQtdC90YLQsCwg0L/QvtC60LAg0L3QtSDQv9C+0Y/QstC40YLRgdGPINCyINC60LvQtdGC0LrQtSDRhtC40YTRgNCwXG4gICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZU9wZW5BcmVhKGNlbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0NvbnRleHRNZW51KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbChldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcblxuICAgICAgICBpZiAoIWNlbGwuaXNPcGVuKSB7XG4gICAgICAgICAgICBpZiAoIWNlbGwuaGFzRmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RmxhZyhjZWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGbGFnKGNlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDZWxsKG9mZnNldFg6IG51bWJlciwgb2Zmc2V0WTogbnVtYmVyKTogYW55IHtcbiAgICAgICAgY29uc3QgeCA9IHRoaXMuZ2VuZXJhdG9yLmdldEZsb29yTnVtYmVyKG9mZnNldFggLyB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbCk7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLmdlbmVyYXRvci5nZXRGbG9vck51bWJlcihvZmZzZXRZIC8gdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbS5jZWxsc1t5XVt4XTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlY3Vyc2l2ZU9wZW5BcmVhKGNlbGw6IGFueSkge1xuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBjZWxsLmFyZWEpIHtcbiAgICAgICAgICAgIGNvbnN0IHN5c3RlbUNlbGwgPSB0aGlzLnN5c3RlbS5jZWxsc1tjZWxsLmFyZWFbaW5kZXhdLnldW2NlbGwuYXJlYVtpbmRleF0ueF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghc3lzdGVtQ2VsbC5pc09wZW4gJiYgc3lzdGVtQ2VsbC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN5c3RlbUNlbGwudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRW1wdHlTcXVhcmUoc3lzdGVtQ2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjdXJzaXZlT3BlbkFyZWEoc3lzdGVtQ2VsbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuTnVtYmVyU3F1YXJlKHN5c3RlbUNlbGwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuRW1wdHlTcXVhcmUoY2VsbDogYW55KSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdTcXVhcmUoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxXaWR0aChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxIZWlnaHQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsU2l6ZSwgTUFJTl9CR19DT0xPUik7XG5cbiAgICAgICAgY2VsbC5pc09wZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3Blbk51bWJlclNxdWFyZShjZWxsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd051bWJlcih7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbFdpZHRoKGNlbGwueCksXG4gICAgICAgICAgICB5OiB0aGlzLmNhbGNQaXhlbEhlaWdodChjZWxsLnkpLFxuICAgICAgICB9LCB0aGlzLmNlbGxTaXplLCBjZWxsLnZhbHVlKTtcblxuICAgICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuQm9tYkNlbGwoY2VsbDogYW55KSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdCb21iKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsV2lkdGgoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsSGVpZ2h0KGNlbGwueSksXG4gICAgICAgIH0sIHRoaXMuY2VsbFNpemUpO1xuXG4gICAgICAgIGNlbGwuaXNPcGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5BbGxCb21icygpIHtcbiAgICAgICAgY29uc3QgeyBib21iUG9zaXRpb25zLCBjZWxscywgZmllbGRTaXplIH0gPSB0aGlzLnN5c3RlbTtcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IE9iamVjdC5rZXlzKGNlbGxzKS5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBPYmplY3Qua2V5cyhjZWxsc1t5XSkubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyh4ICsgeSAqIGZpZWxkU2l6ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQm9tYkNlbGwoY2VsbHNbeV1beF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RmxhZyhjZWxsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd0ZsYWcoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxXaWR0aChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxIZWlnaHQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsU2l6ZSk7XG5cbiAgICAgICAgY2VsbC5oYXNGbGFnID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUZsYWcoY2VsbDogYW55KSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdTcXVhcmUoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxXaWR0aChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxIZWlnaHQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsU2l6ZSwgSU5JVElBTF9GSUVMRF9CR19DT0xPUik7XG5cbiAgICAgICAgY2VsbC5oYXNGbGFnID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjUGl4ZWxXaWR0aCh4OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih4KSAqIHRoaXMuY2VsbFNpemUud2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjUGl4ZWxIZWlnaHQoeTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoeSkgKiB0aGlzLmNlbGxTaXplLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3BHYW1lKCkge1xuICAgICAgICAvLyDQv9C+0LrQsNC30YvQstCw0LXQvCDQutC90L7Qv9C60YMg0YDQtdGB0YLQsNGA0YLQsFxuICAgICAgICB0aGlzLnJlc3VsdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncmVzdWx0LWNvbnRhaW5lci0taXMtdmlzaWJsZScpO1xuICAgICAgICB9LCA1MCk7XG4gICAgfVxufSIsImltcG9ydCB7IE1hdGhHZW5lcmF0b3IgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yIGltcGxlbWVudHMgTWF0aEdlbmVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZ2V0UmFuZG9tOiBGdW5jdGlvbixcbiAgICAgICAgcHJpdmF0ZSBnZXRGbG9vcjogRnVuY3Rpb24sXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YDQsNC90LTQvtC80L3QvtC1INGG0LXQu9C+0LUg0YfQuNGB0LvQviDQsiDQvtC/0YDQtdC00LXQu9C10L3QvdC+0Lwg0L/RgNC+0LzQtdC20YPRgtC60LVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluIC0g0LzQuNC90LjQvNCw0LvRjNC90L7QtSDRh9C40YHQu9C+INC/0YDQvtC80LXQttGD0YLQutCwXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heCAtINC80LDQutGB0LjQvNCw0LvRjNC90L7QtSDRh9C40YHQu9C+INC/0YDQvtC80LXQttGD0YLQutCwXG4gICAgICogXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmFuZG9tQXJiaXRyYXJ5KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZsb29yTnVtYmVyKHRoaXMuZ2V0UmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J7QutGA0YPQs9C70Y/QtdGCINGH0LjRgdC70L4g0LTQviDRhtC10LvQvtCz0L5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbiAtINC40YHRhdC+0LTQvdC+0LUg0YfQuNGB0LvQvlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgIHB1YmxpYyBnZXRGbG9vck51bWJlcihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGbG9vcihuKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgR2FtZVNldHRpbmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGxldmVscyB9IGZyb20gXCIuL2xldmVsc1wiO1xuXG4vKiog0J7RgdC90L7QstC90YvQtSDQvdCw0YHRgtGA0L7QudC60Lgg0LjQs9GA0YsgKi9cbmV4cG9ydCBjb25zdCBzZXR0aW5nczogR2FtZVNldHRpbmdzID0ge1xuICAgIGNhbnZhc1NpemU6IHtcbiAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgfSxcbiAgICBsZXZlbHMsXG59IiwiaW1wb3J0IHsgQ29tcGxleGl0eUxpc3QgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKiog0KHQv9C40YHQvtC6INGD0YDQvtCy0L3QtdC5INGB0LvQvtC20L3QvtGB0YLQuCDQuNCz0YDRiyAqL1xuZXhwb3J0IGNvbnN0IGxldmVsczogQ29tcGxleGl0eUxpc3QgPSB7XG4gICAgYmVnaW5uZXI6IHtcbiAgICAgICAgbmFtZTogJ2JlZ2lubmVyJyxcbiAgICAgICAgYm9tYkNvdW50OiAxMCxcbiAgICAgICAgZmllbGRTaXplOiAyMCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZWFzeToge1xuICAgICAgICBuYW1lOiAnZWFzeScsXG4gICAgICAgIGJvbWJDb3VudDogMTUsXG4gICAgICAgIGZpZWxkU2l6ZTogMTAsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgIH0sXG4gICAgbWVkaXVtOiB7XG4gICAgICAgIG5hbWU6ICdtZWRpdW0nLFxuICAgICAgICBib21iQ291bnQ6IDQwLFxuICAgICAgICBmaWVsZFNpemU6IDEwLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbiAgICBoYXJkOiB7XG4gICAgICAgIG5hbWU6ICdoYXJkJyxcbiAgICAgICAgYm9tYkNvdW50OiAxMDAsXG4gICAgICAgIGZpZWxkU2l6ZTogMjAsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9LFxuICAgIGh1Z2U6IHtcbiAgICAgICAgbmFtZTogJ2h1Z2UnLFxuICAgICAgICBib21iQ291bnQ6IDIyMCxcbiAgICAgICAgZmllbGRTaXplOiAzMixcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZXh0cmVtZToge1xuICAgICAgICBuYW1lOiAnZXh0cmVtZScsXG4gICAgICAgIGJvbWJDb3VudDogMTUwLFxuICAgICAgICBmaWVsZFNpemU6IDIwLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbn0iLCJpbXBvcnQgeyBTb3VyY2VQcm92aWRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmltcG9ydCAnLi4vaW1nL2JvbWIucG5nJztcbmltcG9ydCAnLi4vaW1nL2ZsYWcucG5nJztcblxuZXhwb3J0IGNsYXNzIEZpbGVTb3VyY2UgaW1wbGVtZW50cyBTb3VyY2VQcm92aWRlciB7XG4gICAgcHJpdmF0ZSBpbWFnZU5hbWVBcnI6IHN0cmluZ1tdID0gW107XG4gICAgcHJpdmF0ZSBpbWFnZUFycjogYW55W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGdldEltYWdlKG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIC8vIGlmICh0aGlzLmltYWdlTmFtZUFyci5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAvLyAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuaW1hZ2VBcnJbbmFtZV07XG4gICAgICAgIC8vIH1cblxuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IGBpbWcvJHtuYW1lfS5wbmdgO1xuXG4gICAgICAgIC8vIHRoaXMuaW1hZ2VOYW1lQXJyLnB1c2gobmFtZSk7XG4gICAgICAgIC8vIHRoaXMuaW1hZ2VBcnIucHVzaChpbWcpO1xuXG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IExldmVsQnVpbGRlciB9IGZyb20gXCIuL2J1aWxkZXIvaW5kZXhcIjtcbmltcG9ydCB7IENhbnZhc0NvbnRleHRQcm92aWRlciB9IGZyb20gXCIuL2NvbnRleHQvaW5kZXhcIjtcbmltcG9ydCB7IERvbVNvdXJjZSB9IGZyb20gXCIuL2RvbS9pbmRleFwiO1xuaW1wb3J0IHsgQ2FudmFzRHJhd2VyIH0gZnJvbSBcIi4vZHJhd2VyL2luZGV4XCI7XG5pbXBvcnQgeyBTYXBwZXIgfSBmcm9tIFwiLi9nYW1lL2luZGV4XCI7XG5pbXBvcnQgeyBHZW5lcmF0b3IgfSBmcm9tIFwiLi9nZW5lcmF0b3IvaW5kZXhcIjtcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3MvaW5kZXhcIjtcbmltcG9ydCB7IEZpbGVTb3VyY2UgfSBmcm9tIFwiLi9zb3VyY2UvaW5kZXhcIjtcblxuaW1wb3J0IFwiLi9pbmRleC5zY3NzXCI7XG5cbmNvbnN0IHBpeGVsUmF0aW9Tb3VyY2UgPSB7XG4gICAgZGV2aWNlUGl4ZWxSYXRpbzogMSxcbn1cblxuY29uc3QgZmlsZVByb3ZpZGVyID0gbmV3IEZpbGVTb3VyY2UoKTtcbmNvbnN0IGRvbVNvdXJjZSA9IG5ldyBEb21Tb3VyY2Uod2luZG93KTtcbmNvbnN0IGNvbnRleHRQcm92aWRlciA9IG5ldyBDYW52YXNDb250ZXh0UHJvdmlkZXIoZG9tU291cmNlLCBwaXhlbFJhdGlvU291cmNlLCBzZXR0aW5ncyk7XG5jb25zdCBkcmF3ZXIgPSBuZXcgQ2FudmFzRHJhd2VyKGNvbnRleHRQcm92aWRlciwgZmlsZVByb3ZpZGVyKTtcbmNvbnN0IGdlbmVyYXRvciA9IG5ldyBHZW5lcmF0b3IoTWF0aC5yYW5kb20sIE1hdGguZmxvb3IpO1xuY29uc3QgYnVpbGRlciA9IG5ldyBMZXZlbEJ1aWxkZXIoZ2VuZXJhdG9yKTtcbmNvbnN0IHNhcHBlciA9IG5ldyBTYXBwZXIoc2V0dGluZ3MsIGNvbnRleHRQcm92aWRlciwgZHJhd2VyLCBkb21Tb3VyY2UsIGJ1aWxkZXIsIGdlbmVyYXRvcik7XG5cbnNhcHBlci5pbml0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9