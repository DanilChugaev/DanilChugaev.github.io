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
        };
        var bombPositions = this.generateRandomBombPositions(this.fieldSize * this.fieldSize);
        for (var y = 0; y < this.fieldSize; y++) {
            for (var x = 0; x < this.fieldSize; x++) {
                var row = y;
                var cell = x;
                if (!mapStructure.cells[row]) {
                    mapStructure.cells[row] = {};
                }
                var hasBomb = bombPositions.includes(x + y * this.fieldSize);
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
                    cellStructure.value = this.calcBombsAroundCells(area, bombPositions);
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
        this.gameContainer = null;
        this.canvas = null;
        this.select = elementSource.getElement('select-level');
        this.button = elementSource.getElement('start-game');
        this.gameContainer = elementSource.getElement('game-container');
        this.canvas = elementSource.getElement('canvas');
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
            // рисуем все остальные бомбы на синем фоне
            // стопорим игру
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
    Sapper.prototype.calcPixelWidth = function (x) {
        return Number(x) * this.cellSize.width;
    };
    Sapper.prototype.calcPixelHeight = function (y) {
        return Number(y) * this.cellSize.height;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7QUFDNUMsSUFBTSxNQUFNLEdBQUcsSUFBSSwrQ0FBTSxDQUFDLHFEQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRTVGLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NhcHBlci8uL3NyYy9pbWcvYm9tYi5wbmciLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2ltZy9mbGFnLnBuZyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW5kZXguc2Nzcz8yMDZmIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9idWlsZGVyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvYnVpbGRlci9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvY29udGV4dC9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZG9tL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kcmF3ZXIvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kcmF3ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dhbWUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dlbmVyYXRvci9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc2V0dGluZ3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3NldHRpbmdzL2xldmVscy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc291cmNlL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9ib21iLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvZmxhZy5wbmdcIjsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBBcmVhU3RydWN0dXJlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiDQntGC0L3QvtGB0LjRgtC10LvRjNC90YvQtSDQutC+0L7RgNC00LjQvdCw0YLRiyDRgdC+0YHQtdC00L3QuNGFINGP0YfQtdC10Log0L7QsdC70LDRgdGC0LhcbiAqIFxuICogIzEjMiMzI1xuICogIzgtKy00I1xuICogIzcjNiM1I1xuICovXG5leHBvcnQgY29uc3QgQVJFQV9TVFJVQ1RVUkU6IEFyZWFTdHJ1Y3R1cmUgPSB7XG4gICAgMDogeyB4OiAtMSwgeTogLTEgfSxcbiAgICAxOiB7IHg6IDAsIHk6IC0xIH0sXG4gICAgMjogeyB4OiAxLCB5OiAtMSB9LFxuICAgIDM6IHsgeDogMSwgeTogMCB9LFxuICAgIDQ6IHsgeDogMSwgeTogMSB9LFxuICAgIDU6IHsgeDogMCwgeTogMSB9LFxuICAgIDY6IHsgeDogLTEsIHk6IDEgfSxcbiAgICA3OiB7IHg6IC0xLCB5OiAwIH0sXG59IiwiaW1wb3J0IHsgQ29tcGxleGl0eSwgQ29tcGxleGl0eUxpc3QsIEdhbWVTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5ncy90eXBlc1wiO1xuaW1wb3J0IHsgQXJlYVN0cnVjdHVyZSwgTWFwU3RydWN0dXJlLCBTeXN0ZW1CdWlsZGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IEFSRUFfU1RSVUNUVVJFIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBNYXRoR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2dlbmVyYXRvci90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTGV2ZWxCdWlsZGVyIGltcGxlbWVudHMgU3lzdGVtQnVpbGRlciB7XG4gICAgcHJpdmF0ZSBmaWVsZFNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIGJvbWJDb3VudDogbnVtYmVyO1xuICAgIHByaXZhdGUgY2FudmFzU2l6ZTogU2l6ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGdlbmVyYXRvcjogTWF0aEdlbmVyYXRvcixcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiDQkdC40LvQtNC40YIg0YPRgNC+0LLQtdC90YxcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0dhbWVTZXR0aW5nc30gc2V0dGluZ3MgLSDQvdCw0YHRgtGA0L7QudC60Lgg0LjQs9GA0YtcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7TWFwU3RydWN0dXJlfVxuICAgICAqL1xuICAgIHB1YmxpYyBidWlsZChzZXR0aW5nczogR2FtZVNldHRpbmdzKTogTWFwU3RydWN0dXJlIHtcbiAgICAgICAgY29uc3QgeyBmaWVsZFNpemUsIGJvbWJDb3VudCB9ID0gdGhpcy5nZXRTZWxlY3RlZExldmVsKHNldHRpbmdzLmxldmVscyk7XG5cbiAgICAgICAgdGhpcy5maWVsZFNpemUgPSBmaWVsZFNpemU7XG4gICAgICAgIHRoaXMuYm9tYkNvdW50ID0gYm9tYkNvdW50O1xuICAgICAgICB0aGlzLmNhbnZhc1NpemUgPSBzZXR0aW5ncy5jYW52YXNTaXplO1xuXG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2VuZXJhdGVNYXBTdHJ1Y3R1cmUoKTtcblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINCy0YvQsdGA0LDQvdC90YvQuSDRg9GA0L7QstC10L3RjCDRgdC70L7QttC90L7RgdGC0Lgg0LjQtyDRgdC/0LjRgdC60LBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBsZXhpdHlMaXN0fSBsZXZlbHMgLSDRgdC/0LjRgdC+0Log0YPRgNC+0LLQvdC10Lkg0YHQu9C+0LbQvdC+0YHRgtC4XG4gICAgICogXG4gICAgICogQHJldHVybnMge0NvbXBsZXhpdHl9XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZExldmVsKGxldmVsczogQ29tcGxleGl0eUxpc3QpOiBDb21wbGV4aXR5IHtcbiAgICAgICAgbGV0IHNlbGVjdGVkTGV2ZWw6IENvbXBsZXhpdHk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGxldmVscykge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKGxldmVsc1trZXldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTGV2ZWwgPSBsZXZlbHNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZExldmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCT0LXQvdC10YDQuNGA0YPQtdGCINGB0YLRgNGD0LrRgtGD0YDRgyDQv9C+0LvRjyDQtNC70Y8g0LLRi9Cx0YDQsNC90L3QvtCz0L4g0YPRgNC+0LLQvdGPINGB0LvQvtC20L3QvtGB0YLQuFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U2l6ZX0gY2FudmFzU2l6ZSAtINGA0LDQt9C80LXRgCDQutCw0L3QstCw0YHQsCDQsiDQv9C40LrRgdC10LvRj9GFXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZpZWxkU2l6ZSAtINGA0LDQt9C80LXRgCDQuNCz0YDQvtCy0L7Qs9C+INC/0L7Qu9GPINCyINC60LvQtdGC0LrQsNGFXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJvbWJDb3VudCAtINC60L7Qu9C40YfQtdGB0YLQstC+INCx0L7QvNCxINC90LAg0LjQs9GA0L7QstC+0Lwg0L/QvtC70LVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7TWFwU3RydWN0dXJlfVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVNYXBTdHJ1Y3R1cmUoKTogTWFwU3RydWN0dXJlIHtcbiAgICAgICAgY29uc3QgbWFwU3RydWN0dXJlOiBNYXBTdHJ1Y3R1cmUgPSB7XG4gICAgICAgICAgICBwaXhlbHNDb3VudEluQ2VsbDogdGhpcy5jYW52YXNTaXplLndpZHRoIC8gdGhpcy5maWVsZFNpemUsXG4gICAgICAgICAgICBib21iQ291bnQ6IHRoaXMuYm9tYkNvdW50LFxuICAgICAgICAgICAgY2VsbHM6IHt9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGJvbWJQb3NpdGlvbnM6IG51bWJlcltdID0gdGhpcy5nZW5lcmF0ZVJhbmRvbUJvbWJQb3NpdGlvbnModGhpcy5maWVsZFNpemUgKiB0aGlzLmZpZWxkU2l6ZSk7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmZpZWxkU2l6ZTsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuZmllbGRTaXplOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3c6IG51bWJlciA9IHk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbDogbnVtYmVyID0geDtcblxuICAgICAgICAgICAgICAgIGlmICghbWFwU3RydWN0dXJlLmNlbGxzW3Jvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwU3RydWN0dXJlLmNlbGxzW3Jvd10gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgaGFzQm9tYjogYm9vbGVhbiA9IGJvbWJQb3NpdGlvbnMuaW5jbHVkZXMoeCArIHkgKiB0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJlYTogQXJlYVN0cnVjdHVyZSA9IHRoaXMuZ2VuZXJhdGVDZWxsQXJlYSh7IHgsIHkgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsU3RydWN0dXJlOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIHk6IHJvdywgXG4gICAgICAgICAgICAgICAgICAgIHg6IGNlbGwsXG4gICAgICAgICAgICAgICAgICAgIGFyZWEsXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGhhc0JvbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbFN0cnVjdHVyZS5oYXNCb21iID0gaGFzQm9tYjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjZWxsU3RydWN0dXJlLnZhbHVlID0gdGhpcy5jYWxjQm9tYnNBcm91bmRDZWxscyhhcmVhLCBib21iUG9zaXRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtYXBTdHJ1Y3R1cmUuY2VsbHNbcm93XVtjZWxsXSA9IGNlbGxTdHJ1Y3R1cmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhtYXBTdHJ1Y3R1cmUpO1xuXG4gICAgICAgIHJldHVybiBtYXBTdHJ1Y3R1cmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JPQtdC90LXRgNC40YDRg9C10YIg0L7QsdC70LDRgdGC0Ywg0Y/Rh9C10LXQuiDRgSDQuNGFINC60L7QvtGA0LTQuNC90LDRgtCw0LzQuCDQstC+0LrRgNGD0LMg0LLRi9Cx0YDQsNC90L3QvtC5INGP0YfQtdC50LrQuCDQvdCwINC+0YHQvdC+0LLQtSDQtdC1INC60L7QvtGA0LTQuNC90LDRglxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0g0LrQvtC+0YDQtNC40L3QsNGC0LAgJ3gnINGP0YfQtdC50LrQuFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0g0LrQvtC+0YDQtNC40L3QsNGC0LAgJ3knINGP0YfQtdC50LrQuFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtBcmVhU3RydWN0dXJlfVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVDZWxsQXJlYSh7IHgsIHkgfTogQ2VsbCk6IEFyZWFTdHJ1Y3R1cmUge1xuICAgICAgICBjb25zdCBhcmVhOiBBcmVhU3RydWN0dXJlID0ge307XG4gICAgXG4gICAgICAgIC8vIDggLSDQutC+0LvQuNGH0LXRgdGC0LLQviDRj9GH0LXQtdC6INCy0L7QutGA0YPQsyDRhtC10L3RgtGA0LDQu9GM0L3QvtC5XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA4OyBpbmRleCsrKSB7XG4gICAgICAgICAgICAvKiog0J/RgNC+0LLQtdGA0Y/QtdC8LCDQvdC1INCy0YvRhdC+0LTQuNGCINC70Lgg0Y/Rh9C10LnQutCwINC30LAg0LvQtdCy0YPRjiDQuCDQstC10YDRhdC90Y7RjiDQs9GA0LDQvdC40YbRiyDQv9C+0LvRjyAqL1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCA8IDAgfHwgeSArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS55IDwgMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiog0J/RgNC+0LLQtdGA0Y/QtdC8LCDQvdC1INCy0YvRhdC+0LTQuNGCINC70Lgg0Y/Rh9C10LnQutCwINC30LAg0L/RgNCw0LLRg9GOINC4INC90LjQttC90Y7RjiDQs9GA0LDQvdC40YbRiyDQv9C+0LvRjyAqL1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCA+PSB0aGlzLmZpZWxkU2l6ZSB8fCB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnkgPj0gdGhpcy5maWVsZFNpemUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgYXJlYVtpbmRleF0gPSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHg6IHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCxcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgeTogeSArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS55LFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JPQtdC90LXRgNC40YDRg9C10YIg0YDQsNC90LTQvtC80L3Ri9C1INC/0L7Qt9C40YbQuNC4INC00LvRjyDRgNCw0YHQv9C+0LvQvtC20LXQvdC40Y8g0LHQvtC80LEg0L3QsCDQv9C+0LvQtVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjZWxsc0NvdW50IC0g0LrQvtC70LjRh9C10YHRgtCy0L4g0Y/Rh9C10LXQuiDQvdCwINC/0L7Qu9C1XG4gICAgICogXG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVSYW5kb21Cb21iUG9zaXRpb25zKGNlbGxzQ291bnQ6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICAgICAgY29uc3QgYm9tYlBvc2l0aW9uczogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5ib21iQ291bnQ7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCByYW5kb21Qb3NpdGlvbjogbnVtYmVyID0gdGhpcy5nZW5lcmF0b3IuZ2V0UmFuZG9tQXJiaXRyYXJ5KDEsIGNlbGxzQ291bnQpO1xuXG4gICAgICAgICAgICB3aGlsZSAoYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyhyYW5kb21Qb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICByYW5kb21Qb3NpdGlvbiA9IHRoaXMuZ2VuZXJhdG9yLmdldFJhbmRvbUFyYml0cmFyeSgxLCBjZWxsc0NvdW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYm9tYlBvc2l0aW9ucy5wdXNoKHJhbmRvbVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib21iUG9zaXRpb25zLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodGH0LjRgtCw0LXRgiDQutC+0LvQuNGH0LXRgdGC0LLQviDQsdC+0LzQsSDQstC+0LrRgNGD0LMg0Y/Rh9C10LnQutC4XG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcmVhU3RydWN0dXJlfSBhcmVhXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gYm9tYlBvc2l0aW9uc1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjQm9tYnNBcm91bmRDZWxscyhhcmVhOiBBcmVhU3RydWN0dXJlLCBib21iUG9zaXRpb25zOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZWEpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBhcmVhW2tleV07XG5cbiAgICAgICAgICAgIGlmIChib21iUG9zaXRpb25zLmluY2x1ZGVzKGNlbGwueCArIGNlbGwueSAqIHRoaXMuZmllbGRTaXplKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59IiwiaW1wb3J0IHsgRWxlbWVudFNvdXJjZSwgUGl4ZWxSYXRpb1NvdXJjZSB9IGZyb20gXCIuLi9kb20vdHlwZXNcIjtcbmltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5ncy90eXBlc1wiO1xuaW1wb3J0IHsgRHJhd2luZ0NvbnRleHQsIERyYXdpbmdDb250ZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzQ29udGV4dFByb3ZpZGVyIGltcGxlbWVudHMgRHJhd2luZ0NvbnRleHRQcm92aWRlciB7XG4gICAgcHJpdmF0ZSBjYW52YXM6IE51bGxhYmxlPEhUTUxDYW52YXNFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBjb250ZXh0OiBOdWxsYWJsZTxEcmF3aW5nQ29udGV4dD4gPSBudWxsO1xuICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZWxlbWVudFNvdXJjZTogRWxlbWVudFNvdXJjZSxcbiAgICAgIHByaXZhdGUgcGl4ZWxSYXRpb1NvdXJjZTogUGl4ZWxSYXRpb1NvdXJjZSxcbiAgICAgIHByaXZhdGUgc2V0dGluZ3M6IEdhbWVTZXR0aW5nc1xuICAgICkge1xuICAgICAgY29uc3QgY2FudmFzID0gdGhpcy5lbGVtZW50U291cmNlLmdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBpZiAoIWNhbnZhcykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgYSBjYW52YXMuXCIpO1xuICBcbiAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgdGhpcy5ub3JtYWxpemVTY2FsZSgpO1xuICAgIH1cbiAgXG4gICAgcHVibGljIGdldEluc3RhbmNlKCk6IERyYXdpbmdDb250ZXh0IHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGxpc3RlbkNhbnZhc0NsaWNrKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbGxiYWNrKTtcbiAgICB9XG4gIFxuICAgIHByaXZhdGUgbm9ybWFsaXplU2NhbGUoKTogdm9pZCB7XG4gICAgICBpZiAoIXRoaXMuY2FudmFzIHx8ICF0aGlzLmNvbnRleHQpIHJldHVybjtcbiAgXG4gICAgICBjb25zdCByYXRpbyA9IHRoaXMucGl4ZWxSYXRpb1NvdXJjZS5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuc2V0dGluZ3MuY2FudmFzU2l6ZTtcbiAgXG4gICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoICogcmF0aW87XG4gICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiByYXRpbztcbiAgXG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gIFxuICAgICAgdGhpcy5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jb250ZXh0LnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gICAgfVxuICB9IiwiaW1wb3J0IHsgRWxlbWVudFNvdXJjZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBEb21Tb3VyY2UgaW1wbGVtZW50cyBFbGVtZW50U291cmNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3aW5kb3c6IFdpbmRvdykge31cblxuICBwdWJsaWMgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcpOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4ge1xuICAgIHJldHVybiB0aGlzLndpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldEVsZW1lbnQoaWQ6IHN0cmluZyk6IE51bGxhYmxlPEhUTUxFbGVtZW50PiB7XG4gICAgcmV0dXJuIHRoaXMud2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgfVxuXG4gIHB1YmxpYyBhZnRlckxvYWQoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy53aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxufSIsImV4cG9ydCBjb25zdCBERUZBVUxUX0NPTE9SOiBDb2xvciA9ICcjMDAwMDAwJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX1dJRFRIOiBMZW5ndGggPSAxO1xuZXhwb3J0IGNvbnN0IE1BSU5fQkdfQ09MT1I6IENvbG9yID0gJyMyMTIxMjEnO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfRklFTERfQkdfQ09MT1I6IENvbG9yID0gJyM2NjY2RkYnO1xuZXhwb3J0IGNvbnN0IFRFWFRfQ09MT1I6IENvbG9yID0gJ3doaXRlJzsiLCJpbXBvcnQgeyBEcmF3aW5nQ29udGV4dCwgRHJhd2luZ0NvbnRleHRQcm92aWRlciB9IGZyb20gXCIuLi9jb250ZXh0L3R5cGVzXCI7XG5pbXBvcnQgeyBTb3VyY2VQcm92aWRlciB9IGZyb20gXCIuLi9zb3VyY2UvdHlwZXNcIjtcbmltcG9ydCB7IERFRkFVTFRfQ09MT1IsIERFRkFVTFRfV0lEVEgsIE1BSU5fQkdfQ09MT1IsIElOSVRJQUxfRklFTERfQkdfQ09MT1IsIFRFWFRfQ09MT1IgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IEJydXNoU2V0dGluZ3MsIERyYXdlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNEcmF3ZXIgaW1wbGVtZW50cyBEcmF3ZXIge1xuICAgIHByaXZhdGUgY29udGV4dDogRHJhd2luZ0NvbnRleHQgPSBudWxsO1xuICAgIHByaXZhdGUgYm9tYjogYW55O1xuICAgIHByaXZhdGUgZmxhZzogYW55O1xuICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgY29udGV4dFByb3ZpZGVyOiBEcmF3aW5nQ29udGV4dFByb3ZpZGVyLFxuICAgICAgcHJpdmF0ZSBmaWxlUHJvdmlkZXI6IFNvdXJjZVByb3ZpZGVyXG4gICAgKSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNvbnRleHRQcm92aWRlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgaWYgKCF0aGlzLmNvbnRleHQpIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBhY2Nlc3MgdGhlIGRyYXdpbmcgY29udGV4dC5cIik7XG5cbiAgICAgIHRoaXMuYm9tYiA9IGZpbGVQcm92aWRlci5nZXRJbWFnZSgnYm9tYicpO1xuICAgICAgdGhpcy5mbGFnID0gZmlsZVByb3ZpZGVyLmdldEltYWdlKCdmbGFnJyk7XG4gICAgfVxuICBcbiAgICBwdWJsaWMgZHJhd0xpbmUoXG4gICAgICB7IHN0YXJ0LCBlbmQgfTogTGluZSxcbiAgICAgIHsgY29sb3IsIHdpZHRoIH06IEJydXNoU2V0dGluZ3MgPSB7fVxuICAgICk6IHZvaWQge1xuICAgICAgaWYgKCF0aGlzLmNvbnRleHQpIHJldHVybjtcbiAgXG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvciA/PyBERUZBVUxUX0NPTE9SO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHdpZHRoID8/IERFRkFVTFRfV0lEVEg7XG4gIFxuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhzdGFydC54LCBzdGFydC55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oZW5kLngsIGVuZC55KTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhd1NxdWFyZSh7IHgsIHkgfTogQ2VsbCwgeyB3aWR0aCwgaGVpZ2h0IH06IFNpemUsIGNvbG9yPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICBpZiAoIXRoaXMuY29udGV4dCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3IgPyBjb2xvciA6IElOSVRJQUxfRklFTERfQkdfQ09MT1I7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodClcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhd051bWJlcih7IHgsIHkgfTogQ2VsbCwgeyB3aWR0aCwgaGVpZ2h0IH06IFNpemUsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd1NxdWFyZSh7IHgsIHkgfSwgeyB3aWR0aCwgaGVpZ2h0IH0sIE1BSU5fQkdfQ09MT1IpO1xuICAgICAgLy8gdGhpcy5kcmF3Qm9yZGVycyh7IHgsIHkgfSwgeyB3aWR0aCwgaGVpZ2h0IH0sICdsaWdodGdyZXknKVxuICAgICAgLy8g0L3QsNGA0LjRgdC+0LLQsNGC0Ywg0LHQvtGA0LTQtdGA0YtcblxuICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgJHtoZWlnaHQgLyAyfXB4IEFyaWFsYDtcblx0XHQgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBURVhUX0NPTE9SO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFN0cmluZyh2YWx1ZSksIHggKyAod2lkdGggLyAyLjUpLCB5ICsgKGhlaWdodCAvIDEuNSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3Qm9tYih7IHgsIHkgfTogQ2VsbCwgeyB3aWR0aCwgaGVpZ2h0IH06IFNpemUpOiB2b2lkIHtcbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5ib21iLCB4ICsgKHdpZHRoIC8gNCksIHkgKyAoaGVpZ2h0IC8gNCksIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBkcmF3Qm9yZGVycyh7IHgsIHkgfTogQ2VsbCwgeyB3aWR0aCwgaGVpZ2h0IH06IFNpemUsIGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyAgIHRoaXMuZHJhd0xpbmUoe1xuICAgIC8vICAgICBzdGFydDoge1xuICAgIC8vICAgICAgIHg6IHgsXG4gICAgLy8gICAgICAgeTogeSxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgZW5kOiB7XG4gICAgLy8gICAgICAgeDogeCArIHdpZHRoLFxuICAgIC8vICAgICAgIHk6IHksXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICB9LCB7IGNvbG9yIH0pXG4gICAgLy8gfVxuICB9IiwiaW1wb3J0IHsgTWFwU3RydWN0dXJlLCBTeXN0ZW1CdWlsZGVyIH0gZnJvbSAnLi4vYnVpbGRlci90eXBlcyc7XG5pbXBvcnQgeyBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC90eXBlcyc7XG5pbXBvcnQgeyBFbGVtZW50U291cmNlIH0gZnJvbSAnLi4vZG9tL3R5cGVzJztcbmltcG9ydCB7IE1BSU5fQkdfQ09MT1IgfSBmcm9tICcuLi9kcmF3ZXIvY29uc3RhbnRzJztcbmltcG9ydCB7IERyYXdlciB9IGZyb20gJy4uL2RyYXdlci90eXBlcyc7XG5pbXBvcnQgeyBNYXRoR2VuZXJhdG9yIH0gZnJvbSAnLi4vZ2VuZXJhdG9yL3R5cGVzJztcbmltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3R5cGVzJztcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgU2FwcGVyIGltcGxlbWVudHMgR2FtZSB7XG4gICAgcHJpdmF0ZSBzZWxlY3Q6IE51bGxhYmxlPEhUTUxTZWxlY3RFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBidXR0b246IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBnYW1lQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgY2FudmFzOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgc3lzdGVtOiBNYXBTdHJ1Y3R1cmU7XG4gICAgcHJpdmF0ZSBjZWxsU2l6ZTogU2l6ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNldHRpbmdzOiBHYW1lU2V0dGluZ3MsXG4gICAgICAgIHByaXZhdGUgY29udGV4dFByb3ZpZGVyOiBEcmF3aW5nQ29udGV4dFByb3ZpZGVyLFxuICAgICAgICBwcml2YXRlIGRyYXdlcjogRHJhd2VyLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRTb3VyY2U6IEVsZW1lbnRTb3VyY2UsXG4gICAgICAgIHByaXZhdGUgYnVpbGRlcjogU3lzdGVtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0b3I6IE1hdGhHZW5lcmF0b3IsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ID0gPEhUTUxTZWxlY3RFbGVtZW50PmVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnc2VsZWN0LWxldmVsJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdzdGFydC1nYW1lJyk7XG4gICAgICAgIHRoaXMuZ2FtZUNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnZ2FtZS1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9C40YDRg9C10Lwg0LTQsNC90L3Ri9C1INC40LPRgNGLXG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFNvdXJjZS5hZnRlckxvYWQoKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2V0dGluZ3MubGV2ZWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gPEhUTUxPcHRpb25FbGVtZW50PnRoaXMuZWxlbWVudFNvdXJjZS5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGtleTtcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBrZXk7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRoaXMuc2V0dGluZ3MubGV2ZWxzW2tleV0uc2VsZWN0ZWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUxldmVsLmJpbmQodGhpcyksIGZhbHNlKTtcblxuICAgICAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN0YXJ0LmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KHRgtCw0YDRgtGD0LXQvCDQuNCz0YDRg1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3lzdGVtID0gdGhpcy5idWlsZGVyLmJ1aWxkKHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLmNlbGxTaXplID0ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuc3lzdGVtLnBpeGVsc0NvdW50SW5DZWxsLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbCxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5nZVZpc2liaWxpdHlFbGVtZW50cygpO1xuICAgICAgICB0aGlzLm1ha2VJbml0aWFsRmlsbCgpO1xuICAgICAgICB0aGlzLmNvbnRleHRQcm92aWRlci5saXN0ZW5DYW52YXNDbGljayh0aGlzLmNoZWNrQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JzQtdC90Y/QtdGCINGD0YDQvtCy0LXQvdGMINC/0L7RgdC70LUg0YHQvNC10L3RiyDQsiDRgdC10LvQtdC60YLQtVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRE9NINGB0L7QsdGL0YLQuNC1XG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VMZXZlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2V0dGluZ3MubGV2ZWxzKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmxldmVsc1trZXldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2V0dGluZ3MubGV2ZWxzW2V2ZW50LnRhcmdldC52YWx1ZV0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCc0LXQvdGP0LXRgiDQstC40LTQuNC80L7RgdGC0Ywg0LjQs9GA0L7QstGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlVmlzaWJpbGl0eUVsZW1lbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLnNlbGVjdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLmdhbWVDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JfQsNC/0L7Qu9C90Y/QtdGCINCy0LXRgdGMINC60LDQvdCy0LDRgSDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZUluaXRpYWxGaWxsKCkge1xuICAgICAgICBjb25zdCBzaXplOiBTaXplID0gdGhpcy5zZXR0aW5ncy5jYW52YXNTaXplO1xuXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdTcXVhcmUoe1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sIHNpemUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tDbGljayh7IG9mZnNldFgsIG9mZnNldFkgfTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjZWxsQ29vcmQ6IENlbGwgPSB0aGlzLmdldENlbGwob2Zmc2V0WCwgb2Zmc2V0WSk7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLnN5c3RlbS5jZWxsc1tjZWxsQ29vcmQueV1bY2VsbENvb3JkLnhdO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNlbGwuaGFzQm9tYikge1xuICAgICAgICAgICAgLy8g0YDQuNGB0YPQtdC8INCx0L7QvNCx0YMg0LIg0YPQutCw0LfQsNC90L3QvtC5INC60LvQtdGC0LrQtVxuICAgICAgICAgICAgdGhpcy5vcGVuQm9tYkNlbGwoY2VsbCk7XG4gICAgICAgICAgICAvLyDRgNC40YHRg9C10Lwg0LLRgdC1INC+0YHRgtCw0LvRjNC90YvQtSDQsdC+0LzQsdGLINC90LAg0YHQuNC90LXQvCDRhNC+0L3QtVxuICAgICAgICAgICAgLy8g0YHRgtC+0L/QvtGA0LjQvCDQuNCz0YDRg1xuICAgICAgICB9IGVsc2UgaWYgKGNlbGwudmFsdWUgIT09IDApIHtcbiAgICAgICAgICAgIC8vINGA0LjRgdGD0LXQvCDQutC70LXRgtC60YMg0YEg0YbQuNGE0YDQvtC5XG4gICAgICAgICAgICB0aGlzLm9wZW5OdW1iZXJTcXVhcmUoY2VsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDRgNC40YHRg9C10Lwg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1xuICAgICAgICAgICAgdGhpcy5vcGVuRW1wdHlTcXVhcmUoY2VsbCk7XG4gICAgICAgICAgICAvLyDQv9GA0L7RhdC+0LTQuNC80YHRjyDQv9C+INGB0L7RgdC10LTRj9C8INC4INGA0LjRgdGD0LXQvCDQutC70LXRgtC60Lgg0LTQviDRgtC+0LPQviDQvNC+0LzQtdC90YLQsCwg0L/QvtC60LAg0L3QtSDQv9C+0Y/QstC40YLRgdGPINCyINC60LvQtdGC0LrQtSDRhtC40YTRgNCwXG4gICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZU9wZW5BcmVhKGNlbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDZWxsKG9mZnNldFg6IG51bWJlciwgb2Zmc2V0WTogbnVtYmVyKTogQ2VsbCB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLmdlbmVyYXRvci5nZXRGbG9vck51bWJlcihvZmZzZXRYIC8gdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwpLFxuICAgICAgICAgICAgeTogdGhpcy5nZW5lcmF0b3IuZ2V0Rmxvb3JOdW1iZXIob2Zmc2V0WSAvIHRoaXMuc3lzdGVtLnBpeGVsc0NvdW50SW5DZWxsKSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVjdXJzaXZlT3BlbkFyZWEoY2VsbDogYW55KSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4IGluIGNlbGwuYXJlYSkge1xuICAgICAgICAgICAgY29uc3Qgc3lzdGVtQ2VsbCA9IHRoaXMuc3lzdGVtLmNlbGxzW2NlbGwuYXJlYVtpbmRleF0ueV1bY2VsbC5hcmVhW2luZGV4XS54XTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzeXN0ZW1DZWxsLmlzT3BlbiAmJiBzeXN0ZW1DZWxsLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3lzdGVtQ2VsbC52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5FbXB0eVNxdWFyZShzeXN0ZW1DZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVPcGVuQXJlYShzeXN0ZW1DZWxsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5OdW1iZXJTcXVhcmUoc3lzdGVtQ2VsbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5FbXB0eVNxdWFyZShjZWxsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd1NxdWFyZSh7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbFdpZHRoKGNlbGwueCksXG4gICAgICAgICAgICB5OiB0aGlzLmNhbGNQaXhlbEhlaWdodChjZWxsLnkpLFxuICAgICAgICB9LCB0aGlzLmNlbGxTaXplLCBNQUlOX0JHX0NPTE9SKTtcblxuICAgICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuTnVtYmVyU3F1YXJlKGNlbGw6IGFueSkge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3TnVtYmVyKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsV2lkdGgoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsSGVpZ2h0KGNlbGwueSksXG4gICAgICAgIH0sIHRoaXMuY2VsbFNpemUsIGNlbGwudmFsdWUpO1xuXG4gICAgICAgIGNlbGwuaXNPcGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5Cb21iQ2VsbChjZWxsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd0JvbWIoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxXaWR0aChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxIZWlnaHQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsU2l6ZSk7XG5cbiAgICAgICAgY2VsbC5pc09wZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY1BpeGVsV2lkdGgoeDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoeCkgKiB0aGlzLmNlbGxTaXplLndpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY1BpeGVsSGVpZ2h0KHk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHkpICogdGhpcy5jZWxsU2l6ZS5oZWlnaHQ7XG4gICAgfVxufSIsImltcG9ydCB7IE1hdGhHZW5lcmF0b3IgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yIGltcGxlbWVudHMgTWF0aEdlbmVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZ2V0UmFuZG9tOiBGdW5jdGlvbixcbiAgICAgICAgcHJpdmF0ZSBnZXRGbG9vcjogRnVuY3Rpb24sXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YDQsNC90LTQvtC80L3QvtC1INGG0LXQu9C+0LUg0YfQuNGB0LvQviDQsiDQvtC/0YDQtdC00LXQu9C10L3QvdC+0Lwg0L/RgNC+0LzQtdC20YPRgtC60LVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluIC0g0LzQuNC90LjQvNCw0LvRjNC90L7QtSDRh9C40YHQu9C+INC/0YDQvtC80LXQttGD0YLQutCwXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heCAtINC80LDQutGB0LjQvNCw0LvRjNC90L7QtSDRh9C40YHQu9C+INC/0YDQvtC80LXQttGD0YLQutCwXG4gICAgICogXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmFuZG9tQXJiaXRyYXJ5KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZsb29yTnVtYmVyKHRoaXMuZ2V0UmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J7QutGA0YPQs9C70Y/QtdGCINGH0LjRgdC70L4g0LTQviDRhtC10LvQvtCz0L5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbiAtINC40YHRhdC+0LTQvdC+0LUg0YfQuNGB0LvQvlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgIHB1YmxpYyBnZXRGbG9vck51bWJlcihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGbG9vcihuKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgR2FtZVNldHRpbmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGxldmVscyB9IGZyb20gXCIuL2xldmVsc1wiO1xuXG4vKiog0J7RgdC90L7QstC90YvQtSDQvdCw0YHRgtGA0L7QudC60Lgg0LjQs9GA0YsgKi9cbmV4cG9ydCBjb25zdCBzZXR0aW5nczogR2FtZVNldHRpbmdzID0ge1xuICAgIGNhbnZhc1NpemU6IHtcbiAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgfSxcbiAgICBsZXZlbHMsXG59IiwiaW1wb3J0IHsgQ29tcGxleGl0eUxpc3QgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKiog0KHQv9C40YHQvtC6INGD0YDQvtCy0L3QtdC5INGB0LvQvtC20L3QvtGB0YLQuCDQuNCz0YDRiyAqL1xuZXhwb3J0IGNvbnN0IGxldmVsczogQ29tcGxleGl0eUxpc3QgPSB7XG4gICAgYmVnaW5uZXI6IHtcbiAgICAgICAgbmFtZTogJ2JlZ2lubmVyJyxcbiAgICAgICAgYm9tYkNvdW50OiAxMCxcbiAgICAgICAgZmllbGRTaXplOiAyMCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZWFzeToge1xuICAgICAgICBuYW1lOiAnZWFzeScsXG4gICAgICAgIGJvbWJDb3VudDogMTUsXG4gICAgICAgIGZpZWxkU2l6ZTogMTAsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgIH0sXG4gICAgbWVkaXVtOiB7XG4gICAgICAgIG5hbWU6ICdtZWRpdW0nLFxuICAgICAgICBib21iQ291bnQ6IDQwLFxuICAgICAgICBmaWVsZFNpemU6IDEwLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbiAgICBoYXJkOiB7XG4gICAgICAgIG5hbWU6ICdoYXJkJyxcbiAgICAgICAgYm9tYkNvdW50OiAxMDAsXG4gICAgICAgIGZpZWxkU2l6ZTogMjAsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9LFxuICAgIGh1Z2U6IHtcbiAgICAgICAgbmFtZTogJ2h1Z2UnLFxuICAgICAgICBib21iQ291bnQ6IDIyMCxcbiAgICAgICAgZmllbGRTaXplOiAzMixcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZXh0cmVtZToge1xuICAgICAgICBuYW1lOiAnZXh0cmVtZScsXG4gICAgICAgIGJvbWJDb3VudDogMTUwLFxuICAgICAgICBmaWVsZFNpemU6IDIwLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbn0iLCJpbXBvcnQgeyBTb3VyY2VQcm92aWRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmltcG9ydCAnLi4vaW1nL2JvbWIucG5nJztcbmltcG9ydCAnLi4vaW1nL2ZsYWcucG5nJztcblxuZXhwb3J0IGNsYXNzIEZpbGVTb3VyY2UgaW1wbGVtZW50cyBTb3VyY2VQcm92aWRlciB7XG4gICAgcHJpdmF0ZSBpbWFnZU5hbWVBcnI6IHN0cmluZ1tdID0gW107XG4gICAgcHJpdmF0ZSBpbWFnZUFycjogYW55W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGdldEltYWdlKG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIC8vIGlmICh0aGlzLmltYWdlTmFtZUFyci5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAvLyAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuaW1hZ2VBcnJbbmFtZV07XG4gICAgICAgIC8vIH1cblxuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IGBpbWcvJHtuYW1lfS5wbmdgO1xuXG4gICAgICAgIC8vIHRoaXMuaW1hZ2VOYW1lQXJyLnB1c2gobmFtZSk7XG4gICAgICAgIC8vIHRoaXMuaW1hZ2VBcnIucHVzaChpbWcpO1xuXG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IExldmVsQnVpbGRlciB9IGZyb20gXCIuL2J1aWxkZXIvaW5kZXhcIjtcbmltcG9ydCB7IENhbnZhc0NvbnRleHRQcm92aWRlciB9IGZyb20gXCIuL2NvbnRleHQvaW5kZXhcIjtcbmltcG9ydCB7IERvbVNvdXJjZSB9IGZyb20gXCIuL2RvbS9pbmRleFwiO1xuaW1wb3J0IHsgQ2FudmFzRHJhd2VyIH0gZnJvbSBcIi4vZHJhd2VyL2luZGV4XCI7XG5pbXBvcnQgeyBTYXBwZXIgfSBmcm9tIFwiLi9nYW1lL2luZGV4XCI7XG5pbXBvcnQgeyBHZW5lcmF0b3IgfSBmcm9tIFwiLi9nZW5lcmF0b3IvaW5kZXhcIjtcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3MvaW5kZXhcIjtcbmltcG9ydCB7IEZpbGVTb3VyY2UgfSBmcm9tIFwiLi9zb3VyY2UvaW5kZXhcIjtcblxuaW1wb3J0IFwiLi9pbmRleC5zY3NzXCI7XG5cbmNvbnN0IHBpeGVsUmF0aW9Tb3VyY2UgPSB7XG4gICAgZGV2aWNlUGl4ZWxSYXRpbzogMSxcbn1cblxuY29uc3QgZmlsZVByb3ZpZGVyID0gbmV3IEZpbGVTb3VyY2UoKTtcbmNvbnN0IGRvbVNvdXJjZSA9IG5ldyBEb21Tb3VyY2Uod2luZG93KTtcbmNvbnN0IGNvbnRleHRQcm92aWRlciA9IG5ldyBDYW52YXNDb250ZXh0UHJvdmlkZXIoZG9tU291cmNlLCBwaXhlbFJhdGlvU291cmNlLCBzZXR0aW5ncyk7XG5jb25zdCBkcmF3ZXIgPSBuZXcgQ2FudmFzRHJhd2VyKGNvbnRleHRQcm92aWRlciwgZmlsZVByb3ZpZGVyKTtcbmNvbnN0IGdlbmVyYXRvciA9IG5ldyBHZW5lcmF0b3IoTWF0aC5yYW5kb20sIE1hdGguZmxvb3IpO1xuY29uc3QgYnVpbGRlciA9IG5ldyBMZXZlbEJ1aWxkZXIoZ2VuZXJhdG9yKTtcbmNvbnN0IHNhcHBlciA9IG5ldyBTYXBwZXIoc2V0dGluZ3MsIGNvbnRleHRQcm92aWRlciwgZHJhd2VyLCBkb21Tb3VyY2UsIGJ1aWxkZXIsIGdlbmVyYXRvcik7XG5cbnNhcHBlci5pbml0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9