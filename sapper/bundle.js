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
 * Coordinates of neighboring cells relative to the center cell
 *
 * @example
 *  #0#1#2#
 *  #7-8-3#
 *  #6#5#4#
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

/** Class responsible for creating levels based on levels settings */
var LevelBuilder = /** @class */ (function () {
    function LevelBuilder(generator) {
        this.generator = generator;
    }
    /**
     * Build level
     *
     * @param settings - basic game settings
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
     * Returns the selected difficulty level from the list of levels from the settings
     *
     * @param levels - list of possible levels of difficulty of the game
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
    /** Generates the field structure for the selected difficulty level */
    LevelBuilder.prototype.generateMapStructure = function () {
        var mapStructure = {
            pixelsCountInCell: this.canvasSize / this.fieldSize,
            bombCount: this.bombCount,
            bombLeft: this.bombCount,
            cells: {},
            bombPositions: [],
            fieldSize: this.fieldSize,
        };
        mapStructure.bombPositions = this.generateRandomBombPositions(this.fieldSize * this.fieldSize);
        // traversal of arrays goes from left to right and from top to bottom
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
        return mapStructure;
    };
    /**
     * Generates a region of cells with their coordinates around the selected cell based on its coordinates
     *
     * @param cell - game board cell
     * @param cell.x - the x coordinate on the playing field
     * @param cell.y - the y coordinate on the playing field
     */
    LevelBuilder.prototype.generateCellArea = function (_a) {
        var x = _a.x, y = _a.y;
        var area = {};
        // 8 - the number of cells around the central
        for (var index = 0; index < 8; index++) {
            /** Checking if the cell goes beyond the left and top borders of the field */
            // @ts-ignore
            if (x + _constants__WEBPACK_IMPORTED_MODULE_0__.AREA_STRUCTURE[index].x < 0 || y + _constants__WEBPACK_IMPORTED_MODULE_0__.AREA_STRUCTURE[index].y < 0) {
                continue;
            }
            /** Checking if the cell goes beyond the right and bottom borders of the field */
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
     * Generates random positions for placing bombs on the field
     *
     * @param cellsCount - number of cells of the playing field
     */
    LevelBuilder.prototype.generateRandomBombPositions = function (cellsCount) {
        var bombPositions = [];
        for (var index = 0; index < this.bombCount; index++) {
            var randomPosition = this.generator.getRandomArbitrary(1, cellsCount);
            // if the generated position is already in the list, we generate it again
            while (bombPositions.includes(randomPosition)) {
                randomPosition = this.generator.getRandomArbitrary(1, cellsCount);
            }
            bombPositions.push(randomPosition);
        }
        return bombPositions.sort(function (a, b) { return a - b; });
    };
    /**
     * Counts the number of bombs around the cell
     *
     * @param area - neighboring cells relative to the center cell
     * @param bombPositions - positions of bombs on the field
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
/** Provides the context of the canvas */
var CanvasContextProvider = /** @class */ (function () {
    function CanvasContextProvider(elementSource, settings) {
        this.elementSource = elementSource;
        this.settings = settings;
        /** Game will be drawn on this canvas */
        this.canvas = null;
        /** Canvas 2d context */
        this.context = null;
        var canvas = this.elementSource.getElement("canvas");
        if (!canvas)
            throw new Error("Failed to find a canvas.");
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.normalizeScale();
    }
    /** Returns canvas 2d context */
    CanvasContextProvider.prototype.getInstance = function () {
        return this.context;
    };
    /**
     * Listen to clicking on the canvas by left mouse button
     *
     * @param callback - a function that is called after clicking on the canvas by left mouse button
     */
    CanvasContextProvider.prototype.listenCanvasClick = function (callback) {
        this.canvas.addEventListener("click", callback);
    };
    /**
     * Listen to clicking on the canvas by right mouse button
     *
     * @param callback - a function that is called after clicking on the canvas by right mouse button
     */
    CanvasContextProvider.prototype.listenCanvasContextMenu = function (callback) {
        this.canvas.addEventListener("contextmenu", callback);
    };
    /** Normalize canvas styles and context scale */
    CanvasContextProvider.prototype.normalizeScale = function () {
        if (!this.canvas || !this.context)
            return;
        var ratio = this.settings.devicePixelRatio || 1;
        var size = this.settings.canvasSize;
        this.canvas.width = size * ratio;
        this.canvas.height = size * ratio;
        this.canvas.style.width = size + "px";
        this.canvas.style.height = size + "px";
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
/** Class allows interact with the DOM tree */
var DomSource = /** @class */ (function () {
    function DomSource(window) {
        this.window = window;
    }
    /**
     * Create HTML element
     *
     * @param name - name of HTML element
     */
    DomSource.prototype.createElement = function (name) {
        return this.window.document.createElement(name);
    };
    /**
     * Returns HTML element by ID
     *
     * @param id - ID of HTML element
     */
    DomSource.prototype.getElement = function (id) {
        return this.window.document.getElementById(id);
    };
    /**
     * Calls a callback after loading the DOM tree
     *
     * @param callback - function that is called after loading the DOM tree
     */
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
/* harmony export */   "BORDER_COLOR": () => (/* binding */ BORDER_COLOR),
/* harmony export */   "TEXT_COLOR": () => (/* binding */ TEXT_COLOR),
/* harmony export */   "MAIN_BG_COLOR": () => (/* binding */ MAIN_BG_COLOR),
/* harmony export */   "INITIAL_FIELD_BG_COLOR": () => (/* binding */ INITIAL_FIELD_BG_COLOR),
/* harmony export */   "FLAG_BG_COLOR": () => (/* binding */ FLAG_BG_COLOR)
/* harmony export */ });
var rootStyles = getComputedStyle(document.documentElement);
/** Border color on the field */
var BORDER_COLOR = rootStyles.getPropertyValue("--border-color");
/** Color of the text in the game */
var TEXT_COLOR = rootStyles.getPropertyValue("--text-color");
/** Main background color in the game */
var MAIN_BG_COLOR = rootStyles.getPropertyValue("--main-bg-color");
/** Field fill color */
var INITIAL_FIELD_BG_COLOR = rootStyles.getPropertyValue("--field-bg-color");
/** Fill color of the cell under the flag */
var FLAG_BG_COLOR = rootStyles.getPropertyValue("--flag-bg-color");


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

/** Class implements painting on canvas */
var CanvasDrawer = /** @class */ (function () {
    function CanvasDrawer(contextProvider, fileProvider) {
        this.contextProvider = contextProvider;
        this.fileProvider = fileProvider;
        /** Canvas 2d context */
        this.context = null;
        this.context = this.contextProvider.getInstance();
        if (!this.context)
            throw new Error("Failed to access the drawing context.");
        this.bomb = this.fileProvider.getImage('bomb');
        this.flag = this.fileProvider.getImage('flag');
    }
    /**
     * Draws an empty square
     *
     * @param cell - game board cell
     * @param cell.x - cell x coordinate
     * @param cell.y - cell y coordinate
     * @param size - square size in pixels
     * @param color - square color
     * @param hasBorders - whether to draw borders at a square
     */
    CanvasDrawer.prototype.drawSquare = function (_a, size, color, hasBorders) {
        var x = _a.x, y = _a.y;
        if (hasBorders === void 0) { hasBorders = true; }
        if (!this.context)
            return;
        this.context.fillStyle = color;
        this.context.fillRect(x, y, size, size);
        if (hasBorders) {
            this.drawBorders({ x: x, y: y }, size);
        }
    };
    /**
     * Draws square with number
     *
     * @param cell - game board cell
     * @param cell.x - cell x coordinate
     * @param cell.y - cell y coordinate
     * @param size - square size in pixels
     * @param value - number to draw
     */
    CanvasDrawer.prototype.drawNumber = function (_a, size, value) {
        var x = _a.x, y = _a.y;
        this.drawSquare({ x: x, y: y }, size, _constants__WEBPACK_IMPORTED_MODULE_0__.MAIN_BG_COLOR);
        /** font size should be less than the size of the square */
        this.context.font = size / 2 + "px Arial";
        this.context.fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.TEXT_COLOR;
        /** since the number is stretched upwards, for centering, we divide the width by a larger number than the height */
        this.context.fillText(value.toString(), x + (size / 2.5), y + (size / 1.5));
    };
    /**
     * Draws square with bomb
     *
     * @param cell - game board cell
     * @param cell.x - cell x coordinate
     * @param cell.y - cell y coordinate
     * @param size - square size in pixels
     */
    CanvasDrawer.prototype.drawBomb = function (_a, size) {
        var x = _a.x, y = _a.y;
        this.drawSquare({ x: x, y: y }, size, _constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_FIELD_BG_COLOR, false);
        var imageSize = this.getImageSize(size);
        this.context.drawImage(this.bomb, x + (size / 4), y + (size / 4), imageSize, imageSize);
    };
    /**
     * Draws square with flag
     *
     * @param cell - game board cell
     * @param cell.x - cell x coordinate
     * @param cell.y - cell y coordinate
     * @param size - square size in pixels
     */
    CanvasDrawer.prototype.drawFlag = function (_a, size) {
        var x = _a.x, y = _a.y;
        this.drawSquare({ x: x, y: y }, size, _constants__WEBPACK_IMPORTED_MODULE_0__.FLAG_BG_COLOR, false);
        var imageSize = this.getImageSize(size);
        this.context.drawImage(this.flag, x + (size / 4), y + (size / 4), imageSize, imageSize);
    };
    /**
     * Calculates the size of the image squared
     *
     * @param size - square size in pixels
     */
    CanvasDrawer.prototype.getImageSize = function (size) {
        return size / 2;
    };
    /**
     * Draws borders for square
     *
     * @param cell - game board cell
     * @param cell.x - cell x coordinate
     * @param cell.y - cell y coordinate
     * @param size - square size in pixels
     */
    CanvasDrawer.prototype.drawBorders = function (_a, size) {
        var x = _a.x, y = _a.y;
        this.context.strokeStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.BORDER_COLOR;
        this.context.strokeRect(x, y, size, size);
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

/** The main class of the game */
var Sapper = /** @class */ (function () {
    function Sapper(settings, contextProvider, drawer, elementSource, builder, generator, storage) {
        this.settings = settings;
        this.contextProvider = contextProvider;
        this.drawer = drawer;
        this.elementSource = elementSource;
        this.builder = builder;
        this.generator = generator;
        this.storage = storage;
        /** HTML select for choice of difficulty level */
        this.select = null;
        /** HTML button for start game */
        this.startGameButton = null;
        /** Container for best level time */
        this.levelTime = null;
        /** To display best level time before the game */
        this.bestLevelTime = null;
        /** Element on which the game will be drawn */
        this.canvas = null;
        /** Container for fields and other containers */
        this.gameContainer = null;
        /** To display the results of the game */
        this.resultContainer = null;
        /** Container for current time and best time of the game */
        this.winContainer = null;
        /** To display the remaining number of bombs */
        this.leftBombContainer = null;
        /** to display the time since the start of the game */
        this.timerContainer = null;
        /** Container for current time of the game in win container */
        this.currentTimeContainer = null;
        /** Container for best time of the game in win container */
        this.bestTimeContainer = null;
        /** Number of correctly allocated bombs */
        this.countCorrectlySelectedBombs = 0;
        this.select = elementSource.getElement('select-level');
        this.startGameButton = elementSource.getElement('start-game');
        this.levelTime = elementSource.getElement('level-time');
        this.bestLevelTime = elementSource.getElement('best-level-time');
        this.canvas = elementSource.getElement('canvas');
        this.gameContainer = elementSource.getElement('game-container');
        this.resultContainer = elementSource.getElement('result-container');
        this.winContainer = elementSource.getElement('win-container');
        this.leftBombContainer = elementSource.getElement('left-bomb');
        this.timerContainer = elementSource.getElement('timer');
        this.currentTimeContainer = elementSource.getElement('current-time-container');
        this.bestTimeContainer = elementSource.getElement('best-time-container');
    }
    /** Initializes game engine after the DOM has loaded */
    Sapper.prototype.init = function () {
        var _this = this;
        this.elementSource.afterLoad(function () {
            var selectedLevel = _this.storage.get('level') || 'easy';
            /** if we have previously selected the level, then set it again */
            _this.changeLevelInSettings(selectedLevel);
            for (var key in _this.settings.levels) {
                var option = _this.elementSource.createElement('option');
                option.textContent = key;
                option.value = key;
                // @ts-ignore
                option.selected = _this.settings.levels[key].selected;
                /** substitute the selection options into the select from the settings */
                _this.select.appendChild(option);
            }
            _this.select.addEventListener('change', _this.changeLevel.bind(_this), false);
            _this.startGameButton.addEventListener('click', _this.start.bind(_this), false);
        });
    };
    /** Generate level and start the game */
    Sapper.prototype.start = function () {
        this.system = this.builder.build(this.settings);
        this.cellPixelsSize = this.system.pixelsCountInCell;
        // display bombs left and timer above the field
        this.leftBombContainer.textContent = this.system.bombLeft.toString();
        this.timerContainer.textContent = '0';
        this.changeVisibilityElements();
        this.makeInitialFill();
        this.startTimer();
        this.contextProvider.listenCanvasClick(this.checkClick.bind(this));
        this.contextProvider.listenCanvasContextMenu(this.checkRightButtonClick.bind(this));
    };
    /** Start timer for counting the level time (in seconds) */
    Sapper.prototype.startTimer = function () {
        var _this = this;
        var seconds = 0;
        // display the current time above the field
        this.timerContainer.textContent = String(seconds++);
        // update the timer once per second
        this.timerInterval = setInterval(function () {
            _this.timerContainer.textContent = String(seconds++);
        }, 1000);
    };
    /**
     * Stop timer and save the level time count
     *
     * @param isWin - true, if the game ends with a win
     */
    Sapper.prototype.stopTimer = function (isWin) {
        clearInterval(this.timerInterval);
        if (isWin) {
            var currentTime = this.timerContainer.textContent;
            var currentLevel = this.storage.get('level');
            var bestTimeStorageName = "best-time-" + currentLevel;
            var bestTime = this.storage.get(bestTimeStorageName);
            var time = '';
            // display current time on the finish screen
            this.currentTimeContainer.textContent = currentTime;
            if (bestTime && Number(bestTime) < Number(currentTime)) {
                time = bestTime;
            }
            else {
                time = currentTime;
            }
            this.storage.save({
                name: bestTimeStorageName,
                value: time,
            });
            // display best time on the finish screen
            this.bestTimeContainer.textContent = time;
        }
    };
    /**
     * Changes the level after changing the value in the select
     *
     *  @param event - DOM event
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
     * Changes the level of the game in the settings
     *
     * @param selectedLevel - nama of selected level
     */
    Sapper.prototype.changeLevelInSettings = function (selectedLevel) {
        var bestTime = this.storage.get("best-time-" + selectedLevel);
        // if the level was passed earlier, then display its best time on the start screen
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
    /** Changes visibility of game elements on the page after start of the game */
    Sapper.prototype.changeVisibilityElements = function () {
        this.startGameButton.style.display = 'none';
        this.select.style.display = 'none';
        this.levelTime.style.display = 'none';
        this.gameContainer.style.display = 'flex';
        this.canvas.style.display = 'block';
    };
    /** Fills the entire canvas by default with the default color */
    Sapper.prototype.makeInitialFill = function () {
        var size = this.settings.canvasSize;
        this.drawer.drawSquare({
            x: 0,
            y: 0,
        }, size, _drawer_constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_FIELD_BG_COLOR);
    };
    /**
     * Track the click on the canvas
     *
     * @param mouseEvent - events that occur due to the user interacting with a mouse
     * @param mouseEvent.offsetX - offset of the mouse cursor along the X axis from the edge of the canvas
     * @param mouseEvent.offsetY - offset of the mouse cursor along the Y axis from the edge of the canvas
     */
    Sapper.prototype.checkClick = function (_a) {
        var offsetX = _a.offsetX, offsetY = _a.offsetY;
        var cell = this.getCell(offsetX, offsetY);
        // to click on the cell with the flag - first you need to remove it
        if (!cell.hasFlag) {
            if (cell.hasBomb) {
                this.openBombCell(cell); // draw a bomb in the specified cell
                this.openAllBombs(); // draw all the other bombs
                this.stopGame(); // stop the game
            }
            else if (cell.value !== 0) {
                this.openNumberSquare(cell); // draw a cell with a number
            }
            else {
                this.openEmptySquare(cell); // draw an empty cell
                this.recursiveOpenArea(cell); // go through the neighbors and draw the cells until the number appears in the cell
            }
        }
    };
    /**
     * Track the right mouse button click on the canvas
     *
     * @param mouseEvent - events that occur due to the user interacting with a mouse
     */
    Sapper.prototype.checkRightButtonClick = function (mouseEvent) {
        // prevent the context menu from opening
        mouseEvent.preventDefault();
        var cell = this.getCell(mouseEvent.offsetX, mouseEvent.offsetY);
        if (!cell.isOpen) {
            if (!cell.hasFlag) {
                this.setFlag(cell);
            }
            else {
                this.removeFlag(cell);
            }
        }
    };
    /**
     * Returns the cell of the generated level
     *
     * @param offsetX - offset of the mouse cursor along the X axis from the edge of the canvas
     * @param offsetY - offset of the mouse cursor along the Y axis from the edge of the canvas
     */
    Sapper.prototype.getCell = function (offsetX, offsetY) {
        var x = this.generator.getFloorNumber(offsetX / this.system.pixelsCountInCell);
        var y = this.generator.getFloorNumber(offsetY / this.system.pixelsCountInCell);
        return this.system.cells[y][x];
    };
    /**
     * Open area of cells around a given cell
     *
     * @param cell - game board cell
     */
    Sapper.prototype.recursiveOpenArea = function (cell) {
        for (var index in cell.area) {
            var systemCell = this.system.cells[cell.area[index].y][cell.area[index].x];
            /**
             * skip from processing:
             *  - open cell
             *  - flag cell
             *  - bomb cell
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
    /**
     * Open empty cell
     *
     * @param cell - game board cell
     */
    Sapper.prototype.openEmptySquare = function (cell) {
        this.drawer.drawSquare({
            x: this.calcPixelCoord(cell.x),
            y: this.calcPixelCoord(cell.y),
        }, this.cellPixelsSize, _drawer_constants__WEBPACK_IMPORTED_MODULE_0__.MAIN_BG_COLOR);
        cell.isOpen = true;
    };
    /**
     * Open cell with number
     *
     * @param cell - game board cell
     */
    Sapper.prototype.openNumberSquare = function (cell) {
        this.drawer.drawNumber({
            x: this.calcPixelCoord(cell.x),
            y: this.calcPixelCoord(cell.y),
        }, this.cellPixelsSize, cell.value);
        cell.isOpen = true;
    };
    /**
     * Open cell with bomb
     *
     * @param cell - game board cell
     */
    Sapper.prototype.openBombCell = function (cell) {
        this.drawer.drawBomb({
            x: this.calcPixelCoord(cell.x),
            y: this.calcPixelCoord(cell.y),
        }, this.cellPixelsSize);
        cell.isOpen = true;
    };
    /** Open all bombs on the field */
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
    /**
     * Set a flag in a cell and count the correctly selected bombs
     *
     * @param cell - game board cell
     */
    Sapper.prototype.setFlag = function (cell) {
        this.drawer.drawFlag({
            x: this.calcPixelCoord(cell.x),
            y: this.calcPixelCoord(cell.y),
        }, this.cellPixelsSize);
        cell.hasFlag = true;
        this.system.bombLeft = this.system.bombLeft - 1;
        // displaying the number of remaining bombs over the field
        this.leftBombContainer.textContent = this.system.bombLeft.toString();
        if (cell.hasBomb) {
            this.countCorrectlySelectedBombs++;
        }
        // stop the game with a win if all the bombs have run out and are marked with flags correctly
        if (this.system.bombLeft === 0 && this.system.bombCount === this.countCorrectlySelectedBombs) {
            this.stopGame(true);
        }
    };
    /**
     * Remove flag from cell
     *
     * @param cell - game board cell
     */
    Sapper.prototype.removeFlag = function (cell) {
        this.drawer.drawSquare({
            x: this.calcPixelCoord(cell.x),
            y: this.calcPixelCoord(cell.y),
        }, this.cellPixelsSize, _drawer_constants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_FIELD_BG_COLOR, false);
        cell.hasFlag = false;
        this.system.bombLeft = this.system.bombLeft + 1;
        // displaying the number of remaining bombs over the field
        this.leftBombContainer.textContent = this.system.bombLeft.toString();
        if (cell.hasBomb) {
            this.countCorrectlySelectedBombs--;
        }
    };
    /**
     * Calculate the initial coordinates of the cell in pixels
     *
     * @param coord - coordinate on the playing field
     */
    Sapper.prototype.calcPixelCoord = function (coord) {
        return Number(coord) * this.cellPixelsSize;
    };
    /**
     * Stop game
     *
     * @param isWin - true, if the game ends with a win
     */
    Sapper.prototype.stopGame = function (isWin) {
        var _this = this;
        if (isWin === void 0) { isWin = false; }
        this.stopTimer(isWin);
        // show the restart button
        this.resultContainer.style.display = 'flex';
        if (isWin) {
            // if you won, show congratulations
            this.winContainer.style.display = 'flex';
        }
        // this is to animate the background appearance
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
/** Math number generator */
var Generator = /** @class */ (function () {
    function Generator(getRandom, getFloor) {
        this.getRandom = getRandom;
        this.getFloor = getFloor;
    }
    /**
     * Returns a random integer in a specified range
     *
     * @param min - minimum number from the interval
     * @param max - maximum number from the interval
     */
    Generator.prototype.getRandomArbitrary = function (min, max) {
        return this.getFloorNumber(this.getRandom() * (max - min)) + min;
    };
    /**
     * Rounds a number to an integer
     *
     * @param n - original number
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

/** Basic game settings */
var settings = {
    /** Size of the field in pixels */
    canvasSize: 800,
    /** The ratio of the display resolution of the current device in physical pixels to the resolution in logical (CSS) pixels */
    devicePixelRatio: 1,
    /** List of game difficulty levels */
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
/** List of game difficulty levels */
var levels = {
    beginner: {
        bombCount: 10,
        fieldSize: 20,
        selected: false,
    },
    easy: {
        bombCount: 15,
        fieldSize: 10,
        selected: true,
    },
    medium: {
        bombCount: 40,
        fieldSize: 20,
        selected: false,
    },
    hard: {
        bombCount: 100,
        fieldSize: 20,
        selected: false,
    },
    huge: {
        bombCount: 220,
        fieldSize: 32,
        selected: false,
    },
    extreme: {
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


/** To interact with the file system */
var FileSource = /** @class */ (function () {
    function FileSource() {
    }
    /**
     * Returns image file
     *
     * @param name - image file name
     */
    FileSource.prototype.getImage = function (name) {
        var img = new Image();
        img.src = "img/" + name + ".png";
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
/** Long-term storage of game data */
var DataStorage = /** @class */ (function () {
    function DataStorage(storage) {
        this.storage = storage;
    }
    /**
     * Saves an item to storage
     *
     * @param storageItem - stored item
     * @param storageItem.name - name of key in the store
     * @param storageItem.value - the key value in the store
     */
    DataStorage.prototype.save = function (_a) {
        var name = _a.name, value = _a.value;
        this.storage.setItem(name, value);
    };
    /**
     * Get item from storage
     *
     * @param name - name of key in the store
     */
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
/* harmony import */ var _storage_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./storage/index */ "./src/storage/index.ts");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");










var storage = new _storage_index__WEBPACK_IMPORTED_MODULE_8__.DataStorage(window.localStorage);
var fileProvider = new _source_index__WEBPACK_IMPORTED_MODULE_7__.FileSource();
var domSource = new _dom_index__WEBPACK_IMPORTED_MODULE_2__.DomSource(window);
var contextProvider = new _context_index__WEBPACK_IMPORTED_MODULE_1__.CanvasContextProvider(domSource, _settings_index__WEBPACK_IMPORTED_MODULE_6__.settings);
var drawer = new _drawer_index__WEBPACK_IMPORTED_MODULE_3__.CanvasDrawer(contextProvider, fileProvider);
var generator = new _generator_index__WEBPACK_IMPORTED_MODULE_5__.Generator(Math.random, Math.floor);
var builder = new _builder_index__WEBPACK_IMPORTED_MODULE_0__.LevelBuilder(generator);
var sapper = new _game_index__WEBPACK_IMPORTED_MODULE_4__.Sapper(_settings_index__WEBPACK_IMPORTED_MODULE_6__.settings, contextProvider, drawer, domSource, builder, generator, storage);
sapper.init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDeEMsSUFBTSxlQUFlLEdBQUcsSUFBSSxpRUFBcUIsQ0FBQyxTQUFTLEVBQUUscURBQVEsQ0FBQyxDQUFDO0FBQ3ZFLElBQU0sTUFBTSxHQUFHLElBQUksdURBQVksQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDL0QsSUFBTSxTQUFTLEdBQUcsSUFBSSx1REFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pELElBQU0sT0FBTyxHQUFHLElBQUksd0RBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM1QyxJQUFNLE1BQU0sR0FBRyxJQUFJLCtDQUFNLENBQUMscURBQVEsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRXJHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NhcHBlci8uL3NyYy9pbWcvYm9tYi5wbmciLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2ltZy9mbGFnLnBuZyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW5kZXguc2Nzcz8yMDZmIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9idWlsZGVyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvYnVpbGRlci9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvY29udGV4dC9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZG9tL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kcmF3ZXIvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kcmF3ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dhbWUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dlbmVyYXRvci9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc2V0dGluZ3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3NldHRpbmdzL2xldmVscy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc291cmNlL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9zdG9yYWdlL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9ib21iLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvZmxhZy5wbmdcIjsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBBcmVhU3RydWN0dXJlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiBDb29yZGluYXRlcyBvZiBuZWlnaGJvcmluZyBjZWxscyByZWxhdGl2ZSB0byB0aGUgY2VudGVyIGNlbGxcbiAqIFxuICogQGV4YW1wbGVcbiAqICAjMCMxIzIjXG4gKiAgIzctOC0zI1xuICogICM2IzUjNCNcbiAqL1xuZXhwb3J0IGNvbnN0IEFSRUFfU1RSVUNUVVJFOiBBcmVhU3RydWN0dXJlID0ge1xuICAgIDA6IHsgeDogLTEsIHk6IC0xIH0sXG4gICAgMTogeyB4OiAwLCB5OiAtMSB9LFxuICAgIDI6IHsgeDogMSwgeTogLTEgfSxcbiAgICAzOiB7IHg6IDEsIHk6IDAgfSxcbiAgICA0OiB7IHg6IDEsIHk6IDEgfSxcbiAgICA1OiB7IHg6IDAsIHk6IDEgfSxcbiAgICA2OiB7IHg6IC0xLCB5OiAxIH0sXG4gICAgNzogeyB4OiAtMSwgeTogMCB9LFxufSIsImltcG9ydCB7IENvbXBsZXhpdHksIENvbXBsZXhpdHlMaXN0LCBHYW1lU2V0dGluZ3MgfSBmcm9tIFwiLi4vc2V0dGluZ3MvdHlwZXNcIjtcbmltcG9ydCB7IEFyZWFTdHJ1Y3R1cmUsIE1hcFN0cnVjdHVyZSwgU3lzdGVtQnVpbGRlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBBUkVBX1NUUlVDVFVSRSB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgTWF0aEdlbmVyYXRvciB9IGZyb20gXCIuLi9nZW5lcmF0b3IvdHlwZXNcIjtcblxuLyoqIENsYXNzIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBsZXZlbHMgYmFzZWQgb24gbGV2ZWxzIHNldHRpbmdzICovXG5leHBvcnQgY2xhc3MgTGV2ZWxCdWlsZGVyIGltcGxlbWVudHMgU3lzdGVtQnVpbGRlciB7XG4gICAgLyoqIFNpemUgb2YgdGhlIGZpZWxkIGluIGNlbGxzICovXG4gICAgcHJpdmF0ZSBmaWVsZFNpemU6IENlbGxBbW91bnQ7XG5cbiAgICAvKiogU2l6ZSBvZiB0aGUgZmllbGQgaW4gcGl4ZWxzICovXG4gICAgcHJpdmF0ZSBjYW52YXNTaXplOiBQaXhlbHNBbW91bnQ7XG4gICAgXG4gICAgLyoqIE51bWJlciBvZiBsZXZlbCBib21icyAqL1xuICAgIHByaXZhdGUgYm9tYkNvdW50OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0b3I6IE1hdGhHZW5lcmF0b3IsXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgbGV2ZWxcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2V0dGluZ3MgLSBiYXNpYyBnYW1lIHNldHRpbmdzXG4gICAgICovXG4gICAgcHVibGljIGJ1aWxkKHNldHRpbmdzOiBHYW1lU2V0dGluZ3MpOiBNYXBTdHJ1Y3R1cmUge1xuICAgICAgICBjb25zdCB7IGZpZWxkU2l6ZSwgYm9tYkNvdW50IH0gPSB0aGlzLmdldFNlbGVjdGVkTGV2ZWwoc2V0dGluZ3MubGV2ZWxzKTtcblxuICAgICAgICB0aGlzLmZpZWxkU2l6ZSA9IGZpZWxkU2l6ZTtcbiAgICAgICAgdGhpcy5ib21iQ291bnQgPSBib21iQ291bnQ7XG4gICAgICAgIHRoaXMuY2FudmFzU2l6ZSA9IHNldHRpbmdzLmNhbnZhc1NpemU7XG5cbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5nZW5lcmF0ZU1hcFN0cnVjdHVyZSgpO1xuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc2VsZWN0ZWQgZGlmZmljdWx0eSBsZXZlbCBmcm9tIHRoZSBsaXN0IG9mIGxldmVscyBmcm9tIHRoZSBzZXR0aW5nc1xuICAgICAqIFxuICAgICAqIEBwYXJhbSBsZXZlbHMgLSBsaXN0IG9mIHBvc3NpYmxlIGxldmVscyBvZiBkaWZmaWN1bHR5IG9mIHRoZSBnYW1lXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZExldmVsKGxldmVsczogQ29tcGxleGl0eUxpc3QpOiBDb21wbGV4aXR5IHtcbiAgICAgICAgbGV0IHNlbGVjdGVkTGV2ZWw6IENvbXBsZXhpdHk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGxldmVscykge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKGxldmVsc1trZXldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTGV2ZWwgPSBsZXZlbHNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZExldmVsO1xuICAgIH1cblxuICAgIC8qKiBHZW5lcmF0ZXMgdGhlIGZpZWxkIHN0cnVjdHVyZSBmb3IgdGhlIHNlbGVjdGVkIGRpZmZpY3VsdHkgbGV2ZWwgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlTWFwU3RydWN0dXJlKCk6IE1hcFN0cnVjdHVyZSB7XG4gICAgICAgIGNvbnN0IG1hcFN0cnVjdHVyZTogTWFwU3RydWN0dXJlID0ge1xuICAgICAgICAgICAgcGl4ZWxzQ291bnRJbkNlbGw6IHRoaXMuY2FudmFzU2l6ZSAvIHRoaXMuZmllbGRTaXplLFxuICAgICAgICAgICAgYm9tYkNvdW50OiB0aGlzLmJvbWJDb3VudCxcbiAgICAgICAgICAgIGJvbWJMZWZ0OiB0aGlzLmJvbWJDb3VudCxcbiAgICAgICAgICAgIGNlbGxzOiB7fSxcbiAgICAgICAgICAgIGJvbWJQb3NpdGlvbnM6IFtdLFxuICAgICAgICAgICAgZmllbGRTaXplOiB0aGlzLmZpZWxkU2l6ZSxcbiAgICAgICAgfTtcblxuICAgICAgICBtYXBTdHJ1Y3R1cmUuYm9tYlBvc2l0aW9ucyA9IHRoaXMuZ2VuZXJhdGVSYW5kb21Cb21iUG9zaXRpb25zKHRoaXMuZmllbGRTaXplICogdGhpcy5maWVsZFNpemUpO1xuXG4gICAgICAgIC8vIHRyYXZlcnNhbCBvZiBhcnJheXMgZ29lcyBmcm9tIGxlZnQgdG8gcmlnaHQgYW5kIGZyb20gdG9wIHRvIGJvdHRvbVxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuZmllbGRTaXplOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5maWVsZFNpemU7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdzogbnVtYmVyID0geTtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsOiBudW1iZXIgPSB4O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFtYXBTdHJ1Y3R1cmUuY2VsbHNbcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBtYXBTdHJ1Y3R1cmUuY2VsbHNbcm93XSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNCb21iOiBib29sZWFuID0gbWFwU3RydWN0dXJlLmJvbWJQb3NpdGlvbnMuaW5jbHVkZXMoeCArIHkgKiB0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJlYTogQXJlYVN0cnVjdHVyZSA9IHRoaXMuZ2VuZXJhdGVDZWxsQXJlYSh7IHgsIHkgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsU3RydWN0dXJlOiBDZWxsID0ge1xuICAgICAgICAgICAgICAgICAgICB5OiByb3csIFxuICAgICAgICAgICAgICAgICAgICB4OiBjZWxsLFxuICAgICAgICAgICAgICAgICAgICBhcmVhLFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChoYXNCb21iKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxTdHJ1Y3R1cmUuaGFzQm9tYiA9IGhhc0JvbWI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbFN0cnVjdHVyZS52YWx1ZSA9IHRoaXMuY2FsY0JvbWJzQXJvdW5kQ2VsbHMoYXJlYSwgbWFwU3RydWN0dXJlLmJvbWJQb3NpdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1hcFN0cnVjdHVyZS5jZWxsc1tyb3ddW2NlbGxdID0gY2VsbFN0cnVjdHVyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXBTdHJ1Y3R1cmU7XG4gICAgfVxuXG4gICAgLyoqIFxuICAgICAqIEdlbmVyYXRlcyBhIHJlZ2lvbiBvZiBjZWxscyB3aXRoIHRoZWlyIGNvb3JkaW5hdGVzIGFyb3VuZCB0aGUgc2VsZWN0ZWQgY2VsbCBiYXNlZCBvbiBpdHMgY29vcmRpbmF0ZXNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgICAqIEBwYXJhbSBjZWxsLnggLSB0aGUgeCBjb29yZGluYXRlIG9uIHRoZSBwbGF5aW5nIGZpZWxkXG4gICAgICogQHBhcmFtIGNlbGwueSAtIHRoZSB5IGNvb3JkaW5hdGUgb24gdGhlIHBsYXlpbmcgZmllbGRcbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlQ2VsbEFyZWEoeyB4LCB5IH06IENlbGwpOiBBcmVhU3RydWN0dXJlIHtcbiAgICAgICAgY29uc3QgYXJlYTogQXJlYVN0cnVjdHVyZSA9IHt9O1xuICAgIFxuICAgICAgICAvLyA4IC0gdGhlIG51bWJlciBvZiBjZWxscyBhcm91bmQgdGhlIGNlbnRyYWxcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIC8qKiBDaGVja2luZyBpZiB0aGUgY2VsbCBnb2VzIGJleW9uZCB0aGUgbGVmdCBhbmQgdG9wIGJvcmRlcnMgb2YgdGhlIGZpZWxkICovXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBpZiAoeCArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS54IDwgMCB8fCB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnkgPCAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKiBDaGVja2luZyBpZiB0aGUgY2VsbCBnb2VzIGJleW9uZCB0aGUgcmlnaHQgYW5kIGJvdHRvbSBib3JkZXJzIG9mIHRoZSBmaWVsZCAqL1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCA+PSB0aGlzLmZpZWxkU2l6ZSB8fCB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnkgPj0gdGhpcy5maWVsZFNpemUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgYXJlYVtpbmRleF0gPSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHg6IHggKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueCxcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgeTogeSArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS55LFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHJhbmRvbSBwb3NpdGlvbnMgZm9yIHBsYWNpbmcgYm9tYnMgb24gdGhlIGZpZWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2VsbHNDb3VudCAtIG51bWJlciBvZiBjZWxscyBvZiB0aGUgcGxheWluZyBmaWVsZFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVSYW5kb21Cb21iUG9zaXRpb25zKGNlbGxzQ291bnQ6IENlbGxBbW91bnQpOiBudW1iZXJbXSB7XG4gICAgICAgIGNvbnN0IGJvbWJQb3NpdGlvbnM6IEJvbWJQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5ib21iQ291bnQ7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCByYW5kb21Qb3NpdGlvbjogbnVtYmVyID0gdGhpcy5nZW5lcmF0b3IuZ2V0UmFuZG9tQXJiaXRyYXJ5KDEsIGNlbGxzQ291bnQpO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9uIGlzIGFscmVhZHkgaW4gdGhlIGxpc3QsIHdlIGdlbmVyYXRlIGl0IGFnYWluXG4gICAgICAgICAgICB3aGlsZSAoYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyhyYW5kb21Qb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICByYW5kb21Qb3NpdGlvbiA9IHRoaXMuZ2VuZXJhdG9yLmdldFJhbmRvbUFyYml0cmFyeSgxLCBjZWxsc0NvdW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYm9tYlBvc2l0aW9ucy5wdXNoKHJhbmRvbVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib21iUG9zaXRpb25zLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3VudHMgdGhlIG51bWJlciBvZiBib21icyBhcm91bmQgdGhlIGNlbGxcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gYXJlYSAtIG5laWdoYm9yaW5nIGNlbGxzIHJlbGF0aXZlIHRvIHRoZSBjZW50ZXIgY2VsbFxuICAgICAqIEBwYXJhbSBib21iUG9zaXRpb25zIC0gcG9zaXRpb25zIG9mIGJvbWJzIG9uIHRoZSBmaWVsZFxuICAgICAqL1xuICAgIHByaXZhdGUgY2FsY0JvbWJzQXJvdW5kQ2VsbHMoYXJlYTogQXJlYVN0cnVjdHVyZSwgYm9tYlBvc2l0aW9uczogQm9tYlBvc2l0aW9ucyk6IG51bWJlciB7XG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZWEpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBhcmVhW2tleV07XG5cbiAgICAgICAgICAgIGlmIChib21iUG9zaXRpb25zLmluY2x1ZGVzKGNlbGwueCArIGNlbGwueSAqIHRoaXMuZmllbGRTaXplKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59IiwiaW1wb3J0IHsgRWxlbWVudFNvdXJjZSB9IGZyb20gXCIuLi9kb20vdHlwZXNcIjtcbmltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gXCIuLi9zZXR0aW5ncy90eXBlc1wiO1xuaW1wb3J0IHsgRHJhd2luZ0NvbnRleHQsIERyYXdpbmdDb250ZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKiogUHJvdmlkZXMgdGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcyAqL1xuZXhwb3J0IGNsYXNzIENhbnZhc0NvbnRleHRQcm92aWRlciBpbXBsZW1lbnRzIERyYXdpbmdDb250ZXh0UHJvdmlkZXIge1xuICAvKiogR2FtZSB3aWxsIGJlIGRyYXduIG9uIHRoaXMgY2FudmFzICovXG4gIHByaXZhdGUgY2FudmFzOiBOdWxsYWJsZTxIVE1MQ2FudmFzRWxlbWVudD4gPSBudWxsO1xuXG4gIC8qKiBDYW52YXMgMmQgY29udGV4dCAqL1xuICBwcml2YXRlIGNvbnRleHQ6IE51bGxhYmxlPERyYXdpbmdDb250ZXh0PiA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50U291cmNlOiBFbGVtZW50U291cmNlLFxuICAgIHByaXZhdGUgc2V0dGluZ3M6IEdhbWVTZXR0aW5nc1xuICApIHtcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBpZiAoIWNhbnZhcykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgYSBjYW52YXMuXCIpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXMgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMubm9ybWFsaXplU2NhbGUoKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIGNhbnZhcyAyZCBjb250ZXh0ICovXG4gIHB1YmxpYyBnZXRJbnN0YW5jZSgpOiBEcmF3aW5nQ29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dDtcbiAgfVxuXG4gIC8qKiBcbiAgICogTGlzdGVuIHRvIGNsaWNraW5nIG9uIHRoZSBjYW52YXMgYnkgbGVmdCBtb3VzZSBidXR0b25cbiAgICogXG4gICAqIEBwYXJhbSBjYWxsYmFjayAtIGEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgY2xpY2tpbmcgb24gdGhlIGNhbnZhcyBieSBsZWZ0IG1vdXNlIGJ1dHRvblxuICAgKi9cbiAgcHVibGljIGxpc3RlbkNhbnZhc0NsaWNrKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKiBcbiAgICogTGlzdGVuIHRvIGNsaWNraW5nIG9uIHRoZSBjYW52YXMgYnkgcmlnaHQgbW91c2UgYnV0dG9uXG4gICAqIFxuICAgKiBAcGFyYW0gY2FsbGJhY2sgLSBhIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGNsaWNraW5nIG9uIHRoZSBjYW52YXMgYnkgcmlnaHQgbW91c2UgYnV0dG9uXG4gICAqL1xuICBwdWJsaWMgbGlzdGVuQ2FudmFzQ29udGV4dE1lbnUoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqIE5vcm1hbGl6ZSBjYW52YXMgc3R5bGVzIGFuZCBjb250ZXh0IHNjYWxlICovXG4gIHByaXZhdGUgbm9ybWFsaXplU2NhbGUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNhbnZhcyB8fCAhdGhpcy5jb250ZXh0KSByZXR1cm47XG5cbiAgICBjb25zdCByYXRpbyA9IHRoaXMuc2V0dGluZ3MuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNvbnN0IHNpemU6IFBpeGVsc0Ftb3VudCA9IHRoaXMuc2V0dGluZ3MuY2FudmFzU2l6ZTtcblxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gc2l6ZSAqIHJhdGlvO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHNpemUgKiByYXRpbztcblxuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGA7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZX1weGA7XG5cbiAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gIH1cbn0iLCJpbXBvcnQgeyBFbGVtZW50U291cmNlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqIENsYXNzIGFsbG93cyBpbnRlcmFjdCB3aXRoIHRoZSBET00gdHJlZSAqL1xuZXhwb3J0IGNsYXNzIERvbVNvdXJjZSBpbXBsZW1lbnRzIEVsZW1lbnRTb3VyY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdpbmRvdzogV2luZG93KSB7fVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgSFRNTCBlbGVtZW50XG4gICAqIFxuICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2YgSFRNTCBlbGVtZW50XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcpOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4ge1xuICAgIHJldHVybiB0aGlzLndpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgSFRNTCBlbGVtZW50IGJ5IElEXG4gICAqIFxuICAgKiBAcGFyYW0gaWQgLSBJRCBvZiBIVE1MIGVsZW1lbnRcbiAgICovXG4gIHB1YmxpYyBnZXRFbGVtZW50KGlkOiBzdHJpbmcpOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4ge1xuICAgIHJldHVybiB0aGlzLndpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgYSBjYWxsYmFjayBhZnRlciBsb2FkaW5nIHRoZSBET00gdHJlZVxuICAgKiBcbiAgICogQHBhcmFtIGNhbGxiYWNrIC0gZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgbG9hZGluZyB0aGUgRE9NIHRyZWVcbiAgICovXG4gIHB1YmxpYyBhZnRlckxvYWQoY2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgfSk7XG4gIH1cbn0iLCJjb25zdCByb290U3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuXG4vKiogQm9yZGVyIGNvbG9yIG9uIHRoZSBmaWVsZCAqL1xuZXhwb3J0IGNvbnN0IEJPUkRFUl9DT0xPUjogQ29sb3IgPSByb290U3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXG4gICAgXCItLWJvcmRlci1jb2xvclwiXG4pO1xuXG4vKiogQ29sb3Igb2YgdGhlIHRleHQgaW4gdGhlIGdhbWUgKi9cbmV4cG9ydCBjb25zdCBURVhUX0NPTE9SOiBDb2xvciA9IHJvb3RTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcbiAgICBcIi0tdGV4dC1jb2xvclwiXG4pO1xuXG4vKiogTWFpbiBiYWNrZ3JvdW5kIGNvbG9yIGluIHRoZSBnYW1lICovXG5leHBvcnQgY29uc3QgTUFJTl9CR19DT0xPUjogQ29sb3IgPSByb290U3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXG4gICAgXCItLW1haW4tYmctY29sb3JcIlxuKTtcblxuLyoqIEZpZWxkIGZpbGwgY29sb3IgKi9cbmV4cG9ydCBjb25zdCBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SOiBDb2xvciA9IHJvb3RTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcbiAgICBcIi0tZmllbGQtYmctY29sb3JcIlxuKTtcblxuLyoqIEZpbGwgY29sb3Igb2YgdGhlIGNlbGwgdW5kZXIgdGhlIGZsYWcgKi9cbmV4cG9ydCBjb25zdCBGTEFHX0JHX0NPTE9SOiBDb2xvciA9IHJvb3RTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcbiAgICBcIi0tZmxhZy1iZy1jb2xvclwiXG4pO1xuIiwiaW1wb3J0IHsgRHJhd2luZ0NvbnRleHQsIERyYXdpbmdDb250ZXh0UHJvdmlkZXIgfSBmcm9tIFwiLi4vY29udGV4dC90eXBlc1wiO1xuaW1wb3J0IHsgU291cmNlUHJvdmlkZXIgfSBmcm9tIFwiLi4vc291cmNlL3R5cGVzXCI7XG5pbXBvcnQgeyBNQUlOX0JHX0NPTE9SLCBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SLCBURVhUX0NPTE9SLCBGTEFHX0JHX0NPTE9SLCBCT1JERVJfQ09MT1IgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IERyYXdlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKiBDbGFzcyBpbXBsZW1lbnRzIHBhaW50aW5nIG9uIGNhbnZhcyAqL1xuZXhwb3J0IGNsYXNzIENhbnZhc0RyYXdlciBpbXBsZW1lbnRzIERyYXdlciB7XG4gIC8qKiBDYW52YXMgMmQgY29udGV4dCAqL1xuICBwcml2YXRlIGNvbnRleHQ6IERyYXdpbmdDb250ZXh0ID0gbnVsbDtcblxuICAvKiogQm9tYiBpbWFnZSAqL1xuICBwcml2YXRlIGJvbWI6IENhbnZhc0ltYWdlU291cmNlO1xuXG4gIC8qKiBGbGFnIGltYWdlICovXG4gIHByaXZhdGUgZmxhZzogQ2FudmFzSW1hZ2VTb3VyY2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb250ZXh0UHJvdmlkZXI6IERyYXdpbmdDb250ZXh0UHJvdmlkZXIsXG4gICAgcHJpdmF0ZSBmaWxlUHJvdmlkZXI6IFNvdXJjZVByb3ZpZGVyXG4gICkge1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY29udGV4dFByb3ZpZGVyLmdldEluc3RhbmNlKCk7XG4gICAgaWYgKCF0aGlzLmNvbnRleHQpIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBhY2Nlc3MgdGhlIGRyYXdpbmcgY29udGV4dC5cIik7XG5cbiAgICB0aGlzLmJvbWIgPSB0aGlzLmZpbGVQcm92aWRlci5nZXRJbWFnZSgnYm9tYicpO1xuICAgIHRoaXMuZmxhZyA9IHRoaXMuZmlsZVByb3ZpZGVyLmdldEltYWdlKCdmbGFnJyk7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgYW4gZW1wdHkgc3F1YXJlXG4gICAqXG4gICAqIEBwYXJhbSBjZWxsIC0gZ2FtZSBib2FyZCBjZWxsXG4gICAqIEBwYXJhbSBjZWxsLnggLSBjZWxsIHggY29vcmRpbmF0ZVxuICAgKiBAcGFyYW0gY2VsbC55IC0gY2VsbCB5IGNvb3JkaW5hdGVcbiAgICogQHBhcmFtIHNpemUgLSBzcXVhcmUgc2l6ZSBpbiBwaXhlbHNcbiAgICogQHBhcmFtIGNvbG9yIC0gc3F1YXJlIGNvbG9yXG4gICAqIEBwYXJhbSBoYXNCb3JkZXJzIC0gd2hldGhlciB0byBkcmF3IGJvcmRlcnMgYXQgYSBzcXVhcmVcbiAgICovXG4gIHB1YmxpYyBkcmF3U3F1YXJlKHsgeCwgeSB9OiBDZWxsLCBzaXplOiBQaXhlbHNBbW91bnQsIGNvbG9yOiBzdHJpbmcsIGhhc0JvcmRlcnM6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnRleHQpIHJldHVybjtcblxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgc2l6ZSwgc2l6ZSk7XG5cbiAgICBpZiAoaGFzQm9yZGVycykge1xuICAgICAgdGhpcy5kcmF3Qm9yZGVycyh7IHgsIHkgfSwgc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIHNxdWFyZSB3aXRoIG51bWJlclxuICAgKlxuICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgKiBAcGFyYW0gY2VsbC54IC0gY2VsbCB4IGNvb3JkaW5hdGVcbiAgICogQHBhcmFtIGNlbGwueSAtIGNlbGwgeSBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBzaXplIC0gc3F1YXJlIHNpemUgaW4gcGl4ZWxzXG4gICAqIEBwYXJhbSB2YWx1ZSAtIG51bWJlciB0byBkcmF3XG4gICAqL1xuICBwdWJsaWMgZHJhd051bWJlcih7IHgsIHkgfTogQ2VsbCwgc2l6ZTogUGl4ZWxzQW1vdW50LCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5kcmF3U3F1YXJlKHsgeCwgeSB9LCBzaXplLCBNQUlOX0JHX0NPTE9SKTtcblxuICAgIC8qKiBmb250IHNpemUgc2hvdWxkIGJlIGxlc3MgdGhhbiB0aGUgc2l6ZSBvZiB0aGUgc3F1YXJlICovXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgJHtzaXplIC8gMn1weCBBcmlhbGA7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFRFWFRfQ09MT1I7XG5cbiAgICAvKiogc2luY2UgdGhlIG51bWJlciBpcyBzdHJldGNoZWQgdXB3YXJkcywgZm9yIGNlbnRlcmluZywgd2UgZGl2aWRlIHRoZSB3aWR0aCBieSBhIGxhcmdlciBudW1iZXIgdGhhbiB0aGUgaGVpZ2h0ICovXG4gICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHZhbHVlLnRvU3RyaW5nKCksIHggKyAoc2l6ZSAvIDIuNSksIHkgKyAoc2l6ZSAvIDEuNSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIHNxdWFyZSB3aXRoIGJvbWJcbiAgICpcbiAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICogQHBhcmFtIGNlbGwueCAtIGNlbGwgeCBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBjZWxsLnkgLSBjZWxsIHkgY29vcmRpbmF0ZVxuICAgKiBAcGFyYW0gc2l6ZSAtIHNxdWFyZSBzaXplIGluIHBpeGVsc1xuICAgKi9cbiAgcHVibGljIGRyYXdCb21iKHsgeCwgeSB9OiBDZWxsLCBzaXplOiBQaXhlbHNBbW91bnQpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXdTcXVhcmUoeyB4LCB5IH0sIHNpemUsIElOSVRJQUxfRklFTERfQkdfQ09MT1IsIGZhbHNlKTtcblxuICAgIGNvbnN0IGltYWdlU2l6ZTogbnVtYmVyID0gdGhpcy5nZXRJbWFnZVNpemUoc2l6ZSk7XG5cbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYm9tYiwgeCArIChzaXplIC8gNCksIHkgKyAoc2l6ZSAvIDQpLCBpbWFnZVNpemUsIGltYWdlU2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3Mgc3F1YXJlIHdpdGggZmxhZ1xuICAgKlxuICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgKiBAcGFyYW0gY2VsbC54IC0gY2VsbCB4IGNvb3JkaW5hdGVcbiAgICogQHBhcmFtIGNlbGwueSAtIGNlbGwgeSBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBzaXplIC0gc3F1YXJlIHNpemUgaW4gcGl4ZWxzXG4gICAqL1xuICBwdWJsaWMgZHJhd0ZsYWcoeyB4LCB5IH06IENlbGwsIHNpemU6IFBpeGVsc0Ftb3VudCk6IHZvaWQge1xuICAgIHRoaXMuZHJhd1NxdWFyZSh7IHgsIHkgfSwgc2l6ZSwgRkxBR19CR19DT0xPUiwgZmFsc2UpO1xuXG4gICAgY29uc3QgaW1hZ2VTaXplOiBudW1iZXIgPSB0aGlzLmdldEltYWdlU2l6ZShzaXplKTtcblxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5mbGFnLCB4ICsgKHNpemUgLyA0KSwgeSArIChzaXplIC8gNCksIGltYWdlU2l6ZSwgaW1hZ2VTaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzaXplIG9mIHRoZSBpbWFnZSBzcXVhcmVkXG4gICAqXG4gICAqIEBwYXJhbSBzaXplIC0gc3F1YXJlIHNpemUgaW4gcGl4ZWxzXG4gICAqL1xuICBwcml2YXRlIGdldEltYWdlU2l6ZShzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBzaXplIC8gMjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBib3JkZXJzIGZvciBzcXVhcmVcbiAgICpcbiAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICogQHBhcmFtIGNlbGwueCAtIGNlbGwgeCBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBjZWxsLnkgLSBjZWxsIHkgY29vcmRpbmF0ZVxuICAgKiBAcGFyYW0gc2l6ZSAtIHNxdWFyZSBzaXplIGluIHBpeGVsc1xuICAgKi9cbiAgcHJpdmF0ZSBkcmF3Qm9yZGVycyh7IHgsIHkgfTogQ2VsbCwgc2l6ZTogUGl4ZWxzQW1vdW50KTogdm9pZCB7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gQk9SREVSX0NPTE9SO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VSZWN0KHgsIHksIHNpemUsIHNpemUpO1xuICB9XG59IiwiaW1wb3J0IHsgTWFwU3RydWN0dXJlLCBTeXN0ZW1CdWlsZGVyIH0gZnJvbSAnLi4vYnVpbGRlci90eXBlcyc7XG5pbXBvcnQgeyBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC90eXBlcyc7XG5pbXBvcnQgeyBFbGVtZW50U291cmNlIH0gZnJvbSAnLi4vZG9tL3R5cGVzJztcbmltcG9ydCB7IElOSVRJQUxfRklFTERfQkdfQ09MT1IsIE1BSU5fQkdfQ09MT1IgfSBmcm9tICcuLi9kcmF3ZXIvY29uc3RhbnRzJztcbmltcG9ydCB7IERyYXdlciB9IGZyb20gJy4uL2RyYXdlci90eXBlcyc7XG5pbXBvcnQgeyBNYXRoR2VuZXJhdG9yIH0gZnJvbSAnLi4vZ2VuZXJhdG9yL3R5cGVzJztcbmltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3R5cGVzJztcbmltcG9ydCB7IFN0b3JhZ2VQcm92aWRlciB9IGZyb20gJy4uL3N0b3JhZ2UvdHlwZXMnO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKiBUaGUgbWFpbiBjbGFzcyBvZiB0aGUgZ2FtZSAqL1xuZXhwb3J0IGNsYXNzIFNhcHBlciBpbXBsZW1lbnRzIEdhbWUge1xuICAgIC8qKiBIVE1MIHNlbGVjdCBmb3IgY2hvaWNlIG9mIGRpZmZpY3VsdHkgbGV2ZWwgKi9cbiAgICBwcml2YXRlIHNlbGVjdDogTnVsbGFibGU8SFRNTFNlbGVjdEVsZW1lbnQ+ID0gbnVsbDtcblxuICAgIC8qKiBIVE1MIGJ1dHRvbiBmb3Igc3RhcnQgZ2FtZSAqL1xuICAgIHByaXZhdGUgc3RhcnRHYW1lQnV0dG9uOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgIC8qKiBDb250YWluZXIgZm9yIGJlc3QgbGV2ZWwgdGltZSAqL1xuICAgICBwcml2YXRlIGxldmVsVGltZTogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcblxuICAgIC8qKiBUbyBkaXNwbGF5IGJlc3QgbGV2ZWwgdGltZSBiZWZvcmUgdGhlIGdhbWUgKi9cbiAgICBwcml2YXRlIGJlc3RMZXZlbFRpbWU6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogRWxlbWVudCBvbiB3aGljaCB0aGUgZ2FtZSB3aWxsIGJlIGRyYXduICovXG4gICAgcHJpdmF0ZSBjYW52YXM6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogQ29udGFpbmVyIGZvciBmaWVsZHMgYW5kIG90aGVyIGNvbnRhaW5lcnMgKi9cbiAgICBwcml2YXRlIGdhbWVDb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogVG8gZGlzcGxheSB0aGUgcmVzdWx0cyBvZiB0aGUgZ2FtZSAqL1xuICAgIHByaXZhdGUgcmVzdWx0Q29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIENvbnRhaW5lciBmb3IgY3VycmVudCB0aW1lIGFuZCBiZXN0IHRpbWUgb2YgdGhlIGdhbWUgKi9cbiAgICBwcml2YXRlIHdpbkNvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcblxuICAgIC8qKiBUbyBkaXNwbGF5IHRoZSByZW1haW5pbmcgbnVtYmVyIG9mIGJvbWJzICovXG4gICAgcHJpdmF0ZSBsZWZ0Qm9tYkNvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcblxuICAgIC8qKiB0byBkaXNwbGF5IHRoZSB0aW1lIHNpbmNlIHRoZSBzdGFydCBvZiB0aGUgZ2FtZSAqL1xuICAgIHByaXZhdGUgdGltZXJDb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogQ29udGFpbmVyIGZvciBjdXJyZW50IHRpbWUgb2YgdGhlIGdhbWUgaW4gd2luIGNvbnRhaW5lciAqL1xuICAgIHByaXZhdGUgY3VycmVudFRpbWVDb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogQ29udGFpbmVyIGZvciBiZXN0IHRpbWUgb2YgdGhlIGdhbWUgaW4gd2luIGNvbnRhaW5lciAqL1xuICAgIHByaXZhdGUgYmVzdFRpbWVDb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG4gICAgXG4gICAgLyoqIFN0cnVjdHVyZSBvZiB0aGUgZmllbGQgb2YgdGhlIHNlbGVjdGVkIGxldmVsIG9mIGRpZmZpY3VsdHkgKi9cbiAgICBwcml2YXRlIHN5c3RlbTogTWFwU3RydWN0dXJlO1xuXG4gICAgLyoqIENlbGwgc2l6ZSBpbiBwaXhlbHMgKi9cbiAgICBwcml2YXRlIGNlbGxQaXhlbHNTaXplOiBQaXhlbHNBbW91bnQ7XG5cbiAgICAvKiogVGltZXIgZm9yIGNvdW50aW5nIHRpbWUgKi9cbiAgICBwcml2YXRlIHRpbWVySW50ZXJ2YWw6IGFueTsgLy8gdG9kbzogZml4IHR5cGVcblxuICAgIC8qKiBOdW1iZXIgb2YgY29ycmVjdGx5IGFsbG9jYXRlZCBib21icyAqL1xuICAgIHByaXZhdGUgY291bnRDb3JyZWN0bHlTZWxlY3RlZEJvbWJzOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyxcbiAgICAgICAgcHJpdmF0ZSBjb250ZXh0UHJvdmlkZXI6IERyYXdpbmdDb250ZXh0UHJvdmlkZXIsXG4gICAgICAgIHByaXZhdGUgZHJhd2VyOiBEcmF3ZXIsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFNvdXJjZTogRWxlbWVudFNvdXJjZSxcbiAgICAgICAgcHJpdmF0ZSBidWlsZGVyOiBTeXN0ZW1CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIGdlbmVyYXRvcjogTWF0aEdlbmVyYXRvcixcbiAgICAgICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlUHJvdmlkZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ID0gPEhUTUxTZWxlY3RFbGVtZW50PmVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnc2VsZWN0LWxldmVsJyk7XG4gICAgICAgIHRoaXMuc3RhcnRHYW1lQnV0dG9uID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdzdGFydC1nYW1lJyk7XG4gICAgICAgIHRoaXMubGV2ZWxUaW1lID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdsZXZlbC10aW1lJyk7XG4gICAgICAgIHRoaXMuYmVzdExldmVsVGltZSA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnYmVzdC1sZXZlbC10aW1lJyk7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5nYW1lQ29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdnYW1lLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLnJlc3VsdENvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgncmVzdWx0LWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLndpbkNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnd2luLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmxlZnRCb21iQ29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdsZWZ0LWJvbWInKTtcbiAgICAgICAgdGhpcy50aW1lckNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgndGltZXInKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZUNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnY3VycmVudC10aW1lLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmJlc3RUaW1lQ29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdiZXN0LXRpbWUtY29udGFpbmVyJyk7XG4gICAgfVxuXG4gICAgLyoqIEluaXRpYWxpemVzIGdhbWUgZW5naW5lIGFmdGVyIHRoZSBET00gaGFzIGxvYWRlZCAqL1xuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRTb3VyY2UuYWZ0ZXJMb2FkKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTGV2ZWwgPSB0aGlzLnN0b3JhZ2UuZ2V0KCdsZXZlbCcpIHx8ICdlYXN5JztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqIGlmIHdlIGhhdmUgcHJldmlvdXNseSBzZWxlY3RlZCB0aGUgbGV2ZWwsIHRoZW4gc2V0IGl0IGFnYWluICovXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUxldmVsSW5TZXR0aW5ncyhzZWxlY3RlZExldmVsKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2V0dGluZ3MubGV2ZWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gPEhUTUxPcHRpb25FbGVtZW50PnRoaXMuZWxlbWVudFNvdXJjZS5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGtleTtcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBrZXk7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRoaXMuc2V0dGluZ3MubGV2ZWxzW2tleV0uc2VsZWN0ZWQ7XG5cbiAgICAgICAgICAgICAgICAvKiogc3Vic3RpdHV0ZSB0aGUgc2VsZWN0aW9uIG9wdGlvbnMgaW50byB0aGUgc2VsZWN0IGZyb20gdGhlIHNldHRpbmdzICovXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VMZXZlbC5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zdGFydC5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBHZW5lcmF0ZSBsZXZlbCBhbmQgc3RhcnQgdGhlIGdhbWUgKi9cbiAgICBwcml2YXRlIHN0YXJ0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN5c3RlbSA9IHRoaXMuYnVpbGRlci5idWlsZCh0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5jZWxsUGl4ZWxzU2l6ZSA9IHRoaXMuc3lzdGVtLnBpeGVsc0NvdW50SW5DZWxsO1xuXG4gICAgICAgIC8vIGRpc3BsYXkgYm9tYnMgbGVmdCBhbmQgdGltZXIgYWJvdmUgdGhlIGZpZWxkXG4gICAgICAgIHRoaXMubGVmdEJvbWJDb250YWluZXIudGV4dENvbnRlbnQgPSB0aGlzLnN5c3RlbS5ib21iTGVmdC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnRpbWVyQ29udGFpbmVyLnRleHRDb250ZW50ID0gJzAnO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlVmlzaWJpbGl0eUVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMubWFrZUluaXRpYWxGaWxsKCk7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xuXG4gICAgICAgIHRoaXMuY29udGV4dFByb3ZpZGVyLmxpc3RlbkNhbnZhc0NsaWNrKHRoaXMuY2hlY2tDbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jb250ZXh0UHJvdmlkZXIubGlzdGVuQ2FudmFzQ29udGV4dE1lbnUodGhpcy5jaGVja1JpZ2h0QnV0dG9uQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqIFN0YXJ0IHRpbWVyIGZvciBjb3VudGluZyB0aGUgbGV2ZWwgdGltZSAoaW4gc2Vjb25kcykgKi9cbiAgICBwcml2YXRlIHN0YXJ0VGltZXIoKTogdm9pZCB7XG4gICAgICAgIGxldCBzZWNvbmRzOiBudW1iZXIgPSAwO1xuXG4gICAgICAgIC8vIGRpc3BsYXkgdGhlIGN1cnJlbnQgdGltZSBhYm92ZSB0aGUgZmllbGRcbiAgICAgICAgdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudCA9IFN0cmluZyhzZWNvbmRzKyspO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdGltZXIgb25jZSBwZXIgc2Vjb25kXG4gICAgICAgIHRoaXMudGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZXJDb250YWluZXIudGV4dENvbnRlbnQgPSBTdHJpbmcoc2Vjb25kcysrKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcCB0aW1lciBhbmQgc2F2ZSB0aGUgbGV2ZWwgdGltZSBjb3VudFxuICAgICAqXG4gICAgICogQHBhcmFtIGlzV2luIC0gdHJ1ZSwgaWYgdGhlIGdhbWUgZW5kcyB3aXRoIGEgd2luXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdG9wVGltZXIoaXNXaW46IGJvb2xlYW4pOiB2b2lkICB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lckludGVydmFsKTtcblxuICAgICAgICBpZiAoaXNXaW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRMZXZlbCA9IHRoaXMuc3RvcmFnZS5nZXQoJ2xldmVsJyk7XG4gICAgICAgICAgICBjb25zdCBiZXN0VGltZVN0b3JhZ2VOYW1lID0gYGJlc3QtdGltZS0ke2N1cnJlbnRMZXZlbH1gO1xuICAgICAgICAgICAgY29uc3QgYmVzdFRpbWUgPSB0aGlzLnN0b3JhZ2UuZ2V0KGJlc3RUaW1lU3RvcmFnZU5hbWUpO1xuICAgICAgICAgICAgbGV0IHRpbWUgPSAnJztcblxuICAgICAgICAgICAgLy8gZGlzcGxheSBjdXJyZW50IHRpbWUgb24gdGhlIGZpbmlzaCBzY3JlZW5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRpbWVDb250YWluZXIudGV4dENvbnRlbnQgPSBjdXJyZW50VGltZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGJlc3RUaW1lICYmIE51bWJlcihiZXN0VGltZSkgPCBOdW1iZXIoY3VycmVudFRpbWUpKSB7XG4gICAgICAgICAgICAgICAgdGltZSA9IGJlc3RUaW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aW1lID0gY3VycmVudFRpbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zYXZlKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBiZXN0VGltZVN0b3JhZ2VOYW1lLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aW1lLFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gZGlzcGxheSBiZXN0IHRpbWUgb24gdGhlIGZpbmlzaCBzY3JlZW5cbiAgICAgICAgICAgIHRoaXMuYmVzdFRpbWVDb250YWluZXIudGV4dENvbnRlbnQgPSB0aW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlcyB0aGUgbGV2ZWwgYWZ0ZXIgY2hhbmdpbmcgdGhlIHZhbHVlIGluIHRoZSBzZWxlY3RcbiAgICAgKiBcbiAgICAgKiAgQHBhcmFtIGV2ZW50IC0gRE9NIGV2ZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VMZXZlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmNoYW5nZUxldmVsSW5TZXR0aW5ncyhldmVudC50YXJnZXQudmFsdWUpO1xuXG4gICAgICAgIHRoaXMuc3RvcmFnZS5zYXZlKHtcbiAgICAgICAgICAgIG5hbWU6ICdsZXZlbCcsXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoYW5nZXMgdGhlIGxldmVsIG9mIHRoZSBnYW1lIGluIHRoZSBzZXR0aW5ncyBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2VsZWN0ZWRMZXZlbCAtIG5hbWEgb2Ygc2VsZWN0ZWQgbGV2ZWxcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUxldmVsSW5TZXR0aW5ncyhzZWxlY3RlZExldmVsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYmVzdFRpbWUgPSB0aGlzLnN0b3JhZ2UuZ2V0KGBiZXN0LXRpbWUtJHtzZWxlY3RlZExldmVsfWApO1xuXG4gICAgICAgIC8vIGlmIHRoZSBsZXZlbCB3YXMgcGFzc2VkIGVhcmxpZXIsIHRoZW4gZGlzcGxheSBpdHMgYmVzdCB0aW1lIG9uIHRoZSBzdGFydCBzY3JlZW5cbiAgICAgICAgaWYgKGJlc3RUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsVGltZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIHRoaXMuYmVzdExldmVsVGltZS50ZXh0Q29udGVudCA9IGJlc3RUaW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sZXZlbFRpbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnNldHRpbmdzLmxldmVscykge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5sZXZlbHNba2V5XS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldHRpbmdzLmxldmVsc1tzZWxlY3RlZExldmVsXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqIENoYW5nZXMgdmlzaWJpbGl0eSBvZiBnYW1lIGVsZW1lbnRzIG9uIHRoZSBwYWdlIGFmdGVyIHN0YXJ0IG9mIHRoZSBnYW1lICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VWaXNpYmlsaXR5RWxlbWVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhcnRHYW1lQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuc2VsZWN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMubGV2ZWxUaW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuZ2FtZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICAvKiogRmlsbHMgdGhlIGVudGlyZSBjYW52YXMgYnkgZGVmYXVsdCB3aXRoIHRoZSBkZWZhdWx0IGNvbG9yICovXG4gICAgcHJpdmF0ZSBtYWtlSW5pdGlhbEZpbGwoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpemU6IFBpeGVsc0Ftb3VudCA9IHRoaXMuc2V0dGluZ3MuY2FudmFzU2l6ZTtcblxuICAgICAgICB0aGlzLmRyYXdlci5kcmF3U3F1YXJlKHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICB9LCBzaXplLCBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFjayB0aGUgY2xpY2sgb24gdGhlIGNhbnZhc1xuICAgICAqIFxuICAgICAqIEBwYXJhbSBtb3VzZUV2ZW50IC0gZXZlbnRzIHRoYXQgb2NjdXIgZHVlIHRvIHRoZSB1c2VyIGludGVyYWN0aW5nIHdpdGggYSBtb3VzZVxuICAgICAqIEBwYXJhbSBtb3VzZUV2ZW50Lm9mZnNldFggLSBvZmZzZXQgb2YgdGhlIG1vdXNlIGN1cnNvciBhbG9uZyB0aGUgWCBheGlzIGZyb20gdGhlIGVkZ2Ugb2YgdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBtb3VzZUV2ZW50Lm9mZnNldFkgLSBvZmZzZXQgb2YgdGhlIG1vdXNlIGN1cnNvciBhbG9uZyB0aGUgWSBheGlzIGZyb20gdGhlIGVkZ2Ugb2YgdGhlIGNhbnZhc1xuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tDbGljayh7IG9mZnNldFgsIG9mZnNldFkgfTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsKG9mZnNldFgsIG9mZnNldFkpO1xuICAgICAgICBcbiAgICAgICAgLy8gdG8gY2xpY2sgb24gdGhlIGNlbGwgd2l0aCB0aGUgZmxhZyAtIGZpcnN0IHlvdSBuZWVkIHRvIHJlbW92ZSBpdFxuICAgICAgICBpZiAoIWNlbGwuaGFzRmxhZykge1xuICAgICAgICAgICAgaWYgKGNlbGwuaGFzQm9tYikge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkJvbWJDZWxsKGNlbGwpOyAvLyBkcmF3IGEgYm9tYiBpbiB0aGUgc3BlY2lmaWVkIGNlbGxcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5BbGxCb21icygpOyAvLyBkcmF3IGFsbCB0aGUgb3RoZXIgYm9tYnNcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BHYW1lKCk7IC8vIHN0b3AgdGhlIGdhbWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbC52YWx1ZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbk51bWJlclNxdWFyZShjZWxsKTsgLy8gZHJhdyBhIGNlbGwgd2l0aCBhIG51bWJlclxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5FbXB0eVNxdWFyZShjZWxsKTsgLy8gZHJhdyBhbiBlbXB0eSBjZWxsXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVPcGVuQXJlYShjZWxsKTsgLy8gZ28gdGhyb3VnaCB0aGUgbmVpZ2hib3JzIGFuZCBkcmF3IHRoZSBjZWxscyB1bnRpbCB0aGUgbnVtYmVyIGFwcGVhcnMgaW4gdGhlIGNlbGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYWNrIHRoZSByaWdodCBtb3VzZSBidXR0b24gY2xpY2sgb24gdGhlIGNhbnZhc1xuICAgICAqIFxuICAgICAqIEBwYXJhbSBtb3VzZUV2ZW50IC0gZXZlbnRzIHRoYXQgb2NjdXIgZHVlIHRvIHRoZSB1c2VyIGludGVyYWN0aW5nIHdpdGggYSBtb3VzZVxuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tSaWdodEJ1dHRvbkNsaWNrKG1vdXNlRXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gcHJldmVudCB0aGUgY29udGV4dCBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgICBtb3VzZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbChtb3VzZUV2ZW50Lm9mZnNldFgsIG1vdXNlRXZlbnQub2Zmc2V0WSk7XG5cbiAgICAgICAgaWYgKCFjZWxsLmlzT3Blbikge1xuICAgICAgICAgICAgaWYgKCFjZWxsLmhhc0ZsYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZsYWcoY2VsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmxhZyhjZWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNlbGwgb2YgdGhlIGdlbmVyYXRlZCBsZXZlbFxuICAgICAqIFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gb2Zmc2V0IG9mIHRoZSBtb3VzZSBjdXJzb3IgYWxvbmcgdGhlIFggYXhpcyBmcm9tIHRoZSBlZGdlIG9mIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAtIG9mZnNldCBvZiB0aGUgbW91c2UgY3Vyc29yIGFsb25nIHRoZSBZIGF4aXMgZnJvbSB0aGUgZWRnZSBvZiB0aGUgY2FudmFzXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRDZWxsKG9mZnNldFg6IG51bWJlciwgb2Zmc2V0WTogbnVtYmVyKTogQ2VsbCB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLmdlbmVyYXRvci5nZXRGbG9vck51bWJlcihvZmZzZXRYIC8gdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwpO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy5nZW5lcmF0b3IuZ2V0Rmxvb3JOdW1iZXIob2Zmc2V0WSAvIHRoaXMuc3lzdGVtLnBpeGVsc0NvdW50SW5DZWxsKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW0uY2VsbHNbeV1beF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBhcmVhIG9mIGNlbGxzIGFyb3VuZCBhIGdpdmVuIGNlbGxcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgICAqL1xuICAgIHByaXZhdGUgcmVjdXJzaXZlT3BlbkFyZWEoY2VsbDogQ2VsbCkge1xuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBjZWxsLmFyZWEpIHtcbiAgICAgICAgICAgIGNvbnN0IHN5c3RlbUNlbGwgPSB0aGlzLnN5c3RlbS5jZWxsc1tjZWxsLmFyZWFbaW5kZXhdLnldW2NlbGwuYXJlYVtpbmRleF0ueF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogc2tpcCBmcm9tIHByb2Nlc3Npbmc6XG4gICAgICAgICAgICAgKiAgLSBvcGVuIGNlbGxcbiAgICAgICAgICAgICAqICAtIGZsYWcgY2VsbFxuICAgICAgICAgICAgICogIC0gYm9tYiBjZWxsXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICghc3lzdGVtQ2VsbC5pc09wZW4gJiYgIXN5c3RlbUNlbGwuaGFzRmxhZyAmJiAhc3lzdGVtQ2VsbC5oYXNCb21iKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN5c3RlbUNlbGwudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRW1wdHlTcXVhcmUoc3lzdGVtQ2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZU9wZW5BcmVhKHN5c3RlbUNlbGwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbk51bWJlclNxdWFyZShzeXN0ZW1DZWxsKTtcblxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gZW1wdHkgY2VsbFxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICAgKi9cbiAgICBwcml2YXRlIG9wZW5FbXB0eVNxdWFyZShjZWxsOiBDZWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdTcXVhcmUoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxDb29yZChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxDb29yZChjZWxsLnkpLFxuICAgICAgICB9LCB0aGlzLmNlbGxQaXhlbHNTaXplLCBNQUlOX0JHX0NPTE9SKTtcblxuICAgICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBjZWxsIHdpdGggbnVtYmVyXG4gICAgICogXG4gICAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICAgKi9cbiAgICBwcml2YXRlIG9wZW5OdW1iZXJTcXVhcmUoY2VsbDogQ2VsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3TnVtYmVyKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsUGl4ZWxzU2l6ZSwgY2VsbC52YWx1ZSk7XG5cbiAgICAgICAgY2VsbC5pc09wZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gY2VsbCB3aXRoIGJvbWJcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgICAqL1xuICAgIHByaXZhdGUgb3BlbkJvbWJDZWxsKGNlbGw6IENlbGwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuZHJhd0JvbWIoe1xuICAgICAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxDb29yZChjZWxsLngpLFxuICAgICAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxDb29yZChjZWxsLnkpLFxuICAgICAgICB9LCB0aGlzLmNlbGxQaXhlbHNTaXplKTtcblxuICAgICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqIE9wZW4gYWxsIGJvbWJzIG9uIHRoZSBmaWVsZCAqL1xuICAgIHByaXZhdGUgb3BlbkFsbEJvbWJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7IGJvbWJQb3NpdGlvbnMsIGNlbGxzLCBmaWVsZFNpemUgfSA9IHRoaXMuc3lzdGVtO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgT2JqZWN0LmtleXMoY2VsbHMpLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IE9iamVjdC5rZXlzKGNlbGxzW3ldKS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmIChib21iUG9zaXRpb25zLmluY2x1ZGVzKHggKyB5ICogZmllbGRTaXplKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Cb21iQ2VsbChjZWxsc1t5XVt4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgZmxhZyBpbiBhIGNlbGwgYW5kIGNvdW50IHRoZSBjb3JyZWN0bHkgc2VsZWN0ZWQgYm9tYnNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0RmxhZyhjZWxsOiBDZWxsKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmRyYXdGbGFnKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsUGl4ZWxzU2l6ZSk7XG5cbiAgICAgICAgY2VsbC5oYXNGbGFnID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnN5c3RlbS5ib21iTGVmdCA9IHRoaXMuc3lzdGVtLmJvbWJMZWZ0IC0gMTtcbiAgICAgICAgLy8gZGlzcGxheWluZyB0aGUgbnVtYmVyIG9mIHJlbWFpbmluZyBib21icyBvdmVyIHRoZSBmaWVsZFxuICAgICAgICB0aGlzLmxlZnRCb21iQ29udGFpbmVyLnRleHRDb250ZW50ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQudG9TdHJpbmcoKTtcblxuICAgICAgICBpZiAoY2VsbC5oYXNCb21iKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50Q29ycmVjdGx5U2VsZWN0ZWRCb21icysrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RvcCB0aGUgZ2FtZSB3aXRoIGEgd2luIGlmIGFsbCB0aGUgYm9tYnMgaGF2ZSBydW4gb3V0IGFuZCBhcmUgbWFya2VkIHdpdGggZmxhZ3MgY29ycmVjdGx5XG4gICAgICAgIGlmICh0aGlzLnN5c3RlbS5ib21iTGVmdCA9PT0gMCAmJiB0aGlzLnN5c3RlbS5ib21iQ291bnQgPT09IHRoaXMuY291bnRDb3JyZWN0bHlTZWxlY3RlZEJvbWJzKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BHYW1lKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGZsYWcgZnJvbSBjZWxsXG4gICAgICogXG4gICAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbW92ZUZsYWcoY2VsbDogQ2VsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlci5kcmF3U3F1YXJlKHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC54KSxcbiAgICAgICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC55KSxcbiAgICAgICAgfSwgdGhpcy5jZWxsUGl4ZWxzU2l6ZSwgSU5JVElBTF9GSUVMRF9CR19DT0xPUiwgZmFsc2UpO1xuXG4gICAgICAgIGNlbGwuaGFzRmxhZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc3lzdGVtLmJvbWJMZWZ0ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQgKyAxO1xuICAgICAgICAgLy8gZGlzcGxheWluZyB0aGUgbnVtYmVyIG9mIHJlbWFpbmluZyBib21icyBvdmVyIHRoZSBmaWVsZFxuICAgICAgICB0aGlzLmxlZnRCb21iQ29udGFpbmVyLnRleHRDb250ZW50ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQudG9TdHJpbmcoKTtcblxuICAgICAgICBpZiAoY2VsbC5oYXNCb21iKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50Q29ycmVjdGx5U2VsZWN0ZWRCb21icy0tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlIHRoZSBpbml0aWFsIGNvb3JkaW5hdGVzIG9mIHRoZSBjZWxsIGluIHBpeGVsc1xuICAgICAqIFxuICAgICAqIEBwYXJhbSBjb29yZCAtIGNvb3JkaW5hdGUgb24gdGhlIHBsYXlpbmcgZmllbGRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNQaXhlbENvb3JkKGNvb3JkOiBGaWVsZENvb3JkaW5hdGUpOiBQaXhlbHNBbW91bnQge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGNvb3JkKSAqIHRoaXMuY2VsbFBpeGVsc1NpemU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcCBnYW1lXG4gICAgICogXG4gICAgICogQHBhcmFtIGlzV2luIC0gdHJ1ZSwgaWYgdGhlIGdhbWUgZW5kcyB3aXRoIGEgd2luXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdG9wR2FtZShpc1dpbjogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKGlzV2luKTtcblxuICAgICAgICAvLyBzaG93IHRoZSByZXN0YXJ0IGJ1dHRvblxuICAgICAgICB0aGlzLnJlc3VsdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXG4gICAgICAgIGlmIChpc1dpbikge1xuICAgICAgICAgICAgLy8gaWYgeW91IHdvbiwgc2hvdyBjb25ncmF0dWxhdGlvbnNcbiAgICAgICAgICAgIHRoaXMud2luQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzIGlzIHRvIGFuaW1hdGUgdGhlIGJhY2tncm91bmQgYXBwZWFyYW5jZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Jlc3VsdC1jb250YWluZXItLWlzLXZpc2libGUnKTtcbiAgICAgICAgfSwgNTApO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBNYXRoR2VuZXJhdG9yIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqIE1hdGggbnVtYmVyIGdlbmVyYXRvciAqL1xuZXhwb3J0IGNsYXNzIEdlbmVyYXRvciBpbXBsZW1lbnRzIE1hdGhHZW5lcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGdldFJhbmRvbTogKCkgPT4gbnVtYmVyLFxuICAgICAgICBwcml2YXRlIGdldEZsb29yOiAobjogbnVtYmVyKSA9PiBudW1iZXIsXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGluIGEgc3BlY2lmaWVkIHJhbmdlXG4gICAgICogXG4gICAgICogQHBhcmFtIG1pbiAtIG1pbmltdW0gbnVtYmVyIGZyb20gdGhlIGludGVydmFsXG4gICAgICogQHBhcmFtIG1heCAtIG1heGltdW0gbnVtYmVyIGZyb20gdGhlIGludGVydmFsXG4gICAgICovXG4gICAgcHVibGljIGdldFJhbmRvbUFyYml0cmFyeShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGbG9vck51bWJlcih0aGlzLmdldFJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJvdW5kcyBhIG51bWJlciB0byBhbiBpbnRlZ2VyXG4gICAgICogXG4gICAgICogQHBhcmFtIG4gLSBvcmlnaW5hbCBudW1iZXJcbiAgICAgKi9cbiAgICAgcHVibGljIGdldEZsb29yTnVtYmVyKG46IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZsb29yKG4pO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBHYW1lU2V0dGluZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgbGV2ZWxzIH0gZnJvbSBcIi4vbGV2ZWxzXCI7XG5cbi8qKiBCYXNpYyBnYW1lIHNldHRpbmdzICovXG5leHBvcnQgY29uc3Qgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyA9IHtcbiAgICAvKiogU2l6ZSBvZiB0aGUgZmllbGQgaW4gcGl4ZWxzICovXG4gICAgY2FudmFzU2l6ZTogODAwLFxuXG4gICAgLyoqIFRoZSByYXRpbyBvZiB0aGUgZGlzcGxheSByZXNvbHV0aW9uIG9mIHRoZSBjdXJyZW50IGRldmljZSBpbiBwaHlzaWNhbCBwaXhlbHMgdG8gdGhlIHJlc29sdXRpb24gaW4gbG9naWNhbCAoQ1NTKSBwaXhlbHMgKi9cbiAgICBkZXZpY2VQaXhlbFJhdGlvOiAxLFxuXG4gICAgLyoqIExpc3Qgb2YgZ2FtZSBkaWZmaWN1bHR5IGxldmVscyAqL1xuICAgIGxldmVscyxcbn0iLCJpbXBvcnQgeyBDb21wbGV4aXR5TGlzdCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKiBMaXN0IG9mIGdhbWUgZGlmZmljdWx0eSBsZXZlbHMgKi9cbmV4cG9ydCBjb25zdCBsZXZlbHM6IENvbXBsZXhpdHlMaXN0ID0ge1xuICAgIGJlZ2lubmVyOiB7XG4gICAgICAgIGJvbWJDb3VudDogMTAsXG4gICAgICAgIGZpZWxkU2l6ZTogMjAsXG4gICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9LFxuICAgIGVhc3k6IHtcbiAgICAgICAgYm9tYkNvdW50OiAxNSxcbiAgICAgICAgZmllbGRTaXplOiAxMCxcbiAgICAgICAgc2VsZWN0ZWQ6IHRydWUsXG4gICAgfSxcbiAgICBtZWRpdW06IHtcbiAgICAgICAgYm9tYkNvdW50OiA0MCxcbiAgICAgICAgZmllbGRTaXplOiAyMCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgaGFyZDoge1xuICAgICAgICBib21iQ291bnQ6IDEwMCxcbiAgICAgICAgZmllbGRTaXplOiAyMCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgaHVnZToge1xuICAgICAgICBib21iQ291bnQ6IDIyMCxcbiAgICAgICAgZmllbGRTaXplOiAzMixcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZXh0cmVtZToge1xuICAgICAgICBib21iQ291bnQ6IDE1MCxcbiAgICAgICAgZmllbGRTaXplOiAyMCxcbiAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0sXG59IiwiaW1wb3J0IHsgU291cmNlUHJvdmlkZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5pbXBvcnQgJy4uL2ltZy9ib21iLnBuZyc7XG5pbXBvcnQgJy4uL2ltZy9mbGFnLnBuZyc7XG5cbi8qKiBUbyBpbnRlcmFjdCB3aXRoIHRoZSBmaWxlIHN5c3RlbSAqL1xuZXhwb3J0IGNsYXNzIEZpbGVTb3VyY2UgaW1wbGVtZW50cyBTb3VyY2VQcm92aWRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBpbWFnZSBmaWxlXG4gICAgICogXG4gICAgICogQHBhcmFtIG5hbWUgLSBpbWFnZSBmaWxlIG5hbWVcbiAgICAgKi9cbiAgICBnZXRJbWFnZShuYW1lOiBzdHJpbmcpOiBDYW52YXNJbWFnZVNvdXJjZSB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gYGltZy8ke25hbWV9LnBuZ2A7XG5cbiAgICAgICAgcmV0dXJuIGltZztcbiAgICB9XG59IiwiaW1wb3J0IHsgU3RvcmFnZVByb3ZpZGVyLCBTdG9yYWdlSXRlbSwgU3RvcmFnZU5hbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKiogTG9uZy10ZXJtIHN0b3JhZ2Ugb2YgZ2FtZSBkYXRhICovXG5leHBvcnQgY2xhc3MgRGF0YVN0b3JhZ2UgaW1wbGVtZW50cyBTdG9yYWdlUHJvdmlkZXIge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyBhbiBpdGVtIHRvIHN0b3JhZ2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdG9yYWdlSXRlbSAtIHN0b3JlZCBpdGVtXG4gICAgICogQHBhcmFtIHN0b3JhZ2VJdGVtLm5hbWUgLSBuYW1lIG9mIGtleSBpbiB0aGUgc3RvcmVcbiAgICAgKiBAcGFyYW0gc3RvcmFnZUl0ZW0udmFsdWUgLSB0aGUga2V5IHZhbHVlIGluIHRoZSBzdG9yZVxuICAgICAqL1xuICAgIHNhdmUoeyBuYW1lLCB2YWx1ZSB9OiBTdG9yYWdlSXRlbSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGl0ZW0gZnJvbSBzdG9yYWdlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2Yga2V5IGluIHRoZSBzdG9yZVxuICAgICAqL1xuICAgIGdldChuYW1lOiBTdG9yYWdlTmFtZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShuYW1lKTtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgTGV2ZWxCdWlsZGVyIH0gZnJvbSBcIi4vYnVpbGRlci9pbmRleFwiO1xuaW1wb3J0IHsgQ2FudmFzQ29udGV4dFByb3ZpZGVyIH0gZnJvbSBcIi4vY29udGV4dC9pbmRleFwiO1xuaW1wb3J0IHsgRG9tU291cmNlIH0gZnJvbSBcIi4vZG9tL2luZGV4XCI7XG5pbXBvcnQgeyBDYW52YXNEcmF3ZXIgfSBmcm9tIFwiLi9kcmF3ZXIvaW5kZXhcIjtcbmltcG9ydCB7IFNhcHBlciB9IGZyb20gXCIuL2dhbWUvaW5kZXhcIjtcbmltcG9ydCB7IEdlbmVyYXRvciB9IGZyb20gXCIuL2dlbmVyYXRvci9pbmRleFwiO1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tIFwiLi9zZXR0aW5ncy9pbmRleFwiO1xuaW1wb3J0IHsgRmlsZVNvdXJjZSB9IGZyb20gXCIuL3NvdXJjZS9pbmRleFwiO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlL2luZGV4XCI7XG5cbmltcG9ydCBcIi4vaW5kZXguc2Nzc1wiO1xuXG5jb25zdCBzdG9yYWdlID0gbmV3IERhdGFTdG9yYWdlKHdpbmRvdy5sb2NhbFN0b3JhZ2UpO1xuY29uc3QgZmlsZVByb3ZpZGVyID0gbmV3IEZpbGVTb3VyY2UoKTtcbmNvbnN0IGRvbVNvdXJjZSA9IG5ldyBEb21Tb3VyY2Uod2luZG93KTtcbmNvbnN0IGNvbnRleHRQcm92aWRlciA9IG5ldyBDYW52YXNDb250ZXh0UHJvdmlkZXIoZG9tU291cmNlLCBzZXR0aW5ncyk7XG5jb25zdCBkcmF3ZXIgPSBuZXcgQ2FudmFzRHJhd2VyKGNvbnRleHRQcm92aWRlciwgZmlsZVByb3ZpZGVyKTtcbmNvbnN0IGdlbmVyYXRvciA9IG5ldyBHZW5lcmF0b3IoTWF0aC5yYW5kb20sIE1hdGguZmxvb3IpO1xuY29uc3QgYnVpbGRlciA9IG5ldyBMZXZlbEJ1aWxkZXIoZ2VuZXJhdG9yKTtcbmNvbnN0IHNhcHBlciA9IG5ldyBTYXBwZXIoc2V0dGluZ3MsIGNvbnRleHRQcm92aWRlciwgZHJhd2VyLCBkb21Tb3VyY2UsIGJ1aWxkZXIsIGdlbmVyYXRvciwgc3RvcmFnZSk7XG5cbnNhcHBlci5pbml0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9