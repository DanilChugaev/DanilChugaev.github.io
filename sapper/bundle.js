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
/* harmony export */   "TEXT_COLOR": () => (/* binding */ TEXT_COLOR)
/* harmony export */ });
var DEFAULT_COLOR = '#000000';
var DEFAULT_WIDTH = 1;
var MAIN_BG_COLOR = '#212121';
var INITIAL_FIELD_BG_COLOR = '#6666FF';
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
        this.context.drawImage(this.bomb, x + (width / 4), y + (height / 4), width / 2, height / 2);
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
        var cellCoord = this.getCell(offsetX, offsetY);
        var cell = this.system.cells[cellCoord.y][cellCoord.x];
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
    Sapper.prototype.getCell = function (offsetX, offsetY) {
        return {
            x: this.generator.getFloorNumber(offsetX / this.system.pixelsCountInCell),
            y: this.generator.getFloorNumber(offsetY / this.system.pixelsCountInCell),
        };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHdEQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUMsSUFBTSxNQUFNLEdBQUcsSUFBSSwrQ0FBTSxDQUFDLHFEQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRTVGLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NhcHBlci8uL3NyYy9pbWcvYm9tYi5wbmciLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2ltZy9mbGFnLnBuZyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW5kZXguc2Nzcz8yMDZmIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9idWlsZGVyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvYnVpbGRlci9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvY29udGV4dC9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZG9tL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kcmF3ZXIvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kcmF3ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dhbWUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dlbmVyYXRvci9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc2V0dGluZ3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3NldHRpbmdzL2xldmVscy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc291cmNlL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9ib21iLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvZmxhZy5wbmdcIjsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBBcmVhU3RydWN0dXJlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiDQntGC0L3QvtGB0LjRgtC10LvRjNC90YvQtSDQutC+0L7RgNC00LjQvdCw0YLRiyDRgdC+0YHQtdC00L3QuNGFINGP0YfQtdC10Log0L7QsdC70LDRgdGC0LhcbiAqIFxuICogIzEjMiMzI1xuICogIzgtKy00I1xuICogIzcjNiM1I1xuICovXG5leHBvcnQgY29uc3QgQVJFQV9TVFJVQ1RVUkU6IEFyZWFTdHJ1Y3R1cmUgPSB7XG4gICAgMDogeyB4OiAtMSwgeTogLTEgfSxcbiAgICAxOiB7IHg6IDAsIHk6IC0xIH0sXG4gICAgMjogeyB4OiAxLCB5OiAtMSB9LFxuICAgIDM6IHsgeDogMSwgeTogMCB9LFxuICAgIDQ6IHsgeDogMSwgeTogMSB9LFxuICAgIDU6IHsgeDogMCwgeTogMSB9LFxuICAgIDY6IHsgeDogLTEsIHk6IDEgfSxcbiAgICA3OiB7IHg6IC0xLCB5OiAwIH0sXG59IiwiaW1wb3J0IHsgQ29tcGxleGl0eSwgQ29tcGxleGl0eUxpc3QsIEdhbWVTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5ncy90eXBlc1wiO1xuaW1wb3J0IHsgQXJlYVN0cnVjdHVyZSwgTWFwU3RydWN0dXJlLCBTeXN0ZW1CdWlsZGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IEFSRUFfU1RSVUNUVVJFIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBNYXRoR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2dlbmVyYXRvci90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTGV2ZWxCdWlsZGVyIGltcGxlbWVudHMgU3lzdGVtQnVpbGRlciB7XG4gICAgcHJpdmF0ZSBmaWVsZFNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIGJvbWJDb3VudDogbnVtYmVyO1xuICAgIHByaXZhdGUgY2FudmFzU2l6ZTogU2l6ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGdlbmVyYXRvcjogTWF0aEdlbmVyYXRvcixcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiDQkdC40LvQtNC40YIg0YPRgNC+0LLQtdC90YxcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0dhbWVTZXR0aW5nc30gc2V0dGluZ3MgLSDQvdCw0YHRgtGA0L7QudC60Lgg0LjQs9GA0YtcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7TWFwU3RydWN0dXJlfVxuICAgICAqL1xuICAgIHB1YmxpYyBidWlsZChzZXR0aW5nczogR2FtZVNldHRpbmdzKTogTWFwU3RydWN0dXJlIHtcbiAgICAgICAgY29uc3QgeyBmaWVsZFNpemUsIGJvbWJDb3VudCB9ID0gdGhpcy5nZXRTZWxlY3RlZExldmVsKHNldHRpbmdzLmxldmVscyk7XG5cbiAgICAgICAgdGhpcy5maWVsZFNpemUgPSBmaWVsZFNpemU7XG4gICAgICAgIHRoaXMuYm9tYkNvdW50ID0gYm9tYkNvdW50O1xuICAgICAgICB0aGlzLmNhbnZhc1NpemUgPSBzZXR0aW5ncy5jYW52YXNTaXplO1xuXG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2VuZXJhdGVNYXBTdHJ1Y3R1cmUoKTtcblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINCy0YvQsdGA0LDQvdC90YvQuSDRg9GA0L7QstC10L3RjCDRgdC70L7QttC90L7RgdGC0Lgg0LjQtyDRgdC/0LjRgdC60LBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBsZXhpdHlMaXN0fSBsZXZlbHMgLSDRgdC/0LjRgdC+0Log0YPRgNC+0LLQvdC10Lkg0YHQu9C+0LbQvdC+0YHRgtC4XG4gICAgICogXG4gICAgICogQHJldHVybnMge0NvbXBsZXhpdHl9XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZExldmVsKGxldmVsczogQ29tcGxleGl0eUxpc3QpOiBDb21wbGV4aXR5IHtcbiAgICAgICAgbGV0IHNlbGVjdGVkTGV2ZWw6IENvbXBsZXhpdHk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGxldmVscykge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKGxldmVsc1trZXldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTGV2ZWwgPSBsZXZlbHNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZExldmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCT0LXQvdC10YDQuNGA0YPQtdGCINGB0YLRgNGD0LrRgtGD0YDRgyDQv9C+0LvRjyDQtNC70Y8g0LLRi9Cx0YDQsNC90L3QvtCz0L4g0YPRgNC+0LLQvdGPINGB0LvQvtC20L3QvtGB0YLQuFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U2l6ZX0gY2FudmFzU2l6ZSAtINGA0LDQt9C80LXRgCDQutCw0L3QstCw0YHQsCDQsiDQv9C40LrRgdC10LvRj9GFXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZpZWxkU2l6ZSAtINGA0LDQt9C80LXRgCDQuNCz0YDQvtCy0L7Qs9C+INC/0L7Qu9GPINCyINC60LvQtdGC0LrQsNGFXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJvbWJDb3VudCAtINC60L7Qu9C40YfQtdGB0YLQstC+INCx0L7QvNCxINC90LAg0LjQs9GA0L7QstC+0Lwg0L/QvtC70LVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7TWFwU3RydWN0dXJlfVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVNYXBTdHJ1Y3R1cmUoKTogTWFwU3RydWN0dXJlIHtcbiAgICAgICAgY29uc3QgbWFwU3RydWN0dXJlOiBNYXBTdHJ1Y3R1cmUgPSB7XG4gICAgICAgICAgICBwaXhlbHNDb3VudEluQ2VsbDogdGhpcy5jYW52YXNTaXplLndpZHRoIC8gdGhpcy5maWVsZFNpemUsXG4gICAgICAgICAgICBib21iQ291bnQ6IHRoaXMuYm9tYkNvdW50LFxuICAgICAgICAgICAgY2VsbHM6IHt9LFxuICAgICAgICAgICAgYm9tYlBvc2l0aW9uczogW10sXG4gICAgICAgICAgICBmaWVsZFNpemU6IHRoaXMuZmllbGRTaXplLFxuICAgICAgICB9O1xuXG4gICAgICAgIG1hcFN0cnVjdHVyZS5ib21iUG9zaXRpb25zID0gdGhpcy5nZW5lcmF0ZVJhbmRvbUJvbWJQb3NpdGlvbnModGhpcy5maWVsZFNpemUgKiB0aGlzLmZpZWxkU2l6ZSk7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmZpZWxkU2l6ZTsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuZmllbGRTaXplOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3c6IG51bWJlciA9IHk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbDogbnVtYmVyID0geDtcblxuICAgICAgICAgICAgICAgIGlmICghbWFwU3RydWN0dXJlLmNlbGxzW3Jvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwU3RydWN0dXJlLmNlbGxzW3Jvd10gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgaGFzQm9tYjogYm9vbGVhbiA9IG1hcFN0cnVjdHVyZS5ib21iUG9zaXRpb25zLmluY2x1ZGVzKHggKyB5ICogdGhpcy5maWVsZFNpemUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyZWE6IEFyZWFTdHJ1Y3R1cmUgPSB0aGlzLmdlbmVyYXRlQ2VsbEFyZWEoeyB4LCB5IH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbFN0cnVjdHVyZTogYW55ID0ge1xuICAgICAgICAgICAgICAgICAgICB5OiByb3csIFxuICAgICAgICAgICAgICAgICAgICB4OiBjZWxsLFxuICAgICAgICAgICAgICAgICAgICBhcmVhLFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChoYXNCb21iKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxTdHJ1Y3R1cmUuaGFzQm9tYiA9IGhhc0JvbWI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbFN0cnVjdHVyZS52YWx1ZSA9IHRoaXMuY2FsY0JvbWJzQXJvdW5kQ2VsbHMoYXJlYSwgbWFwU3RydWN0dXJlLmJvbWJQb3NpdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1hcFN0cnVjdHVyZS5jZWxsc1tyb3ddW2NlbGxdID0gY2VsbFN0cnVjdHVyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKG1hcFN0cnVjdHVyZSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcFN0cnVjdHVyZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQk9C10L3QtdGA0LjRgNGD0LXRgiDQvtCx0LvQsNGB0YLRjCDRj9GH0LXQtdC6INGBINC40YUg0LrQvtC+0YDQtNC40L3QsNGC0LDQvNC4INCy0L7QutGA0YPQsyDQstGL0LHRgNCw0L3QvdC+0Lkg0Y/Rh9C10LnQutC4INC90LAg0L7RgdC90L7QstC1INC10LUg0LrQvtC+0YDQtNC40L3QsNGCXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggLSDQutC+0L7RgNC00LjQvdCw0YLQsCAneCcg0Y/Rh9C10LnQutC4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSDQutC+0L7RgNC00LjQvdCw0YLQsCAneScg0Y/Rh9C10LnQutC4XG4gICAgICogXG4gICAgICogQHJldHVybnMge0FyZWFTdHJ1Y3R1cmV9XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUNlbGxBcmVhKHsgeCwgeSB9OiBDZWxsKTogQXJlYVN0cnVjdHVyZSB7XG4gICAgICAgIGNvbnN0IGFyZWE6IEFyZWFTdHJ1Y3R1cmUgPSB7fTtcbiAgICBcbiAgICAgICAgLy8gOCAtINC60L7Qu9C40YfQtdGB0YLQstC+INGP0YfQtdC10Log0LLQvtC60YDRg9CzINGG0LXQvdGC0YDQsNC70YzQvdC+0LlcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIC8qKiDQn9GA0L7QstC10YDRj9C10LwsINC90LUg0LLRi9GF0L7QtNC40YIg0LvQuCDRj9GH0LXQudC60LAg0LfQsCDQu9C10LLRg9GOINC4INCy0LXRgNGF0L3RjtGOINCz0YDQsNC90LjRhtGLINC/0L7Qu9GPICovXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBpZiAoeCArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS54IDwgMCB8fCB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnkgPCAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKiDQn9GA0L7QstC10YDRj9C10LwsINC90LUg0LLRi9GF0L7QtNC40YIg0LvQuCDRj9GH0LXQudC60LAg0LfQsCDQv9GA0LDQstGD0Y4g0Lgg0L3QuNC20L3RjtGOINCz0YDQsNC90LjRhtGLINC/0L7Qu9GPICovXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBpZiAoeCArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS54ID49IHRoaXMuZmllbGRTaXplIHx8IHkgKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueSA+PSB0aGlzLmZpZWxkU2l6ZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBhcmVhW2luZGV4XSA9IHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgeDogeCArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS54LFxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB5OiB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnksXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJlYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQk9C10L3QtdGA0LjRgNGD0LXRgiDRgNCw0L3QtNC+0LzQvdGL0LUg0L/QvtC30LjRhtC40Lgg0LTQu9GPINGA0LDRgdC/0L7Qu9C+0LbQtdC90LjRjyDQsdC+0LzQsSDQvdCwINC/0L7Qu9C1XG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNlbGxzQ291bnQgLSDQutC+0LvQuNGH0LXRgdGC0LLQviDRj9GH0LXQtdC6INC90LAg0L/QvtC70LVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZVJhbmRvbUJvbWJQb3NpdGlvbnMoY2VsbHNDb3VudDogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgICAgICBjb25zdCBib21iUG9zaXRpb25zOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmJvbWJDb3VudDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IHJhbmRvbVBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLmdlbmVyYXRvci5nZXRSYW5kb21BcmJpdHJhcnkoMSwgY2VsbHNDb3VudCk7XG5cbiAgICAgICAgICAgIHdoaWxlIChib21iUG9zaXRpb25zLmluY2x1ZGVzKHJhbmRvbVBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJhbmRvbVBvc2l0aW9uID0gdGhpcy5nZW5lcmF0b3IuZ2V0UmFuZG9tQXJiaXRyYXJ5KDEsIGNlbGxzQ291bnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBib21iUG9zaXRpb25zLnB1c2gocmFuZG9tUG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJvbWJQb3NpdGlvbnMuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0YfQuNGC0LDQtdGCINC60L7Qu9C40YfQtdGB0YLQstC+INCx0L7QvNCxINCy0L7QutGA0YPQsyDRj9GH0LXQudC60LhcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FyZWFTdHJ1Y3R1cmV9IGFyZWFcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBib21iUG9zaXRpb25zXG4gICAgICogXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNCb21ic0Fyb3VuZENlbGxzKGFyZWE6IEFyZWFTdHJ1Y3R1cmUsIGJvbWJQb3NpdGlvbnM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXJlYSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGFyZWFba2V5XTtcblxuICAgICAgICAgICAgaWYgKGJvbWJQb3NpdGlvbnMuaW5jbHVkZXMoY2VsbC54ICsgY2VsbC55ICogdGhpcy5maWVsZFNpemUpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBFbGVtZW50U291cmNlLCBQaXhlbFJhdGlvU291cmNlIH0gZnJvbSBcIi4uL2RvbS90eXBlc1wiO1xuaW1wb3J0IHsgR2FtZVNldHRpbmdzIH0gZnJvbSBcIi4uL3NldHRpbmdzL3R5cGVzXCI7XG5pbXBvcnQgeyBEcmF3aW5nQ29udGV4dCwgRHJhd2luZ0NvbnRleHRQcm92aWRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNDb250ZXh0UHJvdmlkZXIgaW1wbGVtZW50cyBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIHtcbiAgICBwcml2YXRlIGNhbnZhczogTnVsbGFibGU8SFRNTENhbnZhc0VsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGNvbnRleHQ6IE51bGxhYmxlPERyYXdpbmdDb250ZXh0PiA9IG51bGw7XG4gIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBlbGVtZW50U291cmNlOiBFbGVtZW50U291cmNlLFxuICAgICAgcHJpdmF0ZSBwaXhlbFJhdGlvU291cmNlOiBQaXhlbFJhdGlvU291cmNlLFxuICAgICAgcHJpdmF0ZSBzZXR0aW5nczogR2FtZVNldHRpbmdzXG4gICAgKSB7XG4gICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGlmICghY2FudmFzKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBhIGNhbnZhcy5cIik7XG4gIFxuICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXMgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICB0aGlzLm5vcm1hbGl6ZVNjYWxlKCk7XG4gICAgfVxuICBcbiAgICBwdWJsaWMgZ2V0SW5zdGFuY2UoKTogRHJhd2luZ0NvbnRleHQge1xuICAgICAgcmV0dXJuIHRoaXMuY29udGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGlzdGVuQ2FudmFzQ2xpY2soY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2FsbGJhY2spO1xuICAgIH1cbiAgXG4gICAgcHJpdmF0ZSBub3JtYWxpemVTY2FsZSgpOiB2b2lkIHtcbiAgICAgIGlmICghdGhpcy5jYW52YXMgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuO1xuICBcbiAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5waXhlbFJhdGlvU291cmNlLmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5zZXR0aW5ncy5jYW52YXNTaXplO1xuICBcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGggKiByYXRpbztcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodCAqIHJhdGlvO1xuICBcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgXG4gICAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmNvbnRleHQuc2NhbGUocmF0aW8sIHJhdGlvKTtcbiAgICB9XG4gIH0iLCJpbXBvcnQgeyBFbGVtZW50U291cmNlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIERvbVNvdXJjZSBpbXBsZW1lbnRzIEVsZW1lbnRTb3VyY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdpbmRvdzogV2luZG93KSB7fVxuXG4gIHB1YmxpYyBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZyk6IE51bGxhYmxlPEhUTUxFbGVtZW50PiB7XG4gICAgcmV0dXJuIHRoaXMud2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWxlbWVudChpZDogc3RyaW5nKTogTnVsbGFibGU8SFRNTEVsZW1lbnQ+IHtcbiAgICByZXR1cm4gdGhpcy53aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICB9XG5cbiAgcHVibGljIGFmdGVyTG9hZChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgY2FsbGJhY2soZXZlbnQpO1xuICAgIH0pO1xuICB9XG59IiwiZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09MT1I6IENvbG9yID0gJyMwMDAwMDAnO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfV0lEVEg6IExlbmd0aCA9IDE7XG5leHBvcnQgY29uc3QgTUFJTl9CR19DT0xPUjogQ29sb3IgPSAnIzIxMjEyMSc7XG5leHBvcnQgY29uc3QgSU5JVElBTF9GSUVMRF9CR19DT0xPUjogQ29sb3IgPSAnIzY2NjZGRic7XG5leHBvcnQgY29uc3QgVEVYVF9DT0xPUjogQ29sb3IgPSAnd2hpdGUnOyIsImltcG9ydCB7IERyYXdpbmdDb250ZXh0LCBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbnRleHQvdHlwZXNcIjtcbmltcG9ydCB7IFNvdXJjZVByb3ZpZGVyIH0gZnJvbSBcIi4uL3NvdXJjZS90eXBlc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9DT0xPUiwgREVGQVVMVF9XSURUSCwgTUFJTl9CR19DT0xPUiwgSU5JVElBTF9GSUVMRF9CR19DT0xPUiwgVEVYVF9DT0xPUiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQnJ1c2hTZXR0aW5ncywgRHJhd2VyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc0RyYXdlciBpbXBsZW1lbnRzIERyYXdlciB7XG4gICAgcHJpdmF0ZSBjb250ZXh0OiBEcmF3aW5nQ29udGV4dCA9IG51bGw7XG4gICAgcHJpdmF0ZSBib21iOiBhbnk7XG4gICAgcHJpdmF0ZSBmbGFnOiBhbnk7XG4gIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBjb250ZXh0UHJvdmlkZXI6IERyYXdpbmdDb250ZXh0UHJvdmlkZXIsXG4gICAgICBwcml2YXRlIGZpbGVQcm92aWRlcjogU291cmNlUHJvdmlkZXJcbiAgICApIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY29udGV4dFByb3ZpZGVyLmdldEluc3RhbmNlKCk7XG4gICAgICBpZiAoIXRoaXMuY29udGV4dCkgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGFjY2VzcyB0aGUgZHJhd2luZyBjb250ZXh0LlwiKTtcblxuICAgICAgdGhpcy5ib21iID0gZmlsZVByb3ZpZGVyLmdldEltYWdlKCdib21iJyk7XG4gICAgICB0aGlzLmZsYWcgPSBmaWxlUHJvdmlkZXIuZ2V0SW1hZ2UoJ2ZsYWcnKTtcbiAgICB9XG4gIFxuICAgIHB1YmxpYyBkcmF3TGluZShcbiAgICAgIHsgc3RhcnQsIGVuZCB9OiBMaW5lLFxuICAgICAgeyBjb2xvciwgd2lkdGggfTogQnJ1c2hTZXR0aW5ncyA9IHt9XG4gICAgKTogdm9pZCB7XG4gICAgICBpZiAoIXRoaXMuY29udGV4dCkgcmV0dXJuO1xuICBcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yID8/IERFRkFVTFRfQ09MT1I7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gd2lkdGggPz8gREVGQVVMVF9XSURUSDtcbiAgXG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHN0YXJ0LngsIHN0YXJ0LnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmQueCwgZW5kLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3U3F1YXJlKHsgeCwgeSB9OiBDZWxsLCB7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSwgY29sb3I/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIGlmICghdGhpcy5jb250ZXh0KSByZXR1cm47XG5cbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvciA/IGNvbG9yIDogSU5JVElBTF9GSUVMRF9CR19DT0xPUjtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KVxuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3TnVtYmVyKHsgeCwgeSB9OiBDZWxsLCB7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgdGhpcy5kcmF3U3F1YXJlKHsgeCwgeSB9LCB7IHdpZHRoLCBoZWlnaHQgfSwgTUFJTl9CR19DT0xPUik7XG4gICAgICAvLyB0aGlzLmRyYXdCb3JkZXJzKHsgeCwgeSB9LCB7IHdpZHRoLCBoZWlnaHQgfSwgJ2xpZ2h0Z3JleScpXG4gICAgICAvLyDQvdCw0YDQuNGB0L7QstCw0YLRjCDQsdC+0YDQtNC10YDRi1xuXG4gICAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAke2hlaWdodCAvIDJ9cHggQXJpYWxgO1xuXHRcdCAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFRFWFRfQ09MT1I7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoU3RyaW5nKHZhbHVlKSwgeCArICh3aWR0aCAvIDIuNSksIHkgKyAoaGVpZ2h0IC8gMS41KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdCb21iKHsgeCwgeSB9OiBDZWxsLCB7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSk6IHZvaWQge1xuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmJvbWIsIHggKyAod2lkdGggLyA0KSwgeSArIChoZWlnaHQgLyA0KSwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIGRyYXdCb3JkZXJzKHsgeCwgeSB9OiBDZWxsLCB7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSwgY29sb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vICAgdGhpcy5kcmF3TGluZSh7XG4gICAgLy8gICAgIHN0YXJ0OiB7XG4gICAgLy8gICAgICAgeDogeCxcbiAgICAvLyAgICAgICB5OiB5LFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBlbmQ6IHtcbiAgICAvLyAgICAgICB4OiB4ICsgd2lkdGgsXG4gICAgLy8gICAgICAgeTogeSxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgIH0sIHsgY29sb3IgfSlcbiAgICAvLyB9XG4gIH0iLCJpbXBvcnQgeyBNYXBTdHJ1Y3R1cmUsIFN5c3RlbUJ1aWxkZXIgfSBmcm9tICcuLi9idWlsZGVyL3R5cGVzJztcbmltcG9ydCB7IERyYXdpbmdDb250ZXh0UHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L3R5cGVzJztcbmltcG9ydCB7IEVsZW1lbnRTb3VyY2UgfSBmcm9tICcuLi9kb20vdHlwZXMnO1xuaW1wb3J0IHsgTUFJTl9CR19DT0xPUiB9IGZyb20gJy4uL2RyYXdlci9jb25zdGFudHMnO1xuaW1wb3J0IHsgRHJhd2VyIH0gZnJvbSAnLi4vZHJhd2VyL3R5cGVzJztcbmltcG9ydCB7IE1hdGhHZW5lcmF0b3IgfSBmcm9tICcuLi9nZW5lcmF0b3IvdHlwZXMnO1xuaW1wb3J0IHsgR2FtZVNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MvdHlwZXMnO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBTYXBwZXIgaW1wbGVtZW50cyBHYW1lIHtcbiAgICBwcml2YXRlIHNlbGVjdDogTnVsbGFibGU8SFRNTFNlbGVjdEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGJ1dHRvbjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIHJlc3VsdENvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGdhbWVDb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBjYW52YXM6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBzeXN0ZW06IE1hcFN0cnVjdHVyZTtcbiAgICBwcml2YXRlIGNlbGxTaXplOiBTaXplO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyxcbiAgICAgICAgcHJpdmF0ZSBjb250ZXh0UHJvdmlkZXI6IERyYXdpbmdDb250ZXh0UHJvdmlkZXIsXG4gICAgICAgIHByaXZhdGUgZHJhd2VyOiBEcmF3ZXIsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFNvdXJjZTogRWxlbWVudFNvdXJjZSxcbiAgICAgICAgcHJpdmF0ZSBidWlsZGVyOiBTeXN0ZW1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIGdlbmVyYXRvcjogTWF0aEdlbmVyYXRvcixcbiAgICApIHtcbiAgICAgICAgdGhpcy5zZWxlY3QgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdzZWxlY3QtbGV2ZWwnKTtcbiAgICAgICAgdGhpcy5idXR0b24gPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ3N0YXJ0LWdhbWUnKTtcbiAgICAgICAgdGhpcy5nYW1lQ29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdnYW1lLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMucmVzdWx0Q29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdyZXN1bHQtY29udGFpbmVyJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JjQvdC40YbQuNCw0LvQuNC30LjRgNGD0LXQvCDQtNCw0L3QvdGL0LUg0LjQs9GA0YtcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbGVtZW50U291cmNlLmFmdGVyTG9hZCgoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zZXR0aW5ncy5sZXZlbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSA8SFRNTE9wdGlvbkVsZW1lbnQ+dGhpcy5lbGVtZW50U291cmNlLmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0ga2V5O1xuICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGtleTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdGhpcy5zZXR0aW5ncy5sZXZlbHNba2V5XS5zZWxlY3RlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlTGV2ZWwuYmluZCh0aGlzKSwgZmFsc2UpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3RhcnQuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodGC0LDRgNGC0YPQtdC8INC40LPRgNGDXG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGFydCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zeXN0ZW0gPSB0aGlzLmJ1aWxkZXIuYnVpbGQodGhpcy5zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuY2VsbFNpemUgPSB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc3lzdGVtLnBpeGVsc0NvdW50SW5DZWxsLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlVmlzaWJpbGl0eUVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMubWFrZUluaXRpYWxGaWxsKCk7XG4gICAgICAgIHRoaXMuY29udGV4dFByb3ZpZGVyLmxpc3RlbkNhbnZhc0NsaWNrKHRoaXMuY2hlY2tDbGljay5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQnNC10L3Rj9C10YIg0YPRgNC+0LLQtdC90Ywg0L/QvtGB0LvQtSDRgdC80LXQvdGLINCyINGB0LXQu9C10LrRgtC1XG4gICAgICogXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBET00g0YHQvtCx0YvRgtC40LVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUxldmVsKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zZXR0aW5ncy5sZXZlbHMpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubGV2ZWxzW2tleV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5sZXZlbHNbZXZlbnQudGFyZ2V0LnZhbHVlXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JzQtdC90Y/QtdGCINCy0LjQtNC40LzQvtGB0YLRjCDQuNCz0YDQvtCy0YvRhSDRjdC70LXQvNC10L3RgtC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1XG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VWaXNpYmlsaXR5RWxlbWVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuc2VsZWN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuZ2FtZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQl9Cw0L/QvtC70L3Rj9C10YIg0LLQtdGB0Ywg0LrQsNC90LLQsNGBINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHJpdmF0ZSBtYWtlSW5pdGlhbEZpbGwoKSB7XG4gICAgICAgIGNvbnN0IHNpemU6IFNpemUgPSB0aGlzLnNldHRpbmdzLmNhbnZhc1NpemU7XG5cbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd1NxdWFyZSh7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSwgc2l6ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0NsaWNrKHsgb2Zmc2V0WCwgb2Zmc2V0WSB9OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNlbGxDb29yZDogQ2VsbCA9IHRoaXMuZ2V0Q2VsbChvZmZzZXRYLCBvZmZzZXRZKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuc3lzdGVtLmNlbGxzW2NlbGxDb29yZC55XVtjZWxsQ29vcmQueF07XG4gICAgICAgIFxuICAgICAgICBpZiAoY2VsbC5oYXNCb21iKSB7XG4gICAgICAgICAgICAvLyDRgNC40YHRg9C10Lwg0LHQvtC80LHRgyDQsiDRg9C60LDQt9Cw0L3QvdC+0Lkg0LrQu9C10YLQutC1XG4gICAgICAgICAgICB0aGlzLm9wZW5Cb21iQ2VsbChjZWxsKTtcbiAgICAgICAgICAgIC8vINGA0LjRgdGD0LXQvCDQstGB0LUg0L7RgdGC0LDQu9GM0L3Ri9C1INCx0L7QvNCx0YtcbiAgICAgICAgICAgIHRoaXMub3BlbkFsbEJvbWJzKCk7XG4gICAgICAgICAgICAvLyDRgdGC0L7Qv9C+0YDQuNC8INC40LPRgNGDXG4gICAgICAgICAgICB0aGlzLnN0b3BHYW1lKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2VsbC52YWx1ZSAhPT0gMCkge1xuICAgICAgICAgICAgLy8g0YDQuNGB0YPQtdC8INC60LvQtdGC0LrRgyDRgSDRhtC40YTRgNC+0LlcbiAgICAgICAgICAgIHRoaXMub3Blbk51bWJlclNxdWFyZShjZWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vINGA0LjRgdGD0LXQvCDQv9GD0YHRgtGD0Y4g0LrQu9C10YLQutGDXG4gICAgICAgICAgICB0aGlzLm9wZW5FbXB0eVNxdWFyZShjZWxsKTtcbiAgICAgICAgICAgIC8vINC/0YDQvtGF0L7QtNC40LzRgdGPINC/0L4g0YHQvtGB0LXQtNGP0Lwg0Lgg0YDQuNGB0YPQtdC8INC60LvQtdGC0LrQuCDQtNC+INGC0L7Qs9C+INC80L7QvNC10L3RgtCwLCDQv9C+0LrQsCDQvdC1INC/0L7Rj9Cy0LjRgtGB0Y8g0LIg0LrQu9C10YLQutC1INGG0LjRhNGA0LBcbiAgICAgICAgICAgIHRoaXMucmVjdXJzaXZlT3BlbkFyZWEoY2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENlbGwob2Zmc2V0WDogbnVtYmVyLCBvZmZzZXRZOiBudW1iZXIpOiBDZWxsIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuZ2VuZXJhdG9yLmdldEZsb29yTnVtYmVyKG9mZnNldFggLyB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbCksXG4gICAgICAgICAgICB5OiB0aGlzLmdlbmVyYXRvci5nZXRGbG9vck51bWJlcihvZmZzZXRZIC8gdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwpLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWN1cnNpdmVPcGVuQXJlYShjZWxsOiBhbnkpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gY2VsbC5hcmVhKSB7XG4gICAgICAgICAgICBjb25zdCBzeXN0ZW1DZWxsID0gdGhpcy5zeXN0ZW0uY2VsbHNbY2VsbC5hcmVhW2luZGV4XS55XVtjZWxsLmFyZWFbaW5kZXhdLnhdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXN5c3RlbUNlbGwuaXNPcGVuICYmIHN5c3RlbUNlbGwudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChzeXN0ZW1DZWxsLnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkVtcHR5U3F1YXJlKHN5c3RlbUNlbGwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZU9wZW5BcmVhKHN5c3RlbUNlbGwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbk51bWJlclNxdWFyZShzeXN0ZW1DZWxsKTtcblxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb3BlbkVtcHR5U3F1YXJlKGNlbGw6IGFueSkge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3U3F1YXJlKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsV2lkdGgoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsSGVpZ2h0KGNlbGwueSksXG4gICAgICAgIH0sIHRoaXMuY2VsbFNpemUsIE1BSU5fQkdfQ09MT1IpO1xuXG4gICAgICAgIGNlbGwuaXNPcGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5OdW1iZXJTcXVhcmUoY2VsbDogYW55KSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdOdW1iZXIoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxXaWR0aChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxIZWlnaHQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsU2l6ZSwgY2VsbC52YWx1ZSk7XG5cbiAgICAgICAgY2VsbC5pc09wZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3BlbkJvbWJDZWxsKGNlbGw6IGFueSkge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3Qm9tYih7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbFdpZHRoKGNlbGwueCksXG4gICAgICAgICAgICB5OiB0aGlzLmNhbGNQaXhlbEhlaWdodChjZWxsLnkpLFxuICAgICAgICB9LCB0aGlzLmNlbGxTaXplKTtcblxuICAgICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuQWxsQm9tYnMoKSB7XG4gICAgICAgIGNvbnN0IHsgYm9tYlBvc2l0aW9ucywgY2VsbHMsIGZpZWxkU2l6ZSB9ID0gdGhpcy5zeXN0ZW07XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBPYmplY3Qua2V5cyhjZWxscykubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgT2JqZWN0LmtleXMoY2VsbHNbeV0pLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJvbWJQb3NpdGlvbnMuaW5jbHVkZXMoeCArIHkgKiBmaWVsZFNpemUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkJvbWJDZWxsKGNlbGxzW3ldW3hdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGNQaXhlbFdpZHRoKHg6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHgpICogdGhpcy5jZWxsU2l6ZS53aWR0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGNQaXhlbEhlaWdodCh5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih5KSAqIHRoaXMuY2VsbFNpemUuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcEdhbWUoKSB7XG4gICAgICAgIC8vINC/0L7QutCw0LfRi9Cy0LDQtdC8INC60L3QvtC/0LrRgyDRgNC10YHRgtCw0YDRgtCwXG4gICAgICAgIHRoaXMucmVzdWx0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdyZXN1bHQtY29udGFpbmVyLS1pcy12aXNpYmxlJyk7XG4gICAgICAgIH0sIDUwKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgTWF0aEdlbmVyYXRvciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3IgaW1wbGVtZW50cyBNYXRoR2VuZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBnZXRSYW5kb206IEZ1bmN0aW9uLFxuICAgICAgICBwcml2YXRlIGdldEZsb29yOiBGdW5jdGlvbixcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgNCw0L3QtNC+0LzQvdC+0LUg0YbQtdC70L7QtSDRh9C40YHQu9C+INCyINC+0L/RgNC10LTQtdC70LXQvdC90L7QvCDQv9GA0L7QvNC10LbRg9GC0LrQtVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gLSDQvNC40L3QuNC80LDQu9GM0L3QvtC1INGH0LjRgdC70L4g0L/RgNC+0LzQtdC20YPRgtC60LBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4IC0g0LzQsNC60YHQuNC80LDQu9GM0L3QvtC1INGH0LjRgdC70L4g0L/RgNC+0LzQtdC20YPRgtC60LBcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRSYW5kb21BcmJpdHJhcnkobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rmxvb3JOdW1iZXIodGhpcy5nZXRSYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQntC60YDRg9Cz0LvRj9C10YIg0YfQuNGB0LvQviDQtNC+INGG0LXQu9C+0LPQvlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuIC0g0LjRgdGF0L7QtNC90L7QtSDRh9C40YHQu9C+XG4gICAgICogXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICAgcHVibGljIGdldEZsb29yTnVtYmVyKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZsb29yKG4pO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBHYW1lU2V0dGluZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgbGV2ZWxzIH0gZnJvbSBcIi4vbGV2ZWxzXCI7XG5cbi8qKiDQntGB0L3QvtCy0L3Ri9C1INC90LDRgdGC0YDQvtC50LrQuCDQuNCz0YDRiyAqL1xuZXhwb3J0IGNvbnN0IHNldHRpbmdzOiBHYW1lU2V0dGluZ3MgPSB7XG4gICAgY2FudmFzU2l6ZToge1xuICAgICAgICB3aWR0aDogODAwLFxuICAgICAgICBoZWlnaHQ6IDgwMCxcbiAgICB9LFxuICAgIGxldmVscyxcbn0iLCJpbXBvcnQgeyBDb21wbGV4aXR5TGlzdCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKiDQodC/0LjRgdC+0Log0YPRgNC+0LLQvdC10Lkg0YHQu9C+0LbQvdC+0YHRgtC4INC40LPRgNGLICovXG5leHBvcnQgY29uc3QgbGV2ZWxzOiBDb21wbGV4aXR5TGlzdCA9IHtcbiAgICBiZWdpbm5lcjoge1xuICAgICAgICBuYW1lOiAnYmVnaW5uZXInLFxuICAgICAgICBib21iQ291bnQ6IDEwLFxuICAgICAgICBmaWVsZFNpemU6IDIwLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbiAgICBlYXN5OiB7XG4gICAgICAgIG5hbWU6ICdlYXN5JyxcbiAgICAgICAgYm9tYkNvdW50OiAxNSxcbiAgICAgICAgZmllbGRTaXplOiAxMCxcbiAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgfSxcbiAgICBtZWRpdW06IHtcbiAgICAgICAgbmFtZTogJ21lZGl1bScsXG4gICAgICAgIGJvbWJDb3VudDogNDAsXG4gICAgICAgIGZpZWxkU2l6ZTogMTAsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9LFxuICAgIGhhcmQ6IHtcbiAgICAgICAgbmFtZTogJ2hhcmQnLFxuICAgICAgICBib21iQ291bnQ6IDEwMCxcbiAgICAgICAgZmllbGRTaXplOiAyMCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgaHVnZToge1xuICAgICAgICBuYW1lOiAnaHVnZScsXG4gICAgICAgIGJvbWJDb3VudDogMjIwLFxuICAgICAgICBmaWVsZFNpemU6IDMyLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbiAgICBleHRyZW1lOiB7XG4gICAgICAgIG5hbWU6ICdleHRyZW1lJyxcbiAgICAgICAgYm9tYkNvdW50OiAxNTAsXG4gICAgICAgIGZpZWxkU2l6ZTogMjAsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9LFxufSIsImltcG9ydCB7IFNvdXJjZVByb3ZpZGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuaW1wb3J0ICcuLi9pbWcvYm9tYi5wbmcnO1xuaW1wb3J0ICcuLi9pbWcvZmxhZy5wbmcnO1xuXG5leHBvcnQgY2xhc3MgRmlsZVNvdXJjZSBpbXBsZW1lbnRzIFNvdXJjZVByb3ZpZGVyIHtcbiAgICBwcml2YXRlIGltYWdlTmFtZUFycjogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIGltYWdlQXJyOiBhbnlbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZ2V0SW1hZ2UobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgLy8gaWYgKHRoaXMuaW1hZ2VOYW1lQXJyLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgIC8vICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIC8vICAgICByZXR1cm4gdGhpcy5pbWFnZUFycltuYW1lXTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gYGltZy8ke25hbWV9LnBuZ2A7XG5cbiAgICAgICAgLy8gdGhpcy5pbWFnZU5hbWVBcnIucHVzaChuYW1lKTtcbiAgICAgICAgLy8gdGhpcy5pbWFnZUFyci5wdXNoKGltZyk7XG5cbiAgICAgICAgcmV0dXJuIGltZztcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgTGV2ZWxCdWlsZGVyIH0gZnJvbSBcIi4vYnVpbGRlci9pbmRleFwiO1xuaW1wb3J0IHsgQ2FudmFzQ29udGV4dFByb3ZpZGVyIH0gZnJvbSBcIi4vY29udGV4dC9pbmRleFwiO1xuaW1wb3J0IHsgRG9tU291cmNlIH0gZnJvbSBcIi4vZG9tL2luZGV4XCI7XG5pbXBvcnQgeyBDYW52YXNEcmF3ZXIgfSBmcm9tIFwiLi9kcmF3ZXIvaW5kZXhcIjtcbmltcG9ydCB7IFNhcHBlciB9IGZyb20gXCIuL2dhbWUvaW5kZXhcIjtcbmltcG9ydCB7IEdlbmVyYXRvciB9IGZyb20gXCIuL2dlbmVyYXRvci9pbmRleFwiO1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tIFwiLi9zZXR0aW5ncy9pbmRleFwiO1xuaW1wb3J0IHsgRmlsZVNvdXJjZSB9IGZyb20gXCIuL3NvdXJjZS9pbmRleFwiO1xuXG5pbXBvcnQgXCIuL2luZGV4LnNjc3NcIjtcblxuY29uc3QgcGl4ZWxSYXRpb1NvdXJjZSA9IHtcbiAgICBkZXZpY2VQaXhlbFJhdGlvOiAxLFxufVxuXG5jb25zdCBmaWxlUHJvdmlkZXIgPSBuZXcgRmlsZVNvdXJjZSgpO1xuY29uc3QgZG9tU291cmNlID0gbmV3IERvbVNvdXJjZSh3aW5kb3cpO1xuY29uc3QgY29udGV4dFByb3ZpZGVyID0gbmV3IENhbnZhc0NvbnRleHRQcm92aWRlcihkb21Tb3VyY2UsIHBpeGVsUmF0aW9Tb3VyY2UsIHNldHRpbmdzKTtcbmNvbnN0IGRyYXdlciA9IG5ldyBDYW52YXNEcmF3ZXIoY29udGV4dFByb3ZpZGVyLCBmaWxlUHJvdmlkZXIpO1xuY29uc3QgZ2VuZXJhdG9yID0gbmV3IEdlbmVyYXRvcihNYXRoLnJhbmRvbSwgTWF0aC5mbG9vcik7XG5jb25zdCBidWlsZGVyID0gbmV3IExldmVsQnVpbGRlcihnZW5lcmF0b3IpO1xuY29uc3Qgc2FwcGVyID0gbmV3IFNhcHBlcihzZXR0aW5ncywgY29udGV4dFByb3ZpZGVyLCBkcmF3ZXIsIGRvbVNvdXJjZSwgYnVpbGRlciwgZ2VuZXJhdG9yKTtcblxuc2FwcGVyLmluaXQoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=