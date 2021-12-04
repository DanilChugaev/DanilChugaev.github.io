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
        this.timerContainer = null;
        this.gameContainer = null;
        this.canvas = null;
        this.countCorrectlySelectedBombs = 0;
        this.select = elementSource.getElement('select-level');
        this.button = elementSource.getElement('start-game');
        this.gameContainer = elementSource.getElement('game-container');
        this.canvas = elementSource.getElement('canvas');
        this.resultContainer = elementSource.getElement('result-container');
        this.winContainer = elementSource.getElement('win-container');
        this.leftBombContainer = elementSource.getElement('left-bomb');
        this.timerContainer = elementSource.getElement('timer');
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
        this.timerContainer.textContent = '0';
        this.changeVisibilityElements();
        this.makeInitialFill();
        this.startTimer();
        this.contextProvider.listenCanvasClick(this.checkClick.bind(this));
        this.contextProvider.listenCanvasContextMenu(this.checkContextMenu.bind(this));
    };
    Sapper.prototype.startTimer = function () {
        var _this = this;
        var seconds = 0;
        this.timerContainer.textContent = String(seconds++);
        this.timerInterval = setInterval(function () {
            _this.timerContainer.textContent = String(seconds++);
        }, 1000);
    };
    Sapper.prototype.stopTimer = function (isWin) {
        clearInterval(this.timerInterval);
        if (isWin) {
            this.storage.save({
                name: "timer-" + this.storage.get('level'),
                // @ts-ignore
                value: this.timerContainer.textContent,
            });
        }
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
        if (cell.hasBomb) {
            this.countCorrectlySelectedBombs++;
        }
        if (this.system.bombLeft === 0 && this.system.bombCount === this.countCorrectlySelectedBombs) {
            this.stopGame(true);
        }
    };
    Sapper.prototype.removeFlag = function (cell) {
        this.drawer.drawSquare({
            x: this.calcPixelWidth(cell.x),
            y: this.calcPixelHeight(cell.y),
        }, this.cellSize, _drawer_constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_FIELD_BG_COLOR, false);
        cell.hasFlag = false;
        this.system.bombLeft = this.system.bombLeft + 1;
        this.leftBombContainer.textContent = this.system.bombLeft;
        if (cell.hasBomb) {
            this.countCorrectlySelectedBombs--;
        }
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
        this.stopTimer(isWin);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQWUscUJBQXVCLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7QUNBdkQsaUVBQWUscUJBQXVCLGlCQUFpQjs7Ozs7Ozs7Ozs7QUNBdkQ7Ozs7Ozs7Ozs7Ozs7OztBQ0VBOzs7Ozs7R0FNRztBQUNJLElBQU0sY0FBYyxHQUFrQjtJQUN6QyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ25CLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2xCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2xCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNqQixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDakIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2pCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2xCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0NBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEI0QztBQUc3QztJQUtJLHNCQUNZLFNBQXdCO1FBQXhCLGNBQVMsR0FBVCxTQUFTLENBQWU7SUFDakMsQ0FBQztJQUVKOzs7Ozs7T0FNRztJQUNJLDRCQUFLLEdBQVosVUFBYSxRQUFzQjtRQUN6QixTQUEyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUEvRCxTQUFTLGlCQUFFLFNBQVMsZUFBMkMsQ0FBQztRQUV4RSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFFdEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFeEMsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssdUNBQWdCLEdBQXhCLFVBQXlCLE1BQXNCO1FBQzNDLElBQUksYUFBeUIsQ0FBQztRQUU5QixLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUNwQixhQUFhO1lBQ2IsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUN0QixhQUFhO2dCQUNiLGFBQWEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDL0I7U0FDSjtRQUVELE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNLLDJDQUFvQixHQUE1QjtRQUNJLElBQU0sWUFBWSxHQUFpQjtZQUMvQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUztZQUN6RCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3hCLEtBQUssRUFBRSxFQUFFO1lBQ1QsYUFBYSxFQUFFLEVBQUU7WUFDakIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzVCLENBQUM7UUFFRixZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUvRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDckMsSUFBTSxHQUFHLEdBQVcsQ0FBQyxDQUFDO2dCQUN0QixJQUFNLElBQUksR0FBVyxDQUFDLENBQUM7Z0JBRXZCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMxQixZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDaEM7Z0JBRUQsSUFBTSxPQUFPLEdBQVksWUFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JGLElBQU0sSUFBSSxHQUFrQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEtBQUUsQ0FBQyxLQUFFLENBQUMsQ0FBQztnQkFFNUQsSUFBTSxhQUFhLEdBQVE7b0JBQ3ZCLENBQUMsRUFBRSxHQUFHO29CQUNOLENBQUMsRUFBRSxJQUFJO29CQUNQLElBQUk7aUJBQ1A7Z0JBRUQsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsYUFBYSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7aUJBQ25DO3FCQUFNO29CQUNILGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQ3JGO2dCQUVELFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDO2FBQ2pEO1NBQ0o7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTFCLE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssdUNBQWdCLEdBQXhCLFVBQXlCLEVBQWM7WUFBWixDQUFDLFNBQUUsQ0FBQztRQUMzQixJQUFNLElBQUksR0FBa0IsRUFBRSxDQUFDO1FBRS9CLDBDQUEwQztRQUMxQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3BDLHNFQUFzRTtZQUN0RSxhQUFhO1lBQ2IsSUFBSSxDQUFDLEdBQUcsc0RBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxzREFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BFLFNBQVM7YUFDWjtZQUVELHNFQUFzRTtZQUN0RSxhQUFhO1lBQ2IsSUFBSSxDQUFDLEdBQUcsc0RBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsc0RBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDaEcsU0FBUzthQUNaO1lBRUQsYUFBYTtZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztnQkFDVixhQUFhO2dCQUNiLENBQUMsRUFBRSxDQUFDLEdBQUcsc0RBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixhQUFhO2dCQUNiLENBQUMsRUFBRSxDQUFDLEdBQUcsc0RBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ssa0RBQTJCLEdBQW5DLFVBQW9DLFVBQWtCO1FBQ2xELElBQU0sYUFBYSxHQUFhLEVBQUUsQ0FBQztRQUVuQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNqRCxJQUFJLGNBQWMsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUU5RSxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQzNDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNyRTtZQUVELGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDdEM7UUFFRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLFFBQUMsR0FBRyxDQUFDLEVBQUwsQ0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSywyQ0FBb0IsR0FBNUIsVUFBNkIsSUFBbUIsRUFBRSxhQUF1QjtRQUNyRSxJQUFJLE1BQU0sR0FBVyxDQUFDLENBQUM7UUFFdkIsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDbEIsYUFBYTtZQUNiLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV2QixJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDMUQsTUFBTSxJQUFJLENBQUMsQ0FBQzthQUNmO1NBQ0o7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUxEO0lBSUksK0JBQ1UsYUFBNEIsRUFDNUIsZ0JBQWtDLEVBQ2xDLFFBQXNCO1FBRnRCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQU54QixXQUFNLEdBQWdDLElBQUksQ0FBQztRQUMzQyxZQUFPLEdBQTZCLElBQUksQ0FBQztRQU8vQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUV6RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQTJCLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLDJDQUFXLEdBQWxCO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxpREFBaUIsR0FBeEIsVUFBeUIsUUFBa0I7UUFDekMsYUFBYTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSx1REFBdUIsR0FBOUIsVUFBK0IsUUFBa0I7UUFDL0MsYUFBYTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTyw4Q0FBYyxHQUF0QjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBRTFDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUM7UUFDcEQsU0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQTFDLEtBQUssYUFBRSxNQUFNLFlBQTZCLENBQUM7UUFFbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBTSxLQUFLLE9BQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQU0sTUFBTSxPQUFJLENBQUM7UUFFekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREg7SUFDRSxtQkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDO0lBRS9CLGlDQUFhLEdBQXBCLFVBQXFCLElBQVk7UUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLDhCQUFVLEdBQWpCLFVBQWtCLEVBQVU7UUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLDZCQUFTLEdBQWhCLFVBQWlCLFFBQWtCO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFVBQVMsS0FBSztZQUN0RSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJNLElBQU0sYUFBYSxHQUFVLFNBQVMsQ0FBQztBQUN2QyxJQUFNLGFBQWEsR0FBVyxDQUFDLENBQUM7QUFDaEMsSUFBTSxhQUFhLEdBQVUsU0FBUyxDQUFDO0FBQ3ZDLElBQU0sc0JBQXNCLEdBQVUsU0FBUyxDQUFDO0FBQ2hELElBQU0sYUFBYSxHQUFVLFdBQVcsQ0FBQztBQUN6QyxJQUFNLFVBQVUsR0FBVSxPQUFPLENBQUM7QUFDbEMsSUFBTSxZQUFZLEdBQVUsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDSjhGO0FBRzNJO0lBS0ksc0JBQ1UsZUFBdUMsRUFDdkMsWUFBNEI7UUFENUIsb0JBQWUsR0FBZixlQUFlLENBQXdCO1FBQ3ZDLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQU45QixZQUFPLEdBQW1CLElBQUksQ0FBQztRQVFyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBRTVFLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLCtCQUFRLEdBQWYsVUFDRSxFQUFvQixFQUNwQixFQUFvQztZQURsQyxLQUFLLGFBQUUsR0FBRztZQUNaLHFCQUFrQyxFQUFFLE9BQWxDLEtBQUssYUFBRSxLQUFLO1FBRWQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxxREFBYSxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLHFEQUFhLENBQUM7UUFFaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixFQUFjLEVBQUUsRUFBdUIsRUFBRSxLQUFjLEVBQUUsVUFBMEI7WUFBakYsQ0FBQyxTQUFFLENBQUM7WUFBWSxLQUFLLGFBQUUsTUFBTTtRQUEwQiw4Q0FBMEI7UUFDbkcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsOERBQXNCLENBQUM7UUFDaEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFM0MsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFFLENBQUMsS0FBRSxFQUFFLEVBQUUsS0FBSyxTQUFFLE1BQU0sVUFBRSxDQUFDLENBQUM7U0FDL0M7SUFDSCxDQUFDO0lBRU0saUNBQVUsR0FBakIsVUFBa0IsRUFBYyxFQUFFLEVBQXVCLEVBQUUsS0FBYTtZQUFwRCxDQUFDLFNBQUUsQ0FBQztZQUFZLEtBQUssYUFBRSxNQUFNO1FBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUUsQ0FBQyxLQUFFLEVBQUUsRUFBRSxLQUFLLFNBQUUsTUFBTSxVQUFFLEVBQUUscURBQWEsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFNLE1BQU0sR0FBRyxDQUFDLGFBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxrREFBVSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLCtCQUFRLEdBQWYsVUFBZ0IsRUFBYyxFQUFFLEVBQXVCO1lBQXJDLENBQUMsU0FBRSxDQUFDO1lBQVksS0FBSyxhQUFFLE1BQU07UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBRSxDQUFDLEtBQUUsRUFBRSxFQUFFLEtBQUssU0FBRSxNQUFNLFVBQUUsRUFBRSw4REFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVNLCtCQUFRLEdBQWYsVUFBZ0IsRUFBYyxFQUFFLEVBQXVCO1lBQXJDLENBQUMsU0FBRSxDQUFDO1lBQVksS0FBSyxhQUFFLE1BQU07UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBRSxDQUFDLEtBQUUsRUFBRSxFQUFFLEtBQUssU0FBRSxNQUFNLFVBQUUsRUFBRSxxREFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU8sa0NBQVcsR0FBbkIsVUFBb0IsRUFBYyxFQUFFLEVBQXVCO1lBQXJDLENBQUMsU0FBRSxDQUFDO1lBQVksS0FBSyxhQUFFLE1BQU07UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsb0RBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xFeUU7QUFPNUU7SUFjSSxnQkFDWSxRQUFzQixFQUN0QixlQUF1QyxFQUN2QyxNQUFjLEVBQ2QsYUFBNEIsRUFDNUIsT0FBc0IsRUFDdEIsU0FBd0IsRUFDeEIsT0FBd0I7UUFOeEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUN0QixvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7UUFDdkMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBZTtRQUN4QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQXBCNUIsV0FBTSxHQUFnQyxJQUFJLENBQUM7UUFDM0MsV0FBTSxHQUEwQixJQUFJLENBQUM7UUFDckMsb0JBQWUsR0FBMEIsSUFBSSxDQUFDO1FBQzlDLGlCQUFZLEdBQTBCLElBQUksQ0FBQztRQUMzQyxzQkFBaUIsR0FBMEIsSUFBSSxDQUFDO1FBQ2hELG1CQUFjLEdBQTBCLElBQUksQ0FBQztRQUM3QyxrQkFBYSxHQUEwQixJQUFJLENBQUM7UUFDNUMsV0FBTSxHQUEwQixJQUFJLENBQUM7UUFJckMsZ0NBQTJCLEdBQVcsQ0FBQyxDQUFDO1FBVzVDLElBQUksQ0FBQyxNQUFNLEdBQXNCLGFBQWEsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7OztPQUlHO0lBQ0kscUJBQUksR0FBWDtRQUFBLGlCQXdCQztRQXZCRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQVk7WUFDdEMsOENBQThDO1lBQzlDLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTdDLElBQUksVUFBVSxFQUFFO2dCQUNaLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMxQztZQUVELEtBQUssSUFBSSxHQUFHLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xDLElBQU0sTUFBTSxHQUFzQixLQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFN0UsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUNuQixhQUFhO2dCQUNiLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUVyRCxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuQztZQUVELEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTNFLEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxzQkFBSyxHQUFiO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQjtZQUNwQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7U0FDeEM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUV0QyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRU8sMkJBQVUsR0FBbEI7UUFBQSxpQkFPQztRQU5HLElBQUksT0FBTyxHQUFXLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztZQUM3QixLQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN4RCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU8sMEJBQVMsR0FBakIsVUFBa0IsS0FBYztRQUM1QixhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWxDLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsSUFBSSxFQUFFLFdBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFHO2dCQUMxQyxhQUFhO2dCQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVc7YUFDekMsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLDRCQUFXLEdBQW5CLFVBQW9CLEtBQVk7UUFDNUIsYUFBYTtRQUNiLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2QsSUFBSSxFQUFFLE9BQU87WUFDYixhQUFhO1lBQ2IsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSztTQUM1QixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLHNDQUFxQixHQUE3QixVQUE4QixLQUFhO1FBQ3ZDLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsYUFBYTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDOUM7UUFFRCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLHlDQUF3QixHQUFoQztRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxnQ0FBZSxHQUF2QjtRQUNJLElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBRTVDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ25CLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDUCxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVPLDJCQUFVLEdBQWxCLFVBQW1CLEVBQWdDO1lBQTlCLE9BQU8sZUFBRSxPQUFPO1FBQ2pDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsa0NBQWtDO2dCQUMzRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyw2QkFBNkI7Z0JBQ2xELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQjthQUNwQztpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7YUFDekQ7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtnQkFDbkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUZBQXlGO2FBQzFIO1NBQ0o7SUFDTCxDQUFDO0lBRU8saUNBQWdCLEdBQXhCLFVBQXlCLEtBQWlCO1FBQ3RDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDO0lBRU8sd0JBQU8sR0FBZixVQUFnQixPQUFlLEVBQUUsT0FBZTtRQUM1QyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pGLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFakYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU8sa0NBQWlCLEdBQXpCLFVBQTBCLElBQVM7UUFDL0IsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3pCLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3RTs7Ozs7ZUFLRztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xFLElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBRWpDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDdEM7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUVsQyxTQUFTO2lCQUNaO2FBQ0o7aUJBQU07Z0JBQ0gsU0FBUzthQUNaO1NBQ0o7SUFDTCxDQUFDO0lBRU8sZ0NBQWUsR0FBdkIsVUFBd0IsSUFBUztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNuQixDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbEMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLDREQUFhLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU8saUNBQWdCLEdBQXhCLFVBQXlCLElBQVM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDbkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5QixDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2xDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVPLDZCQUFZLEdBQXBCLFVBQXFCLElBQVM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDakIsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5QixDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2xDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWxCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyw2QkFBWSxHQUFwQjtRQUNVLFNBQXNDLElBQUksQ0FBQyxNQUFNLEVBQS9DLGFBQWEscUJBQUUsS0FBSyxhQUFFLFNBQVMsZUFBZ0IsQ0FBQztRQUV4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEM7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVPLHdCQUFPLEdBQWYsVUFBZ0IsSUFBUztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbEMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFFMUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7U0FDdEM7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsMkJBQTJCLEVBQUU7WUFDMUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFTywyQkFBVSxHQUFsQixVQUFtQixJQUFTO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNsQyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUscUVBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFFMUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRU8sK0JBQWMsR0FBdEIsVUFBdUIsQ0FBUztRQUM1QixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBRU8sZ0NBQWUsR0FBdkIsVUFBd0IsQ0FBUztRQUM3QixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUM1QyxDQUFDO0lBRU8seUJBQVEsR0FBaEIsVUFBaUIsS0FBc0I7UUFBdkMsaUJBY0M7UUFkZ0IscUNBQXNCO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEIsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFFNUMsSUFBSSxLQUFLLEVBQUU7WUFDUCx5Q0FBeUM7WUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUM1QztRQUVELFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xWRDtJQUNJLG1CQUNZLFNBQW1CLEVBQ25CLFFBQWtCO1FBRGxCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUMzQixDQUFDO0lBRUo7Ozs7Ozs7T0FPRztJQUNJLHNDQUFrQixHQUF6QixVQUEwQixHQUFXLEVBQUUsR0FBVztRQUM5QyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSyxrQ0FBYyxHQUFyQixVQUFzQixDQUFTO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdCaUM7QUFFbEMsOEJBQThCO0FBQ3ZCLElBQU0sUUFBUSxHQUFpQjtJQUNsQyxVQUFVLEVBQUU7UUFDUixLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxHQUFHO0tBQ2Q7SUFDRCxNQUFNO0NBQ1Q7Ozs7Ozs7Ozs7Ozs7OztBQ1JELG9DQUFvQztBQUM3QixJQUFNLE1BQU0sR0FBbUI7SUFDbEMsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFVBQVU7UUFDaEIsU0FBUyxFQUFFLEVBQUU7UUFDYixTQUFTLEVBQUUsRUFBRTtRQUNiLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsRUFBRTtRQUNiLFNBQVMsRUFBRSxFQUFFO1FBQ2IsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFNBQVMsRUFBRSxFQUFFO1FBQ2IsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsS0FBSztLQUNsQjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLEdBQUc7UUFDZCxTQUFTLEVBQUUsRUFBRTtRQUNiLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsR0FBRztRQUNkLFNBQVMsRUFBRSxFQUFFO1FBQ2IsUUFBUSxFQUFFLEtBQUs7S0FDbEI7SUFDRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLFNBQVMsRUFBRSxHQUFHO1FBQ2QsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsS0FBSztLQUNsQjtDQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDd0I7QUFDQTtBQUV6QjtJQUlJO1FBSFEsaUJBQVksR0FBYSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFVLEVBQUUsQ0FBQztJQUVkLENBQUM7SUFFaEIsNkJBQVEsR0FBUixVQUFTLElBQVk7UUFDakIsMENBQTBDO1FBQzFDLG9CQUFvQjtRQUNwQixrQ0FBa0M7UUFDbEMsSUFBSTtRQUVKLElBQU0sR0FBRyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxTQUFPLElBQUksU0FBTSxDQUFDO1FBRTVCLGdDQUFnQztRQUNoQywyQkFBMkI7UUFFM0IsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkJELDJDQUEyQztBQUMzQztJQUNJLHFCQUNZLE9BQWdCO1FBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7SUFDekIsQ0FBQztJQUVKLDBCQUFJLEdBQUosVUFBSyxFQUE0QjtZQUExQixJQUFJLFlBQUUsS0FBSztRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQseUJBQUcsR0FBSCxVQUFJLElBQWlCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7VUNmRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZitDO0FBQ1M7QUFDaEI7QUFDTTtBQUNSO0FBQ1E7QUFDRjtBQUNBO0FBRXRCO0FBQ3dCO0FBRTlDLElBQU0sZ0JBQWdCLEdBQUc7SUFDckIsZ0JBQWdCLEVBQUUsQ0FBQztDQUN0QjtBQUVELElBQU0sT0FBTyxHQUFHLElBQUksdURBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckQsSUFBTSxZQUFZLEdBQUcsSUFBSSxxREFBVSxFQUFFLENBQUM7QUFDdEMsSUFBTSxTQUFTLEdBQUcsSUFBSSxpREFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLElBQU0sZUFBZSxHQUFHLElBQUksaUVBQXFCLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLHFEQUFRLENBQUMsQ0FBQztBQUN6RixJQUFNLE1BQU0sR0FBRyxJQUFJLHVEQUFZLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQy9ELElBQU0sU0FBUyxHQUFHLElBQUksdURBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6RCxJQUFNLE9BQU8sR0FBRyxJQUFJLHdEQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDNUMsSUFBTSxNQUFNLEdBQUcsSUFBSSwrQ0FBTSxDQUFDLHFEQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUVyRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW1nL2JvbWIucG5nIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9pbWcvZmxhZy5wbmciLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2luZGV4LnNjc3M/MjA2ZiIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvYnVpbGRlci9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2J1aWxkZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2NvbnRleHQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2RvbS9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZHJhd2VyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZHJhd2VyL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9nYW1lL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9nZW5lcmF0b3IvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3NldHRpbmdzL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9zZXR0aW5ncy9sZXZlbHMudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3NvdXJjZS9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc3RvcmFnZS9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvYm9tYi5wbmdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL2ZsYWcucG5nXCI7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgQXJlYVN0cnVjdHVyZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKlxuICog0J7RgtC90L7RgdC40YLQtdC70YzQvdGL0LUg0LrQvtC+0YDQtNC40L3QsNGC0Ysg0YHQvtGB0LXQtNC90LjRhSDRj9GH0LXQtdC6INC+0LHQu9Cw0YHRgtC4XG4gKiBcbiAqICMxIzIjMyNcbiAqICM4LSstNCNcbiAqICM3IzYjNSNcbiAqL1xuZXhwb3J0IGNvbnN0IEFSRUFfU1RSVUNUVVJFOiBBcmVhU3RydWN0dXJlID0ge1xuICAgIDA6IHsgeDogLTEsIHk6IC0xIH0sXG4gICAgMTogeyB4OiAwLCB5OiAtMSB9LFxuICAgIDI6IHsgeDogMSwgeTogLTEgfSxcbiAgICAzOiB7IHg6IDEsIHk6IDAgfSxcbiAgICA0OiB7IHg6IDEsIHk6IDEgfSxcbiAgICA1OiB7IHg6IDAsIHk6IDEgfSxcbiAgICA2OiB7IHg6IC0xLCB5OiAxIH0sXG4gICAgNzogeyB4OiAtMSwgeTogMCB9LFxufSIsImltcG9ydCB7IENvbXBsZXhpdHksIENvbXBsZXhpdHlMaXN0LCBHYW1lU2V0dGluZ3MgfSBmcm9tIFwiLi4vc2V0dGluZ3MvdHlwZXNcIjtcbmltcG9ydCB7IEFyZWFTdHJ1Y3R1cmUsIE1hcFN0cnVjdHVyZSwgU3lzdGVtQnVpbGRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBBUkVBX1NUUlVDVFVSRSB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgTWF0aEdlbmVyYXRvciB9IGZyb20gXCIuLi9nZW5lcmF0b3IvdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIExldmVsQnVpbGRlciBpbXBsZW1lbnRzIFN5c3RlbUJ1aWxkZXIge1xuICAgIHByaXZhdGUgZmllbGRTaXplOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBib21iQ291bnQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGNhbnZhc1NpemU6IFNpemU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0b3I6IE1hdGhHZW5lcmF0b3IsXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICog0JHQuNC70LTQuNGCINGD0YDQvtCy0LXQvdGMXG4gICAgICogXG4gICAgICogQHBhcmFtIHtHYW1lU2V0dGluZ3N9IHNldHRpbmdzIC0g0L3QsNGB0YLRgNC+0LnQutC4INC40LPRgNGLXG4gICAgICogXG4gICAgICogQHJldHVybnMge01hcFN0cnVjdHVyZX1cbiAgICAgKi9cbiAgICBwdWJsaWMgYnVpbGQoc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyk6IE1hcFN0cnVjdHVyZSB7XG4gICAgICAgIGNvbnN0IHsgZmllbGRTaXplLCBib21iQ291bnQgfSA9IHRoaXMuZ2V0U2VsZWN0ZWRMZXZlbChzZXR0aW5ncy5sZXZlbHMpO1xuXG4gICAgICAgIHRoaXMuZmllbGRTaXplID0gZmllbGRTaXplO1xuICAgICAgICB0aGlzLmJvbWJDb3VudCA9IGJvbWJDb3VudDtcbiAgICAgICAgdGhpcy5jYW52YXNTaXplID0gc2V0dGluZ3MuY2FudmFzU2l6ZTtcblxuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLmdlbmVyYXRlTWFwU3RydWN0dXJlKCk7XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXRgiDQstGL0LHRgNCw0L3QvdGL0Lkg0YPRgNC+0LLQtdC90Ywg0YHQu9C+0LbQvdC+0YHRgtC4INC40Lcg0YHQv9C40YHQutCwXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wbGV4aXR5TGlzdH0gbGV2ZWxzIC0g0YHQv9C40YHQvtC6INGD0YDQvtCy0L3QtdC5INGB0LvQvtC20L3QvtGB0YLQuFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtDb21wbGV4aXR5fVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRMZXZlbChsZXZlbHM6IENvbXBsZXhpdHlMaXN0KTogQ29tcGxleGl0eSB7XG4gICAgICAgIGxldCBzZWxlY3RlZExldmVsOiBDb21wbGV4aXR5O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBsZXZlbHMpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGlmIChsZXZlbHNba2V5XS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBzZWxlY3RlZExldmVsID0gbGV2ZWxzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRMZXZlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQk9C10L3QtdGA0LjRgNGD0LXRgiDRgdGC0YDRg9C60YLRg9GA0YMg0L/QvtC70Y8g0LTQu9GPINCy0YvQsdGA0LDQvdC90L7Qs9C+INGD0YDQvtCy0L3RjyDRgdC70L7QttC90L7RgdGC0LhcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1NpemV9IGNhbnZhc1NpemUgLSDRgNCw0LfQvNC10YAg0LrQsNC90LLQsNGB0LAg0LIg0L/QuNC60YHQtdC70Y/RhVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmaWVsZFNpemUgLSDRgNCw0LfQvNC10YAg0LjQs9GA0L7QstC+0LPQviDQv9C+0LvRjyDQsiDQutC70LXRgtC60LDRhVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBib21iQ291bnQgLSDQutC+0LvQuNGH0LXRgdGC0LLQviDQsdC+0LzQsSDQvdCwINC40LPRgNC+0LLQvtC8INC/0L7Qu9C1XG4gICAgICogXG4gICAgICogQHJldHVybnMge01hcFN0cnVjdHVyZX1cbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlTWFwU3RydWN0dXJlKCk6IE1hcFN0cnVjdHVyZSB7XG4gICAgICAgIGNvbnN0IG1hcFN0cnVjdHVyZTogTWFwU3RydWN0dXJlID0ge1xuICAgICAgICAgICAgcGl4ZWxzQ291bnRJbkNlbGw6IHRoaXMuY2FudmFzU2l6ZS53aWR0aCAvIHRoaXMuZmllbGRTaXplLFxuICAgICAgICAgICAgYm9tYkNvdW50OiB0aGlzLmJvbWJDb3VudCxcbiAgICAgICAgICAgIGJvbWJMZWZ0OiB0aGlzLmJvbWJDb3VudCxcbiAgICAgICAgICAgIGNlbGxzOiB7fSxcbiAgICAgICAgICAgIGJvbWJQb3NpdGlvbnM6IFtdLFxuICAgICAgICAgICAgZmllbGRTaXplOiB0aGlzLmZpZWxkU2l6ZSxcbiAgICAgICAgfTtcblxuICAgICAgICBtYXBTdHJ1Y3R1cmUuYm9tYlBvc2l0aW9ucyA9IHRoaXMuZ2VuZXJhdGVSYW5kb21Cb21iUG9zaXRpb25zKHRoaXMuZmllbGRTaXplICogdGhpcy5maWVsZFNpemUpO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5maWVsZFNpemU7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmZpZWxkU2l6ZTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93OiBudW1iZXIgPSB5O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGw6IG51bWJlciA9IHg7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1hcFN0cnVjdHVyZS5jZWxsc1tyb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcFN0cnVjdHVyZS5jZWxsc1tyb3ddID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGhhc0JvbWI6IGJvb2xlYW4gPSBtYXBTdHJ1Y3R1cmUuYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyh4ICsgeSAqIHRoaXMuZmllbGRTaXplKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhcmVhOiBBcmVhU3RydWN0dXJlID0gdGhpcy5nZW5lcmF0ZUNlbGxBcmVhKHsgeCwgeSB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxTdHJ1Y3R1cmU6IGFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgeTogcm93LCBcbiAgICAgICAgICAgICAgICAgICAgeDogY2VsbCxcbiAgICAgICAgICAgICAgICAgICAgYXJlYSxcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzQm9tYikge1xuICAgICAgICAgICAgICAgICAgICBjZWxsU3RydWN0dXJlLmhhc0JvbWIgPSBoYXNCb21iO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxTdHJ1Y3R1cmUudmFsdWUgPSB0aGlzLmNhbGNCb21ic0Fyb3VuZENlbGxzKGFyZWEsIG1hcFN0cnVjdHVyZS5ib21iUG9zaXRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtYXBTdHJ1Y3R1cmUuY2VsbHNbcm93XVtjZWxsXSA9IGNlbGxTdHJ1Y3R1cmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhtYXBTdHJ1Y3R1cmUpO1xuXG4gICAgICAgIHJldHVybiBtYXBTdHJ1Y3R1cmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JPQtdC90LXRgNC40YDRg9C10YIg0L7QsdC70LDRgdGC0Ywg0Y/Rh9C10LXQuiDRgSDQuNGFINC60L7QvtGA0LTQuNC90LDRgtCw0LzQuCDQstC+0LrRgNGD0LMg0LLRi9Cx0YDQsNC90L3QvtC5INGP0YfQtdC50LrQuCDQvdCwINC+0YHQvdC+0LLQtSDQtdC1INC60L7QvtGA0LTQuNC90LDRglxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0g0LrQvtC+0YDQtNC40L3QsNGC0LAgJ3gnINGP0YfQtdC50LrQuFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0g0LrQvtC+0YDQtNC40L3QsNGC0LAgJ3knINGP0YfQtdC50LrQuFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtBcmVhU3RydWN0dXJlfVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVDZWxsQXJlYSh7IHgsIHkgfTogQ2VsbCk6IEFyZWFTdHJ1Y3R1cmUge1xuICAgICAgICBjb25zdCBhcmVhOiBBcmVhU3RydWN0dXJlID0ge307XG4gICAgXG4gICAgICAgIC8vIDggLSDQutC+0LvQuNGH0LXRgdGC0LLQviDRj9GH0LXQtdC6INCy0L7QutGA0YPQsyDRhtC10L3RgtGA0LDQu9GM0L3QvtC5XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA4OyBpbmRleCsrKSB7XG4gICAgICAgICAgICAvKiog0J/RgNC+0LLQtdGA0Y/QtdC8LCDQvdC1INCy0YvRhdC+0LTQuNGCINC70Lgg0Y/Rh9C10LnQutCwINC30LAg0LvQtdCy0YPRjiDQuCDQstC10YDRhdC90Y7RjiDQs9GA0LDQvdC40YbRiyDQv9C+0LvRjyAqL1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCA8IDAgfHwgeSArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS55IDwgMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiog0J/RgNC+0LLQtdGA0Y/QtdC8LCDQvdC1INCy0YvRhdC+0LTQuNGCINC70Lgg0Y/Rh9C10LnQutCwINC30LAg0L/RgNCw0LLRg9GOINC4INC90LjQttC90Y7RjiDQs9GA0LDQvdC40YbRiyDQv9C+0LvRjyAqL1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCA+PSB0aGlzLmZpZWxkU2l6ZSB8fCB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnkgPj0gdGhpcy5maWVsZFNpemUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgYXJlYVtpbmRleF0gPSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHg6IHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCxcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgeTogeSArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS55LFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JPQtdC90LXRgNC40YDRg9C10YIg0YDQsNC90LTQvtC80L3Ri9C1INC/0L7Qt9C40YbQuNC4INC00LvRjyDRgNCw0YHQv9C+0LvQvtC20LXQvdC40Y8g0LHQvtC80LEg0L3QsCDQv9C+0LvQtVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjZWxsc0NvdW50IC0g0LrQvtC70LjRh9C10YHRgtCy0L4g0Y/Rh9C10LXQuiDQvdCwINC/0L7Qu9C1XG4gICAgICogXG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVSYW5kb21Cb21iUG9zaXRpb25zKGNlbGxzQ291bnQ6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICAgICAgY29uc3QgYm9tYlBvc2l0aW9uczogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5ib21iQ291bnQ7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCByYW5kb21Qb3NpdGlvbjogbnVtYmVyID0gdGhpcy5nZW5lcmF0b3IuZ2V0UmFuZG9tQXJiaXRyYXJ5KDEsIGNlbGxzQ291bnQpO1xuXG4gICAgICAgICAgICB3aGlsZSAoYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyhyYW5kb21Qb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICByYW5kb21Qb3NpdGlvbiA9IHRoaXMuZ2VuZXJhdG9yLmdldFJhbmRvbUFyYml0cmFyeSgxLCBjZWxsc0NvdW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYm9tYlBvc2l0aW9ucy5wdXNoKHJhbmRvbVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib21iUG9zaXRpb25zLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodGH0LjRgtCw0LXRgiDQutC+0LvQuNGH0LXRgdGC0LLQviDQsdC+0LzQsSDQstC+0LrRgNGD0LMg0Y/Rh9C10LnQutC4XG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcmVhU3RydWN0dXJlfSBhcmVhXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gYm9tYlBvc2l0aW9uc1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjQm9tYnNBcm91bmRDZWxscyhhcmVhOiBBcmVhU3RydWN0dXJlLCBib21iUG9zaXRpb25zOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZWEpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBhcmVhW2tleV07XG5cbiAgICAgICAgICAgIGlmIChib21iUG9zaXRpb25zLmluY2x1ZGVzKGNlbGwueCArIGNlbGwueSAqIHRoaXMuZmllbGRTaXplKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59IiwiaW1wb3J0IHsgRWxlbWVudFNvdXJjZSwgUGl4ZWxSYXRpb1NvdXJjZSB9IGZyb20gXCIuLi9kb20vdHlwZXNcIjtcbmltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5ncy90eXBlc1wiO1xuaW1wb3J0IHsgRHJhd2luZ0NvbnRleHQsIERyYXdpbmdDb250ZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzQ29udGV4dFByb3ZpZGVyIGltcGxlbWVudHMgRHJhd2luZ0NvbnRleHRQcm92aWRlciB7XG4gICAgcHJpdmF0ZSBjYW52YXM6IE51bGxhYmxlPEhUTUxDYW52YXNFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBjb250ZXh0OiBOdWxsYWJsZTxEcmF3aW5nQ29udGV4dD4gPSBudWxsO1xuICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZWxlbWVudFNvdXJjZTogRWxlbWVudFNvdXJjZSxcbiAgICAgIHByaXZhdGUgcGl4ZWxSYXRpb1NvdXJjZTogUGl4ZWxSYXRpb1NvdXJjZSxcbiAgICAgIHByaXZhdGUgc2V0dGluZ3M6IEdhbWVTZXR0aW5nc1xuICAgICkge1xuICAgICAgY29uc3QgY2FudmFzID0gdGhpcy5lbGVtZW50U291cmNlLmdldEVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICBpZiAoIWNhbnZhcykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgYSBjYW52YXMuXCIpO1xuICBcbiAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgdGhpcy5ub3JtYWxpemVTY2FsZSgpO1xuICAgIH1cbiAgXG4gICAgcHVibGljIGdldEluc3RhbmNlKCk6IERyYXdpbmdDb250ZXh0IHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGxpc3RlbkNhbnZhc0NsaWNrKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGlzdGVuQ2FudmFzQ29udGV4dE1lbnUoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgY2FsbGJhY2spO1xuICAgIH1cbiAgXG4gICAgcHJpdmF0ZSBub3JtYWxpemVTY2FsZSgpOiB2b2lkIHtcbiAgICAgIGlmICghdGhpcy5jYW52YXMgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuO1xuICBcbiAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5waXhlbFJhdGlvU291cmNlLmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5zZXR0aW5ncy5jYW52YXNTaXplO1xuICBcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGggKiByYXRpbztcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodCAqIHJhdGlvO1xuICBcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgXG4gICAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmNvbnRleHQuc2NhbGUocmF0aW8sIHJhdGlvKTtcbiAgICB9XG4gIH0iLCJpbXBvcnQgeyBFbGVtZW50U291cmNlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIERvbVNvdXJjZSBpbXBsZW1lbnRzIEVsZW1lbnRTb3VyY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdpbmRvdzogV2luZG93KSB7fVxuXG4gIHB1YmxpYyBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZyk6IE51bGxhYmxlPEhUTUxFbGVtZW50PiB7XG4gICAgcmV0dXJuIHRoaXMud2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RWxlbWVudChpZDogc3RyaW5nKTogTnVsbGFibGU8SFRNTEVsZW1lbnQ+IHtcbiAgICByZXR1cm4gdGhpcy53aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICB9XG5cbiAgcHVibGljIGFmdGVyTG9hZChjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgY2FsbGJhY2soZXZlbnQpO1xuICAgIH0pO1xuICB9XG59IiwiZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09MT1I6IENvbG9yID0gJyMwMDAwMDAnO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfV0lEVEg6IExlbmd0aCA9IDE7XG5leHBvcnQgY29uc3QgTUFJTl9CR19DT0xPUjogQ29sb3IgPSAnIzIxMjEyMSc7XG5leHBvcnQgY29uc3QgSU5JVElBTF9GSUVMRF9CR19DT0xPUjogQ29sb3IgPSAnIzY2NjZGRic7XG5leHBvcnQgY29uc3QgRkxBR19CR19DT0xPUjogQ29sb3IgPSAnbGlnaHRncmF5JztcbmV4cG9ydCBjb25zdCBURVhUX0NPTE9SOiBDb2xvciA9ICd3aGl0ZSc7XG5leHBvcnQgY29uc3QgQk9SREVSX0NPTE9SOiBDb2xvciA9ICcjMzMzMzMzJzsiLCJpbXBvcnQgeyBEcmF3aW5nQ29udGV4dCwgRHJhd2luZ0NvbnRleHRQcm92aWRlciB9IGZyb20gXCIuLi9jb250ZXh0L3R5cGVzXCI7XG5pbXBvcnQgeyBTb3VyY2VQcm92aWRlciB9IGZyb20gXCIuLi9zb3VyY2UvdHlwZXNcIjtcbmltcG9ydCB7IERFRkFVTFRfQ09MT1IsIERFRkFVTFRfV0lEVEgsIE1BSU5fQkdfQ09MT1IsIElOSVRJQUxfRklFTERfQkdfQ09MT1IsIFRFWFRfQ09MT1IsIEZMQUdfQkdfQ09MT1IsIEJPUkRFUl9DT0xPUiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgQnJ1c2hTZXR0aW5ncywgRHJhd2VyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc0RyYXdlciBpbXBsZW1lbnRzIERyYXdlciB7XG4gICAgcHJpdmF0ZSBjb250ZXh0OiBEcmF3aW5nQ29udGV4dCA9IG51bGw7XG4gICAgcHJpdmF0ZSBib21iOiBhbnk7XG4gICAgcHJpdmF0ZSBmbGFnOiBhbnk7XG4gIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBjb250ZXh0UHJvdmlkZXI6IERyYXdpbmdDb250ZXh0UHJvdmlkZXIsXG4gICAgICBwcml2YXRlIGZpbGVQcm92aWRlcjogU291cmNlUHJvdmlkZXJcbiAgICApIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY29udGV4dFByb3ZpZGVyLmdldEluc3RhbmNlKCk7XG4gICAgICBpZiAoIXRoaXMuY29udGV4dCkgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGFjY2VzcyB0aGUgZHJhd2luZyBjb250ZXh0LlwiKTtcblxuICAgICAgdGhpcy5ib21iID0gZmlsZVByb3ZpZGVyLmdldEltYWdlKCdib21iJyk7XG4gICAgICB0aGlzLmZsYWcgPSBmaWxlUHJvdmlkZXIuZ2V0SW1hZ2UoJ2ZsYWcnKTtcbiAgICB9XG4gIFxuICAgIHB1YmxpYyBkcmF3TGluZShcbiAgICAgIHsgc3RhcnQsIGVuZCB9OiBMaW5lLFxuICAgICAgeyBjb2xvciwgd2lkdGggfTogQnJ1c2hTZXR0aW5ncyA9IHt9XG4gICAgKTogdm9pZCB7XG4gICAgICBpZiAoIXRoaXMuY29udGV4dCkgcmV0dXJuO1xuICBcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yID8/IERFRkFVTFRfQ09MT1I7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gd2lkdGggPz8gREVGQVVMVF9XSURUSDtcbiAgXG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHN0YXJ0LngsIHN0YXJ0LnkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhlbmQueCwgZW5kLnkpO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3U3F1YXJlKHsgeCwgeSB9OiBDZWxsLCB7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSwgY29sb3I/OiBzdHJpbmcsIGhhc0JvcmRlcnM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICBpZiAoIXRoaXMuY29udGV4dCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3IgPyBjb2xvciA6IElOSVRJQUxfRklFTERfQkdfQ09MT1I7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgIGlmIChoYXNCb3JkZXJzKSB7XG4gICAgICAgIHRoaXMuZHJhd0JvcmRlcnMoeyB4LCB5IH0sIHsgd2lkdGgsIGhlaWdodCB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhd051bWJlcih7IHgsIHkgfTogQ2VsbCwgeyB3aWR0aCwgaGVpZ2h0IH06IFNpemUsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd1NxdWFyZSh7IHgsIHkgfSwgeyB3aWR0aCwgaGVpZ2h0IH0sIE1BSU5fQkdfQ09MT1IpO1xuXG4gICAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAke2hlaWdodCAvIDJ9cHggQXJpYWxgO1xuXHRcdCAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFRFWFRfQ09MT1I7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoU3RyaW5nKHZhbHVlKSwgeCArICh3aWR0aCAvIDIuNSksIHkgKyAoaGVpZ2h0IC8gMS41KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdCb21iKHsgeCwgeSB9OiBDZWxsLCB7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSk6IHZvaWQge1xuICAgICAgdGhpcy5kcmF3U3F1YXJlKHsgeCwgeSB9LCB7IHdpZHRoLCBoZWlnaHQgfSwgSU5JVElBTF9GSUVMRF9CR19DT0xPUiwgZmFsc2UpO1xuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmJvbWIsIHggKyAod2lkdGggLyA0KSwgeSArIChoZWlnaHQgLyA0KSwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhd0ZsYWcoeyB4LCB5IH06IENlbGwsIHsgd2lkdGgsIGhlaWdodCB9OiBTaXplKTogdm9pZCB7XG4gICAgICB0aGlzLmRyYXdTcXVhcmUoeyB4LCB5IH0sIHsgd2lkdGgsIGhlaWdodCB9LCBGTEFHX0JHX0NPTE9SLCBmYWxzZSk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuZmxhZywgeCArICh3aWR0aCAvIDQpLCB5ICsgKGhlaWdodCAvIDQpLCB3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0JvcmRlcnMoeyB4LCB5IH06IENlbGwsIHsgd2lkdGgsIGhlaWdodCB9OiBTaXplKTogdm9pZCB7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBCT1JERVJfQ09MT1I7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gIH0iLCJpbXBvcnQgeyBNYXBTdHJ1Y3R1cmUsIFN5c3RlbUJ1aWxkZXIgfSBmcm9tICcuLi9idWlsZGVyL3R5cGVzJztcbmltcG9ydCB7IERyYXdpbmdDb250ZXh0UHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L3R5cGVzJztcbmltcG9ydCB7IEVsZW1lbnRTb3VyY2UgfSBmcm9tICcuLi9kb20vdHlwZXMnO1xuaW1wb3J0IHsgSU5JVElBTF9GSUVMRF9CR19DT0xPUiwgTUFJTl9CR19DT0xPUiB9IGZyb20gJy4uL2RyYXdlci9jb25zdGFudHMnO1xuaW1wb3J0IHsgRHJhd2VyIH0gZnJvbSAnLi4vZHJhd2VyL3R5cGVzJztcbmltcG9ydCB7IE1hdGhHZW5lcmF0b3IgfSBmcm9tICcuLi9nZW5lcmF0b3IvdHlwZXMnO1xuaW1wb3J0IHsgR2FtZVNldHRpbmdzIH0gZnJvbSAnLi4vc2V0dGluZ3MvdHlwZXMnO1xuaW1wb3J0IHsgU3RvcmFnZVByb3ZpZGVyIH0gZnJvbSAnLi4vc3RvcmFnZS90eXBlcyc7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFNhcHBlciBpbXBsZW1lbnRzIEdhbWUge1xuICAgIHByaXZhdGUgc2VsZWN0OiBOdWxsYWJsZTxIVE1MU2VsZWN0RWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgYnV0dG9uOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgcmVzdWx0Q29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgd2luQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgbGVmdEJvbWJDb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSB0aW1lckNvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGdhbWVDb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBjYW52YXM6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBzeXN0ZW06IE1hcFN0cnVjdHVyZTtcbiAgICBwcml2YXRlIGNlbGxTaXplOiBTaXplO1xuICAgIHByaXZhdGUgdGltZXJJbnRlcnZhbDogYW55O1xuICAgIHByaXZhdGUgY291bnRDb3JyZWN0bHlTZWxlY3RlZEJvbWJzOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyxcbiAgICAgICAgcHJpdmF0ZSBjb250ZXh0UHJvdmlkZXI6IERyYXdpbmdDb250ZXh0UHJvdmlkZXIsXG4gICAgICAgIHByaXZhdGUgZHJhd2VyOiBEcmF3ZXIsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFNvdXJjZTogRWxlbWVudFNvdXJjZSxcbiAgICAgICAgcHJpdmF0ZSBidWlsZGVyOiBTeXN0ZW1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIGdlbmVyYXRvcjogTWF0aEdlbmVyYXRvcixcbiAgICAgICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlUHJvdmlkZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ID0gPEhUTUxTZWxlY3RFbGVtZW50PmVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnc2VsZWN0LWxldmVsJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdzdGFydC1nYW1lJyk7XG4gICAgICAgIHRoaXMuZ2FtZUNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnZ2FtZS1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLnJlc3VsdENvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgncmVzdWx0LWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLndpbkNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnd2luLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmxlZnRCb21iQ29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdsZWZ0LWJvbWInKTtcbiAgICAgICAgdGhpcy50aW1lckNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgndGltZXInKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQmNC90LjRhtC40LDQu9C40LfQuNGA0YPQtdC8INC00LDQvdC90YvQtSDQuNCz0YDRi1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRTb3VyY2UuYWZ0ZXJMb2FkKChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vINC/0YDQvtCx0YPQtdC8INGD0YHRgtCw0L3QvtCy0LjRgtGMINGB0YLQsNGA0YvQuSDQstGL0LHRgNCw0L3QvdGL0Lkg0YPRgNC+0LLQtdC90YxcbiAgICAgICAgICAgIGNvbnN0IHNhdmVkTGV2ZWwgPSB0aGlzLnN0b3JhZ2UuZ2V0KCdsZXZlbCcpO1xuXG4gICAgICAgICAgICBpZiAoc2F2ZWRMZXZlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlTGV2ZWxJblNldHRpbmdzKHNhdmVkTGV2ZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zZXR0aW5ncy5sZXZlbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSA8SFRNTE9wdGlvbkVsZW1lbnQ+dGhpcy5lbGVtZW50U291cmNlLmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0ga2V5O1xuICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGtleTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdGhpcy5zZXR0aW5ncy5sZXZlbHNba2V5XS5zZWxlY3RlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlTGV2ZWwuYmluZCh0aGlzKSwgZmFsc2UpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3RhcnQuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQodGC0LDRgNGC0YPQtdC8INC40LPRgNGDXG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGFydCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zeXN0ZW0gPSB0aGlzLmJ1aWxkZXIuYnVpbGQodGhpcy5zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuY2VsbFNpemUgPSB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc3lzdGVtLnBpeGVsc0NvdW50SW5DZWxsLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMubGVmdEJvbWJDb250YWluZXIudGV4dENvbnRlbnQgPSB0aGlzLnN5c3RlbS5ib21iTGVmdDtcbiAgICAgICAgdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudCA9ICcwJztcblxuICAgICAgICB0aGlzLmNoYW5nZVZpc2liaWxpdHlFbGVtZW50cygpO1xuICAgICAgICB0aGlzLm1ha2VJbml0aWFsRmlsbCgpO1xuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcblxuICAgICAgICB0aGlzLmNvbnRleHRQcm92aWRlci5saXN0ZW5DYW52YXNDbGljayh0aGlzLmNoZWNrQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY29udGV4dFByb3ZpZGVyLmxpc3RlbkNhbnZhc0NvbnRleHRNZW51KHRoaXMuY2hlY2tDb250ZXh0TWVudS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0VGltZXIoKTogdm9pZCB7XG4gICAgICAgIGxldCBzZWNvbmRzOiBudW1iZXIgPSAwO1xuICAgICAgICB0aGlzLnRpbWVyQ29udGFpbmVyLnRleHRDb250ZW50ID0gU3RyaW5nKHNlY29uZHMrKyk7XG5cbiAgICAgICAgdGhpcy50aW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudCA9IFN0cmluZyhzZWNvbmRzKyspO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3BUaW1lcihpc1dpbjogYm9vbGVhbik6IHZvaWQgIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVySW50ZXJ2YWwpO1xuXG4gICAgICAgIGlmIChpc1dpbikge1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNhdmUoe1xuICAgICAgICAgICAgICAgIG5hbWU6IGB0aW1lci0ke3RoaXMuc3RvcmFnZS5nZXQoJ2xldmVsJyl9YCxcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudGltZXJDb250YWluZXIudGV4dENvbnRlbnQsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JzQtdC90Y/QtdGCINGD0YDQvtCy0LXQvdGMINC/0L7RgdC70LUg0YHQvNC10L3RiyDQsiDRgdC10LvQtdC60YLQtVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gRE9NINGB0L7QsdGL0YLQuNC1XG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VMZXZlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmNoYW5nZUxldmVsSW5TZXR0aW5ncyhldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2F2ZSh7XG4gICAgICAgICAgICBuYW1lOiAnbGV2ZWwnLFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQnNC10L3Rj9C10YIg0YPRgNC+0LLQtdC90Ywg0LjQs9GA0Ysg0LIg0L3QsNGB0YLRgNC+0LnQutCw0YVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSDQstGL0LHRgNCw0L3QvdGL0Lkg0YPRgNC+0LLQtdC90YxcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUxldmVsSW5TZXR0aW5ncyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnNldHRpbmdzLmxldmVscykge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5sZXZlbHNba2V5XS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldHRpbmdzLmxldmVsc1t2YWx1ZV0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCc0LXQvdGP0LXRgiDQstC40LTQuNC80L7RgdGC0Ywg0LjQs9GA0L7QstGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0YHRgtGA0LDQvdC40YbQtVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlVmlzaWJpbGl0eUVsZW1lbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLnNlbGVjdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLmdhbWVDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgdGhpcy5jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0JfQsNC/0L7Qu9C90Y/QtdGCINCy0LXRgdGMINC60LDQvdCy0LDRgSDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHByaXZhdGUgbWFrZUluaXRpYWxGaWxsKCkge1xuICAgICAgICBjb25zdCBzaXplOiBTaXplID0gdGhpcy5zZXR0aW5ncy5jYW52YXNTaXplO1xuXG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdTcXVhcmUoe1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sIHNpemUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tDbGljayh7IG9mZnNldFgsIG9mZnNldFkgfTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsKG9mZnNldFgsIG9mZnNldFkpO1xuICAgICAgICBcbiAgICAgICAgLy8g0YfRgtC+0LHRiyDQvdCw0LbQsNGC0Ywg0L3QsCDQutC70LXRgtC60YMg0YEg0YTQu9Cw0LPQvtC8IC0g0LXQs9C+INC90YPQttC90L4g0YHQvdCw0YfQsNC70LAg0YHQvdGP0YLRjFxuICAgICAgICBpZiAoIWNlbGwuaGFzRmxhZykge1xuICAgICAgICAgICAgaWYgKGNlbGwuaGFzQm9tYikge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkJvbWJDZWxsKGNlbGwpOyAvLyDRgNC40YHRg9C10Lwg0LHQvtC80LHRgyDQsiDRg9C60LDQt9Cw0L3QvdC+0Lkg0LrQu9C10YLQutC1XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQWxsQm9tYnMoKTsgLy8g0YDQuNGB0YPQtdC8INCy0YHQtSDQvtGB0YLQsNC70YzQvdGL0LUg0LHQvtC80LHRi1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEdhbWUoKTsgLy8g0YHRgtC+0L/QvtGA0LjQvCDQuNCz0YDRg1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsLnZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTnVtYmVyU3F1YXJlKGNlbGwpOyAvLyDRgNC40YHRg9C10Lwg0LrQu9C10YLQutGDINGBINGG0LjRhNGA0L7QuVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5FbXB0eVNxdWFyZShjZWxsKTsgLy8g0YDQuNGB0YPQtdC8INC/0YPRgdGC0YPRjiDQutC70LXRgtC60YNcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZU9wZW5BcmVhKGNlbGwpOyAvLyDQv9GA0L7RhdC+0LTQuNC80YHRjyDQv9C+INGB0L7RgdC10LTRj9C8INC4INGA0LjRgdGD0LXQvCDQutC70LXRgtC60Lgg0LTQviDRgtC+0LPQviDQvNC+0LzQtdC90YLQsCwg0L/QvtC60LAg0L3QtSDQv9C+0Y/QstC40YLRgdGPINCyINC60LvQtdGC0LrQtSDRhtC40YTRgNCwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrQ29udGV4dE1lbnUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsKGV2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFkpO1xuXG4gICAgICAgIGlmICghY2VsbC5pc09wZW4pIHtcbiAgICAgICAgICAgIGlmICghY2VsbC5oYXNGbGFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGbGFnKGNlbGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZsYWcoY2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENlbGwob2Zmc2V0WDogbnVtYmVyLCBvZmZzZXRZOiBudW1iZXIpOiBhbnkge1xuICAgICAgICBjb25zdCB4ID0gdGhpcy5nZW5lcmF0b3IuZ2V0Rmxvb3JOdW1iZXIob2Zmc2V0WCAvIHRoaXMuc3lzdGVtLnBpeGVsc0NvdW50SW5DZWxsKTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMuZ2VuZXJhdG9yLmdldEZsb29yTnVtYmVyKG9mZnNldFkgLyB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtLmNlbGxzW3ldW3hdO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVjdXJzaXZlT3BlbkFyZWEoY2VsbDogYW55KSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4IGluIGNlbGwuYXJlYSkge1xuICAgICAgICAgICAgY29uc3Qgc3lzdGVtQ2VsbCA9IHRoaXMuc3lzdGVtLmNlbGxzW2NlbGwuYXJlYVtpbmRleF0ueV1bY2VsbC5hcmVhW2luZGV4XS54XTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiDQuNC3INC+0LHRgNCw0LHQvtGC0LrQuCDQv9GA0L7Qv9GD0YHQutCw0LXQvDpcbiAgICAgICAgICAgICAqICAtINC+0YLQutGA0YvRgtGD0Y4g0Y/Rh9C10LnQutGDXG4gICAgICAgICAgICAgKiAgLSDRj9GH0LXQudC60YMg0YEg0YTQu9Cw0LPQvtC8XG4gICAgICAgICAgICAgKiAgLSDRj9GH0LXQudC60YMg0YEg0LHQvtC80LHQvtC5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICghc3lzdGVtQ2VsbC5pc09wZW4gJiYgIXN5c3RlbUNlbGwuaGFzRmxhZyAmJiAhc3lzdGVtQ2VsbC5oYXNCb21iKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN5c3RlbUNlbGwudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRW1wdHlTcXVhcmUoc3lzdGVtQ2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZU9wZW5BcmVhKHN5c3RlbUNlbGwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbk51bWJlclNxdWFyZShzeXN0ZW1DZWxsKTtcblxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb3BlbkVtcHR5U3F1YXJlKGNlbGw6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3U3F1YXJlKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsV2lkdGgoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsSGVpZ2h0KGNlbGwueSksXG4gICAgICAgIH0sIHRoaXMuY2VsbFNpemUsIE1BSU5fQkdfQ09MT1IpO1xuXG4gICAgICAgIGNlbGwuaXNPcGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5OdW1iZXJTcXVhcmUoY2VsbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdOdW1iZXIoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxXaWR0aChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxIZWlnaHQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsU2l6ZSwgY2VsbC52YWx1ZSk7XG5cbiAgICAgICAgY2VsbC5pc09wZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3BlbkJvbWJDZWxsKGNlbGw6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3Qm9tYih7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbFdpZHRoKGNlbGwueCksXG4gICAgICAgICAgICB5OiB0aGlzLmNhbGNQaXhlbEhlaWdodChjZWxsLnkpLFxuICAgICAgICB9LCB0aGlzLmNlbGxTaXplKTtcblxuICAgICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuQWxsQm9tYnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHsgYm9tYlBvc2l0aW9ucywgY2VsbHMsIGZpZWxkU2l6ZSB9ID0gdGhpcy5zeXN0ZW07XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBPYmplY3Qua2V5cyhjZWxscykubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgT2JqZWN0LmtleXMoY2VsbHNbeV0pLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJvbWJQb3NpdGlvbnMuaW5jbHVkZXMoeCArIHkgKiBmaWVsZFNpemUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkJvbWJDZWxsKGNlbGxzW3ldW3hdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEZsYWcoY2VsbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdGbGFnKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsV2lkdGgoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsSGVpZ2h0KGNlbGwueSksXG4gICAgICAgIH0sIHRoaXMuY2VsbFNpemUpO1xuXG4gICAgICAgIGNlbGwuaGFzRmxhZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zeXN0ZW0uYm9tYkxlZnQgPSB0aGlzLnN5c3RlbS5ib21iTGVmdCAtIDE7XG4gICAgICAgIHRoaXMubGVmdEJvbWJDb250YWluZXIudGV4dENvbnRlbnQgPSB0aGlzLnN5c3RlbS5ib21iTGVmdDtcblxuICAgICAgICBpZiAoY2VsbC5oYXNCb21iKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50Q29ycmVjdGx5U2VsZWN0ZWRCb21icysrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3lzdGVtLmJvbWJMZWZ0ID09PSAwICYmIHRoaXMuc3lzdGVtLmJvbWJDb3VudCA9PT0gdGhpcy5jb3VudENvcnJlY3RseVNlbGVjdGVkQm9tYnMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEdhbWUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUZsYWcoY2VsbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdTcXVhcmUoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxXaWR0aChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxIZWlnaHQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsU2l6ZSwgSU5JVElBTF9GSUVMRF9CR19DT0xPUiwgZmFsc2UpO1xuXG4gICAgICAgIGNlbGwuaGFzRmxhZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc3lzdGVtLmJvbWJMZWZ0ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQgKyAxO1xuICAgICAgICB0aGlzLmxlZnRCb21iQ29udGFpbmVyLnRleHRDb250ZW50ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQ7XG5cbiAgICAgICAgaWYgKGNlbGwuaGFzQm9tYikge1xuICAgICAgICAgICAgdGhpcy5jb3VudENvcnJlY3RseVNlbGVjdGVkQm9tYnMtLTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY1BpeGVsV2lkdGgoeDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih4KSAqIHRoaXMuY2VsbFNpemUud2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjUGl4ZWxIZWlnaHQoeTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih5KSAqIHRoaXMuY2VsbFNpemUuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcEdhbWUoaXNXaW46IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3BUaW1lcihpc1dpbik7XG5cbiAgICAgICAgLy8g0L/QvtC60LDQt9GL0LLQsNC10Lwg0LrQvdC+0L/QutGDINGA0LXRgdGC0LDRgNGC0LBcbiAgICAgICAgdGhpcy5yZXN1bHRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcblxuICAgICAgICBpZiAoaXNXaW4pIHtcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCy0YvQuNCz0YDQsNC70LgsINC/0L7QutCw0LfRi9Cy0LDQtdC8INC/0L7Qt9C00YDQsNCy0LvQtdC90LjRj1xuICAgICAgICAgICAgdGhpcy53aW5Db250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncmVzdWx0LWNvbnRhaW5lci0taXMtdmlzaWJsZScpO1xuICAgICAgICB9LCA1MCk7XG4gICAgfVxufSIsImltcG9ydCB7IE1hdGhHZW5lcmF0b3IgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yIGltcGxlbWVudHMgTWF0aEdlbmVyYXRvciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZ2V0UmFuZG9tOiBGdW5jdGlvbixcbiAgICAgICAgcHJpdmF0ZSBnZXRGbG9vcjogRnVuY3Rpb24sXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YDQsNC90LTQvtC80L3QvtC1INGG0LXQu9C+0LUg0YfQuNGB0LvQviDQsiDQvtC/0YDQtdC00LXQu9C10L3QvdC+0Lwg0L/RgNC+0LzQtdC20YPRgtC60LVcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluIC0g0LzQuNC90LjQvNCw0LvRjNC90L7QtSDRh9C40YHQu9C+INC/0YDQvtC80LXQttGD0YLQutCwXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heCAtINC80LDQutGB0LjQvNCw0LvRjNC90L7QtSDRh9C40YHQu9C+INC/0YDQvtC80LXQttGD0YLQutCwXG4gICAgICogXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmFuZG9tQXJiaXRyYXJ5KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZsb29yTnVtYmVyKHRoaXMuZ2V0UmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0J7QutGA0YPQs9C70Y/QtdGCINGH0LjRgdC70L4g0LTQviDRhtC10LvQvtCz0L5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbiAtINC40YHRhdC+0LTQvdC+0LUg0YfQuNGB0LvQvlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgIHB1YmxpYyBnZXRGbG9vck51bWJlcihuOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGbG9vcihuKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgR2FtZVNldHRpbmdzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGxldmVscyB9IGZyb20gXCIuL2xldmVsc1wiO1xuXG4vKiog0J7RgdC90L7QstC90YvQtSDQvdCw0YHRgtGA0L7QudC60Lgg0LjQs9GA0YsgKi9cbmV4cG9ydCBjb25zdCBzZXR0aW5nczogR2FtZVNldHRpbmdzID0ge1xuICAgIGNhbnZhc1NpemU6IHtcbiAgICAgICAgd2lkdGg6IDgwMCxcbiAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgfSxcbiAgICBsZXZlbHMsXG59IiwiaW1wb3J0IHsgQ29tcGxleGl0eUxpc3QgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKiog0KHQv9C40YHQvtC6INGD0YDQvtCy0L3QtdC5INGB0LvQvtC20L3QvtGB0YLQuCDQuNCz0YDRiyAqL1xuZXhwb3J0IGNvbnN0IGxldmVsczogQ29tcGxleGl0eUxpc3QgPSB7XG4gICAgYmVnaW5uZXI6IHtcbiAgICAgICAgbmFtZTogJ2JlZ2lubmVyJyxcbiAgICAgICAgYm9tYkNvdW50OiAxMCxcbiAgICAgICAgZmllbGRTaXplOiAyMCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZWFzeToge1xuICAgICAgICBuYW1lOiAnZWFzeScsXG4gICAgICAgIGJvbWJDb3VudDogMTUsXG4gICAgICAgIGZpZWxkU2l6ZTogMTAsXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgIH0sXG4gICAgbWVkaXVtOiB7XG4gICAgICAgIG5hbWU6ICdtZWRpdW0nLFxuICAgICAgICBib21iQ291bnQ6IDQwLFxuICAgICAgICBmaWVsZFNpemU6IDIwLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbiAgICBoYXJkOiB7XG4gICAgICAgIG5hbWU6ICdoYXJkJyxcbiAgICAgICAgYm9tYkNvdW50OiAxMDAsXG4gICAgICAgIGZpZWxkU2l6ZTogMjAsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9LFxuICAgIGh1Z2U6IHtcbiAgICAgICAgbmFtZTogJ2h1Z2UnLFxuICAgICAgICBib21iQ291bnQ6IDIyMCxcbiAgICAgICAgZmllbGRTaXplOiAzMixcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZXh0cmVtZToge1xuICAgICAgICBuYW1lOiAnZXh0cmVtZScsXG4gICAgICAgIGJvbWJDb3VudDogMTUwLFxuICAgICAgICBmaWVsZFNpemU6IDIwLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbn0iLCJpbXBvcnQgeyBTb3VyY2VQcm92aWRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmltcG9ydCAnLi4vaW1nL2JvbWIucG5nJztcbmltcG9ydCAnLi4vaW1nL2ZsYWcucG5nJztcblxuZXhwb3J0IGNsYXNzIEZpbGVTb3VyY2UgaW1wbGVtZW50cyBTb3VyY2VQcm92aWRlciB7XG4gICAgcHJpdmF0ZSBpbWFnZU5hbWVBcnI6IHN0cmluZ1tdID0gW107XG4gICAgcHJpdmF0ZSBpbWFnZUFycjogYW55W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGdldEltYWdlKG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIC8vIGlmICh0aGlzLmltYWdlTmFtZUFyci5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAvLyAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuaW1hZ2VBcnJbbmFtZV07XG4gICAgICAgIC8vIH1cblxuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IGBpbWcvJHtuYW1lfS5wbmdgO1xuXG4gICAgICAgIC8vIHRoaXMuaW1hZ2VOYW1lQXJyLnB1c2gobmFtZSk7XG4gICAgICAgIC8vIHRoaXMuaW1hZ2VBcnIucHVzaChpbWcpO1xuXG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxufSIsImltcG9ydCB7IFN0b3JhZ2VQcm92aWRlciwgU3RvcmFnZUl0ZW0sIFN0b3JhZ2VOYW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqINCU0L7Qu9Cz0L7QstGA0LXQvNC10L3QvdC+0LUg0YXRgNCw0L3QuNC70LjRidC1INC00LDQvdC90YvRhSDQuNCz0YDRiyAqL1xuZXhwb3J0IGNsYXNzIERhdGFTdG9yYWdlIGltcGxlbWVudHMgU3RvcmFnZVByb3ZpZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlXG4gICAgKSB7fVxuXG4gICAgc2F2ZSh7IG5hbWUsIHZhbHVlIH06IFN0b3JhZ2VJdGVtKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKG5hbWUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQobmFtZTogU3RvcmFnZU5hbWUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0obmFtZSk7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCB7IExldmVsQnVpbGRlciB9IGZyb20gXCIuL2J1aWxkZXIvaW5kZXhcIjtcbmltcG9ydCB7IENhbnZhc0NvbnRleHRQcm92aWRlciB9IGZyb20gXCIuL2NvbnRleHQvaW5kZXhcIjtcbmltcG9ydCB7IERvbVNvdXJjZSB9IGZyb20gXCIuL2RvbS9pbmRleFwiO1xuaW1wb3J0IHsgQ2FudmFzRHJhd2VyIH0gZnJvbSBcIi4vZHJhd2VyL2luZGV4XCI7XG5pbXBvcnQgeyBTYXBwZXIgfSBmcm9tIFwiLi9nYW1lL2luZGV4XCI7XG5pbXBvcnQgeyBHZW5lcmF0b3IgfSBmcm9tIFwiLi9nZW5lcmF0b3IvaW5kZXhcIjtcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSBcIi4vc2V0dGluZ3MvaW5kZXhcIjtcbmltcG9ydCB7IEZpbGVTb3VyY2UgfSBmcm9tIFwiLi9zb3VyY2UvaW5kZXhcIjtcblxuaW1wb3J0IFwiLi9pbmRleC5zY3NzXCI7XG5pbXBvcnQgeyBEYXRhU3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UvaW5kZXhcIjtcblxuY29uc3QgcGl4ZWxSYXRpb1NvdXJjZSA9IHtcbiAgICBkZXZpY2VQaXhlbFJhdGlvOiAxLFxufVxuXG5jb25zdCBzdG9yYWdlID0gbmV3IERhdGFTdG9yYWdlKHdpbmRvdy5sb2NhbFN0b3JhZ2UpO1xuY29uc3QgZmlsZVByb3ZpZGVyID0gbmV3IEZpbGVTb3VyY2UoKTtcbmNvbnN0IGRvbVNvdXJjZSA9IG5ldyBEb21Tb3VyY2Uod2luZG93KTtcbmNvbnN0IGNvbnRleHRQcm92aWRlciA9IG5ldyBDYW52YXNDb250ZXh0UHJvdmlkZXIoZG9tU291cmNlLCBwaXhlbFJhdGlvU291cmNlLCBzZXR0aW5ncyk7XG5jb25zdCBkcmF3ZXIgPSBuZXcgQ2FudmFzRHJhd2VyKGNvbnRleHRQcm92aWRlciwgZmlsZVByb3ZpZGVyKTtcbmNvbnN0IGdlbmVyYXRvciA9IG5ldyBHZW5lcmF0b3IoTWF0aC5yYW5kb20sIE1hdGguZmxvb3IpO1xuY29uc3QgYnVpbGRlciA9IG5ldyBMZXZlbEJ1aWxkZXIoZ2VuZXJhdG9yKTtcbmNvbnN0IHNhcHBlciA9IG5ldyBTYXBwZXIoc2V0dGluZ3MsIGNvbnRleHRQcm92aWRlciwgZHJhd2VyLCBkb21Tb3VyY2UsIGJ1aWxkZXIsIGdlbmVyYXRvciwgc3RvcmFnZSk7XG5cbnNhcHBlci5pbml0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9