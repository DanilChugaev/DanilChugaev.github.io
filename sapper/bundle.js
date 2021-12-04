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
        this.currentTimeContainer = null;
        this.bestLevelTime = null;
        this.levelTime = null;
        this.bestTimeContainer = null;
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
        this.currentTimeContainer = elementSource.getElement('current-time-container');
        this.bestTimeContainer = elementSource.getElement('best-time-container');
        this.bestLevelTime = elementSource.getElement('best-level-time');
        this.levelTime = elementSource.getElement('level-time');
    }
    /**
     * Инициализируем данные игры
     *
     * @returns {void}
     */
    Sapper.prototype.init = function () {
        var _this = this;
        this.elementSource.afterLoad(function (event) {
            var selectedLevel = _this.storage.get('level') || 'easy';
            _this.changeLevelInSettings(selectedLevel);
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
            var currentTime = this.timerContainer.textContent;
            var currentLevel = this.storage.get('level');
            var bestTimeStorageName = "best-time-" + currentLevel;
            var bestTime = this.storage.get(bestTimeStorageName);
            var time = '';
            this.currentTimeContainer.textContent = currentTime;
            if (bestTime && Number(bestTime) < Number(currentTime)) {
                time = bestTime;
            }
            else {
                time = currentTime;
            }
            this.storage.save({
                name: bestTimeStorageName,
                // @ts-ignore
                value: time,
            });
            this.bestTimeContainer.textContent = time;
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
     * @param {string} selectedLevel - выбранный уровень
     *
     * @returns {void}
     */
    Sapper.prototype.changeLevelInSettings = function (selectedLevel) {
        var bestTime = this.storage.get("best-time-" + selectedLevel);
        if (bestTime) {
            this.levelTime.style.display = 'block';
            this.bestLevelTime.textContent = bestTime;
        }
        else {
            this.levelTime.style.display = 'none';
        }
        for (var key in this.settings.levels) {
            // @ts-ignore
            this.settings.levels[key].selected = false;
        }
        // @ts-ignore
        this.settings.levels[selectedLevel].selected = true;
    };
    /**
     * Меняет видимость игровых элементов на странице
     *
     * @returns {void}
     */
    Sapper.prototype.changeVisibilityElements = function () {
        this.button.style.display = 'none';
        this.select.style.display = 'none';
        this.levelTime.style.display = 'none';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlEQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsSUFBTSxlQUFlLEdBQUcsSUFBSSxpRUFBcUIsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUscURBQVEsQ0FBQyxDQUFDO0FBQ3pGLElBQU0sTUFBTSxHQUFHLElBQUksdURBQVksQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDL0QsSUFBTSxTQUFTLEdBQUcsSUFBSSx1REFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pELElBQU0sT0FBTyxHQUFHLElBQUksd0RBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM1QyxJQUFNLE1BQU0sR0FBRyxJQUFJLCtDQUFNLENBQUMscURBQVEsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRXJHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NhcHBlci8uL3NyYy9pbWcvYm9tYi5wbmciLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2ltZy9mbGFnLnBuZyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW5kZXguc2Nzcz8yMDZmIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9idWlsZGVyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvYnVpbGRlci9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvY29udGV4dC9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZG9tL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kcmF3ZXIvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kcmF3ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dhbWUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dlbmVyYXRvci9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc2V0dGluZ3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3NldHRpbmdzL2xldmVscy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc291cmNlL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9zdG9yYWdlL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9ib21iLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvZmxhZy5wbmdcIjsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBBcmVhU3RydWN0dXJlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiDQntGC0L3QvtGB0LjRgtC10LvRjNC90YvQtSDQutC+0L7RgNC00LjQvdCw0YLRiyDRgdC+0YHQtdC00L3QuNGFINGP0YfQtdC10Log0L7QsdC70LDRgdGC0LhcbiAqIFxuICogIzEjMiMzI1xuICogIzgtKy00I1xuICogIzcjNiM1I1xuICovXG5leHBvcnQgY29uc3QgQVJFQV9TVFJVQ1RVUkU6IEFyZWFTdHJ1Y3R1cmUgPSB7XG4gICAgMDogeyB4OiAtMSwgeTogLTEgfSxcbiAgICAxOiB7IHg6IDAsIHk6IC0xIH0sXG4gICAgMjogeyB4OiAxLCB5OiAtMSB9LFxuICAgIDM6IHsgeDogMSwgeTogMCB9LFxuICAgIDQ6IHsgeDogMSwgeTogMSB9LFxuICAgIDU6IHsgeDogMCwgeTogMSB9LFxuICAgIDY6IHsgeDogLTEsIHk6IDEgfSxcbiAgICA3OiB7IHg6IC0xLCB5OiAwIH0sXG59IiwiaW1wb3J0IHsgQ29tcGxleGl0eSwgQ29tcGxleGl0eUxpc3QsIEdhbWVTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5ncy90eXBlc1wiO1xuaW1wb3J0IHsgQXJlYVN0cnVjdHVyZSwgTWFwU3RydWN0dXJlLCBTeXN0ZW1CdWlsZGVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IEFSRUFfU1RSVUNUVVJFIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBNYXRoR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2dlbmVyYXRvci90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTGV2ZWxCdWlsZGVyIGltcGxlbWVudHMgU3lzdGVtQnVpbGRlciB7XG4gICAgcHJpdmF0ZSBmaWVsZFNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIGJvbWJDb3VudDogbnVtYmVyO1xuICAgIHByaXZhdGUgY2FudmFzU2l6ZTogU2l6ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGdlbmVyYXRvcjogTWF0aEdlbmVyYXRvcixcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiDQkdC40LvQtNC40YIg0YPRgNC+0LLQtdC90YxcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0dhbWVTZXR0aW5nc30gc2V0dGluZ3MgLSDQvdCw0YHRgtGA0L7QudC60Lgg0LjQs9GA0YtcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7TWFwU3RydWN0dXJlfVxuICAgICAqL1xuICAgIHB1YmxpYyBidWlsZChzZXR0aW5nczogR2FtZVNldHRpbmdzKTogTWFwU3RydWN0dXJlIHtcbiAgICAgICAgY29uc3QgeyBmaWVsZFNpemUsIGJvbWJDb3VudCB9ID0gdGhpcy5nZXRTZWxlY3RlZExldmVsKHNldHRpbmdzLmxldmVscyk7XG5cbiAgICAgICAgdGhpcy5maWVsZFNpemUgPSBmaWVsZFNpemU7XG4gICAgICAgIHRoaXMuYm9tYkNvdW50ID0gYm9tYkNvdW50O1xuICAgICAgICB0aGlzLmNhbnZhc1NpemUgPSBzZXR0aW5ncy5jYW52YXNTaXplO1xuXG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuZ2VuZXJhdGVNYXBTdHJ1Y3R1cmUoKTtcblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINCy0YvQsdGA0LDQvdC90YvQuSDRg9GA0L7QstC10L3RjCDRgdC70L7QttC90L7RgdGC0Lgg0LjQtyDRgdC/0LjRgdC60LBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBsZXhpdHlMaXN0fSBsZXZlbHMgLSDRgdC/0LjRgdC+0Log0YPRgNC+0LLQvdC10Lkg0YHQu9C+0LbQvdC+0YHRgtC4XG4gICAgICogXG4gICAgICogQHJldHVybnMge0NvbXBsZXhpdHl9XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZExldmVsKGxldmVsczogQ29tcGxleGl0eUxpc3QpOiBDb21wbGV4aXR5IHtcbiAgICAgICAgbGV0IHNlbGVjdGVkTGV2ZWw6IENvbXBsZXhpdHk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGxldmVscykge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKGxldmVsc1trZXldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTGV2ZWwgPSBsZXZlbHNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZExldmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCT0LXQvdC10YDQuNGA0YPQtdGCINGB0YLRgNGD0LrRgtGD0YDRgyDQv9C+0LvRjyDQtNC70Y8g0LLRi9Cx0YDQsNC90L3QvtCz0L4g0YPRgNC+0LLQvdGPINGB0LvQvtC20L3QvtGB0YLQuFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U2l6ZX0gY2FudmFzU2l6ZSAtINGA0LDQt9C80LXRgCDQutCw0L3QstCw0YHQsCDQsiDQv9C40LrRgdC10LvRj9GFXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZpZWxkU2l6ZSAtINGA0LDQt9C80LXRgCDQuNCz0YDQvtCy0L7Qs9C+INC/0L7Qu9GPINCyINC60LvQtdGC0LrQsNGFXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJvbWJDb3VudCAtINC60L7Qu9C40YfQtdGB0YLQstC+INCx0L7QvNCxINC90LAg0LjQs9GA0L7QstC+0Lwg0L/QvtC70LVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7TWFwU3RydWN0dXJlfVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVNYXBTdHJ1Y3R1cmUoKTogTWFwU3RydWN0dXJlIHtcbiAgICAgICAgY29uc3QgbWFwU3RydWN0dXJlOiBNYXBTdHJ1Y3R1cmUgPSB7XG4gICAgICAgICAgICBwaXhlbHNDb3VudEluQ2VsbDogdGhpcy5jYW52YXNTaXplLndpZHRoIC8gdGhpcy5maWVsZFNpemUsXG4gICAgICAgICAgICBib21iQ291bnQ6IHRoaXMuYm9tYkNvdW50LFxuICAgICAgICAgICAgYm9tYkxlZnQ6IHRoaXMuYm9tYkNvdW50LFxuICAgICAgICAgICAgY2VsbHM6IHt9LFxuICAgICAgICAgICAgYm9tYlBvc2l0aW9uczogW10sXG4gICAgICAgICAgICBmaWVsZFNpemU6IHRoaXMuZmllbGRTaXplLFxuICAgICAgICB9O1xuXG4gICAgICAgIG1hcFN0cnVjdHVyZS5ib21iUG9zaXRpb25zID0gdGhpcy5nZW5lcmF0ZVJhbmRvbUJvbWJQb3NpdGlvbnModGhpcy5maWVsZFNpemUgKiB0aGlzLmZpZWxkU2l6ZSk7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmZpZWxkU2l6ZTsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuZmllbGRTaXplOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3c6IG51bWJlciA9IHk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbDogbnVtYmVyID0geDtcblxuICAgICAgICAgICAgICAgIGlmICghbWFwU3RydWN0dXJlLmNlbGxzW3Jvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwU3RydWN0dXJlLmNlbGxzW3Jvd10gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgaGFzQm9tYjogYm9vbGVhbiA9IG1hcFN0cnVjdHVyZS5ib21iUG9zaXRpb25zLmluY2x1ZGVzKHggKyB5ICogdGhpcy5maWVsZFNpemUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyZWE6IEFyZWFTdHJ1Y3R1cmUgPSB0aGlzLmdlbmVyYXRlQ2VsbEFyZWEoeyB4LCB5IH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbFN0cnVjdHVyZTogYW55ID0ge1xuICAgICAgICAgICAgICAgICAgICB5OiByb3csIFxuICAgICAgICAgICAgICAgICAgICB4OiBjZWxsLFxuICAgICAgICAgICAgICAgICAgICBhcmVhLFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChoYXNCb21iKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxTdHJ1Y3R1cmUuaGFzQm9tYiA9IGhhc0JvbWI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbFN0cnVjdHVyZS52YWx1ZSA9IHRoaXMuY2FsY0JvbWJzQXJvdW5kQ2VsbHMoYXJlYSwgbWFwU3RydWN0dXJlLmJvbWJQb3NpdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1hcFN0cnVjdHVyZS5jZWxsc1tyb3ddW2NlbGxdID0gY2VsbFN0cnVjdHVyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKG1hcFN0cnVjdHVyZSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcFN0cnVjdHVyZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQk9C10L3QtdGA0LjRgNGD0LXRgiDQvtCx0LvQsNGB0YLRjCDRj9GH0LXQtdC6INGBINC40YUg0LrQvtC+0YDQtNC40L3QsNGC0LDQvNC4INCy0L7QutGA0YPQsyDQstGL0LHRgNCw0L3QvdC+0Lkg0Y/Rh9C10LnQutC4INC90LAg0L7RgdC90L7QstC1INC10LUg0LrQvtC+0YDQtNC40L3QsNGCXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggLSDQutC+0L7RgNC00LjQvdCw0YLQsCAneCcg0Y/Rh9C10LnQutC4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSDQutC+0L7RgNC00LjQvdCw0YLQsCAneScg0Y/Rh9C10LnQutC4XG4gICAgICogXG4gICAgICogQHJldHVybnMge0FyZWFTdHJ1Y3R1cmV9XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUNlbGxBcmVhKHsgeCwgeSB9OiBDZWxsKTogQXJlYVN0cnVjdHVyZSB7XG4gICAgICAgIGNvbnN0IGFyZWE6IEFyZWFTdHJ1Y3R1cmUgPSB7fTtcbiAgICBcbiAgICAgICAgLy8gOCAtINC60L7Qu9C40YfQtdGB0YLQstC+INGP0YfQtdC10Log0LLQvtC60YDRg9CzINGG0LXQvdGC0YDQsNC70YzQvdC+0LlcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIC8qKiDQn9GA0L7QstC10YDRj9C10LwsINC90LUg0LLRi9GF0L7QtNC40YIg0LvQuCDRj9GH0LXQudC60LAg0LfQsCDQu9C10LLRg9GOINC4INCy0LXRgNGF0L3RjtGOINCz0YDQsNC90LjRhtGLINC/0L7Qu9GPICovXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBpZiAoeCArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS54IDwgMCB8fCB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnkgPCAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKiDQn9GA0L7QstC10YDRj9C10LwsINC90LUg0LLRi9GF0L7QtNC40YIg0LvQuCDRj9GH0LXQudC60LAg0LfQsCDQv9GA0LDQstGD0Y4g0Lgg0L3QuNC20L3RjtGOINCz0YDQsNC90LjRhtGLINC/0L7Qu9GPICovXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBpZiAoeCArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS54ID49IHRoaXMuZmllbGRTaXplIHx8IHkgKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueSA+PSB0aGlzLmZpZWxkU2l6ZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBhcmVhW2luZGV4XSA9IHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgeDogeCArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS54LFxuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB5OiB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnksXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJlYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQk9C10L3QtdGA0LjRgNGD0LXRgiDRgNCw0L3QtNC+0LzQvdGL0LUg0L/QvtC30LjRhtC40Lgg0LTQu9GPINGA0LDRgdC/0L7Qu9C+0LbQtdC90LjRjyDQsdC+0LzQsSDQvdCwINC/0L7Qu9C1XG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNlbGxzQ291bnQgLSDQutC+0LvQuNGH0LXRgdGC0LLQviDRj9GH0LXQtdC6INC90LAg0L/QvtC70LVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZVJhbmRvbUJvbWJQb3NpdGlvbnMoY2VsbHNDb3VudDogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgICAgICBjb25zdCBib21iUG9zaXRpb25zOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmJvbWJDb3VudDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IHJhbmRvbVBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLmdlbmVyYXRvci5nZXRSYW5kb21BcmJpdHJhcnkoMSwgY2VsbHNDb3VudCk7XG5cbiAgICAgICAgICAgIHdoaWxlIChib21iUG9zaXRpb25zLmluY2x1ZGVzKHJhbmRvbVBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJhbmRvbVBvc2l0aW9uID0gdGhpcy5nZW5lcmF0b3IuZ2V0UmFuZG9tQXJiaXRyYXJ5KDEsIGNlbGxzQ291bnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBib21iUG9zaXRpb25zLnB1c2gocmFuZG9tUG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJvbWJQb3NpdGlvbnMuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCh0YfQuNGC0LDQtdGCINC60L7Qu9C40YfQtdGB0YLQstC+INCx0L7QvNCxINCy0L7QutGA0YPQsyDRj9GH0LXQudC60LhcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FyZWFTdHJ1Y3R1cmV9IGFyZWFcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBib21iUG9zaXRpb25zXG4gICAgICogXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNCb21ic0Fyb3VuZENlbGxzKGFyZWE6IEFyZWFTdHJ1Y3R1cmUsIGJvbWJQb3NpdGlvbnM6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyID0gMDtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXJlYSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGFyZWFba2V5XTtcblxuICAgICAgICAgICAgaWYgKGJvbWJQb3NpdGlvbnMuaW5jbHVkZXMoY2VsbC54ICsgY2VsbC55ICogdGhpcy5maWVsZFNpemUpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBFbGVtZW50U291cmNlLCBQaXhlbFJhdGlvU291cmNlIH0gZnJvbSBcIi4uL2RvbS90eXBlc1wiO1xuaW1wb3J0IHsgR2FtZVNldHRpbmdzIH0gZnJvbSBcIi4uL3NldHRpbmdzL3R5cGVzXCI7XG5pbXBvcnQgeyBEcmF3aW5nQ29udGV4dCwgRHJhd2luZ0NvbnRleHRQcm92aWRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNDb250ZXh0UHJvdmlkZXIgaW1wbGVtZW50cyBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIHtcbiAgICBwcml2YXRlIGNhbnZhczogTnVsbGFibGU8SFRNTENhbnZhc0VsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGNvbnRleHQ6IE51bGxhYmxlPERyYXdpbmdDb250ZXh0PiA9IG51bGw7XG4gIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBlbGVtZW50U291cmNlOiBFbGVtZW50U291cmNlLFxuICAgICAgcHJpdmF0ZSBwaXhlbFJhdGlvU291cmNlOiBQaXhlbFJhdGlvU291cmNlLFxuICAgICAgcHJpdmF0ZSBzZXR0aW5nczogR2FtZVNldHRpbmdzXG4gICAgKSB7XG4gICAgICBjb25zdCBjYW52YXMgPSB0aGlzLmVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIGlmICghY2FudmFzKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBhIGNhbnZhcy5cIik7XG4gIFxuICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXMgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICB0aGlzLm5vcm1hbGl6ZVNjYWxlKCk7XG4gICAgfVxuICBcbiAgICBwdWJsaWMgZ2V0SW5zdGFuY2UoKTogRHJhd2luZ0NvbnRleHQge1xuICAgICAgcmV0dXJuIHRoaXMuY29udGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGlzdGVuQ2FudmFzQ2xpY2soY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHB1YmxpYyBsaXN0ZW5DYW52YXNDb250ZXh0TWVudShjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBjYWxsYmFjayk7XG4gICAgfVxuICBcbiAgICBwcml2YXRlIG5vcm1hbGl6ZVNjYWxlKCk6IHZvaWQge1xuICAgICAgaWYgKCF0aGlzLmNhbnZhcyB8fCAhdGhpcy5jb250ZXh0KSByZXR1cm47XG4gIFxuICAgICAgY29uc3QgcmF0aW8gPSB0aGlzLnBpeGVsUmF0aW9Tb3VyY2UuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnNldHRpbmdzLmNhbnZhc1NpemU7XG4gIFxuICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aCAqIHJhdGlvO1xuICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogcmF0aW87XG4gIFxuICAgICAgdGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICBcbiAgICAgIHRoaXMuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuY29udGV4dC5zY2FsZShyYXRpbywgcmF0aW8pO1xuICAgIH1cbiAgfSIsImltcG9ydCB7IEVsZW1lbnRTb3VyY2UgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgRG9tU291cmNlIGltcGxlbWVudHMgRWxlbWVudFNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2luZG93OiBXaW5kb3cpIHt9XG5cbiAgcHVibGljIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nKTogTnVsbGFibGU8SFRNTEVsZW1lbnQ+IHtcbiAgICByZXR1cm4gdGhpcy53aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRFbGVtZW50KGlkOiBzdHJpbmcpOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4ge1xuICAgIHJldHVybiB0aGlzLndpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIH1cblxuICBwdWJsaWMgYWZ0ZXJMb2FkKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMud2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgfSk7XG4gIH1cbn0iLCJleHBvcnQgY29uc3QgREVGQVVMVF9DT0xPUjogQ29sb3IgPSAnIzAwMDAwMCc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9XSURUSDogTGVuZ3RoID0gMTtcbmV4cG9ydCBjb25zdCBNQUlOX0JHX0NPTE9SOiBDb2xvciA9ICcjMjEyMTIxJztcbmV4cG9ydCBjb25zdCBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SOiBDb2xvciA9ICcjNjY2NkZGJztcbmV4cG9ydCBjb25zdCBGTEFHX0JHX0NPTE9SOiBDb2xvciA9ICdsaWdodGdyYXknO1xuZXhwb3J0IGNvbnN0IFRFWFRfQ09MT1I6IENvbG9yID0gJ3doaXRlJztcbmV4cG9ydCBjb25zdCBCT1JERVJfQ09MT1I6IENvbG9yID0gJyMzMzMzMzMnOyIsImltcG9ydCB7IERyYXdpbmdDb250ZXh0LCBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbnRleHQvdHlwZXNcIjtcbmltcG9ydCB7IFNvdXJjZVByb3ZpZGVyIH0gZnJvbSBcIi4uL3NvdXJjZS90eXBlc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9DT0xPUiwgREVGQVVMVF9XSURUSCwgTUFJTl9CR19DT0xPUiwgSU5JVElBTF9GSUVMRF9CR19DT0xPUiwgVEVYVF9DT0xPUiwgRkxBR19CR19DT0xPUiwgQk9SREVSX0NPTE9SIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBCcnVzaFNldHRpbmdzLCBEcmF3ZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzRHJhd2VyIGltcGxlbWVudHMgRHJhd2VyIHtcbiAgICBwcml2YXRlIGNvbnRleHQ6IERyYXdpbmdDb250ZXh0ID0gbnVsbDtcbiAgICBwcml2YXRlIGJvbWI6IGFueTtcbiAgICBwcml2YXRlIGZsYWc6IGFueTtcbiAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGNvbnRleHRQcm92aWRlcjogRHJhd2luZ0NvbnRleHRQcm92aWRlcixcbiAgICAgIHByaXZhdGUgZmlsZVByb3ZpZGVyOiBTb3VyY2VQcm92aWRlclxuICAgICkge1xuICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0UHJvdmlkZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgIGlmICghdGhpcy5jb250ZXh0KSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gYWNjZXNzIHRoZSBkcmF3aW5nIGNvbnRleHQuXCIpO1xuXG4gICAgICB0aGlzLmJvbWIgPSBmaWxlUHJvdmlkZXIuZ2V0SW1hZ2UoJ2JvbWInKTtcbiAgICAgIHRoaXMuZmxhZyA9IGZpbGVQcm92aWRlci5nZXRJbWFnZSgnZmxhZycpO1xuICAgIH1cbiAgXG4gICAgcHVibGljIGRyYXdMaW5lKFxuICAgICAgeyBzdGFydCwgZW5kIH06IExpbmUsXG4gICAgICB7IGNvbG9yLCB3aWR0aCB9OiBCcnVzaFNldHRpbmdzID0ge31cbiAgICApOiB2b2lkIHtcbiAgICAgIGlmICghdGhpcy5jb250ZXh0KSByZXR1cm47XG4gIFxuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3IgPz8gREVGQVVMVF9DT0xPUjtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3aWR0aCA/PyBERUZBVUxUX1dJRFRIO1xuICBcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oc3RhcnQueCwgc3RhcnQueSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKGVuZC54LCBlbmQueSk7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRyYXdTcXVhcmUoeyB4LCB5IH06IENlbGwsIHsgd2lkdGgsIGhlaWdodCB9OiBTaXplLCBjb2xvcj86IHN0cmluZywgaGFzQm9yZGVyczogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgIGlmICghdGhpcy5jb250ZXh0KSByZXR1cm47XG5cbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvciA/IGNvbG9yIDogSU5JVElBTF9GSUVMRF9CR19DT0xPUjtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgaWYgKGhhc0JvcmRlcnMpIHtcbiAgICAgICAgdGhpcy5kcmF3Qm9yZGVycyh7IHgsIHkgfSwgeyB3aWR0aCwgaGVpZ2h0IH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3TnVtYmVyKHsgeCwgeSB9OiBDZWxsLCB7IHdpZHRoLCBoZWlnaHQgfTogU2l6ZSwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgdGhpcy5kcmF3U3F1YXJlKHsgeCwgeSB9LCB7IHdpZHRoLCBoZWlnaHQgfSwgTUFJTl9CR19DT0xPUik7XG5cbiAgICAgIHRoaXMuY29udGV4dC5mb250ID0gYCR7aGVpZ2h0IC8gMn1weCBBcmlhbGA7XG5cdFx0ICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gVEVYVF9DT0xPUjtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChTdHJpbmcodmFsdWUpLCB4ICsgKHdpZHRoIC8gMi41KSwgeSArIChoZWlnaHQgLyAxLjUpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZHJhd0JvbWIoeyB4LCB5IH06IENlbGwsIHsgd2lkdGgsIGhlaWdodCB9OiBTaXplKTogdm9pZCB7XG4gICAgICB0aGlzLmRyYXdTcXVhcmUoeyB4LCB5IH0sIHsgd2lkdGgsIGhlaWdodCB9LCBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SLCBmYWxzZSk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYm9tYiwgeCArICh3aWR0aCAvIDQpLCB5ICsgKGhlaWdodCAvIDQpLCB3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkcmF3RmxhZyh7IHgsIHkgfTogQ2VsbCwgeyB3aWR0aCwgaGVpZ2h0IH06IFNpemUpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd1NxdWFyZSh7IHgsIHkgfSwgeyB3aWR0aCwgaGVpZ2h0IH0sIEZMQUdfQkdfQ09MT1IsIGZhbHNlKTtcbiAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5mbGFnLCB4ICsgKHdpZHRoIC8gNCksIHkgKyAoaGVpZ2h0IC8gNCksIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3Qm9yZGVycyh7IHgsIHkgfTogQ2VsbCwgeyB3aWR0aCwgaGVpZ2h0IH06IFNpemUpOiB2b2lkIHtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IEJPUkRFUl9DT0xPUjtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgfSIsImltcG9ydCB7IE1hcFN0cnVjdHVyZSwgU3lzdGVtQnVpbGRlciB9IGZyb20gJy4uL2J1aWxkZXIvdHlwZXMnO1xuaW1wb3J0IHsgRHJhd2luZ0NvbnRleHRQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHQvdHlwZXMnO1xuaW1wb3J0IHsgRWxlbWVudFNvdXJjZSB9IGZyb20gJy4uL2RvbS90eXBlcyc7XG5pbXBvcnQgeyBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SLCBNQUlOX0JHX0NPTE9SIH0gZnJvbSAnLi4vZHJhd2VyL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBEcmF3ZXIgfSBmcm9tICcuLi9kcmF3ZXIvdHlwZXMnO1xuaW1wb3J0IHsgTWF0aEdlbmVyYXRvciB9IGZyb20gJy4uL2dlbmVyYXRvci90eXBlcyc7XG5pbXBvcnQgeyBHYW1lU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy90eXBlcyc7XG5pbXBvcnQgeyBTdG9yYWdlUHJvdmlkZXIgfSBmcm9tICcuLi9zdG9yYWdlL3R5cGVzJztcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgU2FwcGVyIGltcGxlbWVudHMgR2FtZSB7XG4gICAgcHJpdmF0ZSBzZWxlY3Q6IE51bGxhYmxlPEhUTUxTZWxlY3RFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBidXR0b246IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSByZXN1bHRDb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSB3aW5Db250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG4gICAgcHJpdmF0ZSBsZWZ0Qm9tYkNvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIHRpbWVyQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgZ2FtZUNvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGN1cnJlbnRUaW1lQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgYmVzdExldmVsVGltZTogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGxldmVsVGltZTogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIGJlc3RUaW1lQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgY2FudmFzOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuICAgIHByaXZhdGUgc3lzdGVtOiBNYXBTdHJ1Y3R1cmU7XG4gICAgcHJpdmF0ZSBjZWxsU2l6ZTogU2l6ZTtcbiAgICBwcml2YXRlIHRpbWVySW50ZXJ2YWw6IGFueTtcbiAgICBwcml2YXRlIGNvdW50Q29ycmVjdGx5U2VsZWN0ZWRCb21iczogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNldHRpbmdzOiBHYW1lU2V0dGluZ3MsXG4gICAgICAgIHByaXZhdGUgY29udGV4dFByb3ZpZGVyOiBEcmF3aW5nQ29udGV4dFByb3ZpZGVyLFxuICAgICAgICBwcml2YXRlIGRyYXdlcjogRHJhd2VyLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRTb3VyY2U6IEVsZW1lbnRTb3VyY2UsXG4gICAgICAgIHByaXZhdGUgYnVpbGRlcjogU3lzdGVtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0b3I6IE1hdGhHZW5lcmF0b3IsXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVByb3ZpZGVyLFxuICAgICkge1xuICAgICAgICB0aGlzLnNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD5lbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ3NlbGVjdC1sZXZlbCcpO1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnc3RhcnQtZ2FtZScpO1xuICAgICAgICB0aGlzLmdhbWVDb250YWluZXIgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ2dhbWUtY29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5yZXN1bHRDb250YWluZXIgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ3Jlc3VsdC1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy53aW5Db250YWluZXIgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ3dpbi1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy5sZWZ0Qm9tYkNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnbGVmdC1ib21iJyk7XG4gICAgICAgIHRoaXMudGltZXJDb250YWluZXIgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ3RpbWVyJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVDb250YWluZXIgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ2N1cnJlbnQtdGltZS1jb250YWluZXInKTtcbiAgICAgICAgdGhpcy5iZXN0VGltZUNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnYmVzdC10aW1lLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmJlc3RMZXZlbFRpbWUgPSBlbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ2Jlc3QtbGV2ZWwtdGltZScpO1xuICAgICAgICB0aGlzLmxldmVsVGltZSA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnbGV2ZWwtdGltZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9C40YDRg9C10Lwg0LTQsNC90L3Ri9C1INC40LPRgNGLXG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFNvdXJjZS5hZnRlckxvYWQoKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRMZXZlbCA9IHRoaXMuc3RvcmFnZS5nZXQoJ2xldmVsJykgfHwgJ2Vhc3knO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUxldmVsSW5TZXR0aW5ncyhzZWxlY3RlZExldmVsKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2V0dGluZ3MubGV2ZWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gPEhUTUxPcHRpb25FbGVtZW50PnRoaXMuZWxlbWVudFNvdXJjZS5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGtleTtcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBrZXk7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRoaXMuc2V0dGluZ3MubGV2ZWxzW2tleV0uc2VsZWN0ZWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUxldmVsLmJpbmQodGhpcyksIGZhbHNlKTtcblxuICAgICAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN0YXJ0LmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KHRgtCw0YDRgtGD0LXQvCDQuNCz0YDRg1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3lzdGVtID0gdGhpcy5idWlsZGVyLmJ1aWxkKHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLmNlbGxTaXplID0ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuc3lzdGVtLnBpeGVsc0NvdW50SW5DZWxsLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbCxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxlZnRCb21iQ29udGFpbmVyLnRleHRDb250ZW50ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQ7XG4gICAgICAgIHRoaXMudGltZXJDb250YWluZXIudGV4dENvbnRlbnQgPSAnMCc7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VWaXNpYmlsaXR5RWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5tYWtlSW5pdGlhbEZpbGwoKTtcbiAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0UHJvdmlkZXIubGlzdGVuQ2FudmFzQ2xpY2sodGhpcy5jaGVja0NsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNvbnRleHRQcm92aWRlci5saXN0ZW5DYW52YXNDb250ZXh0TWVudSh0aGlzLmNoZWNrQ29udGV4dE1lbnUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGFydFRpbWVyKCk6IHZvaWQge1xuICAgICAgICBsZXQgc2Vjb25kczogbnVtYmVyID0gMDtcbiAgICAgICAgdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudCA9IFN0cmluZyhzZWNvbmRzKyspO1xuXG4gICAgICAgIHRoaXMudGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZXJDb250YWluZXIudGV4dENvbnRlbnQgPSBTdHJpbmcoc2Vjb25kcysrKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9wVGltZXIoaXNXaW46IGJvb2xlYW4pOiB2b2lkICB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lckludGVydmFsKTtcblxuICAgICAgICBpZiAoaXNXaW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRMZXZlbCA9IHRoaXMuc3RvcmFnZS5nZXQoJ2xldmVsJyk7XG4gICAgICAgICAgICBjb25zdCBiZXN0VGltZVN0b3JhZ2VOYW1lID0gYGJlc3QtdGltZS0ke2N1cnJlbnRMZXZlbH1gO1xuICAgICAgICAgICAgY29uc3QgYmVzdFRpbWUgPSB0aGlzLnN0b3JhZ2UuZ2V0KGJlc3RUaW1lU3RvcmFnZU5hbWUpO1xuICAgICAgICAgICAgbGV0IHRpbWUgPSAnJztcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGltZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IGN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoYmVzdFRpbWUgJiYgTnVtYmVyKGJlc3RUaW1lKSA8IE51bWJlcihjdXJyZW50VGltZSkpIHtcbiAgICAgICAgICAgICAgICB0aW1lID0gYmVzdFRpbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNhdmUoe1xuICAgICAgICAgICAgICAgIG5hbWU6IGJlc3RUaW1lU3RvcmFnZU5hbWUsXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aW1lLFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5iZXN0VGltZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IHRpbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQnNC10L3Rj9C10YIg0YPRgNC+0LLQtdC90Ywg0L/QvtGB0LvQtSDRgdC80LXQvdGLINCyINGB0LXQu9C10LrRgtC1XG4gICAgICogXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBET00g0YHQvtCx0YvRgtC40LVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUxldmVsKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY2hhbmdlTGV2ZWxJblNldHRpbmdzKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5zYXZlKHtcbiAgICAgICAgICAgIG5hbWU6ICdsZXZlbCcsXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCc0LXQvdGP0LXRgiDRg9GA0L7QstC10L3RjCDQuNCz0YDRiyDQsiDQvdCw0YHRgtGA0L7QudC60LDRhVxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RlZExldmVsIC0g0LLRi9Cx0YDQsNC90L3Ri9C5INGD0YDQvtCy0LXQvdGMXG4gICAgICogXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VMZXZlbEluU2V0dGluZ3Moc2VsZWN0ZWRMZXZlbDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGJlc3RUaW1lID0gdGhpcy5zdG9yYWdlLmdldChgYmVzdC10aW1lLSR7c2VsZWN0ZWRMZXZlbH1gKTtcblxuICAgICAgICBpZiAoYmVzdFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxUaW1lLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgdGhpcy5iZXN0TGV2ZWxUaW1lLnRleHRDb250ZW50ID0gYmVzdFRpbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsVGltZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2V0dGluZ3MubGV2ZWxzKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmxldmVsc1trZXldLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2V0dGluZ3MubGV2ZWxzW3NlbGVjdGVkTGV2ZWxdLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQnNC10L3Rj9C10YIg0LLQuNC00LjQvNC+0YHRgtGMINC40LPRgNC+0LLRi9GFINGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINGB0YLRgNCw0L3QuNGG0LVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZVZpc2liaWxpdHlFbGVtZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5zZWxlY3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5sZXZlbFRpbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy5nYW1lQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCX0LDQv9C+0LvQvdGP0LXRgiDQstC10YHRjCDQutCw0L3QstCw0YEg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwcml2YXRlIG1ha2VJbml0aWFsRmlsbCgpIHtcbiAgICAgICAgY29uc3Qgc2l6ZTogU2l6ZSA9IHRoaXMuc2V0dGluZ3MuY2FudmFzU2l6ZTtcblxuICAgICAgICB0aGlzLmRyYXdlci5kcmF3U3F1YXJlKHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9LCBzaXplKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrQ2xpY2soeyBvZmZzZXRYLCBvZmZzZXRZIH06IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbChvZmZzZXRYLCBvZmZzZXRZKTtcbiAgICAgICAgXG4gICAgICAgIC8vINGH0YLQvtCx0Ysg0L3QsNC20LDRgtGMINC90LAg0LrQu9C10YLQutGDINGBINGE0LvQsNCz0L7QvCAtINC10LPQviDQvdGD0LbQvdC+INGB0L3QsNGH0LDQu9CwINGB0L3Rj9GC0YxcbiAgICAgICAgaWYgKCFjZWxsLmhhc0ZsYWcpIHtcbiAgICAgICAgICAgIGlmIChjZWxsLmhhc0JvbWIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Cb21iQ2VsbChjZWxsKTsgLy8g0YDQuNGB0YPQtdC8INCx0L7QvNCx0YMg0LIg0YPQutCw0LfQsNC90L3QvtC5INC60LvQtdGC0LrQtVxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkFsbEJvbWJzKCk7IC8vINGA0LjRgdGD0LXQvCDQstGB0LUg0L7RgdGC0LDQu9GM0L3Ri9C1INCx0L7QvNCx0YtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BHYW1lKCk7IC8vINGB0YLQvtC/0L7RgNC40Lwg0LjQs9GA0YNcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbC52YWx1ZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbk51bWJlclNxdWFyZShjZWxsKTsgLy8g0YDQuNGB0YPQtdC8INC60LvQtdGC0LrRgyDRgSDRhtC40YTRgNC+0LlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuRW1wdHlTcXVhcmUoY2VsbCk7IC8vINGA0LjRgdGD0LXQvCDQv9GD0YHRgtGD0Y4g0LrQu9C10YLQutGDXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVPcGVuQXJlYShjZWxsKTsgLy8g0L/RgNC+0YXQvtC00LjQvNGB0Y8g0L/QviDRgdC+0YHQtdC00Y/QvCDQuCDRgNC40YHRg9C10Lwg0LrQu9C10YLQutC4INC00L4g0YLQvtCz0L4g0LzQvtC80LXQvdGC0LAsINC/0L7QutCwINC90LUg0L/QvtGP0LLQuNGC0YHRjyDQsiDQutC70LXRgtC60LUg0YbQuNGE0YDQsFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0NvbnRleHRNZW51KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbChldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcblxuICAgICAgICBpZiAoIWNlbGwuaXNPcGVuKSB7XG4gICAgICAgICAgICBpZiAoIWNlbGwuaGFzRmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RmxhZyhjZWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGbGFnKGNlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDZWxsKG9mZnNldFg6IG51bWJlciwgb2Zmc2V0WTogbnVtYmVyKTogYW55IHtcbiAgICAgICAgY29uc3QgeCA9IHRoaXMuZ2VuZXJhdG9yLmdldEZsb29yTnVtYmVyKG9mZnNldFggLyB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbCk7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLmdlbmVyYXRvci5nZXRGbG9vck51bWJlcihvZmZzZXRZIC8gdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbS5jZWxsc1t5XVt4XTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlY3Vyc2l2ZU9wZW5BcmVhKGNlbGw6IGFueSkge1xuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBjZWxsLmFyZWEpIHtcbiAgICAgICAgICAgIGNvbnN0IHN5c3RlbUNlbGwgPSB0aGlzLnN5c3RlbS5jZWxsc1tjZWxsLmFyZWFbaW5kZXhdLnldW2NlbGwuYXJlYVtpbmRleF0ueF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICog0LjQtyDQvtCx0YDQsNCx0L7RgtC60Lgg0L/RgNC+0L/Rg9GB0LrQsNC10Lw6XG4gICAgICAgICAgICAgKiAgLSDQvtGC0LrRgNGL0YLRg9GOINGP0YfQtdC50LrRg1xuICAgICAgICAgICAgICogIC0g0Y/Rh9C10LnQutGDINGBINGE0LvQsNCz0L7QvFxuICAgICAgICAgICAgICogIC0g0Y/Rh9C10LnQutGDINGBINCx0L7QvNCx0L7QuVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoIXN5c3RlbUNlbGwuaXNPcGVuICYmICFzeXN0ZW1DZWxsLmhhc0ZsYWcgJiYgIXN5c3RlbUNlbGwuaGFzQm9tYikge1xuICAgICAgICAgICAgICAgIGlmIChzeXN0ZW1DZWxsLnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkVtcHR5U3F1YXJlKHN5c3RlbUNlbGwpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVPcGVuQXJlYShzeXN0ZW1DZWxsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5OdW1iZXJTcXVhcmUoc3lzdGVtQ2VsbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5FbXB0eVNxdWFyZShjZWxsOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd1NxdWFyZSh7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbFdpZHRoKGNlbGwueCksXG4gICAgICAgICAgICB5OiB0aGlzLmNhbGNQaXhlbEhlaWdodChjZWxsLnkpLFxuICAgICAgICB9LCB0aGlzLmNlbGxTaXplLCBNQUlOX0JHX0NPTE9SKTtcblxuICAgICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcGVuTnVtYmVyU3F1YXJlKGNlbGw6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3TnVtYmVyKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsV2lkdGgoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsSGVpZ2h0KGNlbGwueSksXG4gICAgICAgIH0sIHRoaXMuY2VsbFNpemUsIGNlbGwudmFsdWUpO1xuXG4gICAgICAgIGNlbGwuaXNPcGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wZW5Cb21iQ2VsbChjZWxsOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd0JvbWIoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxXaWR0aChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxIZWlnaHQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsU2l6ZSk7XG5cbiAgICAgICAgY2VsbC5pc09wZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3BlbkFsbEJvbWJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7IGJvbWJQb3NpdGlvbnMsIGNlbGxzLCBmaWVsZFNpemUgfSA9IHRoaXMuc3lzdGVtO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgT2JqZWN0LmtleXMoY2VsbHMpLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IE9iamVjdC5rZXlzKGNlbGxzW3ldKS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmIChib21iUG9zaXRpb25zLmluY2x1ZGVzKHggKyB5ICogZmllbGRTaXplKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Cb21iQ2VsbChjZWxsc1t5XVt4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRGbGFnKGNlbGw6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3RmxhZyh7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbFdpZHRoKGNlbGwueCksXG4gICAgICAgICAgICB5OiB0aGlzLmNhbGNQaXhlbEhlaWdodChjZWxsLnkpLFxuICAgICAgICB9LCB0aGlzLmNlbGxTaXplKTtcblxuICAgICAgICBjZWxsLmhhc0ZsYWcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc3lzdGVtLmJvbWJMZWZ0ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQgLSAxO1xuICAgICAgICB0aGlzLmxlZnRCb21iQ29udGFpbmVyLnRleHRDb250ZW50ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQ7XG5cbiAgICAgICAgaWYgKGNlbGwuaGFzQm9tYikge1xuICAgICAgICAgICAgdGhpcy5jb3VudENvcnJlY3RseVNlbGVjdGVkQm9tYnMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN5c3RlbS5ib21iTGVmdCA9PT0gMCAmJiB0aGlzLnN5c3RlbS5ib21iQ291bnQgPT09IHRoaXMuY291bnRDb3JyZWN0bHlTZWxlY3RlZEJvbWJzKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BHYW1lKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVGbGFnKGNlbGw6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3U3F1YXJlKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsV2lkdGgoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsSGVpZ2h0KGNlbGwueSksXG4gICAgICAgIH0sIHRoaXMuY2VsbFNpemUsIElOSVRJQUxfRklFTERfQkdfQ09MT1IsIGZhbHNlKTtcblxuICAgICAgICBjZWxsLmhhc0ZsYWcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnN5c3RlbS5ib21iTGVmdCA9IHRoaXMuc3lzdGVtLmJvbWJMZWZ0ICsgMTtcbiAgICAgICAgdGhpcy5sZWZ0Qm9tYkNvbnRhaW5lci50ZXh0Q29udGVudCA9IHRoaXMuc3lzdGVtLmJvbWJMZWZ0O1xuXG4gICAgICAgIGlmIChjZWxsLmhhc0JvbWIpIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRDb3JyZWN0bHlTZWxlY3RlZEJvbWJzLS07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGNQaXhlbFdpZHRoKHg6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoeCkgKiB0aGlzLmNlbGxTaXplLndpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY1BpeGVsSGVpZ2h0KHk6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoeSkgKiB0aGlzLmNlbGxTaXplLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3BHYW1lKGlzV2luOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoaXNXaW4pO1xuXG4gICAgICAgIC8vINC/0L7QutCw0LfRi9Cy0LDQtdC8INC60L3QvtC/0LrRgyDRgNC10YHRgtCw0YDRgtCwXG4gICAgICAgIHRoaXMucmVzdWx0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cbiAgICAgICAgaWYgKGlzV2luKSB7XG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQstGL0LjQs9GA0LDQu9C4LCDQv9C+0LrQsNC30YvQstCw0LXQvCDQv9C+0LfQtNGA0LDQstC70LXQvdC40Y9cbiAgICAgICAgICAgIHRoaXMud2luQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Jlc3VsdC1jb250YWluZXItLWlzLXZpc2libGUnKTtcbiAgICAgICAgfSwgNTApO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBNYXRoR2VuZXJhdG9yIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvciBpbXBsZW1lbnRzIE1hdGhHZW5lcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGdldFJhbmRvbTogRnVuY3Rpb24sXG4gICAgICAgIHByaXZhdGUgZ2V0Rmxvb3I6IEZ1bmN0aW9uLFxuICAgICkge31cblxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGA0LDQvdC00L7QvNC90L7QtSDRhtC10LvQvtC1INGH0LjRgdC70L4g0LIg0L7Qv9GA0LXQtNC10LvQtdC90L3QvtC8INC/0YDQvtC80LXQttGD0YLQutC1XG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pbiAtINC80LjQvdC40LzQsNC70YzQvdC+0LUg0YfQuNGB0LvQviDQv9GA0L7QvNC10LbRg9GC0LrQsFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXggLSDQvNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0YfQuNGB0LvQviDQv9GA0L7QvNC10LbRg9GC0LrQsFxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgcHVibGljIGdldFJhbmRvbUFyYml0cmFyeShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGbG9vck51bWJlcih0aGlzLmdldFJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCe0LrRgNGD0LPQu9GP0LXRgiDRh9C40YHQu9C+INC00L4g0YbQtdC70L7Qs9C+XG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG4gLSDQuNGB0YXQvtC00L3QvtC1INGH0LjRgdC70L5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgICBwdWJsaWMgZ2V0Rmxvb3JOdW1iZXIobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rmxvb3Iobik7XG4gICAgfVxufSIsImltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBsZXZlbHMgfSBmcm9tIFwiLi9sZXZlbHNcIjtcblxuLyoqINCe0YHQvdC+0LLQvdGL0LUg0L3QsNGB0YLRgNC+0LnQutC4INC40LPRgNGLICovXG5leHBvcnQgY29uc3Qgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyA9IHtcbiAgICBjYW52YXNTaXplOiB7XG4gICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICAgIGhlaWdodDogODAwLFxuICAgIH0sXG4gICAgbGV2ZWxzLFxufSIsImltcG9ydCB7IENvbXBsZXhpdHlMaXN0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqINCh0L/QuNGB0L7QuiDRg9GA0L7QstC90LXQuSDRgdC70L7QttC90L7RgdGC0Lgg0LjQs9GA0YsgKi9cbmV4cG9ydCBjb25zdCBsZXZlbHM6IENvbXBsZXhpdHlMaXN0ID0ge1xuICAgIGJlZ2lubmVyOiB7XG4gICAgICAgIG5hbWU6ICdiZWdpbm5lcicsXG4gICAgICAgIGJvbWJDb3VudDogMTAsXG4gICAgICAgIGZpZWxkU2l6ZTogMjAsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9LFxuICAgIGVhc3k6IHtcbiAgICAgICAgbmFtZTogJ2Vhc3knLFxuICAgICAgICBib21iQ291bnQ6IDE1LFxuICAgICAgICBmaWVsZFNpemU6IDEwLFxuICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICB9LFxuICAgIG1lZGl1bToge1xuICAgICAgICBuYW1lOiAnbWVkaXVtJyxcbiAgICAgICAgYm9tYkNvdW50OiA0MCxcbiAgICAgICAgZmllbGRTaXplOiAyMCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgaGFyZDoge1xuICAgICAgICBuYW1lOiAnaGFyZCcsXG4gICAgICAgIGJvbWJDb3VudDogMTAwLFxuICAgICAgICBmaWVsZFNpemU6IDIwLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgfSxcbiAgICBodWdlOiB7XG4gICAgICAgIG5hbWU6ICdodWdlJyxcbiAgICAgICAgYm9tYkNvdW50OiAyMjAsXG4gICAgICAgIGZpZWxkU2l6ZTogMzIsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9LFxuICAgIGV4dHJlbWU6IHtcbiAgICAgICAgbmFtZTogJ2V4dHJlbWUnLFxuICAgICAgICBib21iQ291bnQ6IDE1MCxcbiAgICAgICAgZmllbGRTaXplOiAyMCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG59IiwiaW1wb3J0IHsgU291cmNlUHJvdmlkZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5pbXBvcnQgJy4uL2ltZy9ib21iLnBuZyc7XG5pbXBvcnQgJy4uL2ltZy9mbGFnLnBuZyc7XG5cbmV4cG9ydCBjbGFzcyBGaWxlU291cmNlIGltcGxlbWVudHMgU291cmNlUHJvdmlkZXIge1xuICAgIHByaXZhdGUgaW1hZ2VOYW1lQXJyOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByaXZhdGUgaW1hZ2VBcnI6IGFueVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBnZXRJbWFnZShuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICAvLyBpZiAodGhpcy5pbWFnZU5hbWVBcnIuaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgICAgLy8gICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLmltYWdlQXJyW25hbWVdO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSBgaW1nLyR7bmFtZX0ucG5nYDtcblxuICAgICAgICAvLyB0aGlzLmltYWdlTmFtZUFyci5wdXNoKG5hbWUpO1xuICAgICAgICAvLyB0aGlzLmltYWdlQXJyLnB1c2goaW1nKTtcblxuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTdG9yYWdlUHJvdmlkZXIsIFN0b3JhZ2VJdGVtLCBTdG9yYWdlTmFtZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKiDQlNC+0LvQs9C+0LLRgNC10LzQtdC90L3QvtC1INGF0YDQsNC90LjQu9C40YnQtSDQtNCw0L3QvdGL0YUg0LjQs9GA0YsgKi9cbmV4cG9ydCBjbGFzcyBEYXRhU3RvcmFnZSBpbXBsZW1lbnRzIFN0b3JhZ2VQcm92aWRlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVxuICAgICkge31cblxuICAgIHNhdmUoeyBuYW1lLCB2YWx1ZSB9OiBTdG9yYWdlSXRlbSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0KG5hbWU6IFN0b3JhZ2VOYW1lKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKG5hbWUpO1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBMZXZlbEJ1aWxkZXIgfSBmcm9tIFwiLi9idWlsZGVyL2luZGV4XCI7XG5pbXBvcnQgeyBDYW52YXNDb250ZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi9jb250ZXh0L2luZGV4XCI7XG5pbXBvcnQgeyBEb21Tb3VyY2UgfSBmcm9tIFwiLi9kb20vaW5kZXhcIjtcbmltcG9ydCB7IENhbnZhc0RyYXdlciB9IGZyb20gXCIuL2RyYXdlci9pbmRleFwiO1xuaW1wb3J0IHsgU2FwcGVyIH0gZnJvbSBcIi4vZ2FtZS9pbmRleFwiO1xuaW1wb3J0IHsgR2VuZXJhdG9yIH0gZnJvbSBcIi4vZ2VuZXJhdG9yL2luZGV4XCI7XG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdzL2luZGV4XCI7XG5pbXBvcnQgeyBGaWxlU291cmNlIH0gZnJvbSBcIi4vc291cmNlL2luZGV4XCI7XG5cbmltcG9ydCBcIi4vaW5kZXguc2Nzc1wiO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlL2luZGV4XCI7XG5cbmNvbnN0IHBpeGVsUmF0aW9Tb3VyY2UgPSB7XG4gICAgZGV2aWNlUGl4ZWxSYXRpbzogMSxcbn1cblxuY29uc3Qgc3RvcmFnZSA9IG5ldyBEYXRhU3RvcmFnZSh3aW5kb3cubG9jYWxTdG9yYWdlKTtcbmNvbnN0IGZpbGVQcm92aWRlciA9IG5ldyBGaWxlU291cmNlKCk7XG5jb25zdCBkb21Tb3VyY2UgPSBuZXcgRG9tU291cmNlKHdpbmRvdyk7XG5jb25zdCBjb250ZXh0UHJvdmlkZXIgPSBuZXcgQ2FudmFzQ29udGV4dFByb3ZpZGVyKGRvbVNvdXJjZSwgcGl4ZWxSYXRpb1NvdXJjZSwgc2V0dGluZ3MpO1xuY29uc3QgZHJhd2VyID0gbmV3IENhbnZhc0RyYXdlcihjb250ZXh0UHJvdmlkZXIsIGZpbGVQcm92aWRlcik7XG5jb25zdCBnZW5lcmF0b3IgPSBuZXcgR2VuZXJhdG9yKE1hdGgucmFuZG9tLCBNYXRoLmZsb29yKTtcbmNvbnN0IGJ1aWxkZXIgPSBuZXcgTGV2ZWxCdWlsZGVyKGdlbmVyYXRvcik7XG5jb25zdCBzYXBwZXIgPSBuZXcgU2FwcGVyKHNldHRpbmdzLCBjb250ZXh0UHJvdmlkZXIsIGRyYXdlciwgZG9tU291cmNlLCBidWlsZGVyLCBnZW5lcmF0b3IsIHN0b3JhZ2UpO1xuXG5zYXBwZXIuaW5pdCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==