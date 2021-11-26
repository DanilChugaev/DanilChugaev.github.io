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
            bombLeft: this.bombCount,
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
/* harmony export */   "TEXT_COLOR": () => (/* binding */ TEXT_COLOR),
/* harmony export */   "BORDER_COLOR": () => (/* binding */ BORDER_COLOR)
/* harmony export */ });
var DEFAULT_COLOR = '#000000';
var DEFAULT_WIDTH = 1;
var MAIN_BG_COLOR = '#212121';
var INITIAL_FIELD_BG_COLOR = '#6666FF';
var FLAG_BG_COLOR = 'lightgray';
var TEXT_COLOR = 'white';
var BORDER_COLOR = '#333333';


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
    CanvasDrawer.prototype.drawSquare = function (_a, _b, color, hasBorders) {
        var x = _a.x, y = _a.y;
        var width = _b.width, height = _b.height;
        if (hasBorders === void 0) { hasBorders = true; }
        if (!this.context)
            return;
        this.context.fillStyle = color ? color : _constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_FIELD_BG_COLOR;
        this.context.fillRect(x, y, width, height);
        if (hasBorders) {
            this.drawBorders({ x: x, y: y }, { width: width, height: height });
        }
    };
    CanvasDrawer.prototype.drawNumber = function (_a, _b, value) {
        var x = _a.x, y = _a.y;
        var width = _b.width, height = _b.height;
        this.drawSquare({ x: x, y: y }, { width: width, height: height }, _constants__WEBPACK_IMPORTED_MODULE_0__.MAIN_BG_COLOR);
        this.context.font = height / 2 + "px Arial";
        this.context.fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.TEXT_COLOR;
        this.context.fillText(String(value), x + (width / 2.5), y + (height / 1.5));
    };
    CanvasDrawer.prototype.drawBomb = function (_a, _b) {
        var x = _a.x, y = _a.y;
        var width = _b.width, height = _b.height;
        this.drawSquare({ x: x, y: y }, { width: width, height: height }, _constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_FIELD_BG_COLOR, false);
        this.context.drawImage(this.bomb, x + (width / 4), y + (height / 4), width / 2, height / 2);
    };
    CanvasDrawer.prototype.drawFlag = function (_a, _b) {
        var x = _a.x, y = _a.y;
        var width = _b.width, height = _b.height;
        this.drawSquare({ x: x, y: y }, { width: width, height: height }, _constants__WEBPACK_IMPORTED_MODULE_0__.FLAG_BG_COLOR, false);
        this.context.drawImage(this.flag, x + (width / 4), y + (height / 4), width / 2, height / 2);
    };
    CanvasDrawer.prototype.drawBorders = function (_a, _b) {
        var x = _a.x, y = _a.y;
        var width = _b.width, height = _b.height;
        this.context.strokeStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.BORDER_COLOR;
        this.context.strokeRect(x, y, width, height);
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
    function Sapper(settings, contextProvider, drawer, elementSource, builder, generator, storage) {
        this.settings = settings;
        this.contextProvider = contextProvider;
        this.drawer = drawer;
        this.elementSource = elementSource;
        this.builder = builder;
        this.generator = generator;
        this.storage = storage;
        this.select = null;
        this.button = null;
        this.resultContainer = null;
        this.winContainer = null;
        this.leftBombContainer = null;
        this.gameContainer = null;
        this.canvas = null;
        this.select = elementSource.getElement('select-level');
        this.button = elementSource.getElement('start-game');
        this.gameContainer = elementSource.getElement('game-container');
        this.canvas = elementSource.getElement('canvas');
        this.resultContainer = elementSource.getElement('result-container');
        this.winContainer = elementSource.getElement('win-container');
        this.leftBombContainer = elementSource.getElement('left-bomb');
    }
    /**
     * Инициализируем данные игры
     *
     * @returns {void}
     */
    Sapper.prototype.init = function () {
        var _this = this;
        this.elementSource.afterLoad(function (event) {
            // пробуем установить старый выбранный уровень
            var savedLevel = _this.storage.get('level');
            if (savedLevel) {
                _this.changeLevelInSettings(savedLevel);
            }
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
        this.leftBombContainer.textContent = this.system.bombLeft;
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
        // @ts-ignore
        this.changeLevelInSettings(event.target.value);
        this.storage.save({
            name: 'level',
            // @ts-ignore
            value: event.target.value,
        });
    };
    /**
     * Меняет уровень игры в настройках
     *
     * @param {string} value - выбранный уровень
     *
     * @returns {void}
     */
    Sapper.prototype.changeLevelInSettings = function (value) {
        for (var key in this.settings.levels) {
            // @ts-ignore
            this.settings.levels[key].selected = false;
        }
        // @ts-ignore
        this.settings.levels[value].selected = true;
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
        // чтобы нажать на клетку с флагом - его нужно сначала снять
        if (!cell.hasFlag) {
            if (cell.hasBomb) {
                this.openBombCell(cell); // рисуем бомбу в указанной клетке
                this.openAllBombs(); // рисуем все остальные бомбы
                this.stopGame(); // стопорим игру
            }
            else if (cell.value !== 0) {
                this.openNumberSquare(cell); // рисуем клетку с цифрой
            }
            else {
                this.openEmptySquare(cell); // рисуем пустую клетку
                this.recursiveOpenArea(cell); // проходимся по соседям и рисуем клетки до того момента, пока не появится в клетке цифра
            }
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
            /**
             * из обработки пропускаем:
             *  - открытую ячейку
             *  - ячейку с флагом
             *  - ячейку с бомбой
             */
            if (!systemCell.isOpen && !systemCell.hasFlag && !systemCell.hasBomb) {
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
        this.system.bombLeft = this.system.bombLeft - 1;
        this.leftBombContainer.textContent = this.system.bombLeft;
        // if (this.system.bombLeft === 0 && allBombsAreCorrectSelected) {
        //     this.stopGame(true);
        // }
    };
    Sapper.prototype.removeFlag = function (cell) {
        this.drawer.drawSquare({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize, _drawer_constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_FIELD_BG_COLOR, false);
        cell.hasFlag = false;
        this.system.bombLeft = this.system.bombLeft + 1;
        this.leftBombContainer.textContent = this.system.bombLeft;
    };
    Sapper.prototype.calcPixelWidth = function (x) {
        return Number(x) * this.cellSize.width;
    };
    Sapper.prototype.calcPixelHeight = function (y) {
        return Number(y) * this.cellSize.height;
    };
    Sapper.prototype.stopGame = function (isWin) {
        var _this = this;
        if (isWin === void 0) { isWin = false; }
        // показываем кнопку рестарта
        this.resultContainer.style.display = 'flex';
        if (isWin) {
            // если выиграли, показываем поздравления
            this.winContainer.style.display = 'flex';
        }
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
        fieldSize: 20,
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



/***/ }),

/***/ "./src/storage/index.ts":
/*!******************************!*\
  !*** ./src/storage/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataStorage": () => (/* binding */ DataStorage)
/* harmony export */ });
/** Долговременное хранилище данных игры */
var DataStorage = /** @class */ (function () {
    function DataStorage(storage) {
        this.storage = storage;
    }
    DataStorage.prototype.save = function (_a) {
        var name = _a.name, value = _a.value;
        this.storage.setItem(name, value);
    };
    DataStorage.prototype.get = function (name) {
        return this.storage.getItem(name);
    };
    return DataStorage;
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
/* harmony import */ var _storage_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./storage/index */ "./src/storage/index.ts");










var pixelRatioSource = {
    devicePixelRatio: 1,
};
var storage = new _storage_index__WEBPACK_IMPORTED_MODULE_9__.DataStorage(window.localStorage);
var fileProvider = new _source_index__WEBPACK_IMPORTED_MODULE_7__.FileSource();
var domSource = new _dom_index__WEBPACK_IMPORTED_MODULE_2__.DomSource(window);
var contextProvider = new _context_index__WEBPACK_IMPORTED_MODULE_1__.CanvasContextProvider(domSource, pixelRatioSource, _settings_index__WEBPACK_IMPORTED_MODULE_6__.settings);
var drawer = new _drawer_index__WEBPACK_IMPORTED_MODULE_3__.CanvasDrawer(contextProvider, fileProvider);
var generator = new _generator_index__WEBPACK_IMPORTED_MODULE_5__.Generator(Math.random, Math.floor);
var builder = new _builder_index__WEBPACK_IMPORTED_MODULE_0__.LevelBuilder(generator);
var sapper = new _game_index__WEBPACK_IMPORTED_MODULE_4__.Sapper(_settings_index__WEBPACK_IMPORTED_MODULE_6__.settings, contextProvider, drawer, domSource, builder, generator, storage);
sapper.init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sTUFBTSxHQUFHLElBQUksK0NBQU0sQ0FBQyxxREFBUSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFckcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2ltZy9ib21iLnBuZyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW1nL2ZsYWcucG5nIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9pbmRleC5zY3NzPzIwNmYiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2J1aWxkZXIvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9idWlsZGVyL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9jb250ZXh0L2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kb20vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2RyYXdlci9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2RyYXdlci9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZ2FtZS9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZ2VuZXJhdG9yL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9zZXR0aW5ncy9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc2V0dGluZ3MvbGV2ZWxzLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9zb3VyY2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3N0b3JhZ2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL2JvbWIucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9mbGFnLnBuZ1wiOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IEFyZWFTdHJ1Y3R1cmUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKipcbiAqINCe0YLQvdC+0YHQuNGC0LXQu9GM0L3Ri9C1INC60L7QvtGA0LTQuNC90LDRgtGLINGB0L7RgdC10LTQvdC40YUg0Y/Rh9C10LXQuiDQvtCx0LvQsNGB0YLQuFxuICogXG4gKiAjMSMyIzMjXG4gKiAjOC0rLTQjXG4gKiAjNyM2IzUjXG4gKi9cbmV4cG9ydCBjb25zdCBBUkVBX1NUUlVDVFVSRTogQXJlYVN0cnVjdHVyZSA9IHtcbiAgICAwOiB7IHg6IC0xLCB5OiAtMSB9LFxuICAgIDE6IHsgeDogMCwgeTogLTEgfSxcbiAgICAyOiB7IHg6IDEsIHk6IC0xIH0sXG4gICAgMzogeyB4OiAxLCB5OiAwIH0sXG4gICAgNDogeyB4OiAxLCB5OiAxIH0sXG4gICAgNTogeyB4OiAwLCB5OiAxIH0sXG4gICAgNjogeyB4OiAtMSwgeTogMSB9LFxuICAgIDc6IHsgeDogLTEsIHk6IDAgfSxcbn0iLCJpbXBvcnQgeyBDb21wbGV4aXR5LCBDb21wbGV4aXR5TGlzdCwgR2FtZVNldHRpbmdzIH0gZnJvbSBcIi4uL3NldHRpbmdzL3R5cGVzXCI7XG5pbXBvcnQgeyBBcmVhU3RydWN0dXJlLCBNYXBTdHJ1Y3R1cmUsIFN5c3RlbUJ1aWxkZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgQVJFQV9TVFJVQ1RVUkUgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IE1hdGhHZW5lcmF0b3IgfSBmcm9tIFwiLi4vZ2VuZXJhdG9yL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBMZXZlbEJ1aWxkZXIgaW1wbGVtZW50cyBTeXN0ZW1CdWlsZGVyIHtcbiAgICBwcml2YXRlIGZpZWxkU2l6ZTogbnVtYmVyO1xuICAgIHByaXZhdGUgYm9tYkNvdW50OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBjYW52YXNTaXplOiBTaXplO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZ2VuZXJhdG9yOiBNYXRoR2VuZXJhdG9yLFxuICAgICkge31cblxuICAgIC8qKlxuICAgICAqINCR0LjQu9C00LjRgiDRg9GA0L7QstC10L3RjFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7R2FtZVNldHRpbmdzfSBzZXR0aW5ncyAtINC90LDRgdGC0YDQvtC50LrQuCDQuNCz0YDRi1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtNYXBTdHJ1Y3R1cmV9XG4gICAgICovXG4gICAgcHVibGljIGJ1aWxkKHNldHRpbmdzOiBHYW1lU2V0dGluZ3MpOiBNYXBTdHJ1Y3R1cmUge1xuICAgICAgICBjb25zdCB7IGZpZWxkU2l6ZSwgYm9tYkNvdW50IH0gPSB0aGlzLmdldFNlbGVjdGVkTGV2ZWwoc2V0dGluZ3MubGV2ZWxzKTtcblxuICAgICAgICB0aGlzLmZpZWxkU2l6ZSA9IGZpZWxkU2l6ZTtcbiAgICAgICAgdGhpcy5ib21iQ291bnQgPSBib21iQ291bnQ7XG4gICAgICAgIHRoaXMuY2FudmFzU2l6ZSA9IHNldHRpbmdzLmNhbnZhc1NpemU7XG5cbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5nZW5lcmF0ZU1hcFN0cnVjdHVyZSgpO1xuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0LLRi9Cx0YDQsNC90L3Ri9C5INGD0YDQvtCy0LXQvdGMINGB0LvQvtC20L3QvtGB0YLQuCDQuNC3INGB0L/QuNGB0LrQsFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcGxleGl0eUxpc3R9IGxldmVscyAtINGB0L/QuNGB0L7QuiDRg9GA0L7QstC90LXQuSDRgdC70L7QttC90L7RgdGC0LhcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7Q29tcGxleGl0eX1cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFNlbGVjdGVkTGV2ZWwobGV2ZWxzOiBDb21wbGV4aXR5TGlzdCk6IENvbXBsZXhpdHkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRMZXZlbDogQ29tcGxleGl0eTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbGV2ZWxzKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBpZiAobGV2ZWxzW2tleV0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRMZXZlbCA9IGxldmVsc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkTGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JPQtdC90LXRgNC40YDRg9C10YIg0YHRgtGA0YPQutGC0YPRgNGDINC/0L7Qu9GPINC00LvRjyDQstGL0LHRgNCw0L3QvdC+0LPQviDRg9GA0L7QstC90Y8g0YHQu9C+0LbQvdC+0YHRgtC4XG4gICAgICogXG4gICAgICogQHBhcmFtIHtTaXplfSBjYW52YXNTaXplIC0g0YDQsNC30LzQtdGAINC60LDQvdCy0LDRgdCwINCyINC/0LjQutGB0LXQu9GP0YVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmllbGRTaXplIC0g0YDQsNC30LzQtdGAINC40LPRgNC+0LLQvtCz0L4g0L/QvtC70Y8g0LIg0LrQu9C10YLQutCw0YVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYm9tYkNvdW50IC0g0LrQvtC70LjRh9C10YHRgtCy0L4g0LHQvtC80LEg0L3QsCDQuNCz0YDQvtCy0L7QvCDQv9C+0LvQtVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtNYXBTdHJ1Y3R1cmV9XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZU1hcFN0cnVjdHVyZSgpOiBNYXBTdHJ1Y3R1cmUge1xuICAgICAgICBjb25zdCBtYXBTdHJ1Y3R1cmU6IE1hcFN0cnVjdHVyZSA9IHtcbiAgICAgICAgICAgIHBpeGVsc0NvdW50SW5DZWxsOiB0aGlzLmNhbnZhc1NpemUud2lkdGggLyB0aGlzLmZpZWxkU2l6ZSxcbiAgICAgICAgICAgIGJvbWJDb3VudDogdGhpcy5ib21iQ291bnQsXG4gICAgICAgICAgICBib21iTGVmdDogdGhpcy5ib21iQ291bnQsXG4gICAgICAgICAgICBjZWxsczoge30sXG4gICAgICAgICAgICBib21iUG9zaXRpb25zOiBbXSxcbiAgICAgICAgICAgIGZpZWxkU2l6ZTogdGhpcy5maWVsZFNpemUsXG4gICAgICAgIH07XG5cbiAgICAgICAgbWFwU3RydWN0dXJlLmJvbWJQb3NpdGlvbnMgPSB0aGlzLmdlbmVyYXRlUmFuZG9tQm9tYlBvc2l0aW9ucyh0aGlzLmZpZWxkU2l6ZSAqIHRoaXMuZmllbGRTaXplKTtcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuZmllbGRTaXplOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5maWVsZFNpemU7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdzogbnVtYmVyID0geTtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsOiBudW1iZXIgPSB4O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFtYXBTdHJ1Y3R1cmUuY2VsbHNbcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBtYXBTdHJ1Y3R1cmUuY2VsbHNbcm93XSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNCb21iOiBib29sZWFuID0gbWFwU3RydWN0dXJlLmJvbWJQb3NpdGlvbnMuaW5jbHVkZXMoeCArIHkgKiB0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJlYTogQXJlYVN0cnVjdHVyZSA9IHRoaXMuZ2VuZXJhdGVDZWxsQXJlYSh7IHgsIHkgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsU3RydWN0dXJlOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIHk6IHJvdywgXG4gICAgICAgICAgICAgICAgICAgIHg6IGNlbGwsXG4gICAgICAgICAgICAgICAgICAgIGFyZWEsXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGhhc0JvbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbFN0cnVjdHVyZS5oYXNCb21iID0gaGFzQm9tYjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjZWxsU3RydWN0dXJlLnZhbHVlID0gdGhpcy5jYWxjQm9tYnNBcm91bmRDZWxscyhhcmVhLCBtYXBTdHJ1Y3R1cmUuYm9tYlBvc2l0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWFwU3RydWN0dXJlLmNlbGxzW3Jvd11bY2VsbF0gPSBjZWxsU3RydWN0dXJlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2cobWFwU3RydWN0dXJlKTtcblxuICAgICAgICByZXR1cm4gbWFwU3RydWN0dXJlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCT0LXQvdC10YDQuNGA0YPQtdGCINC+0LHQu9Cw0YHRgtGMINGP0YfQtdC10Log0YEg0LjRhSDQutC+0L7RgNC00LjQvdCw0YLQsNC80Lgg0LLQvtC60YDRg9CzINCy0YvQsdGA0LDQvdC90L7QuSDRj9GH0LXQudC60Lgg0L3QsCDQvtGB0L3QvtCy0LUg0LXQtSDQutC+0L7RgNC00LjQvdCw0YJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geCAtINC60L7QvtGA0LTQuNC90LDRgtCwICd4JyDRj9GH0LXQudC60LhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geSAtINC60L7QvtGA0LTQuNC90LDRgtCwICd5JyDRj9GH0LXQudC60LhcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7QXJlYVN0cnVjdHVyZX1cbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlQ2VsbEFyZWEoeyB4LCB5IH06IENlbGwpOiBBcmVhU3RydWN0dXJlIHtcbiAgICAgICAgY29uc3QgYXJlYTogQXJlYVN0cnVjdHVyZSA9IHt9O1xuICAgIFxuICAgICAgICAvLyA4IC0g0LrQvtC70LjRh9C10YHRgtCy0L4g0Y/Rh9C10LXQuiDQstC+0LrRgNGD0LMg0YbQtdC90YLRgNCw0LvRjNC90L7QuVxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgODsgaW5kZXgrKykge1xuICAgICAgICAgICAgLyoqINCf0YDQvtCy0LXRgNGP0LXQvCwg0L3QtSDQstGL0YXQvtC00LjRgiDQu9C4INGP0YfQtdC50LrQsCDQt9CwINC70LXQstGD0Y4g0Lgg0LLQtdGA0YXQvdGO0Y4g0LPRgNCw0L3QuNGG0Ysg0L/QvtC70Y8gKi9cbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGlmICh4ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnggPCAwIHx8IHkgKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueSA8IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqINCf0YDQvtCy0LXRgNGP0LXQvCwg0L3QtSDQstGL0YXQvtC00LjRgiDQu9C4INGP0YfQtdC50LrQsCDQt9CwINC/0YDQsNCy0YPRjiDQuCDQvdC40LbQvdGO0Y4g0LPRgNCw0L3QuNGG0Ysg0L/QvtC70Y8gKi9cbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGlmICh4ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnggPj0gdGhpcy5maWVsZFNpemUgfHwgeSArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS55ID49IHRoaXMuZmllbGRTaXplKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGFyZWFbaW5kZXhdID0ge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB4OiB4ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLngsXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHk6IHkgKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcmVhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCT0LXQvdC10YDQuNGA0YPQtdGCINGA0LDQvdC00L7QvNC90YvQtSDQv9C+0LfQuNGG0LjQuCDQtNC70Y8g0YDQsNGB0L/QvtC70L7QttC10L3QuNGPINCx0L7QvNCxINC90LAg0L/QvtC70LVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2VsbHNDb3VudCAtINC60L7Qu9C40YfQtdGB0YLQstC+INGP0YfQtdC10Log0L3QsCDQv9C+0LvQtVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlUmFuZG9tQm9tYlBvc2l0aW9ucyhjZWxsc0NvdW50OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgICAgIGNvbnN0IGJvbWJQb3NpdGlvbnM6IG51bWJlcltdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuYm9tYkNvdW50OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgcmFuZG9tUG9zaXRpb246IG51bWJlciA9IHRoaXMuZ2VuZXJhdG9yLmdldFJhbmRvbUFyYml0cmFyeSgxLCBjZWxsc0NvdW50KTtcblxuICAgICAgICAgICAgd2hpbGUgKGJvbWJQb3NpdGlvbnMuaW5jbHVkZXMocmFuZG9tUG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmFuZG9tUG9zaXRpb24gPSB0aGlzLmdlbmVyYXRvci5nZXRSYW5kb21BcmJpdHJhcnkoMSwgY2VsbHNDb3VudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJvbWJQb3NpdGlvbnMucHVzaChyYW5kb21Qb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9tYlBvc2l0aW9ucy5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KHRh9C40YLQsNC10YIg0LrQvtC70LjRh9C10YHRgtCy0L4g0LHQvtC80LEg0LLQvtC60YDRg9CzINGP0YfQtdC50LrQuFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJlYVN0cnVjdHVyZX0gYXJlYVxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IGJvbWJQb3NpdGlvbnNcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY0JvbWJzQXJvdW5kQ2VsbHMoYXJlYTogQXJlYVN0cnVjdHVyZSwgYm9tYlBvc2l0aW9uczogbnVtYmVyW10pOiBudW1iZXIge1xuICAgICAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmVhKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjb25zdCBjZWxsID0gYXJlYVtrZXldO1xuXG4gICAgICAgICAgICBpZiAoYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyhjZWxsLnggKyBjZWxsLnkgKiB0aGlzLmZpZWxkU2l6ZSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufSIsImltcG9ydCB7IEVsZW1lbnRTb3VyY2UsIFBpeGVsUmF0aW9Tb3VyY2UgfSBmcm9tIFwiLi4vZG9tL3R5cGVzXCI7XG5pbXBvcnQgeyBHYW1lU2V0dGluZ3MgfSBmcm9tIFwiLi4vc2V0dGluZ3MvdHlwZXNcIjtcbmltcG9ydCB7IERyYXdpbmdDb250ZXh0LCBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc0NvbnRleHRQcm92aWRlciBpbXBsZW1lbnRzIERyYXdpbmdDb250ZXh0UHJvdmlkZXIge1xuICAgIHByaXZhdGUgY2FudmFzOiBOdWxsYWJsZTxIVE1MQ2FudmFzRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgY29udGV4dDogTnVsbGFibGU8RHJhd2luZ0NvbnRleHQ+ID0gbnVsbDtcbiAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGVsZW1lbnRTb3VyY2U6IEVsZW1lbnRTb3VyY2UsXG4gICAgICBwcml2YXRlIHBpeGVsUmF0aW9Tb3VyY2U6IFBpeGVsUmF0aW9Tb3VyY2UsXG4gICAgICBwcml2YXRlIHNldHRpbmdzOiBHYW1lU2V0dGluZ3NcbiAgICApIHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgaWYgKCFjYW52YXMpIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIGEgY2FudmFzLlwiKTtcbiAgXG4gICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcyBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIHRoaXMubm9ybWFsaXplU2NhbGUoKTtcbiAgICB9XG4gIFxuICAgIHB1YmxpYyBnZXRJbnN0YW5jZSgpOiBEcmF3aW5nQ29udGV4dCB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0O1xuICAgIH1cblxuICAgIHB1YmxpYyBsaXN0ZW5DYW52YXNDbGljayhjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcHVibGljIGxpc3RlbkNhbnZhc0NvbnRleHRNZW51KGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGNhbGxiYWNrKTtcbiAgICB9XG4gIFxuICAgIHByaXZhdGUgbm9ybWFsaXplU2NhbGUoKTogdm9pZCB7XG4gICAgICBpZiAoIXRoaXMuY2FudmFzIHx8ICF0aGlzLmNvbnRleHQpIHJldHVybjtcbiAgXG4gICAgICBjb25zdCByYXRpbyA9IHRoaXMucGl4ZWxSYXRpb1NvdXJjZS5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuc2V0dGluZ3MuY2FudmFzU2l6ZTtcbiAgXG4gICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoICogcmF0aW87XG4gICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiByYXRpbztcbiAgXG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gIFxuICAgICAgdGhpcy5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jb250ZXh0LnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gICAgfVxuICB9IiwiaW1wb3J0IHsgRWxlbWVudFNvdXJjZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBEb21Tb3VyY2UgaW1wbGVtZW50cyBFbGVtZW50U291cmNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3aW5kb3c6IFdpbmRvdykge31cblxuICBwdWJsaWMgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcpOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4ge1xuICAgIHJldHVybiB0aGlzLndpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICB9XG5cbiAgcHVibGljIGdldEVsZW1lbnQoaWQ6IHN0cmluZyk6IE51bGxhYmxlPEhUTUxFbGVtZW50PiB7XG4gICAgcmV0dXJuIHRoaXMud2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgfVxuXG4gIHB1YmxpYyBhZnRlckxvYWQoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy53aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxufSIsImV4cG9ydCBjb25zdCBERUZBVUxUX0NPTE9SOiBDb2xvciA9ICcjMDAwMDAwJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX1dJRFRIOiBMZW5ndGggPSAxO1xuZXhwb3J0IGNvbnN0IE1BSU5fQkdfQ09MT1I6IENvbG9yID0gJyMyMTIxMjEnO1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfRklFTERfQkdfQ09MT1I6IENvbG9yID0gJyM2NjY2RkYnO1xuZXhwb3J0IGNvbnN0IEZMQUdfQkdfQ09MT1I6IENvbG9yID0gJ2xpZ2h0Z3JheSc7XG5leHBvcnQgY29uc3QgVEVYVF9DT0xPUjogQ29sb3IgPSAnd2hpdGUnO1xuZXhwb3J0IGNvbnN0IEJPUkRFUl9DT0xPUjogQ29sb3IgPSAnIzMzMzMzMyc7IiwiaW1wb3J0IHsgRHJhd2luZ0NvbnRleHQsIERyYXdpbmdDb250ZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi4vY29udGV4dC90eXBlc1wiO1xuaW1wb3J0IHsgU291cmNlUHJvdmlkZXIgfSBmcm9tIFwiLi4vc291cmNlL3R5cGVzXCI7XG5pbXBvcnQgeyBERUZBVUxUX0NPTE9SLCBERUZBVUxUX1dJRFRILCBNQUlOX0JHX0NPTE9SLCBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SLCBURVhUX0NPTE9SLCBGTEFHX0JHX0NPTE9SLCBCT1JERVJfQ09MT1IgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IEJydXNoU2V0dGluZ3MsIERyYXdlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNEcmF3ZXIgaW1wbGVtZW50cyBEcmF3ZXIge1xuICAgIHByaXZhdGUgY29udGV4dDogRHJhd2luZ0NvbnRleHQgPSBudWxsO1xuICAgIHByaXZhdGUgYm9tYjogYW55O1xuICAgIHByaXZhdGUgZmxhZzogYW55O1xuICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgY29udGV4dFByb3ZpZGVyOiBEcmF3aW5nQ29udGV4dFByb3ZpZGVyLFxuICAgICAgcHJpdmF0ZSBmaWxlUHJvdmlkZXI6IFNvdXJjZVByb3ZpZGVyXG4gICAgKSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNvbnRleHRQcm92aWRlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgaWYgKCF0aGlzLmNvbnRleHQpIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBhY2Nlc3MgdGhlIGRyYXdpbmcgY29udGV4dC5cIik7XG5cbiAgICAgIHRoaXMuYm9tYiA9IGZpbGVQcm92aWRlci5nZXRJbWFnZSgnYm9tYicpO1xuICAgICAgdGhpcy5mbGFnID0gZmlsZVByb3ZpZGVyLmdldEltYWdlKCdmbGFnJyk7XG4gICAgfVxuICBcbiAgICBwdWJsaWMgZHJhd0xpbmUoXG4gICAgICB7IHN0YXJ0LCBlbmQgfTogTGluZSxcbiAgICAgIHsgY29sb3IsIHdpZHRoIH06IEJydXNoU2V0dGluZ3MgPSB7fVxuICAgICk6IHZvaWQge1xuICAgICAgaWYgKCF0aGlzLmNvbnRleHQpIHJldHVybjtcbiAgXG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvciA/PyBERUZBVUxUX0NPTE9SO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHdpZHRoID8/IERFRkFVTFRfV0lEVEg7XG4gIFxuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhzdGFydC54LCBzdGFydC55KTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oZW5kLngsIGVuZC55KTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhd1NxdWFyZSh7IHgsIHkgfTogQ2VsbCwgeyB3aWR0aCwgaGVpZ2h0IH06IFNpemUsIGNvbG9yPzogc3RyaW5nLCBoYXNCb3JkZXJzOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgaWYgKCF0aGlzLmNvbnRleHQpIHJldHVybjtcblxuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yID8gY29sb3IgOiBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICBpZiAoaGFzQm9yZGVycykge1xuICAgICAgICB0aGlzLmRyYXdCb3JkZXJzKHsgeCwgeSB9LCB7IHdpZHRoLCBoZWlnaHQgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdOdW1iZXIoeyB4LCB5IH06IENlbGwsIHsgd2lkdGgsIGhlaWdodCB9OiBTaXplLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICB0aGlzLmRyYXdTcXVhcmUoeyB4LCB5IH0sIHsgd2lkdGgsIGhlaWdodCB9LCBNQUlOX0JHX0NPTE9SKTtcblxuICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgJHtoZWlnaHQgLyAyfXB4IEFyaWFsYDtcblx0XHQgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBURVhUX0NPTE9SO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFN0cmluZyh2YWx1ZSksIHggKyAod2lkdGggLyAyLjUpLCB5ICsgKGhlaWdodCAvIDEuNSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3Qm9tYih7IHgsIHkgfTogQ2VsbCwgeyB3aWR0aCwgaGVpZ2h0IH06IFNpemUpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd1NxdWFyZSh7IHgsIHkgfSwgeyB3aWR0aCwgaGVpZ2h0IH0sIElOSVRJQUxfRklFTERfQkdfQ09MT1IsIGZhbHNlKTtcbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5ib21iLCB4ICsgKHdpZHRoIC8gNCksIHkgKyAoaGVpZ2h0IC8gNCksIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdGbGFnKHsgeCwgeSB9OiBDZWxsLCB7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSk6IHZvaWQge1xuICAgICAgdGhpcy5kcmF3U3F1YXJlKHsgeCwgeSB9LCB7IHdpZHRoLCBoZWlnaHQgfSwgRkxBR19CR19DT0xPUiwgZmFsc2UpO1xuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmZsYWcsIHggKyAod2lkdGggLyA0KSwgeSArIChoZWlnaHQgLyA0KSwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYXdCb3JkZXJzKHsgeCwgeSB9OiBDZWxsLCB7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSk6IHZvaWQge1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gQk9SREVSX0NPTE9SO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICB9IiwiaW1wb3J0IHsgTWFwU3RydWN0dXJlLCBTeXN0ZW1CdWlsZGVyIH0gZnJvbSAnLi4vYnVpbGRlci90eXBlcyc7XG5pbXBvcnQgeyBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC90eXBlcyc7XG5pbXBvcnQgeyBFbGVtZW50U291cmNlIH0gZnJvbSAnLi4vZG9tL3R5cGVzJztcbmltcG9ydCB7IElOSVRJQUxfRklFTERfQkdfQ09MT1IsIE1BSU5fQkdfQ09MT1IgfSBmcm9tICcuLi9kcmF3ZXIvY29uc3RhbnRzJztcbmltcG9ydCB7IERyYXdlciB9IGZyb20gJy4uL2RyYXdlci90eXBlcyc7XG5pbXBvcnQgeyBNYXRoR2VuZXJhdG9yIH0gZnJvbSAnLi4vZ2VuZXJhdG9yL3R5cGVzJztcbmltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3R5cGVzJztcbmltcG9ydCB7IFN0b3JhZ2VQcm92aWRlciB9IGZyb20gJy4uL3N0b3JhZ2UvdHlwZXMnO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBTYXBwZXIgaW1wbGVtZW50cyBHYW1lIHtcbiAgICBwcml2YXRlIHNlbGVjdDogTnVsbGFibGU8SFRNTFNlbGVjdEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGJ1dHRvbjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIHJlc3VsdENvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIHdpbkNvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGxlZnRCb21iQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgZ2FtZUNvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGNhbnZhczogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIHN5c3RlbTogTWFwU3RydWN0dXJlO1xuICAgIHByaXZhdGUgY2VsbFNpemU6IFNpemU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzZXR0aW5nczogR2FtZVNldHRpbmdzLFxuICAgICAgICBwcml2YXRlIGNvbnRleHRQcm92aWRlcjogRHJhd2luZ0NvbnRleHRQcm92aWRlcixcbiAgICAgICAgcHJpdmF0ZSBkcmF3ZXI6IERyYXdlcixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50U291cmNlOiBFbGVtZW50U291cmNlLFxuICAgICAgICBwcml2YXRlIGJ1aWxkZXI6IFN5c3RlbUJ1aWxkZXIsXG4gICAgICAgIHByaXZhdGUgZ2VuZXJhdG9yOiBNYXRoR2VuZXJhdG9yLFxuICAgICAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VQcm92aWRlcixcbiAgICApIHtcbiAgICAgICAgdGhpcy5zZWxlY3QgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdzZWxlY3QtbGV2ZWwnKTtcbiAgICAgICAgdGhpcy5idXR0b24gPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ3N0YXJ0LWdhbWUnKTtcbiAgICAgICAgdGhpcy5nYW1lQ29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdnYW1lLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMucmVzdWx0Q29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdyZXN1bHQtY29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMud2luQ29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCd3aW4tY29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMubGVmdEJvbWJDb250YWluZXIgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ2xlZnQtYm9tYicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9C40YDRg9C10Lwg0LTQsNC90L3Ri9C1INC40LPRgNGLXG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFNvdXJjZS5hZnRlckxvYWQoKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8g0L/RgNC+0LHRg9C10Lwg0YPRgdGC0LDQvdC+0LLQuNGC0Ywg0YHRgtCw0YDRi9C5INCy0YvQsdGA0LDQvdC90YvQuSDRg9GA0L7QstC10L3RjFxuICAgICAgICAgICAgY29uc3Qgc2F2ZWRMZXZlbCA9IHRoaXMuc3RvcmFnZS5nZXQoJ2xldmVsJyk7XG5cbiAgICAgICAgICAgIGlmIChzYXZlZExldmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VMZXZlbEluU2V0dGluZ3Moc2F2ZWRMZXZlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnNldHRpbmdzLmxldmVscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IDxIVE1MT3B0aW9uRWxlbWVudD50aGlzLmVsZW1lbnRTb3VyY2UuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cbiAgICAgICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBrZXk7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0ga2V5O1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0aGlzLnNldHRpbmdzLmxldmVsc1trZXldLnNlbGVjdGVkO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VMZXZlbC5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zdGFydC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0YLQsNGA0YLRg9C10Lwg0LjQs9GA0YNcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXJ0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN5c3RlbSA9IHRoaXMuYnVpbGRlci5idWlsZCh0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5jZWxsU2l6ZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sZWZ0Qm9tYkNvbnRhaW5lci50ZXh0Q29udGVudCA9IHRoaXMuc3lzdGVtLmJvbWJMZWZ0O1xuICAgICAgICB0aGlzLmNoYW5nZVZpc2liaWxpdHlFbGVtZW50cygpO1xuICAgICAgICB0aGlzLm1ha2VJbml0aWFsRmlsbCgpO1xuICAgICAgICB0aGlzLmNvbnRleHRQcm92aWRlci5saXN0ZW5DYW52YXNDbGljayh0aGlzLmNoZWNrQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29udGV4dFByb3ZpZGVyLmxpc3RlbkNhbnZhc0NvbnRleHRNZW51KHRoaXMuY2hlY2tDb250ZXh0TWVudS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQnNC10L3Rj9C10YIg0YPRgNC+0LLQtdC90Ywg0L/QvtGB0LvQtSDRgdC80LXQvdGLINCyINGB0LXQu9C10LrRgtC1XG4gICAgICogXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBET00g0YHQvtCx0YvRgtC40LVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUxldmVsKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY2hhbmdlTGV2ZWxJblNldHRpbmdzKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5zYXZlKHtcbiAgICAgICAgICAgIG5hbWU6ICdsZXZlbCcsXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCc0LXQvdGP0LXRgiDRg9GA0L7QstC10L3RjCDQuNCz0YDRiyDQsiDQvdCw0YHRgtGA0L7QudC60LDRhVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtINCy0YvQsdGA0LDQvdC90YvQuSDRg9GA0L7QstC10L3RjFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlTGV2ZWxJblNldHRpbmdzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2V0dGluZ3MubGV2ZWxzKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmxldmVsc1trZXldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2V0dGluZ3MubGV2ZWxzW3ZhbHVlXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JzQtdC90Y/QtdGCINCy0LjQtNC40LzQvtGB0YLRjCDQuNCz0YDQvtCy0YvRhSDRjdC70LXQvNC10L3RgtC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1XG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VWaXNpYmlsaXR5RWxlbWVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuc2VsZWN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuZ2FtZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQl9Cw0L/QvtC70L3Rj9C10YIg0LLQtdGB0Ywg0LrQsNC90LLQsNGBINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHJpdmF0ZSBtYWtlSW5pdGlhbEZpbGwoKSB7XG4gICAgICAgIGNvbnN0IHNpemU6IFNpemUgPSB0aGlzLnNldHRpbmdzLmNhbnZhc1NpemU7XG5cbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd1NxdWFyZSh7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSwgc2l6ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0NsaWNrKHsgb2Zmc2V0WCwgb2Zmc2V0WSB9OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGwob2Zmc2V0WCwgb2Zmc2V0WSk7XG4gICAgICAgIFxuICAgICAgICAvLyDRh9GC0L7QsdGLINC90LDQttCw0YLRjCDQvdCwINC60LvQtdGC0LrRgyDRgSDRhNC70LDQs9C+0LwgLSDQtdCz0L4g0L3Rg9C20L3QviDRgdC90LDRh9Cw0LvQsCDRgdC90Y/RgtGMXG4gICAgICAgIGlmICghY2VsbC5oYXNGbGFnKSB7XG4gICAgICAgICAgICBpZiAoY2VsbC5oYXNCb21iKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQm9tYkNlbGwoY2VsbCk7IC8vINGA0LjRgdGD0LXQvCDQsdC+0LzQsdGDINCyINGD0LrQsNC30LDQvdC90L7QuSDQutC70LXRgtC60LVcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5BbGxCb21icygpOyAvLyDRgNC40YHRg9C10Lwg0LLRgdC1INC+0YHRgtCw0LvRjNC90YvQtSDQsdC+0LzQsdGLXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wR2FtZSgpOyAvLyDRgdGC0L7Qv9C+0YDQuNC8INC40LPRgNGDXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGwudmFsdWUgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5OdW1iZXJTcXVhcmUoY2VsbCk7IC8vINGA0LjRgdGD0LXQvCDQutC70LXRgtC60YMg0YEg0YbQuNGE0YDQvtC5XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkVtcHR5U3F1YXJlKGNlbGwpOyAvLyDRgNC40YHRg9C10Lwg0L/Rg9GB0YLRg9GOINC60LvQtdGC0LrRg1xuICAgICAgICAgICAgICAgIHRoaXMucmVjdXJzaXZlT3BlbkFyZWEoY2VsbCk7IC8vINC/0YDQvtGF0L7QtNC40LzRgdGPINC/0L4g0YHQvtGB0LXQtNGP0Lwg0Lgg0YDQuNGB0YPQtdC8INC60LvQtdGC0LrQuCDQtNC+INGC0L7Qs9C+INC80L7QvNC10L3RgtCwLCDQv9C+0LrQsCDQvdC1INC/0L7Rj9Cy0LjRgtGB0Y8g0LIg0LrQu9C10YLQutC1INGG0LjRhNGA0LBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tDb250ZXh0TWVudShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGwoZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WSk7XG5cbiAgICAgICAgaWYgKCFjZWxsLmlzT3Blbikge1xuICAgICAgICAgICAgaWYgKCFjZWxsLmhhc0ZsYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZsYWcoY2VsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmxhZyhjZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q2VsbChvZmZzZXRYOiBudW1iZXIsIG9mZnNldFk6IG51bWJlcik6IGFueSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLmdlbmVyYXRvci5nZXRGbG9vck51bWJlcihvZmZzZXRYIC8gdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwpO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5nZW5lcmF0b3IuZ2V0Rmxvb3JOdW1iZXIob2Zmc2V0WSAvIHRoaXMuc3lzdGVtLnBpeGVsc0NvdW50SW5DZWxsKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW0uY2VsbHNbeV1beF07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWN1cnNpdmVPcGVuQXJlYShjZWxsOiBhbnkpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gY2VsbC5hcmVhKSB7XG4gICAgICAgICAgICBjb25zdCBzeXN0ZW1DZWxsID0gdGhpcy5zeXN0ZW0uY2VsbHNbY2VsbC5hcmVhW2luZGV4XS55XVtjZWxsLmFyZWFbaW5kZXhdLnhdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqINC40Lcg0L7QsdGA0LDQsdC+0YLQutC4INC/0YDQvtC/0YPRgdC60LDQtdC8OlxuICAgICAgICAgICAgICogIC0g0L7RgtC60YDRi9GC0YPRjiDRj9GH0LXQudC60YNcbiAgICAgICAgICAgICAqICAtINGP0YfQtdC50LrRgyDRgSDRhNC70LDQs9C+0LxcbiAgICAgICAgICAgICAqICAtINGP0YfQtdC50LrRgyDRgSDQsdC+0LzQsdC+0LlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKCFzeXN0ZW1DZWxsLmlzT3BlbiAmJiAhc3lzdGVtQ2VsbC5oYXNGbGFnICYmICFzeXN0ZW1DZWxsLmhhc0JvbWIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3lzdGVtQ2VsbC52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5FbXB0eVNxdWFyZShzeXN0ZW1DZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjdXJzaXZlT3BlbkFyZWEoc3lzdGVtQ2VsbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuTnVtYmVyU3F1YXJlKHN5c3RlbUNlbGwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuRW1wdHlTcXVhcmUoY2VsbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdTcXVhcmUoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxXaWR0aChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxIZWlnaHQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsU2l6ZSwgTUFJTl9CR19DT0xPUik7XG5cbiAgICAgICAgY2VsbC5pc09wZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3Blbk51bWJlclNxdWFyZShjZWxsOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd051bWJlcih7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbFdpZHRoKGNlbGwueCksXG4gICAgICAgICAgICB5OiB0aGlzLmNhbGNQaXhlbEhlaWdodChjZWxsLnkpLFxuICAgICAgICB9LCB0aGlzLmNlbGxTaXplLCBjZWxsLnZhbHVlKTtcblxuICAgICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuQm9tYkNlbGwoY2VsbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdCb21iKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsV2lkdGgoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsSGVpZ2h0KGNlbGwueSksXG4gICAgICAgIH0sIHRoaXMuY2VsbFNpemUpO1xuXG4gICAgICAgIGNlbGwuaXNPcGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5BbGxCb21icygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgeyBib21iUG9zaXRpb25zLCBjZWxscywgZmllbGRTaXplIH0gPSB0aGlzLnN5c3RlbTtcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IE9iamVjdC5rZXlzKGNlbGxzKS5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBPYmplY3Qua2V5cyhjZWxsc1t5XSkubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyh4ICsgeSAqIGZpZWxkU2l6ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQm9tYkNlbGwoY2VsbHNbeV1beF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RmxhZyhjZWxsOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd0ZsYWcoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxXaWR0aChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxIZWlnaHQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsU2l6ZSk7XG5cbiAgICAgICAgY2VsbC5oYXNGbGFnID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnN5c3RlbS5ib21iTGVmdCA9IHRoaXMuc3lzdGVtLmJvbWJMZWZ0IC0gMTtcbiAgICAgICAgdGhpcy5sZWZ0Qm9tYkNvbnRhaW5lci50ZXh0Q29udGVudCA9IHRoaXMuc3lzdGVtLmJvbWJMZWZ0O1xuXG4gICAgICAgIC8vIGlmICh0aGlzLnN5c3RlbS5ib21iTGVmdCA9PT0gMCAmJiBhbGxCb21ic0FyZUNvcnJlY3RTZWxlY3RlZCkge1xuICAgICAgICAvLyAgICAgdGhpcy5zdG9wR2FtZSh0cnVlKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRmxhZyhjZWxsOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd1NxdWFyZSh7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbFdpZHRoKGNlbGwueCksXG4gICAgICAgICAgICB5OiB0aGlzLmNhbGNQaXhlbEhlaWdodChjZWxsLnkpLFxuICAgICAgICB9LCB0aGlzLmNlbGxTaXplLCBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SLCBmYWxzZSk7XG5cbiAgICAgICAgY2VsbC5oYXNGbGFnID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zeXN0ZW0uYm9tYkxlZnQgPSB0aGlzLnN5c3RlbS5ib21iTGVmdCArIDE7XG4gICAgICAgIHRoaXMubGVmdEJvbWJDb250YWluZXIudGV4dENvbnRlbnQgPSB0aGlzLnN5c3RlbS5ib21iTGVmdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGNQaXhlbFdpZHRoKHg6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoeCkgKiB0aGlzLmNlbGxTaXplLndpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY1BpeGVsSGVpZ2h0KHk6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoeSkgKiB0aGlzLmNlbGxTaXplLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3BHYW1lKGlzV2luOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgLy8g0L/QvtC60LDQt9GL0LLQsNC10Lwg0LrQvdC+0L/QutGDINGA0LXRgdGC0LDRgNGC0LBcbiAgICAgICAgdGhpcy5yZXN1bHRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcblxuICAgICAgICBpZiAoaXNXaW4pIHtcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCy0YvQuNCz0YDQsNC70LgsINC/0L7QutCw0LfRi9Cy0LDQtdC8INC/0L7Qt9C00YDQsNCy0LvQtdC90LjRj1xuICAgICAgICAgICAgdGhpcy53aW5Db250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncmVzdWx0LWNvbnRhaW5lci0taXMtdmlzaWJsZScpO1xuICAgICAgICB9LCA1MCk7XG4gICAgfVxufSIsImltcG9ydCB7IE1hdGhHZW5lcmF0b3IgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yIGltcGxlbWVudHMgTWF0aEdlbmVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZ2V0UmFuZG9tOiBGdW5jdGlvbixcbiAgICAgICAgcHJpdmF0ZSBnZXRGbG9vcjogRnVuY3Rpb24sXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YDQsNC90LTQvtC80L3QvtC1INGG0LXQu9C+0LUg0YfQuNGB0LvQviDQsiDQvtC/0YDQtdC00LXQu9C10L3QvdC+0Lwg0L/RgNC+0LzQtdC20YPRgtC60LVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluIC0g0LzQuNC90LjQvNCw0LvRjNC90L7QtSDRh9C40YHQu9C+INC/0YDQvtC80LXQttGD0YLQutCwXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heCAtINC80LDQutGB0LjQvNCw0LvRjNC90L7QtSDRh9C40YHQu9C+INC/0YDQvtC80LXQttGD0YLQutCwXG4gICAgICogXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmFuZG9tQXJiaXRyYXJ5KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZsb29yTnVtYmVyKHRoaXMuZ2V0UmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J7QutGA0YPQs9C70Y/QtdGCINGH0LjRgdC70L4g0LTQviDRhtC10LvQvtCz0L5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbiAtINC40YHRhdC+0LTQvdC+0LUg0YfQuNGB0LvQvlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgIHB1YmxpYyBnZXRGbG9vck51bWJlcihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGbG9vcihuKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgR2FtZVNldHRpbmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGxldmVscyB9IGZyb20gXCIuL2xldmVsc1wiO1xuXG4vKiog0J7RgdC90L7QstC90YvQtSDQvdCw0YHRgtGA0L7QudC60Lgg0LjQs9GA0YsgKi9cbmV4cG9ydCBjb25zdCBzZXR0aW5nczogR2FtZVNldHRpbmdzID0ge1xuICAgIGNhbnZhc1NpemU6IHtcbiAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgfSxcbiAgICBsZXZlbHMsXG59IiwiaW1wb3J0IHsgQ29tcGxleGl0eUxpc3QgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKiog0KHQv9C40YHQvtC6INGD0YDQvtCy0L3QtdC5INGB0LvQvtC20L3QvtGB0YLQuCDQuNCz0YDRiyAqL1xuZXhwb3J0IGNvbnN0IGxldmVsczogQ29tcGxleGl0eUxpc3QgPSB7XG4gICAgYmVnaW5uZXI6IHtcbiAgICAgICAgbmFtZTogJ2JlZ2lubmVyJyxcbiAgICAgICAgYm9tYkNvdW50OiAxMCxcbiAgICAgICAgZmllbGRTaXplOiAyMCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZWFzeToge1xuICAgICAgICBuYW1lOiAnZWFzeScsXG4gICAgICAgIGJvbWJDb3VudDogMTUsXG4gICAgICAgIGZpZWxkU2l6ZTogMTAsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgIH0sXG4gICAgbWVkaXVtOiB7XG4gICAgICAgIG5hbWU6ICdtZWRpdW0nLFxuICAgICAgICBib21iQ291bnQ6IDQwLFxuICAgICAgICBmaWVsZFNpemU6IDIwLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbiAgICBoYXJkOiB7XG4gICAgICAgIG5hbWU6ICdoYXJkJyxcbiAgICAgICAgYm9tYkNvdW50OiAxMDAsXG4gICAgICAgIGZpZWxkU2l6ZTogMjAsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9LFxuICAgIGh1Z2U6IHtcbiAgICAgICAgbmFtZTogJ2h1Z2UnLFxuICAgICAgICBib21iQ291bnQ6IDIyMCxcbiAgICAgICAgZmllbGRTaXplOiAzMixcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZXh0cmVtZToge1xuICAgICAgICBuYW1lOiAnZXh0cmVtZScsXG4gICAgICAgIGJvbWJDb3VudDogMTUwLFxuICAgICAgICBmaWVsZFNpemU6IDIwLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbn0iLCJpbXBvcnQgeyBTb3VyY2VQcm92aWRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmltcG9ydCAnLi4vaW1nL2JvbWIucG5nJztcbmltcG9ydCAnLi4vaW1nL2ZsYWcucG5nJztcblxuZXhwb3J0IGNsYXNzIEZpbGVTb3VyY2UgaW1wbGVtZW50cyBTb3VyY2VQcm92aWRlciB7XG4gICAgcHJpdmF0ZSBpbWFnZU5hbWVBcnI6IHN0cmluZ1tdID0gW107XG4gICAgcHJpdmF0ZSBpbWFnZUFycjogYW55W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGdldEltYWdlKG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIC8vIGlmICh0aGlzLmltYWdlTmFtZUFyci5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAvLyAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuaW1hZ2VBcnJbbmFtZV07XG4gICAgICAgIC8vIH1cblxuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IGBpbWcvJHtuYW1lfS5wbmdgO1xuXG4gICAgICAgIC8vIHRoaXMuaW1hZ2VOYW1lQXJyLnB1c2gobmFtZSk7XG4gICAgICAgIC8vIHRoaXMuaW1hZ2VBcnIucHVzaChpbWcpO1xuXG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxufSIsImltcG9ydCB7IFN0b3JhZ2VQcm92aWRlciwgU3RvcmFnZUl0ZW0sIFN0b3JhZ2VOYW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqINCU0L7Qu9Cz0L7QstGA0LXQvNC10L3QvdC+0LUg0YXRgNCw0L3QuNC70LjRidC1INC00LDQvdC90YvRhSDQuNCz0YDRiyAqL1xuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlIGltcGxlbWVudHMgU3RvcmFnZVByb3ZpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlXG4gICAgKSB7fVxuXG4gICAgc2F2ZSh7IG5hbWUsIHZhbHVlIH06IFN0b3JhZ2VJdGVtKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKG5hbWUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQobmFtZTogU3RvcmFnZU5hbWUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0obmFtZSk7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IExldmVsQnVpbGRlciB9IGZyb20gXCIuL2J1aWxkZXIvaW5kZXhcIjtcbmltcG9ydCB7IENhbnZhc0NvbnRleHRQcm92aWRlciB9IGZyb20gXCIuL2NvbnRleHQvaW5kZXhcIjtcbmltcG9ydCB7IERvbVNvdXJjZSB9IGZyb20gXCIuL2RvbS9pbmRleFwiO1xuaW1wb3J0IHsgQ2FudmFzRHJhd2VyIH0gZnJvbSBcIi4vZHJhd2VyL2luZGV4XCI7XG5pbXBvcnQgeyBTYXBwZXIgfSBmcm9tIFwiLi9nYW1lL2luZGV4XCI7XG5pbXBvcnQgeyBHZW5lcmF0b3IgfSBmcm9tIFwiLi9nZW5lcmF0b3IvaW5kZXhcIjtcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3MvaW5kZXhcIjtcbmltcG9ydCB7IEZpbGVTb3VyY2UgfSBmcm9tIFwiLi9zb3VyY2UvaW5kZXhcIjtcblxuaW1wb3J0IFwiLi9pbmRleC5zY3NzXCI7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UvaW5kZXhcIjtcblxuY29uc3QgcGl4ZWxSYXRpb1NvdXJjZSA9IHtcbiAgICBkZXZpY2VQaXhlbFJhdGlvOiAxLFxufVxuXG5jb25zdCBzdG9yYWdlID0gbmV3IERhdGFTdG9yYWdlKHdpbmRvdy5sb2NhbFN0b3JhZ2UpO1xuY29uc3QgZmlsZVByb3ZpZGVyID0gbmV3IEZpbGVTb3VyY2UoKTtcbmNvbnN0IGRvbVNvdXJjZSA9IG5ldyBEb21Tb3VyY2Uod2luZG93KTtcbmNvbnN0IGNvbnRleHRQcm92aWRlciA9IG5ldyBDYW52YXNDb250ZXh0UHJvdmlkZXIoZG9tU291cmNlLCBwaXhlbFJhdGlvU291cmNlLCBzZXR0aW5ncyk7XG5jb25zdCBkcmF3ZXIgPSBuZXcgQ2FudmFzRHJhd2VyKGNvbnRleHRQcm92aWRlciwgZmlsZVByb3ZpZGVyKTtcbmNvbnN0IGdlbmVyYXRvciA9IG5ldyBHZW5lcmF0b3IoTWF0aC5yYW5kb20sIE1hdGguZmxvb3IpO1xuY29uc3QgYnVpbGRlciA9IG5ldyBMZXZlbEJ1aWxkZXIoZ2VuZXJhdG9yKTtcbmNvbnN0IHNhcHBlciA9IG5ldyBTYXBwZXIoc2V0dGluZ3MsIGNvbnRleHRQcm92aWRlciwgZHJhd2VyLCBkb21Tb3VyY2UsIGJ1aWxkZXIsIGdlbmVyYXRvciwgc3RvcmFnZSk7XG5cbnNhcHBlci5pbml0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9