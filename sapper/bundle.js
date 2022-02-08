/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wessberg/di/dist/esm/constructor-arguments/constructor-arguments-identifier.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wessberg/di/dist/esm/constructor-arguments/constructor-arguments-identifier.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONSTRUCTOR_ARGUMENTS_SYMBOL_IDENTIFIER": () => (/* binding */ CONSTRUCTOR_ARGUMENTS_SYMBOL_IDENTIFIER),
/* harmony export */   "CONSTRUCTOR_ARGUMENTS_SYMBOL": () => (/* binding */ CONSTRUCTOR_ARGUMENTS_SYMBOL)
/* harmony export */ });
const CONSTRUCTOR_ARGUMENTS_SYMBOL_IDENTIFIER = `___CTOR_ARGS___`;
const CONSTRUCTOR_ARGUMENTS_SYMBOL = Symbol.for(CONSTRUCTOR_ARGUMENTS_SYMBOL_IDENTIFIER);
//# sourceMappingURL=constructor-arguments-identifier.js.map

/***/ }),

/***/ "./node_modules/@wessberg/di/dist/esm/di-container/di-container.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wessberg/di/dist/esm/di-container/di-container.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DIContainer": () => (/* binding */ DIContainer)
/* harmony export */ });
/* harmony import */ var _constructor_arguments_constructor_arguments_identifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constructor-arguments/constructor-arguments-identifier */ "./node_modules/@wessberg/di/dist/esm/constructor-arguments/constructor-arguments-identifier.js");
/* harmony import */ var _registration_kind_registration_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../registration-kind/registration-kind */ "./node_modules/@wessberg/di/dist/esm/registration-kind/registration-kind.js");


/**
 * A Dependency-Injection container that holds services and can produce instances of them as required.
 * It mimics reflection by parsing the app at compile-time and supporting the generic-reflection syntax.
 * @author Frederik Wessberg
 */
class DIContainer {
    constructor() {
        /**
         * A map between interface names and the services that should be dependency injected
         * @type {Map<string, ConstructorArgument[]>}
         */
        this.constructorArguments = new Map();
        /**
         * A Map between identifying names for services and their IRegistrationRecords.
         * @type {Map<string, RegistrationRecord<{}, {}>>}
         */
        this.serviceRegistry = new Map();
        /**
         * A map between identifying names for services and concrete instances of their implementation.
         * @type {Map<string, *>}
         */
        this.instances = new Map();
    }
    registerSingleton(newExpression, options) {
        if (options == null)
            throw new ReferenceError(`${this.constructor.name} could not get service: No arguments were given!`);
        if (newExpression == null) {
            return this.register(_registration_kind_registration_kind__WEBPACK_IMPORTED_MODULE_1__.RegistrationKind.SINGLETON, newExpression, options);
        }
        else {
            return this.register(_registration_kind_registration_kind__WEBPACK_IMPORTED_MODULE_1__.RegistrationKind.SINGLETON, newExpression, options);
        }
    }
    registerTransient(newExpression, options) {
        if (options == null)
            throw new ReferenceError(`${this.constructor.name} could not get service: No arguments were given!`);
        if (newExpression == null) {
            return this.register(_registration_kind_registration_kind__WEBPACK_IMPORTED_MODULE_1__.RegistrationKind.TRANSIENT, newExpression, options);
        }
        else {
            return this.register(_registration_kind_registration_kind__WEBPACK_IMPORTED_MODULE_1__.RegistrationKind.TRANSIENT, newExpression, options);
        }
    }
    /**
     * Gets an instance of the service matching the interface given as a generic type parameter.
     * For example, 'container.get<IFoo>()' returns a concrete instance of the implementation associated with the
     * generic interface name.
     *
     * You should not pass any options to the method if using the compiler. It will do that automatically.
     * @param {IGetOptions} [options]
     * @returns {T}
     */
    get(options) {
        if (options == null)
            throw new ReferenceError(`${this.constructor.name} could not get service: No options was given!`);
        return this.constructInstance(options);
    }
    /**
     * Returns true if a service has been registered matching the interface given as a generic type parameter.
     * For example, 'container.get<IFoo>()' returns a concrete instance of the implementation associated with the
     * generic interface name.
     *
     * You should not pass any options to the method if using the compiler. It will do that automatically.
     * @param {IGetOptions} [options]
     * @returns {boolean}
     */
    has(options) {
        if (options == null)
            throw new ReferenceError(`${this.constructor.name} could not get service: No options was given!`);
        return this.serviceRegistry.has(options.identifier);
    }
    register(kind, newExpression, options) {
        // Take all of the constructor arguments for the implementation
        const implementationArguments = "implementation" in options && options.implementation != null && options.implementation[_constructor_arguments_constructor_arguments_identifier__WEBPACK_IMPORTED_MODULE_0__.CONSTRUCTOR_ARGUMENTS_SYMBOL] != null ? options.implementation[_constructor_arguments_constructor_arguments_identifier__WEBPACK_IMPORTED_MODULE_0__.CONSTRUCTOR_ARGUMENTS_SYMBOL] : [];
        this.constructorArguments.set(options.identifier, implementationArguments);
        this.serviceRegistry.set(options.identifier, "implementation" in options && options.implementation != null
            ? Object.assign({}, options, { kind }) : Object.assign({}, options, { kind, newExpression: newExpression }));
    }
    /**
     * Returns true if an instance exists that matches the given identifier.
     * @param {string} identifier
     * @returns {boolean}
     */
    hasInstance(identifier) {
        return this.getInstance(identifier) != null;
    }
    /**
     * Gets the cached instance, if any, associated with the given identifier.
     * @param {string} identifier
     * @returns {T|null}
     */
    getInstance(identifier) {
        const instance = this.instances.get(identifier);
        return instance == null ? null : instance;
    }
    /**
     * Gets an IRegistrationRecord associated with the given identifier.
     * @param {string} identifier
     * @param {string} [parent]
     * @returns {RegistrationRecord<T>}
     */
    getRegistrationRecord({ identifier, parentChain }) {
        const record = this.serviceRegistry.get(identifier);
        if (record == null)
            throw new ReferenceError(`${this.constructor.name} could not find a service for identifier: "${identifier}". ${parentChain == null || parentChain.length < 1 ? "" : `It is required by the service: '${parentChain.map(parent => parent.identifier).join(" -> ")}'.`} Remember to register it as a service!`);
        return record;
    }
    /**
     * Caches the given instance so that it can be retrieved in the future.
     * @param {string} identifier
     * @param {T} instance
     * @returns {T}
     */
    setInstance(identifier, instance) {
        this.instances.set(identifier, instance);
        return instance;
    }
    /**
     * Gets a lazy reference to another service
     * @param lazyPointer
     */
    getLazyIdentifier(lazyPointer) {
        return new Proxy({}, { get: (_, key) => lazyPointer()[key] });
    }
    /**
     * Constructs a new instance of the given identifier and returns it.
     * It checks the constructor arguments and injects any services it might depend on recursively.
     * @param {IConstructInstanceOptions<T>} options
     * @returns {T}
     */
    constructInstance({ identifier, parentChain = [] }) {
        const registrationRecord = this.getRegistrationRecord({ identifier, parentChain });
        // If an instance already exists (and it is a singleton), return that one
        if (this.hasInstance(identifier) && registrationRecord.kind === _registration_kind_registration_kind__WEBPACK_IMPORTED_MODULE_1__.RegistrationKind.SINGLETON) {
            return this.getInstance(identifier);
        }
        // Otherwise, instantiate a new one
        let instance;
        const me = {
            identifier,
            ref: this.getLazyIdentifier(() => instance)
        };
        // If a user-provided new-expression has been provided, invoke that to get an instance.
        if ("newExpression" in registrationRecord) {
            if (typeof registrationRecord.newExpression !== "function") {
                throw new TypeError(`Could not instantiate the service with the identifier: '${registrationRecord.identifier}': You provided a custom instantiation argument, but it wasn't of type function. It has to be a function that returns whatever should be used as an instance of the Service!`);
            }
            try {
                instance = registrationRecord.newExpression();
            }
            catch (ex) {
                throw new Error(`Could not instantiate the service with the identifier: '${registrationRecord.identifier}': When you registered the service, you provided a custom instantiation function, but it threw an exception when it was run!`);
            }
        }
        else {
            // Find the arguments for the identifier
            const mappedArgs = this.constructorArguments.get(identifier);
            if (mappedArgs == null)
                throw new ReferenceError(`${this.constructor.name} could not find constructor arguments for the service: '${identifier}'. Have you registered it as a service?`);
            // Instantiate all of the argument services (or re-use them if they were registered as singletons)
            const instanceArgs = mappedArgs.map((dep) => {
                if (dep === undefined)
                    return undefined;
                const matchedParent = parentChain.find(parent => parent.identifier === dep);
                if (matchedParent != null)
                    return matchedParent.ref;
                return this.constructInstance({ identifier: dep, parentChain: [...parentChain, me] });
            });
            try {
                // Try to construct an instance with 'new' and if it fails, call the implementation directly.
                const newable = registrationRecord.implementation;
                instance = new newable(...instanceArgs);
            }
            catch (ex) {
                if (registrationRecord.implementation == null)
                    throw new ReferenceError(`${this.constructor.name} could not construct a new service of kind: ${identifier}. Reason: No implementation was given!`);
                const constructable = registrationRecord.implementation;
                // Try without 'new' and call the implementation as a function.
                instance = constructable(...instanceArgs);
            }
        }
        return registrationRecord.kind === _registration_kind_registration_kind__WEBPACK_IMPORTED_MODULE_1__.RegistrationKind.SINGLETON ? this.setInstance(identifier, instance) : instance;
    }
}
//# sourceMappingURL=di-container.js.map

/***/ }),

/***/ "./node_modules/@wessberg/di/dist/esm/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@wessberg/di/dist/esm/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DIContainer": () => (/* reexport safe */ _di_container_di_container__WEBPACK_IMPORTED_MODULE_0__.DIContainer),
/* harmony export */   "CONSTRUCTOR_ARGUMENTS_SYMBOL": () => (/* reexport safe */ _constructor_arguments_constructor_arguments_identifier__WEBPACK_IMPORTED_MODULE_1__.CONSTRUCTOR_ARGUMENTS_SYMBOL),
/* harmony export */   "CONSTRUCTOR_ARGUMENTS_SYMBOL_IDENTIFIER": () => (/* reexport safe */ _constructor_arguments_constructor_arguments_identifier__WEBPACK_IMPORTED_MODULE_1__.CONSTRUCTOR_ARGUMENTS_SYMBOL_IDENTIFIER)
/* harmony export */ });
/* harmony import */ var _di_container_di_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./di-container/di-container */ "./node_modules/@wessberg/di/dist/esm/di-container/di-container.js");
/* harmony import */ var _constructor_arguments_constructor_arguments_identifier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructor-arguments/constructor-arguments-identifier */ "./node_modules/@wessberg/di/dist/esm/constructor-arguments/constructor-arguments-identifier.js");


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wessberg/di/dist/esm/registration-kind/registration-kind.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wessberg/di/dist/esm/registration-kind/registration-kind.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegistrationKind": () => (/* binding */ RegistrationKind)
/* harmony export */ });
var RegistrationKind;
(function (RegistrationKind) {
    RegistrationKind[RegistrationKind["SINGLETON"] = 0] = "SINGLETON";
    RegistrationKind[RegistrationKind["TRANSIENT"] = 1] = "TRANSIENT";
})(RegistrationKind || (RegistrationKind = {}));
//# sourceMappingURL=registration-kind.js.map

/***/ }),

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

/***/ "./src/builder/composition.ts":
/*!************************************!*\
  !*** ./src/builder/composition.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/builder/index.ts");
/* harmony import */ var _composition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../composition */ "./src/composition/index.ts");


_composition__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "SystemBuilder", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.LevelBuilder });


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
    /**
     * @param generator - math number generator
     */
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
            usedCells: 0,
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
    Object.defineProperty(LevelBuilder, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["MathGenerator"]; },
        enumerable: false,
        configurable: true
    });
    return LevelBuilder;
}());



/***/ }),

/***/ "./src/composition/core.ts":
/*!*********************************!*\
  !*** ./src/composition/core.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "container": () => (/* binding */ container)
/* harmony export */ });
/* harmony import */ var _wessberg_di__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wessberg/di */ "./node_modules/@wessberg/di/dist/esm/index.js");

var container = new _wessberg_di__WEBPACK_IMPORTED_MODULE_0__.DIContainer();


/***/ }),

/***/ "./src/composition/index.ts":
/*!**********************************!*\
  !*** ./src/composition/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "container": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_0__.container)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/composition/core.ts");
/* harmony import */ var _builder_composition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../builder/composition */ "./src/builder/composition.ts");
/* harmony import */ var _context_composition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/composition */ "./src/context/composition.ts");
/* harmony import */ var _dom_composition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom/composition */ "./src/dom/composition.ts");
/* harmony import */ var _drawer_composition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../drawer/composition */ "./src/drawer/composition.ts");
/* harmony import */ var _game_composition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../game/composition */ "./src/game/composition.ts");
/* harmony import */ var _generator_composition__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../generator/composition */ "./src/generator/composition.ts");
/* harmony import */ var _settings_composition__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../settings/composition */ "./src/settings/composition.ts");
/* harmony import */ var _source_composition__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../source/composition */ "./src/source/composition.ts");
/* harmony import */ var _storage_composition__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../storage/composition */ "./src/storage/composition.ts");










_core__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return window; }, { identifier: "Window" });
_core__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return Math; }, { identifier: "Math" });
_core__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return Image; }, { identifier: "typeof Image" });
_core__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return window.localStorage; }, { identifier: "Storage" });



/***/ }),

/***/ "./src/context/composition.ts":
/*!************************************!*\
  !*** ./src/context/composition.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/context/index.ts");
/* harmony import */ var _composition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../composition */ "./src/composition/index.ts");


_composition__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "DrawingContextProvider", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.CanvasContextProvider });


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
    /**
     * @param elementSource - allows interact with the DOM tree
     * @param settings - basic game settings
     */
    function CanvasContextProvider(elementSource, settings) {
        this.elementSource = elementSource;
        this.settings = settings;
        /** Game will be drawn on this canvas */
        this.canvas = null;
        /** Canvas 2d context */
        this.context = null;
        var canvas = this.elementSource.getElement('canvas');
        if (!canvas) {
            throw new Error('Failed to find a canvas.');
        }
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
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
        this.canvas.addEventListener('click', callback);
    };
    /**
     * Listen to clicking on the canvas by right mouse button
     *
     * @param callback - a function that is called after clicking on the canvas by right mouse button
     */
    CanvasContextProvider.prototype.listenCanvasContextMenu = function (callback) {
        this.canvas.addEventListener('contextmenu', callback);
    };
    /** Normalize canvas styles and context scale */
    CanvasContextProvider.prototype.normalizeScale = function () {
        if (!this.canvas || !this.context) {
            return;
        }
        var ratio = this.settings.devicePixelRatio || 1;
        var size = this.settings.canvasSize;
        this.canvas.width = size * ratio;
        this.canvas.height = size * ratio;
        this.canvas.style.width = size + "px";
        this.canvas.style.height = size + "px";
        this.context.imageSmoothingEnabled = false;
        this.context.scale(ratio, ratio);
    };
    Object.defineProperty(CanvasContextProvider, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["ElementSource", "GameSettings"]; },
        enumerable: false,
        configurable: true
    });
    return CanvasContextProvider;
}());



/***/ }),

/***/ "./src/dom/composition.ts":
/*!********************************!*\
  !*** ./src/dom/composition.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/dom/index.ts");
/* harmony import */ var _composition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../composition */ "./src/composition/index.ts");


_composition__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "ElementSource", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.DomSource });


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
    /**
     * @param window - window containing a DOM document
     */
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
        this.window.document.addEventListener('DOMContentLoaded', function (event) {
            callback(event);
        });
    };
    Object.defineProperty(DomSource, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["Window"]; },
        enumerable: false,
        configurable: true
    });
    return DomSource;
}());



/***/ }),

/***/ "./src/drawer/composition.ts":
/*!***********************************!*\
  !*** ./src/drawer/composition.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/drawer/index.ts");
/* harmony import */ var _composition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../composition */ "./src/composition/index.ts");


_composition__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "Drawer", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.CanvasDrawer });


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
var BORDER_COLOR = rootStyles.getPropertyValue('--border-color');
/** Color of the text in the game */
var TEXT_COLOR = rootStyles.getPropertyValue('--text-color');
/** Main background color in the game */
var MAIN_BG_COLOR = rootStyles.getPropertyValue('--main-bg-color');
/** Field fill color */
var INITIAL_FIELD_BG_COLOR = rootStyles.getPropertyValue('--field-bg-color');
/** Fill color of the cell under the flag */
var FLAG_BG_COLOR = rootStyles.getPropertyValue('--flag-bg-color');


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
    /**
     * @param contextProvider - provides the context of the canvas
     * @param fileProvider - to interact with the file system
     */
    function CanvasDrawer(contextProvider, fileProvider) {
        this.contextProvider = contextProvider;
        this.fileProvider = fileProvider;
        /** Canvas 2d context */
        this.context = null;
        this.context = this.contextProvider.getInstance();
        if (!this.context) {
            throw new Error('Failed to access the drawing context.');
        }
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
        if (!this.context) {
            return;
        }
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
        this.context.drawImage(this.bomb, this.getImageCoord(x, size), this.getImageCoord(y, size), imageSize, imageSize);
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
        this.context.drawImage(this.flag, this.getImageCoord(x, size), this.getImageCoord(y, size), imageSize, imageSize);
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
     * Returns coordinate of image in the cell
     *
     * @param cellCoord - x or y coordinate of cell
     * @param size - square size in pixels
     */
    CanvasDrawer.prototype.getImageCoord = function (cellCoord, size) {
        return cellCoord + (size / 4);
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
    Object.defineProperty(CanvasDrawer, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["DrawingContextProvider", "SourceProvider"]; },
        enumerable: false,
        configurable: true
    });
    return CanvasDrawer;
}());



/***/ }),

/***/ "./src/game/composition.ts":
/*!*********************************!*\
  !*** ./src/game/composition.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/game/index.ts");
/* harmony import */ var _composition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../composition */ "./src/composition/index.ts");


_composition__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "Game", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.Sapper });


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
    /**
     * @param settings - basic game settings
     * @param contextProvider - provides the context of the canvas
     * @param drawer - for painting on canvas
     * @param elementSource - allows interact with the DOM tree
     * @param builder - responsible for creating levels
     * @param generator - math number generator
     * @param storage - long-term storage of game data
     */
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
            this.checkIfGameShouldStopped();
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
        this.system.usedCells++;
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
        this.system.usedCells++;
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
        this.system.usedCells++;
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
        this.system.usedCells++;
        this.system.bombLeft = this.system.bombLeft - 1;
        // displaying the number of remaining bombs over the field
        this.leftBombContainer.textContent = this.system.bombLeft.toString();
        if (cell.hasBomb) {
            this.countCorrectlySelectedBombs++;
        }
        this.checkIfGameShouldStopped();
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
        this.system.usedCells--;
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
    /**
     * Check the conditions for stopping the game
     */
    Sapper.prototype.checkIfGameShouldStopped = function () {
        // has zero bomb
        if (!(this.system.bombLeft === 0)) {
            return;
        }
        // all bombs are correctly selected
        if (!(this.system.bombCount === this.countCorrectlySelectedBombs)) {
            return;
        }
        // all cells are opened
        if (!(this.system.usedCells === (this.system.fieldSize * this.system.fieldSize))) {
            return;
        }
        // stop the game with a win if all the bombs have run out and are marked with flags correctly
        this.stopGame(true);
    };
    Object.defineProperty(Sapper, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["GameSettings", "DrawingContextProvider", "Drawer", "ElementSource", "SystemBuilder", "MathGenerator", "StorageProvider"]; },
        enumerable: false,
        configurable: true
    });
    return Sapper;
}());



/***/ }),

/***/ "./src/generator/composition.ts":
/*!**************************************!*\
  !*** ./src/generator/composition.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/generator/index.ts");
/* harmony import */ var _composition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../composition */ "./src/composition/index.ts");


_composition__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "MathGenerator", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.Generator });


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
    /**
     * @param math - returns Math object
     */
    function Generator(math) {
        this.math = math;
    }
    /**
     * Returns a random integer in a specified range
     *
     * @param min - minimum number from the interval
     * @param max - maximum number from the interval
     */
    Generator.prototype.getRandomArbitrary = function (min, max) {
        return this.getFloorNumber(this.math.random() * (max - min)) + min;
    };
    /**
     * Rounds a number to an integer
     *
     * @param n - original number
     */
    Generator.prototype.getFloorNumber = function (n) {
        return this.math.floor(n);
    };
    Object.defineProperty(Generator, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["Math"]; },
        enumerable: false,
        configurable: true
    });
    return Generator;
}());



/***/ }),

/***/ "./src/settings/composition.ts":
/*!*************************************!*\
  !*** ./src/settings/composition.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _composition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../composition */ "./src/composition/index.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/settings/index.ts");


_composition__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return _index__WEBPACK_IMPORTED_MODULE_1__.settings; }, { identifier: "GameSettings" });


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

/***/ "./src/source/composition.ts":
/*!***********************************!*\
  !*** ./src/source/composition.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/source/index.ts");
/* harmony import */ var _composition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../composition */ "./src/composition/index.ts");


_composition__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "SourceProvider", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.FileSource });


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
    /**
     * @param ImageProvider - returns image object
     */
    function FileSource(ImageProvider) {
        this.ImageProvider = ImageProvider;
    }
    /**
     * Returns image file
     *
     * @param name - image file name
     */
    FileSource.prototype.getImage = function (name) {
        var img = new this.ImageProvider();
        img.src = "img/" + name + ".png";
        return img;
    };
    Object.defineProperty(FileSource, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["typeof Image"]; },
        enumerable: false,
        configurable: true
    });
    return FileSource;
}());



/***/ }),

/***/ "./src/storage/composition.ts":
/*!************************************!*\
  !*** ./src/storage/composition.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/storage/index.ts");
/* harmony import */ var _composition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../composition */ "./src/composition/index.ts");


_composition__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "StorageProvider", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.DataStorage });


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
    /**
     * @param storage - Web Storage API interface provides access to a particular domain's session or local storage
     */
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
    Object.defineProperty(DataStorage, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["Storage"]; },
        enumerable: false,
        configurable: true
    });
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
/* harmony import */ var _composition_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./composition/index */ "./src/composition/index.ts");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");


var sapper = _composition_index__WEBPACK_IMPORTED_MODULE_0__.container.get({ identifier: "Game" });
sapper.init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztzQkE3Qkg7Q0E4QkM7Ozs7Ozs7O1VDOUJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7O0FDZmdEO0FBRzFCO0FBRXRCLElBQU0sTUFBTSxHQUFHLDZEQUFhLHdCQUFRLENBQUM7QUFFckMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FwcGVyLy4vbm9kZV9tb2R1bGVzL0B3ZXNzYmVyZy9kaS9kaXN0L2VzbS9jb25zdHJ1Y3Rvci1hcmd1bWVudHMvY29uc3RydWN0b3ItYXJndW1lbnRzLWlkZW50aWZpZXIuanMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vbm9kZV9tb2R1bGVzL0B3ZXNzYmVyZy9kaS9kaXN0L2VzbS9kaS1jb250YWluZXIvZGktY29udGFpbmVyLmpzIiwid2VicGFjazovL3NhcHBlci8uL25vZGVfbW9kdWxlcy9Ad2Vzc2JlcmcvZGkvZGlzdC9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vbm9kZV9tb2R1bGVzL0B3ZXNzYmVyZy9kaS9kaXN0L2VzbS9yZWdpc3RyYXRpb24ta2luZC9yZWdpc3RyYXRpb24ta2luZC5qcyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW1nL2JvbWIucG5nIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9pbWcvZmxhZy5wbmciLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2luZGV4LnNjc3M/MjA2ZiIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvYnVpbGRlci9jb21wb3NpdGlvbi50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvYnVpbGRlci9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2J1aWxkZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2NvbXBvc2l0aW9uL2NvcmUudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2NvbXBvc2l0aW9uL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9jb250ZXh0L2NvbXBvc2l0aW9uLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9jb250ZXh0L2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kb20vY29tcG9zaXRpb24udHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2RvbS9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZHJhd2VyL2NvbXBvc2l0aW9uLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kcmF3ZXIvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kcmF3ZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dhbWUvY29tcG9zaXRpb24udHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dhbWUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2dlbmVyYXRvci9jb21wb3NpdGlvbi50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZ2VuZXJhdG9yL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9zZXR0aW5ncy9jb21wb3NpdGlvbi50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc2V0dGluZ3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3NldHRpbmdzL2xldmVscy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc291cmNlL2NvbXBvc2l0aW9uLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9zb3VyY2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3N0b3JhZ2UvY29tcG9zaXRpb24udHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3N0b3JhZ2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NhcHBlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQ09OU1RSVUNUT1JfQVJHVU1FTlRTX1NZTUJPTF9JREVOVElGSUVSID0gYF9fX0NUT1JfQVJHU19fX2A7XG5leHBvcnQgY29uc3QgQ09OU1RSVUNUT1JfQVJHVU1FTlRTX1NZTUJPTCA9IFN5bWJvbC5mb3IoQ09OU1RSVUNUT1JfQVJHVU1FTlRTX1NZTUJPTF9JREVOVElGSUVSKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0cnVjdG9yLWFyZ3VtZW50cy1pZGVudGlmaWVyLmpzLm1hcCIsImltcG9ydCB7IENPTlNUUlVDVE9SX0FSR1VNRU5UU19TWU1CT0wgfSBmcm9tIFwiLi4vY29uc3RydWN0b3ItYXJndW1lbnRzL2NvbnN0cnVjdG9yLWFyZ3VtZW50cy1pZGVudGlmaWVyXCI7XG5pbXBvcnQgeyBSZWdpc3RyYXRpb25LaW5kIH0gZnJvbSBcIi4uL3JlZ2lzdHJhdGlvbi1raW5kL3JlZ2lzdHJhdGlvbi1raW5kXCI7XG4vKipcbiAqIEEgRGVwZW5kZW5jeS1JbmplY3Rpb24gY29udGFpbmVyIHRoYXQgaG9sZHMgc2VydmljZXMgYW5kIGNhbiBwcm9kdWNlIGluc3RhbmNlcyBvZiB0aGVtIGFzIHJlcXVpcmVkLlxuICogSXQgbWltaWNzIHJlZmxlY3Rpb24gYnkgcGFyc2luZyB0aGUgYXBwIGF0IGNvbXBpbGUtdGltZSBhbmQgc3VwcG9ydGluZyB0aGUgZ2VuZXJpYy1yZWZsZWN0aW9uIHN5bnRheC5cbiAqIEBhdXRob3IgRnJlZGVyaWsgV2Vzc2JlcmdcbiAqL1xuZXhwb3J0IGNsYXNzIERJQ29udGFpbmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgbWFwIGJldHdlZW4gaW50ZXJmYWNlIG5hbWVzIGFuZCB0aGUgc2VydmljZXMgdGhhdCBzaG91bGQgYmUgZGVwZW5kZW5jeSBpbmplY3RlZFxuICAgICAgICAgKiBAdHlwZSB7TWFwPHN0cmluZywgQ29uc3RydWN0b3JBcmd1bWVudFtdPn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3JBcmd1bWVudHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIE1hcCBiZXR3ZWVuIGlkZW50aWZ5aW5nIG5hbWVzIGZvciBzZXJ2aWNlcyBhbmQgdGhlaXIgSVJlZ2lzdHJhdGlvblJlY29yZHMuXG4gICAgICAgICAqIEB0eXBlIHtNYXA8c3RyaW5nLCBSZWdpc3RyYXRpb25SZWNvcmQ8e30sIHt9Pj59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlcnZpY2VSZWdpc3RyeSA9IG5ldyBNYXAoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgbWFwIGJldHdlZW4gaWRlbnRpZnlpbmcgbmFtZXMgZm9yIHNlcnZpY2VzIGFuZCBjb25jcmV0ZSBpbnN0YW5jZXMgb2YgdGhlaXIgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAqIEB0eXBlIHtNYXA8c3RyaW5nLCAqPn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5zdGFuY2VzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICByZWdpc3RlclNpbmdsZXRvbihuZXdFeHByZXNzaW9uLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBjb3VsZCBub3QgZ2V0IHNlcnZpY2U6IE5vIGFyZ3VtZW50cyB3ZXJlIGdpdmVuIWApO1xuICAgICAgICBpZiAobmV3RXhwcmVzc2lvbiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihSZWdpc3RyYXRpb25LaW5kLlNJTkdMRVRPTiwgbmV3RXhwcmVzc2lvbiwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihSZWdpc3RyYXRpb25LaW5kLlNJTkdMRVRPTiwgbmV3RXhwcmVzc2lvbiwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVnaXN0ZXJUcmFuc2llbnQobmV3RXhwcmVzc2lvbiwgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gY291bGQgbm90IGdldCBzZXJ2aWNlOiBObyBhcmd1bWVudHMgd2VyZSBnaXZlbiFgKTtcbiAgICAgICAgaWYgKG5ld0V4cHJlc3Npb24gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIoUmVnaXN0cmF0aW9uS2luZC5UUkFOU0lFTlQsIG5ld0V4cHJlc3Npb24sIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIoUmVnaXN0cmF0aW9uS2luZC5UUkFOU0lFTlQsIG5ld0V4cHJlc3Npb24sIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gaW5zdGFuY2Ugb2YgdGhlIHNlcnZpY2UgbWF0Y2hpbmcgdGhlIGludGVyZmFjZSBnaXZlbiBhcyBhIGdlbmVyaWMgdHlwZSBwYXJhbWV0ZXIuXG4gICAgICogRm9yIGV4YW1wbGUsICdjb250YWluZXIuZ2V0PElGb28+KCknIHJldHVybnMgYSBjb25jcmV0ZSBpbnN0YW5jZSBvZiB0aGUgaW1wbGVtZW50YXRpb24gYXNzb2NpYXRlZCB3aXRoIHRoZVxuICAgICAqIGdlbmVyaWMgaW50ZXJmYWNlIG5hbWUuXG4gICAgICpcbiAgICAgKiBZb3Ugc2hvdWxkIG5vdCBwYXNzIGFueSBvcHRpb25zIHRvIHRoZSBtZXRob2QgaWYgdXNpbmcgdGhlIGNvbXBpbGVyLiBJdCB3aWxsIGRvIHRoYXQgYXV0b21hdGljYWxseS5cbiAgICAgKiBAcGFyYW0ge0lHZXRPcHRpb25zfSBbb3B0aW9uc11cbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBnZXQob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gY291bGQgbm90IGdldCBzZXJ2aWNlOiBObyBvcHRpb25zIHdhcyBnaXZlbiFgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0SW5zdGFuY2Uob3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBhIHNlcnZpY2UgaGFzIGJlZW4gcmVnaXN0ZXJlZCBtYXRjaGluZyB0aGUgaW50ZXJmYWNlIGdpdmVuIGFzIGEgZ2VuZXJpYyB0eXBlIHBhcmFtZXRlci5cbiAgICAgKiBGb3IgZXhhbXBsZSwgJ2NvbnRhaW5lci5nZXQ8SUZvbz4oKScgcmV0dXJucyBhIGNvbmNyZXRlIGluc3RhbmNlIG9mIHRoZSBpbXBsZW1lbnRhdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlXG4gICAgICogZ2VuZXJpYyBpbnRlcmZhY2UgbmFtZS5cbiAgICAgKlxuICAgICAqIFlvdSBzaG91bGQgbm90IHBhc3MgYW55IG9wdGlvbnMgdG8gdGhlIG1ldGhvZCBpZiB1c2luZyB0aGUgY29tcGlsZXIuIEl0IHdpbGwgZG8gdGhhdCBhdXRvbWF0aWNhbGx5LlxuICAgICAqIEBwYXJhbSB7SUdldE9wdGlvbnN9IFtvcHRpb25zXVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhcyhvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBjb3VsZCBub3QgZ2V0IHNlcnZpY2U6IE5vIG9wdGlvbnMgd2FzIGdpdmVuIWApO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlUmVnaXN0cnkuaGFzKG9wdGlvbnMuaWRlbnRpZmllcik7XG4gICAgfVxuICAgIHJlZ2lzdGVyKGtpbmQsIG5ld0V4cHJlc3Npb24sIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gVGFrZSBhbGwgb2YgdGhlIGNvbnN0cnVjdG9yIGFyZ3VtZW50cyBmb3IgdGhlIGltcGxlbWVudGF0aW9uXG4gICAgICAgIGNvbnN0IGltcGxlbWVudGF0aW9uQXJndW1lbnRzID0gXCJpbXBsZW1lbnRhdGlvblwiIGluIG9wdGlvbnMgJiYgb3B0aW9ucy5pbXBsZW1lbnRhdGlvbiAhPSBudWxsICYmIG9wdGlvbnMuaW1wbGVtZW50YXRpb25bQ09OU1RSVUNUT1JfQVJHVU1FTlRTX1NZTUJPTF0gIT0gbnVsbCA/IG9wdGlvbnMuaW1wbGVtZW50YXRpb25bQ09OU1RSVUNUT1JfQVJHVU1FTlRTX1NZTUJPTF0gOiBbXTtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvckFyZ3VtZW50cy5zZXQob3B0aW9ucy5pZGVudGlmaWVyLCBpbXBsZW1lbnRhdGlvbkFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuc2VydmljZVJlZ2lzdHJ5LnNldChvcHRpb25zLmlkZW50aWZpZXIsIFwiaW1wbGVtZW50YXRpb25cIiBpbiBvcHRpb25zICYmIG9wdGlvbnMuaW1wbGVtZW50YXRpb24gIT0gbnVsbFxuICAgICAgICAgICAgPyBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7IGtpbmQgfSkgOiBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7IGtpbmQsIG5ld0V4cHJlc3Npb246IG5ld0V4cHJlc3Npb24gfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYW4gaW5zdGFuY2UgZXhpc3RzIHRoYXQgbWF0Y2hlcyB0aGUgZ2l2ZW4gaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhc0luc3RhbmNlKGlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2UoaWRlbnRpZmllcikgIT0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2FjaGVkIGluc3RhbmNlLCBpZiBhbnksIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllclxuICAgICAqIEByZXR1cm5zIHtUfG51bGx9XG4gICAgICovXG4gICAgZ2V0SW5zdGFuY2UoaWRlbnRpZmllcikge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2VzLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlID09IG51bGwgPyBudWxsIDogaW5zdGFuY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gSVJlZ2lzdHJhdGlvblJlY29yZCBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3BhcmVudF1cbiAgICAgKiBAcmV0dXJucyB7UmVnaXN0cmF0aW9uUmVjb3JkPFQ+fVxuICAgICAqL1xuICAgIGdldFJlZ2lzdHJhdGlvblJlY29yZCh7IGlkZW50aWZpZXIsIHBhcmVudENoYWluIH0pIHtcbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5zZXJ2aWNlUmVnaXN0cnkuZ2V0KGlkZW50aWZpZXIpO1xuICAgICAgICBpZiAocmVjb3JkID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBjb3VsZCBub3QgZmluZCBhIHNlcnZpY2UgZm9yIGlkZW50aWZpZXI6IFwiJHtpZGVudGlmaWVyfVwiLiAke3BhcmVudENoYWluID09IG51bGwgfHwgcGFyZW50Q2hhaW4ubGVuZ3RoIDwgMSA/IFwiXCIgOiBgSXQgaXMgcmVxdWlyZWQgYnkgdGhlIHNlcnZpY2U6ICcke3BhcmVudENoYWluLm1hcChwYXJlbnQgPT4gcGFyZW50LmlkZW50aWZpZXIpLmpvaW4oXCIgLT4gXCIpfScuYH0gUmVtZW1iZXIgdG8gcmVnaXN0ZXIgaXQgYXMgYSBzZXJ2aWNlIWApO1xuICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWNoZXMgdGhlIGdpdmVuIGluc3RhbmNlIHNvIHRoYXQgaXQgY2FuIGJlIHJldHJpZXZlZCBpbiB0aGUgZnV0dXJlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIHtUfSBpbnN0YW5jZVxuICAgICAqIEByZXR1cm5zIHtUfVxuICAgICAqL1xuICAgIHNldEluc3RhbmNlKGlkZW50aWZpZXIsIGluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VzLnNldChpZGVudGlmaWVyLCBpbnN0YW5jZSk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyBhIGxhenkgcmVmZXJlbmNlIHRvIGFub3RoZXIgc2VydmljZVxuICAgICAqIEBwYXJhbSBsYXp5UG9pbnRlclxuICAgICAqL1xuICAgIGdldExhenlJZGVudGlmaWVyKGxhenlQb2ludGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkoe30sIHsgZ2V0OiAoXywga2V5KSA9PiBsYXp5UG9pbnRlcigpW2tleV0gfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIGlkZW50aWZpZXIgYW5kIHJldHVybnMgaXQuXG4gICAgICogSXQgY2hlY2tzIHRoZSBjb25zdHJ1Y3RvciBhcmd1bWVudHMgYW5kIGluamVjdHMgYW55IHNlcnZpY2VzIGl0IG1pZ2h0IGRlcGVuZCBvbiByZWN1cnNpdmVseS5cbiAgICAgKiBAcGFyYW0ge0lDb25zdHJ1Y3RJbnN0YW5jZU9wdGlvbnM8VD59IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7VH1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RJbnN0YW5jZSh7IGlkZW50aWZpZXIsIHBhcmVudENoYWluID0gW10gfSkge1xuICAgICAgICBjb25zdCByZWdpc3RyYXRpb25SZWNvcmQgPSB0aGlzLmdldFJlZ2lzdHJhdGlvblJlY29yZCh7IGlkZW50aWZpZXIsIHBhcmVudENoYWluIH0pO1xuICAgICAgICAvLyBJZiBhbiBpbnN0YW5jZSBhbHJlYWR5IGV4aXN0cyAoYW5kIGl0IGlzIGEgc2luZ2xldG9uKSwgcmV0dXJuIHRoYXQgb25lXG4gICAgICAgIGlmICh0aGlzLmhhc0luc3RhbmNlKGlkZW50aWZpZXIpICYmIHJlZ2lzdHJhdGlvblJlY29yZC5raW5kID09PSBSZWdpc3RyYXRpb25LaW5kLlNJTkdMRVRPTikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW5zdGFuY2UoaWRlbnRpZmllcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBpbnN0YW50aWF0ZSBhIG5ldyBvbmVcbiAgICAgICAgbGV0IGluc3RhbmNlO1xuICAgICAgICBjb25zdCBtZSA9IHtcbiAgICAgICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgICAgICByZWY6IHRoaXMuZ2V0TGF6eUlkZW50aWZpZXIoKCkgPT4gaW5zdGFuY2UpXG4gICAgICAgIH07XG4gICAgICAgIC8vIElmIGEgdXNlci1wcm92aWRlZCBuZXctZXhwcmVzc2lvbiBoYXMgYmVlbiBwcm92aWRlZCwgaW52b2tlIHRoYXQgdG8gZ2V0IGFuIGluc3RhbmNlLlxuICAgICAgICBpZiAoXCJuZXdFeHByZXNzaW9uXCIgaW4gcmVnaXN0cmF0aW9uUmVjb3JkKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlZ2lzdHJhdGlvblJlY29yZC5uZXdFeHByZXNzaW9uICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBDb3VsZCBub3QgaW5zdGFudGlhdGUgdGhlIHNlcnZpY2Ugd2l0aCB0aGUgaWRlbnRpZmllcjogJyR7cmVnaXN0cmF0aW9uUmVjb3JkLmlkZW50aWZpZXJ9JzogWW91IHByb3ZpZGVkIGEgY3VzdG9tIGluc3RhbnRpYXRpb24gYXJndW1lbnQsIGJ1dCBpdCB3YXNuJ3Qgb2YgdHlwZSBmdW5jdGlvbi4gSXQgaGFzIHRvIGJlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHdoYXRldmVyIHNob3VsZCBiZSB1c2VkIGFzIGFuIGluc3RhbmNlIG9mIHRoZSBTZXJ2aWNlIWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IHJlZ2lzdHJhdGlvblJlY29yZC5uZXdFeHByZXNzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBpbnN0YW50aWF0ZSB0aGUgc2VydmljZSB3aXRoIHRoZSBpZGVudGlmaWVyOiAnJHtyZWdpc3RyYXRpb25SZWNvcmQuaWRlbnRpZmllcn0nOiBXaGVuIHlvdSByZWdpc3RlcmVkIHRoZSBzZXJ2aWNlLCB5b3UgcHJvdmlkZWQgYSBjdXN0b20gaW5zdGFudGlhdGlvbiBmdW5jdGlvbiwgYnV0IGl0IHRocmV3IGFuIGV4Y2VwdGlvbiB3aGVuIGl0IHdhcyBydW4hYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBhcmd1bWVudHMgZm9yIHRoZSBpZGVudGlmaWVyXG4gICAgICAgICAgICBjb25zdCBtYXBwZWRBcmdzID0gdGhpcy5jb25zdHJ1Y3RvckFyZ3VtZW50cy5nZXQoaWRlbnRpZmllcik7XG4gICAgICAgICAgICBpZiAobWFwcGVkQXJncyA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IGNvdWxkIG5vdCBmaW5kIGNvbnN0cnVjdG9yIGFyZ3VtZW50cyBmb3IgdGhlIHNlcnZpY2U6ICcke2lkZW50aWZpZXJ9Jy4gSGF2ZSB5b3UgcmVnaXN0ZXJlZCBpdCBhcyBhIHNlcnZpY2U/YCk7XG4gICAgICAgICAgICAvLyBJbnN0YW50aWF0ZSBhbGwgb2YgdGhlIGFyZ3VtZW50IHNlcnZpY2VzIChvciByZS11c2UgdGhlbSBpZiB0aGV5IHdlcmUgcmVnaXN0ZXJlZCBhcyBzaW5nbGV0b25zKVxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2VBcmdzID0gbWFwcGVkQXJncy5tYXAoKGRlcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkZXAgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVkUGFyZW50ID0gcGFyZW50Q2hhaW4uZmluZChwYXJlbnQgPT4gcGFyZW50LmlkZW50aWZpZXIgPT09IGRlcCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZWRQYXJlbnQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZWRQYXJlbnQucmVmO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdEluc3RhbmNlKHsgaWRlbnRpZmllcjogZGVwLCBwYXJlbnRDaGFpbjogWy4uLnBhcmVudENoYWluLCBtZV0gfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGNvbnN0cnVjdCBhbiBpbnN0YW5jZSB3aXRoICduZXcnIGFuZCBpZiBpdCBmYWlscywgY2FsbCB0aGUgaW1wbGVtZW50YXRpb24gZGlyZWN0bHkuXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3YWJsZSA9IHJlZ2lzdHJhdGlvblJlY29yZC5pbXBsZW1lbnRhdGlvbjtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IG5ldyBuZXdhYmxlKC4uLmluc3RhbmNlQXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVnaXN0cmF0aW9uUmVjb3JkLmltcGxlbWVudGF0aW9uID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IGNvdWxkIG5vdCBjb25zdHJ1Y3QgYSBuZXcgc2VydmljZSBvZiBraW5kOiAke2lkZW50aWZpZXJ9LiBSZWFzb246IE5vIGltcGxlbWVudGF0aW9uIHdhcyBnaXZlbiFgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25zdHJ1Y3RhYmxlID0gcmVnaXN0cmF0aW9uUmVjb3JkLmltcGxlbWVudGF0aW9uO1xuICAgICAgICAgICAgICAgIC8vIFRyeSB3aXRob3V0ICduZXcnIGFuZCBjYWxsIHRoZSBpbXBsZW1lbnRhdGlvbiBhcyBhIGZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gY29uc3RydWN0YWJsZSguLi5pbnN0YW5jZUFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWdpc3RyYXRpb25SZWNvcmQua2luZCA9PT0gUmVnaXN0cmF0aW9uS2luZC5TSU5HTEVUT04gPyB0aGlzLnNldEluc3RhbmNlKGlkZW50aWZpZXIsIGluc3RhbmNlKSA6IGluc3RhbmNlO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpLWNvbnRhaW5lci5qcy5tYXAiLCJleHBvcnQgeyBESUNvbnRhaW5lciB9IGZyb20gXCIuL2RpLWNvbnRhaW5lci9kaS1jb250YWluZXJcIjtcbmV4cG9ydCB7IENPTlNUUlVDVE9SX0FSR1VNRU5UU19TWU1CT0wsIENPTlNUUlVDVE9SX0FSR1VNRU5UU19TWU1CT0xfSURFTlRJRklFUiB9IGZyb20gXCIuL2NvbnN0cnVjdG9yLWFyZ3VtZW50cy9jb25zdHJ1Y3Rvci1hcmd1bWVudHMtaWRlbnRpZmllclwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiZXhwb3J0IHZhciBSZWdpc3RyYXRpb25LaW5kO1xuKGZ1bmN0aW9uIChSZWdpc3RyYXRpb25LaW5kKSB7XG4gICAgUmVnaXN0cmF0aW9uS2luZFtSZWdpc3RyYXRpb25LaW5kW1wiU0lOR0xFVE9OXCJdID0gMF0gPSBcIlNJTkdMRVRPTlwiO1xuICAgIFJlZ2lzdHJhdGlvbktpbmRbUmVnaXN0cmF0aW9uS2luZFtcIlRSQU5TSUVOVFwiXSA9IDFdID0gXCJUUkFOU0lFTlRcIjtcbn0pKFJlZ2lzdHJhdGlvbktpbmQgfHwgKFJlZ2lzdHJhdGlvbktpbmQgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVnaXN0cmF0aW9uLWtpbmQuanMubWFwIiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9ib21iLnBuZ1wiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvZmxhZy5wbmdcIjsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBjb250YWluZXIgfSBmcm9tICcuLi9jb21wb3NpdGlvbic7XG5pbXBvcnQgeyBTeXN0ZW1CdWlsZGVyIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBMZXZlbEJ1aWxkZXIgfSBmcm9tICcuL2luZGV4JztcblxuY29udGFpbmVyLnJlZ2lzdGVyU2luZ2xldG9uPFN5c3RlbUJ1aWxkZXIsIExldmVsQnVpbGRlcj4oKTsiLCJpbXBvcnQgeyBBcmVhU3RydWN0dXJlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQ29vcmRpbmF0ZXMgb2YgbmVpZ2hib3JpbmcgY2VsbHMgcmVsYXRpdmUgdG8gdGhlIGNlbnRlciBjZWxsXG4gKlxuICogQGV4YW1wbGVcbiAqICAjMCMxIzIjXG4gKiAgIzctOC0zI1xuICogICM2IzUjNCNcbiAqL1xuZXhwb3J0IGNvbnN0IEFSRUFfU1RSVUNUVVJFOiBBcmVhU3RydWN0dXJlID0ge1xuICAwOiB7IHg6IC0xLCB5OiAtMSB9LFxuICAxOiB7IHg6ICAwLCB5OiAtMSB9LFxuICAyOiB7IHg6ICAxLCB5OiAtMSB9LFxuICAzOiB7IHg6ICAxLCB5OiAgMCB9LFxuICA0OiB7IHg6ICAxLCB5OiAgMSB9LFxuICA1OiB7IHg6ICAwLCB5OiAgMSB9LFxuICA2OiB7IHg6IC0xLCB5OiAgMSB9LFxuICA3OiB7IHg6IC0xLCB5OiAgMCB9LFxufTtcbiIsImltcG9ydCB7IENvbXBsZXhpdHksIENvbXBsZXhpdHlMaXN0LCBHYW1lU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy90eXBlcyc7XG5pbXBvcnQgeyBBcmVhU3RydWN0dXJlLCBNYXBTdHJ1Y3R1cmUsIFN5c3RlbUJ1aWxkZXIgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEFSRUFfU1RSVUNUVVJFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWF0aEdlbmVyYXRvciB9IGZyb20gJy4uL2dlbmVyYXRvci90eXBlcyc7XG5cbi8qKiBDbGFzcyByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgbGV2ZWxzIGJhc2VkIG9uIGxldmVscyBzZXR0aW5ncyAqL1xuZXhwb3J0IGNsYXNzIExldmVsQnVpbGRlciBpbXBsZW1lbnRzIFN5c3RlbUJ1aWxkZXIge1xuICAgIC8qKiBTaXplIG9mIHRoZSBmaWVsZCBpbiBjZWxscyAqL1xuICAgIHByaXZhdGUgZmllbGRTaXplOiBDZWxsQW1vdW50O1xuXG4gICAgLyoqIFNpemUgb2YgdGhlIGZpZWxkIGluIHBpeGVscyAqL1xuICAgIHByaXZhdGUgY2FudmFzU2l6ZTogUGl4ZWxzQW1vdW50O1xuXG4gICAgLyoqIE51bWJlciBvZiBsZXZlbCBib21icyAqL1xuICAgIHByaXZhdGUgYm9tYkNvdW50OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZ2VuZXJhdG9yIC0gbWF0aCBudW1iZXIgZ2VuZXJhdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZ2VuZXJhdG9yOiBNYXRoR2VuZXJhdG9yLFxuICAgICkge31cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkIGxldmVsXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2V0dGluZ3MgLSBiYXNpYyBnYW1lIHNldHRpbmdzXG4gICAgICovXG4gICAgcHVibGljIGJ1aWxkKHNldHRpbmdzOiBHYW1lU2V0dGluZ3MpOiBNYXBTdHJ1Y3R1cmUge1xuICAgICAgY29uc3QgeyBmaWVsZFNpemUsIGJvbWJDb3VudCB9ID0gdGhpcy5nZXRTZWxlY3RlZExldmVsKHNldHRpbmdzLmxldmVscyk7XG5cbiAgICAgIHRoaXMuZmllbGRTaXplID0gZmllbGRTaXplO1xuICAgICAgdGhpcy5ib21iQ291bnQgPSBib21iQ291bnQ7XG4gICAgICB0aGlzLmNhbnZhc1NpemUgPSBzZXR0aW5ncy5jYW52YXNTaXplO1xuXG4gICAgICBjb25zdCBtYXAgPSB0aGlzLmdlbmVyYXRlTWFwU3RydWN0dXJlKCk7XG5cbiAgICAgIHJldHVybiBtYXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc2VsZWN0ZWQgZGlmZmljdWx0eSBsZXZlbCBmcm9tIHRoZSBsaXN0IG9mIGxldmVscyBmcm9tIHRoZSBzZXR0aW5nc1xuICAgICAqXG4gICAgICogQHBhcmFtIGxldmVscyAtIGxpc3Qgb2YgcG9zc2libGUgbGV2ZWxzIG9mIGRpZmZpY3VsdHkgb2YgdGhlIGdhbWVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFNlbGVjdGVkTGV2ZWwobGV2ZWxzOiBDb21wbGV4aXR5TGlzdCk6IENvbXBsZXhpdHkge1xuICAgICAgbGV0IHNlbGVjdGVkTGV2ZWw6IENvbXBsZXhpdHk7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGxldmVscykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChsZXZlbHNba2V5XS5zZWxlY3RlZCkge1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzZWxlY3RlZExldmVsID0gbGV2ZWxzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGVjdGVkTGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqIEdlbmVyYXRlcyB0aGUgZmllbGQgc3RydWN0dXJlIGZvciB0aGUgc2VsZWN0ZWQgZGlmZmljdWx0eSBsZXZlbCAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVNYXBTdHJ1Y3R1cmUoKTogTWFwU3RydWN0dXJlIHtcbiAgICAgIGNvbnN0IG1hcFN0cnVjdHVyZTogTWFwU3RydWN0dXJlID0ge1xuICAgICAgICBwaXhlbHNDb3VudEluQ2VsbDogdGhpcy5jYW52YXNTaXplIC8gdGhpcy5maWVsZFNpemUsXG4gICAgICAgIGJvbWJDb3VudDogdGhpcy5ib21iQ291bnQsXG4gICAgICAgIGJvbWJMZWZ0OiB0aGlzLmJvbWJDb3VudCxcbiAgICAgICAgdXNlZENlbGxzOiAwLFxuICAgICAgICBjZWxsczoge30sXG4gICAgICAgIGJvbWJQb3NpdGlvbnM6IFtdLFxuICAgICAgICBmaWVsZFNpemU6IHRoaXMuZmllbGRTaXplLFxuICAgICAgfTtcblxuICAgICAgbWFwU3RydWN0dXJlLmJvbWJQb3NpdGlvbnMgPSB0aGlzLmdlbmVyYXRlUmFuZG9tQm9tYlBvc2l0aW9ucyh0aGlzLmZpZWxkU2l6ZSAqIHRoaXMuZmllbGRTaXplKTtcblxuICAgICAgLy8gdHJhdmVyc2FsIG9mIGFycmF5cyBnb2VzIGZyb20gbGVmdCB0byByaWdodCBhbmQgZnJvbSB0b3AgdG8gYm90dG9tXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuZmllbGRTaXplOyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmZpZWxkU2l6ZTsgeCsrKSB7XG4gICAgICAgICAgY29uc3Qgcm93OiBudW1iZXIgPSB5O1xuICAgICAgICAgIGNvbnN0IGNlbGw6IG51bWJlciA9IHg7XG5cbiAgICAgICAgICBpZiAoIW1hcFN0cnVjdHVyZS5jZWxsc1tyb3ddKSB7XG4gICAgICAgICAgICBtYXBTdHJ1Y3R1cmUuY2VsbHNbcm93XSA9IHt9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGhhc0JvbWI6IGJvb2xlYW4gPSBtYXBTdHJ1Y3R1cmUuYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyh4ICsgeSAqIHRoaXMuZmllbGRTaXplKTtcbiAgICAgICAgICBjb25zdCBhcmVhOiBBcmVhU3RydWN0dXJlID0gdGhpcy5nZW5lcmF0ZUNlbGxBcmVhKHsgeCwgeSB9KTtcblxuICAgICAgICAgIGNvbnN0IGNlbGxTdHJ1Y3R1cmU6IENlbGwgPSB7XG4gICAgICAgICAgICB5OiByb3csXG4gICAgICAgICAgICB4OiBjZWxsLFxuICAgICAgICAgICAgYXJlYSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKGhhc0JvbWIpIHtcbiAgICAgICAgICAgIGNlbGxTdHJ1Y3R1cmUuaGFzQm9tYiA9IGhhc0JvbWI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNlbGxTdHJ1Y3R1cmUudmFsdWUgPSB0aGlzLmNhbGNCb21ic0Fyb3VuZENlbGxzKGFyZWEsIG1hcFN0cnVjdHVyZS5ib21iUG9zaXRpb25zKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtYXBTdHJ1Y3R1cmUuY2VsbHNbcm93XVtjZWxsXSA9IGNlbGxTdHJ1Y3R1cmU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcFN0cnVjdHVyZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSByZWdpb24gb2YgY2VsbHMgd2l0aCB0aGVpciBjb29yZGluYXRlcyBhcm91bmQgdGhlIHNlbGVjdGVkIGNlbGwgYmFzZWQgb24gaXRzIGNvb3JkaW5hdGVzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgICAqIEBwYXJhbSBjZWxsLnggLSB0aGUgeCBjb29yZGluYXRlIG9uIHRoZSBwbGF5aW5nIGZpZWxkXG4gICAgICogQHBhcmFtIGNlbGwueSAtIHRoZSB5IGNvb3JkaW5hdGUgb24gdGhlIHBsYXlpbmcgZmllbGRcbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlQ2VsbEFyZWEoeyB4LCB5IH06IENlbGwpOiBBcmVhU3RydWN0dXJlIHtcbiAgICAgIGNvbnN0IGFyZWE6IEFyZWFTdHJ1Y3R1cmUgPSB7fTtcblxuICAgICAgLy8gOCAtIHRoZSBudW1iZXIgb2YgY2VsbHMgYXJvdW5kIHRoZSBjZW50cmFsXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgODsgaW5kZXgrKykge1xuICAgICAgICAvKiogQ2hlY2tpbmcgaWYgdGhlIGNlbGwgZ29lcyBiZXlvbmQgdGhlIGxlZnQgYW5kIHRvcCBib3JkZXJzIG9mIHRoZSBmaWVsZCAqL1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmICh4ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnggPCAwIHx8IHkgKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueSA8IDApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiBDaGVja2luZyBpZiB0aGUgY2VsbCBnb2VzIGJleW9uZCB0aGUgcmlnaHQgYW5kIGJvdHRvbSBib3JkZXJzIG9mIHRoZSBmaWVsZCAqL1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmICh4ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnggPj0gdGhpcy5maWVsZFNpemUgfHwgeSArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS55ID49IHRoaXMuZmllbGRTaXplKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGFyZWFbaW5kZXhdID0ge1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB4OiB4ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLngsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHk6IHkgKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHJhbmRvbSBwb3NpdGlvbnMgZm9yIHBsYWNpbmcgYm9tYnMgb24gdGhlIGZpZWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2VsbHNDb3VudCAtIG51bWJlciBvZiBjZWxscyBvZiB0aGUgcGxheWluZyBmaWVsZFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVSYW5kb21Cb21iUG9zaXRpb25zKGNlbGxzQ291bnQ6IENlbGxBbW91bnQpOiBudW1iZXJbXSB7XG4gICAgICBjb25zdCBib21iUG9zaXRpb25zOiBCb21iUG9zaXRpb25zID0gW107XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmJvbWJDb3VudDsgaW5kZXgrKykge1xuICAgICAgICBsZXQgcmFuZG9tUG9zaXRpb246IG51bWJlciA9IHRoaXMuZ2VuZXJhdG9yLmdldFJhbmRvbUFyYml0cmFyeSgxLCBjZWxsc0NvdW50KTtcblxuICAgICAgICAvLyBpZiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9uIGlzIGFscmVhZHkgaW4gdGhlIGxpc3QsIHdlIGdlbmVyYXRlIGl0IGFnYWluXG4gICAgICAgIHdoaWxlIChib21iUG9zaXRpb25zLmluY2x1ZGVzKHJhbmRvbVBvc2l0aW9uKSkge1xuICAgICAgICAgIHJhbmRvbVBvc2l0aW9uID0gdGhpcy5nZW5lcmF0b3IuZ2V0UmFuZG9tQXJiaXRyYXJ5KDEsIGNlbGxzQ291bnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9tYlBvc2l0aW9ucy5wdXNoKHJhbmRvbVBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJvbWJQb3NpdGlvbnMuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvdW50cyB0aGUgbnVtYmVyIG9mIGJvbWJzIGFyb3VuZCB0aGUgY2VsbFxuICAgICAqXG4gICAgICogQHBhcmFtIGFyZWEgLSBuZWlnaGJvcmluZyBjZWxscyByZWxhdGl2ZSB0byB0aGUgY2VudGVyIGNlbGxcbiAgICAgKiBAcGFyYW0gYm9tYlBvc2l0aW9ucyAtIHBvc2l0aW9ucyBvZiBib21icyBvbiB0aGUgZmllbGRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNCb21ic0Fyb3VuZENlbGxzKGFyZWE6IEFyZWFTdHJ1Y3R1cmUsIGJvbWJQb3NpdGlvbnM6IEJvbWJQb3NpdGlvbnMpOiBudW1iZXIge1xuICAgICAgbGV0IHJlc3VsdCA9IDA7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGFyZWEpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBjZWxsID0gYXJlYVtrZXldO1xuXG4gICAgICAgIGlmIChib21iUG9zaXRpb25zLmluY2x1ZGVzKGNlbGwueCArIGNlbGwueSAqIHRoaXMuZmllbGRTaXplKSkge1xuICAgICAgICAgIHJlc3VsdCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRElDb250YWluZXIgfSBmcm9tICdAd2Vzc2JlcmcvZGknO1xuXG5leHBvcnQgY29uc3QgY29udGFpbmVyID0gbmV3IERJQ29udGFpbmVyKCk7IiwiaW1wb3J0IHsgY29udGFpbmVyIH0gZnJvbSAnLi9jb3JlJztcblxuaW1wb3J0ICcuLi9idWlsZGVyL2NvbXBvc2l0aW9uJztcbmltcG9ydCAnLi4vY29udGV4dC9jb21wb3NpdGlvbic7XG5pbXBvcnQgJy4uL2RvbS9jb21wb3NpdGlvbic7XG5pbXBvcnQgJy4uL2RyYXdlci9jb21wb3NpdGlvbic7XG5pbXBvcnQgJy4uL2dhbWUvY29tcG9zaXRpb24nO1xuaW1wb3J0ICcuLi9nZW5lcmF0b3IvY29tcG9zaXRpb24nO1xuaW1wb3J0ICcuLi9zZXR0aW5ncy9jb21wb3NpdGlvbic7XG5pbXBvcnQgJy4uL3NvdXJjZS9jb21wb3NpdGlvbic7XG5pbXBvcnQgJy4uL3N0b3JhZ2UvY29tcG9zaXRpb24nO1xuXG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248V2luZG93PigoKSA9PiB3aW5kb3cpO1xuY29udGFpbmVyLnJlZ2lzdGVyU2luZ2xldG9uPE1hdGg+KCgpID0+IE1hdGgpO1xuY29udGFpbmVyLnJlZ2lzdGVyU2luZ2xldG9uPHR5cGVvZiBJbWFnZT4oKCkgPT4gSW1hZ2UpO1xuY29udGFpbmVyLnJlZ2lzdGVyU2luZ2xldG9uPFN0b3JhZ2U+KCgpID0+IHdpbmRvdy5sb2NhbFN0b3JhZ2UpO1xuXG5leHBvcnQgeyBjb250YWluZXIgfTsiLCJpbXBvcnQgeyBjb250YWluZXIgfSBmcm9tICcuLi9jb21wb3NpdGlvbic7XG5pbXBvcnQgeyBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBDYW52YXNDb250ZXh0UHJvdmlkZXIgfSBmcm9tICcuL2luZGV4JztcblxuY29udGFpbmVyLnJlZ2lzdGVyU2luZ2xldG9uPERyYXdpbmdDb250ZXh0UHJvdmlkZXIsIENhbnZhc0NvbnRleHRQcm92aWRlcj4oKTsiLCJpbXBvcnQgeyBFbGVtZW50U291cmNlIH0gZnJvbSAnLi4vZG9tL3R5cGVzJztcbmltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3R5cGVzJztcbmltcG9ydCB7IERyYXdpbmdDb250ZXh0LCBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBQcm92aWRlcyB0aGUgY29udGV4dCBvZiB0aGUgY2FudmFzICovXG5leHBvcnQgY2xhc3MgQ2FudmFzQ29udGV4dFByb3ZpZGVyIGltcGxlbWVudHMgRHJhd2luZ0NvbnRleHRQcm92aWRlciB7XG4gIC8qKiBHYW1lIHdpbGwgYmUgZHJhd24gb24gdGhpcyBjYW52YXMgKi9cbiAgcHJpdmF0ZSBjYW52YXM6IE51bGxhYmxlPEhUTUxDYW52YXNFbGVtZW50PiA9IG51bGw7XG5cbiAgLyoqIENhbnZhcyAyZCBjb250ZXh0ICovXG4gIHByaXZhdGUgY29udGV4dDogTnVsbGFibGU8RHJhd2luZ0NvbnRleHQ+ID0gbnVsbDtcblxuICAvKipcbiAgICogQHBhcmFtIGVsZW1lbnRTb3VyY2UgLSBhbGxvd3MgaW50ZXJhY3Qgd2l0aCB0aGUgRE9NIHRyZWVcbiAgICogQHBhcmFtIHNldHRpbmdzIC0gYmFzaWMgZ2FtZSBzZXR0aW5nc1xuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50U291cmNlOiBFbGVtZW50U291cmNlLFxuICAgIHByaXZhdGUgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyxcbiAgKSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5lbGVtZW50U291cmNlLmdldEVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgaWYgKCFjYW52YXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZpbmQgYSBjYW52YXMuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXMgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLm5vcm1hbGl6ZVNjYWxlKCk7XG4gIH1cblxuICAvKiogUmV0dXJucyBjYW52YXMgMmQgY29udGV4dCAqL1xuICBwdWJsaWMgZ2V0SW5zdGFuY2UoKTogRHJhd2luZ0NvbnRleHQge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIGNsaWNraW5nIG9uIHRoZSBjYW52YXMgYnkgbGVmdCBtb3VzZSBidXR0b25cbiAgICpcbiAgICogQHBhcmFtIGNhbGxiYWNrIC0gYSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBhZnRlciBjbGlja2luZyBvbiB0aGUgY2FudmFzIGJ5IGxlZnQgbW91c2UgYnV0dG9uXG4gICAqL1xuICBwdWJsaWMgbGlzdGVuQ2FudmFzQ2xpY2soY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gY2xpY2tpbmcgb24gdGhlIGNhbnZhcyBieSByaWdodCBtb3VzZSBidXR0b25cbiAgICpcbiAgICogQHBhcmFtIGNhbGxiYWNrIC0gYSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBhZnRlciBjbGlja2luZyBvbiB0aGUgY2FudmFzIGJ5IHJpZ2h0IG1vdXNlIGJ1dHRvblxuICAgKi9cbiAgcHVibGljIGxpc3RlbkNhbnZhc0NvbnRleHRNZW51KGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKiogTm9ybWFsaXplIGNhbnZhcyBzdHlsZXMgYW5kIGNvbnRleHQgc2NhbGUgKi9cbiAgcHJpdmF0ZSBub3JtYWxpemVTY2FsZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2FudmFzIHx8ICF0aGlzLmNvbnRleHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByYXRpbyA9IHRoaXMuc2V0dGluZ3MuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNvbnN0IHNpemU6IFBpeGVsc0Ftb3VudCA9IHRoaXMuc2V0dGluZ3MuY2FudmFzU2l6ZTtcblxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gc2l6ZSAqIHJhdGlvO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHNpemUgKiByYXRpbztcblxuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGA7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZX1weGA7XG5cbiAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5jb250ZXh0LnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gJy4uL2NvbXBvc2l0aW9uJztcbmltcG9ydCB7IEVsZW1lbnRTb3VyY2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IERvbVNvdXJjZSB9IGZyb20gJy4vaW5kZXgnO1xuXG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248RWxlbWVudFNvdXJjZSwgRG9tU291cmNlPigpOyIsImltcG9ydCB7IEVsZW1lbnRTb3VyY2UgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIENsYXNzIGFsbG93cyBpbnRlcmFjdCB3aXRoIHRoZSBET00gdHJlZSAqL1xuZXhwb3J0IGNsYXNzIERvbVNvdXJjZSBpbXBsZW1lbnRzIEVsZW1lbnRTb3VyY2Uge1xuICAvKipcbiAgICogQHBhcmFtIHdpbmRvdyAtIHdpbmRvdyBjb250YWluaW5nIGEgRE9NIGRvY3VtZW50XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdpbmRvdzogV2luZG93KSB7fVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgSFRNTCBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBIVE1MIGVsZW1lbnRcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZyk6IE51bGxhYmxlPEhUTUxFbGVtZW50PiB7XG4gICAgcmV0dXJuIHRoaXMud2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBIVE1MIGVsZW1lbnQgYnkgSURcbiAgICpcbiAgICogQHBhcmFtIGlkIC0gSUQgb2YgSFRNTCBlbGVtZW50XG4gICAqL1xuICBwdWJsaWMgZ2V0RWxlbWVudChpZDogc3RyaW5nKTogTnVsbGFibGU8SFRNTEVsZW1lbnQ+IHtcbiAgICByZXR1cm4gdGhpcy53aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIGEgY2FsbGJhY2sgYWZ0ZXIgbG9hZGluZyB0aGUgRE9NIHRyZWVcbiAgICpcbiAgICogQHBhcmFtIGNhbGxiYWNrIC0gZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgbG9hZGluZyB0aGUgRE9NIHRyZWVcbiAgICovXG4gIHB1YmxpYyBhZnRlckxvYWQoY2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgY2FsbGJhY2soZXZlbnQpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjb250YWluZXIgfSBmcm9tICcuLi9jb21wb3NpdGlvbic7XG5pbXBvcnQgeyBEcmF3ZXIgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IENhbnZhc0RyYXdlciB9IGZyb20gJy4vaW5kZXgnO1xuXG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248RHJhd2VyLCBDYW52YXNEcmF3ZXI+KCk7IiwiY29uc3Qgcm9vdFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcblxuLyoqIEJvcmRlciBjb2xvciBvbiB0aGUgZmllbGQgKi9cbmV4cG9ydCBjb25zdCBCT1JERVJfQ09MT1I6IENvbG9yID0gcm9vdFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFxuICAnLS1ib3JkZXItY29sb3InLFxuKTtcblxuLyoqIENvbG9yIG9mIHRoZSB0ZXh0IGluIHRoZSBnYW1lICovXG5leHBvcnQgY29uc3QgVEVYVF9DT0xPUjogQ29sb3IgPSByb290U3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXG4gICctLXRleHQtY29sb3InLFxuKTtcblxuLyoqIE1haW4gYmFja2dyb3VuZCBjb2xvciBpbiB0aGUgZ2FtZSAqL1xuZXhwb3J0IGNvbnN0IE1BSU5fQkdfQ09MT1I6IENvbG9yID0gcm9vdFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFxuICAnLS1tYWluLWJnLWNvbG9yJyxcbik7XG5cbi8qKiBGaWVsZCBmaWxsIGNvbG9yICovXG5leHBvcnQgY29uc3QgSU5JVElBTF9GSUVMRF9CR19DT0xPUjogQ29sb3IgPSByb290U3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXG4gICctLWZpZWxkLWJnLWNvbG9yJyxcbik7XG5cbi8qKiBGaWxsIGNvbG9yIG9mIHRoZSBjZWxsIHVuZGVyIHRoZSBmbGFnICovXG5leHBvcnQgY29uc3QgRkxBR19CR19DT0xPUjogQ29sb3IgPSByb290U3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXG4gICctLWZsYWctYmctY29sb3InLFxuKTtcbiIsImltcG9ydCB7IERyYXdpbmdDb250ZXh0LCBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC90eXBlcyc7XG5pbXBvcnQgeyBTb3VyY2VQcm92aWRlciB9IGZyb20gJy4uL3NvdXJjZS90eXBlcyc7XG5pbXBvcnQgeyBNQUlOX0JHX0NPTE9SLCBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SLCBURVhUX0NPTE9SLCBGTEFHX0JHX0NPTE9SLCBCT1JERVJfQ09MT1IgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBEcmF3ZXIgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIENsYXNzIGltcGxlbWVudHMgcGFpbnRpbmcgb24gY2FudmFzICovXG5leHBvcnQgY2xhc3MgQ2FudmFzRHJhd2VyIGltcGxlbWVudHMgRHJhd2VyIHtcbiAgLyoqIENhbnZhcyAyZCBjb250ZXh0ICovXG4gIHByaXZhdGUgY29udGV4dDogRHJhd2luZ0NvbnRleHQgPSBudWxsO1xuXG4gIC8qKiBCb21iIGltYWdlICovXG4gIHByaXZhdGUgYm9tYjogQ2FudmFzSW1hZ2VTb3VyY2U7XG5cbiAgLyoqIEZsYWcgaW1hZ2UgKi9cbiAgcHJpdmF0ZSBmbGFnOiBDYW52YXNJbWFnZVNvdXJjZTtcblxuICAvKipcbiAgICogQHBhcmFtIGNvbnRleHRQcm92aWRlciAtIHByb3ZpZGVzIHRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXNcbiAgICogQHBhcmFtIGZpbGVQcm92aWRlciAtIHRvIGludGVyYWN0IHdpdGggdGhlIGZpbGUgc3lzdGVtXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRleHRQcm92aWRlcjogRHJhd2luZ0NvbnRleHRQcm92aWRlcixcbiAgICBwcml2YXRlIGZpbGVQcm92aWRlcjogU291cmNlUHJvdmlkZXIsXG4gICkge1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY29udGV4dFByb3ZpZGVyLmdldEluc3RhbmNlKCk7XG4gICAgaWYgKCF0aGlzLmNvbnRleHQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGFjY2VzcyB0aGUgZHJhd2luZyBjb250ZXh0LicpO1xuICAgIH1cblxuICAgIHRoaXMuYm9tYiA9IHRoaXMuZmlsZVByb3ZpZGVyLmdldEltYWdlKCdib21iJyk7XG4gICAgdGhpcy5mbGFnID0gdGhpcy5maWxlUHJvdmlkZXIuZ2V0SW1hZ2UoJ2ZsYWcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBhbiBlbXB0eSBzcXVhcmVcbiAgICpcbiAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICogQHBhcmFtIGNlbGwueCAtIGNlbGwgeCBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBjZWxsLnkgLSBjZWxsIHkgY29vcmRpbmF0ZVxuICAgKiBAcGFyYW0gc2l6ZSAtIHNxdWFyZSBzaXplIGluIHBpeGVsc1xuICAgKiBAcGFyYW0gY29sb3IgLSBzcXVhcmUgY29sb3JcbiAgICogQHBhcmFtIGhhc0JvcmRlcnMgLSB3aGV0aGVyIHRvIGRyYXcgYm9yZGVycyBhdCBhIHNxdWFyZVxuICAgKi9cbiAgcHVibGljIGRyYXdTcXVhcmUoeyB4LCB5IH06IENlbGwsIHNpemU6IFBpeGVsc0Ftb3VudCwgY29sb3I6IHN0cmluZywgaGFzQm9yZGVycyA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgc2l6ZSwgc2l6ZSk7XG5cbiAgICBpZiAoaGFzQm9yZGVycykge1xuICAgICAgdGhpcy5kcmF3Qm9yZGVycyh7IHgsIHkgfSwgc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIHNxdWFyZSB3aXRoIG51bWJlclxuICAgKlxuICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgKiBAcGFyYW0gY2VsbC54IC0gY2VsbCB4IGNvb3JkaW5hdGVcbiAgICogQHBhcmFtIGNlbGwueSAtIGNlbGwgeSBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBzaXplIC0gc3F1YXJlIHNpemUgaW4gcGl4ZWxzXG4gICAqIEBwYXJhbSB2YWx1ZSAtIG51bWJlciB0byBkcmF3XG4gICAqL1xuICBwdWJsaWMgZHJhd051bWJlcih7IHgsIHkgfTogQ2VsbCwgc2l6ZTogUGl4ZWxzQW1vdW50LCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5kcmF3U3F1YXJlKHsgeCwgeSB9LCBzaXplLCBNQUlOX0JHX0NPTE9SKTtcblxuICAgIC8qKiBmb250IHNpemUgc2hvdWxkIGJlIGxlc3MgdGhhbiB0aGUgc2l6ZSBvZiB0aGUgc3F1YXJlICovXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgJHtzaXplIC8gMn1weCBBcmlhbGA7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFRFWFRfQ09MT1I7XG5cbiAgICAvKiogc2luY2UgdGhlIG51bWJlciBpcyBzdHJldGNoZWQgdXB3YXJkcywgZm9yIGNlbnRlcmluZywgd2UgZGl2aWRlIHRoZSB3aWR0aCBieSBhIGxhcmdlciBudW1iZXIgdGhhbiB0aGUgaGVpZ2h0ICovXG4gICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHZhbHVlLnRvU3RyaW5nKCksIHggKyAoc2l6ZSAvIDIuNSksIHkgKyAoc2l6ZSAvIDEuNSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIHNxdWFyZSB3aXRoIGJvbWJcbiAgICpcbiAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICogQHBhcmFtIGNlbGwueCAtIGNlbGwgeCBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBjZWxsLnkgLSBjZWxsIHkgY29vcmRpbmF0ZVxuICAgKiBAcGFyYW0gc2l6ZSAtIHNxdWFyZSBzaXplIGluIHBpeGVsc1xuICAgKi9cbiAgcHVibGljIGRyYXdCb21iKHsgeCwgeSB9OiBDZWxsLCBzaXplOiBQaXhlbHNBbW91bnQpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXdTcXVhcmUoeyB4LCB5IH0sIHNpemUsIElOSVRJQUxfRklFTERfQkdfQ09MT1IsIGZhbHNlKTtcblxuICAgIGNvbnN0IGltYWdlU2l6ZTogbnVtYmVyID0gdGhpcy5nZXRJbWFnZVNpemUoc2l6ZSk7XG5cbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYm9tYiwgdGhpcy5nZXRJbWFnZUNvb3JkKHgsIHNpemUpLCB0aGlzLmdldEltYWdlQ29vcmQoeSwgc2l6ZSksIGltYWdlU2l6ZSwgaW1hZ2VTaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBzcXVhcmUgd2l0aCBmbGFnXG4gICAqXG4gICAqIEBwYXJhbSBjZWxsIC0gZ2FtZSBib2FyZCBjZWxsXG4gICAqIEBwYXJhbSBjZWxsLnggLSBjZWxsIHggY29vcmRpbmF0ZVxuICAgKiBAcGFyYW0gY2VsbC55IC0gY2VsbCB5IGNvb3JkaW5hdGVcbiAgICogQHBhcmFtIHNpemUgLSBzcXVhcmUgc2l6ZSBpbiBwaXhlbHNcbiAgICovXG4gIHB1YmxpYyBkcmF3RmxhZyh7IHgsIHkgfTogQ2VsbCwgc2l6ZTogUGl4ZWxzQW1vdW50KTogdm9pZCB7XG4gICAgdGhpcy5kcmF3U3F1YXJlKHsgeCwgeSB9LCBzaXplLCBGTEFHX0JHX0NPTE9SLCBmYWxzZSk7XG5cbiAgICBjb25zdCBpbWFnZVNpemU6IG51bWJlciA9IHRoaXMuZ2V0SW1hZ2VTaXplKHNpemUpO1xuXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmZsYWcsIHRoaXMuZ2V0SW1hZ2VDb29yZCh4LCBzaXplKSwgdGhpcy5nZXRJbWFnZUNvb3JkKHksIHNpemUpLCBpbWFnZVNpemUsIGltYWdlU2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc2l6ZSBvZiB0aGUgaW1hZ2Ugc3F1YXJlZFxuICAgKlxuICAgKiBAcGFyYW0gc2l6ZSAtIHNxdWFyZSBzaXplIGluIHBpeGVsc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbWFnZVNpemUoc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc2l6ZSAvIDI7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjb29yZGluYXRlIG9mIGltYWdlIGluIHRoZSBjZWxsXG4gICAqXG4gICAqIEBwYXJhbSBjZWxsQ29vcmQgLSB4IG9yIHkgY29vcmRpbmF0ZSBvZiBjZWxsXG4gICAqIEBwYXJhbSBzaXplIC0gc3F1YXJlIHNpemUgaW4gcGl4ZWxzXG4gICAqL1xuICBwcml2YXRlIGdldEltYWdlQ29vcmQoY2VsbENvb3JkOiBudW1iZXIsIHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIGNlbGxDb29yZCArIChzaXplIC8gNCk7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3MgYm9yZGVycyBmb3Igc3F1YXJlXG4gICAqXG4gICAqIEBwYXJhbSBjZWxsIC0gZ2FtZSBib2FyZCBjZWxsXG4gICAqIEBwYXJhbSBjZWxsLnggLSBjZWxsIHggY29vcmRpbmF0ZVxuICAgKiBAcGFyYW0gY2VsbC55IC0gY2VsbCB5IGNvb3JkaW5hdGVcbiAgICogQHBhcmFtIHNpemUgLSBzcXVhcmUgc2l6ZSBpbiBwaXhlbHNcbiAgICovXG4gIHByaXZhdGUgZHJhd0JvcmRlcnMoeyB4LCB5IH06IENlbGwsIHNpemU6IFBpeGVsc0Ftb3VudCk6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IEJPUkRFUl9DT0xPUjtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdCh4LCB5LCBzaXplLCBzaXplKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY29udGFpbmVyIH0gZnJvbSAnLi4vY29tcG9zaXRpb24nO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgU2FwcGVyIH0gZnJvbSAnLi9pbmRleCc7XG5cbmNvbnRhaW5lci5yZWdpc3RlclNpbmdsZXRvbjxHYW1lLCBTYXBwZXI+KCk7IiwiaW1wb3J0IHsgTWFwU3RydWN0dXJlLCBTeXN0ZW1CdWlsZGVyIH0gZnJvbSAnLi4vYnVpbGRlci90eXBlcyc7XG5pbXBvcnQgeyBEcmF3aW5nQ29udGV4dFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC90eXBlcyc7XG5pbXBvcnQgeyBFbGVtZW50U291cmNlIH0gZnJvbSAnLi4vZG9tL3R5cGVzJztcbmltcG9ydCB7IElOSVRJQUxfRklFTERfQkdfQ09MT1IsIE1BSU5fQkdfQ09MT1IgfSBmcm9tICcuLi9kcmF3ZXIvY29uc3RhbnRzJztcbmltcG9ydCB7IERyYXdlciB9IGZyb20gJy4uL2RyYXdlci90eXBlcyc7XG5pbXBvcnQgeyBNYXRoR2VuZXJhdG9yIH0gZnJvbSAnLi4vZ2VuZXJhdG9yL3R5cGVzJztcbmltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3R5cGVzJztcbmltcG9ydCB7IFN0b3JhZ2VQcm92aWRlciB9IGZyb20gJy4uL3N0b3JhZ2UvdHlwZXMnO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogVGhlIG1haW4gY2xhc3Mgb2YgdGhlIGdhbWUgKi9cbmV4cG9ydCBjbGFzcyBTYXBwZXIgaW1wbGVtZW50cyBHYW1lIHtcbiAgICAvKiogSFRNTCBzZWxlY3QgZm9yIGNob2ljZSBvZiBkaWZmaWN1bHR5IGxldmVsICovXG4gICAgcHJpdmF0ZSBzZWxlY3Q6IE51bGxhYmxlPEhUTUxTZWxlY3RFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogSFRNTCBidXR0b24gZm9yIHN0YXJ0IGdhbWUgKi9cbiAgICBwcml2YXRlIHN0YXJ0R2FtZUJ1dHRvbjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcblxuICAgICAvKiogQ29udGFpbmVyIGZvciBiZXN0IGxldmVsIHRpbWUgKi9cbiAgICAgcHJpdmF0ZSBsZXZlbFRpbWU6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogVG8gZGlzcGxheSBiZXN0IGxldmVsIHRpbWUgYmVmb3JlIHRoZSBnYW1lICovXG4gICAgcHJpdmF0ZSBiZXN0TGV2ZWxUaW1lOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIEVsZW1lbnQgb24gd2hpY2ggdGhlIGdhbWUgd2lsbCBiZSBkcmF3biAqL1xuICAgIHByaXZhdGUgY2FudmFzOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIENvbnRhaW5lciBmb3IgZmllbGRzIGFuZCBvdGhlciBjb250YWluZXJzICovXG4gICAgcHJpdmF0ZSBnYW1lQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIFRvIGRpc3BsYXkgdGhlIHJlc3VsdHMgb2YgdGhlIGdhbWUgKi9cbiAgICBwcml2YXRlIHJlc3VsdENvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcblxuICAgIC8qKiBDb250YWluZXIgZm9yIGN1cnJlbnQgdGltZSBhbmQgYmVzdCB0aW1lIG9mIHRoZSBnYW1lICovXG4gICAgcHJpdmF0ZSB3aW5Db250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogVG8gZGlzcGxheSB0aGUgcmVtYWluaW5nIG51bWJlciBvZiBib21icyAqL1xuICAgIHByaXZhdGUgbGVmdEJvbWJDb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogdG8gZGlzcGxheSB0aGUgdGltZSBzaW5jZSB0aGUgc3RhcnQgb2YgdGhlIGdhbWUgKi9cbiAgICBwcml2YXRlIHRpbWVyQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIENvbnRhaW5lciBmb3IgY3VycmVudCB0aW1lIG9mIHRoZSBnYW1lIGluIHdpbiBjb250YWluZXIgKi9cbiAgICBwcml2YXRlIGN1cnJlbnRUaW1lQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIENvbnRhaW5lciBmb3IgYmVzdCB0aW1lIG9mIHRoZSBnYW1lIGluIHdpbiBjb250YWluZXIgKi9cbiAgICBwcml2YXRlIGJlc3RUaW1lQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIFN0cnVjdHVyZSBvZiB0aGUgZmllbGQgb2YgdGhlIHNlbGVjdGVkIGxldmVsIG9mIGRpZmZpY3VsdHkgKi9cbiAgICBwcml2YXRlIHN5c3RlbTogTWFwU3RydWN0dXJlO1xuXG4gICAgLyoqIENlbGwgc2l6ZSBpbiBwaXhlbHMgKi9cbiAgICBwcml2YXRlIGNlbGxQaXhlbHNTaXplOiBQaXhlbHNBbW91bnQ7XG5cbiAgICAvKiogVGltZXIgZm9yIGNvdW50aW5nIHRpbWUgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHByaXZhdGUgdGltZXJJbnRlcnZhbDogYW55OyAvLyB0b2RvOiBmaXggdHlwZVxuXG4gICAgLyoqIE51bWJlciBvZiBjb3JyZWN0bHkgYWxsb2NhdGVkIGJvbWJzICovXG4gICAgcHJpdmF0ZSBjb3VudENvcnJlY3RseVNlbGVjdGVkQm9tYnMgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNldHRpbmdzIC0gYmFzaWMgZ2FtZSBzZXR0aW5nc1xuICAgICAqIEBwYXJhbSBjb250ZXh0UHJvdmlkZXIgLSBwcm92aWRlcyB0aGUgY29udGV4dCBvZiB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIGRyYXdlciAtIGZvciBwYWludGluZyBvbiBjYW52YXNcbiAgICAgKiBAcGFyYW0gZWxlbWVudFNvdXJjZSAtIGFsbG93cyBpbnRlcmFjdCB3aXRoIHRoZSBET00gdHJlZVxuICAgICAqIEBwYXJhbSBidWlsZGVyIC0gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGxldmVsc1xuICAgICAqIEBwYXJhbSBnZW5lcmF0b3IgLSBtYXRoIG51bWJlciBnZW5lcmF0b3JcbiAgICAgKiBAcGFyYW0gc3RvcmFnZSAtIGxvbmctdGVybSBzdG9yYWdlIG9mIGdhbWUgZGF0YVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNldHRpbmdzOiBHYW1lU2V0dGluZ3MsXG4gICAgICAgIHByaXZhdGUgY29udGV4dFByb3ZpZGVyOiBEcmF3aW5nQ29udGV4dFByb3ZpZGVyLFxuICAgICAgICBwcml2YXRlIGRyYXdlcjogRHJhd2VyLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRTb3VyY2U6IEVsZW1lbnRTb3VyY2UsXG4gICAgICAgIHByaXZhdGUgYnVpbGRlcjogU3lzdGVtQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0b3I6IE1hdGhHZW5lcmF0b3IsXG4gICAgICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVByb3ZpZGVyLFxuICAgICkge1xuICAgICAgdGhpcy5zZWxlY3QgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdzZWxlY3QtbGV2ZWwnKTtcbiAgICAgIHRoaXMuc3RhcnRHYW1lQnV0dG9uID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdzdGFydC1nYW1lJyk7XG4gICAgICB0aGlzLmxldmVsVGltZSA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnbGV2ZWwtdGltZScpO1xuICAgICAgdGhpcy5iZXN0TGV2ZWxUaW1lID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdiZXN0LWxldmVsLXRpbWUnKTtcbiAgICAgIHRoaXMuY2FudmFzID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIHRoaXMuZ2FtZUNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnZ2FtZS1jb250YWluZXInKTtcbiAgICAgIHRoaXMucmVzdWx0Q29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCdyZXN1bHQtY29udGFpbmVyJyk7XG4gICAgICB0aGlzLndpbkNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnd2luLWNvbnRhaW5lcicpO1xuICAgICAgdGhpcy5sZWZ0Qm9tYkNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnbGVmdC1ib21iJyk7XG4gICAgICB0aGlzLnRpbWVyQ29udGFpbmVyID0gZWxlbWVudFNvdXJjZS5nZXRFbGVtZW50KCd0aW1lcicpO1xuICAgICAgdGhpcy5jdXJyZW50VGltZUNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnY3VycmVudC10aW1lLWNvbnRhaW5lcicpO1xuICAgICAgdGhpcy5iZXN0VGltZUNvbnRhaW5lciA9IGVsZW1lbnRTb3VyY2UuZ2V0RWxlbWVudCgnYmVzdC10aW1lLWNvbnRhaW5lcicpO1xuICAgIH1cblxuICAgIC8qKiBJbml0aWFsaXplcyBnYW1lIGVuZ2luZSBhZnRlciB0aGUgRE9NIGhhcyBsb2FkZWQgKi9cbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuZWxlbWVudFNvdXJjZS5hZnRlckxvYWQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZExldmVsID0gdGhpcy5zdG9yYWdlLmdldCgnbGV2ZWwnKSB8fCAnZWFzeSc7XG5cbiAgICAgICAgLyoqIGlmIHdlIGhhdmUgcHJldmlvdXNseSBzZWxlY3RlZCB0aGUgbGV2ZWwsIHRoZW4gc2V0IGl0IGFnYWluICovXG4gICAgICAgIHRoaXMuY2hhbmdlTGV2ZWxJblNldHRpbmdzKHNlbGVjdGVkTGV2ZWwpO1xuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuc2V0dGluZ3MubGV2ZWxzKSB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uID0gPEhUTUxPcHRpb25FbGVtZW50PiB0aGlzLmVsZW1lbnRTb3VyY2UuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cbiAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBrZXk7XG4gICAgICAgICAgb3B0aW9uLnZhbHVlID0ga2V5O1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0aGlzLnNldHRpbmdzLmxldmVsc1trZXldLnNlbGVjdGVkO1xuXG4gICAgICAgICAgLyoqIHN1YnN0aXR1dGUgdGhlIHNlbGVjdGlvbiBvcHRpb25zIGludG8gdGhlIHNlbGVjdCBmcm9tIHRoZSBzZXR0aW5ncyAqL1xuICAgICAgICAgIHRoaXMuc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUxldmVsLmJpbmQodGhpcyksIGZhbHNlKTtcblxuICAgICAgICB0aGlzLnN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3RhcnQuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEdlbmVyYXRlIGxldmVsIGFuZCBzdGFydCB0aGUgZ2FtZSAqL1xuICAgIHByaXZhdGUgc3RhcnQoKTogdm9pZCB7XG4gICAgICB0aGlzLnN5c3RlbSA9IHRoaXMuYnVpbGRlci5idWlsZCh0aGlzLnNldHRpbmdzKTtcbiAgICAgIHRoaXMuY2VsbFBpeGVsc1NpemUgPSB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbDtcblxuICAgICAgLy8gZGlzcGxheSBib21icyBsZWZ0IGFuZCB0aW1lciBhYm92ZSB0aGUgZmllbGRcbiAgICAgIHRoaXMubGVmdEJvbWJDb250YWluZXIudGV4dENvbnRlbnQgPSB0aGlzLnN5c3RlbS5ib21iTGVmdC50b1N0cmluZygpO1xuICAgICAgdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudCA9ICcwJztcblxuICAgICAgdGhpcy5jaGFuZ2VWaXNpYmlsaXR5RWxlbWVudHMoKTtcbiAgICAgIHRoaXMubWFrZUluaXRpYWxGaWxsKCk7XG4gICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcblxuICAgICAgdGhpcy5jb250ZXh0UHJvdmlkZXIubGlzdGVuQ2FudmFzQ2xpY2sodGhpcy5jaGVja0NsaWNrLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5jb250ZXh0UHJvdmlkZXIubGlzdGVuQ2FudmFzQ29udGV4dE1lbnUodGhpcy5jaGVja1JpZ2h0QnV0dG9uQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqIFN0YXJ0IHRpbWVyIGZvciBjb3VudGluZyB0aGUgbGV2ZWwgdGltZSAoaW4gc2Vjb25kcykgKi9cbiAgICBwcml2YXRlIHN0YXJ0VGltZXIoKTogdm9pZCB7XG4gICAgICBsZXQgc2Vjb25kcyA9IDA7XG5cbiAgICAgIC8vIGRpc3BsYXkgdGhlIGN1cnJlbnQgdGltZSBhYm92ZSB0aGUgZmllbGRcbiAgICAgIHRoaXMudGltZXJDb250YWluZXIudGV4dENvbnRlbnQgPSBTdHJpbmcoc2Vjb25kcysrKTtcblxuICAgICAgLy8gdXBkYXRlIHRoZSB0aW1lciBvbmNlIHBlciBzZWNvbmRcbiAgICAgIHRoaXMudGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudCA9IFN0cmluZyhzZWNvbmRzKyspO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcCB0aW1lciBhbmQgc2F2ZSB0aGUgbGV2ZWwgdGltZSBjb3VudFxuICAgICAqXG4gICAgICogQHBhcmFtIGlzV2luIC0gdHJ1ZSwgaWYgdGhlIGdhbWUgZW5kcyB3aXRoIGEgd2luXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdG9wVGltZXIoaXNXaW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lckludGVydmFsKTtcblxuICAgICAgaWYgKGlzV2luKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgY3VycmVudExldmVsID0gdGhpcy5zdG9yYWdlLmdldCgnbGV2ZWwnKTtcbiAgICAgICAgY29uc3QgYmVzdFRpbWVTdG9yYWdlTmFtZSA9IGBiZXN0LXRpbWUtJHtjdXJyZW50TGV2ZWx9YDtcbiAgICAgICAgY29uc3QgYmVzdFRpbWUgPSB0aGlzLnN0b3JhZ2UuZ2V0KGJlc3RUaW1lU3RvcmFnZU5hbWUpO1xuICAgICAgICBsZXQgdGltZSA9ICcnO1xuXG4gICAgICAgIC8vIGRpc3BsYXkgY3VycmVudCB0aW1lIG9uIHRoZSBmaW5pc2ggc2NyZWVuXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWVDb250YWluZXIudGV4dENvbnRlbnQgPSBjdXJyZW50VGltZTtcblxuICAgICAgICBpZiAoYmVzdFRpbWUgJiYgTnVtYmVyKGJlc3RUaW1lKSA8IE51bWJlcihjdXJyZW50VGltZSkpIHtcbiAgICAgICAgICB0aW1lID0gYmVzdFRpbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdG9yYWdlLnNhdmUoe1xuICAgICAgICAgIG5hbWU6IGJlc3RUaW1lU3RvcmFnZU5hbWUsXG4gICAgICAgICAgdmFsdWU6IHRpbWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRpc3BsYXkgYmVzdCB0aW1lIG9uIHRoZSBmaW5pc2ggc2NyZWVuXG4gICAgICAgIHRoaXMuYmVzdFRpbWVDb250YWluZXIudGV4dENvbnRlbnQgPSB0aW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoYW5nZXMgdGhlIGxldmVsIGFmdGVyIGNoYW5naW5nIHRoZSB2YWx1ZSBpbiB0aGUgc2VsZWN0XG4gICAgICpcbiAgICAgKiAgQHBhcmFtIGV2ZW50IC0gRE9NIGV2ZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VMZXZlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMuY2hhbmdlTGV2ZWxJblNldHRpbmdzKGV2ZW50LnRhcmdldC52YWx1ZSk7XG5cbiAgICAgIHRoaXMuc3RvcmFnZS5zYXZlKHtcbiAgICAgICAgbmFtZTogJ2xldmVsJyxcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlcyB0aGUgbGV2ZWwgb2YgdGhlIGdhbWUgaW4gdGhlIHNldHRpbmdzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2VsZWN0ZWRMZXZlbCAtIG5hbWEgb2Ygc2VsZWN0ZWQgbGV2ZWxcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoYW5nZUxldmVsSW5TZXR0aW5ncyhzZWxlY3RlZExldmVsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIGNvbnN0IGJlc3RUaW1lID0gdGhpcy5zdG9yYWdlLmdldChgYmVzdC10aW1lLSR7c2VsZWN0ZWRMZXZlbH1gKTtcblxuICAgICAgLy8gaWYgdGhlIGxldmVsIHdhcyBwYXNzZWQgZWFybGllciwgdGhlbiBkaXNwbGF5IGl0cyBiZXN0IHRpbWUgb24gdGhlIHN0YXJ0IHNjcmVlblxuICAgICAgaWYgKGJlc3RUaW1lKSB7XG4gICAgICAgIHRoaXMubGV2ZWxUaW1lLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLmJlc3RMZXZlbFRpbWUudGV4dENvbnRlbnQgPSBiZXN0VGltZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGV2ZWxUaW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuc2V0dGluZ3MubGV2ZWxzKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5sZXZlbHNba2V5XS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLnNldHRpbmdzLmxldmVsc1tzZWxlY3RlZExldmVsXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqIENoYW5nZXMgdmlzaWJpbGl0eSBvZiBnYW1lIGVsZW1lbnRzIG9uIHRoZSBwYWdlIGFmdGVyIHN0YXJ0IG9mIHRoZSBnYW1lICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VWaXNpYmlsaXR5RWxlbWVudHMoKTogdm9pZCB7XG4gICAgICB0aGlzLnN0YXJ0R2FtZUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5zZWxlY3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMubGV2ZWxUaW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLmdhbWVDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIC8qKiBGaWxscyB0aGUgZW50aXJlIGNhbnZhcyBieSBkZWZhdWx0IHdpdGggdGhlIGRlZmF1bHQgY29sb3IgKi9cbiAgICBwcml2YXRlIG1ha2VJbml0aWFsRmlsbCgpOiB2b2lkIHtcbiAgICAgIGNvbnN0IHNpemU6IFBpeGVsc0Ftb3VudCA9IHRoaXMuc2V0dGluZ3MuY2FudmFzU2l6ZTtcblxuICAgICAgdGhpcy5kcmF3ZXIuZHJhd1NxdWFyZSh7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICB9LCBzaXplLCBJTklUSUFMX0ZJRUxEX0JHX0NPTE9SKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFjayB0aGUgY2xpY2sgb24gdGhlIGNhbnZhc1xuICAgICAqXG4gICAgICogQHBhcmFtIG1vdXNlRXZlbnQgLSBldmVudHMgdGhhdCBvY2N1ciBkdWUgdG8gdGhlIHVzZXIgaW50ZXJhY3Rpbmcgd2l0aCBhIG1vdXNlXG4gICAgICogQHBhcmFtIG1vdXNlRXZlbnQub2Zmc2V0WCAtIG9mZnNldCBvZiB0aGUgbW91c2UgY3Vyc29yIGFsb25nIHRoZSBYIGF4aXMgZnJvbSB0aGUgZWRnZSBvZiB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIG1vdXNlRXZlbnQub2Zmc2V0WSAtIG9mZnNldCBvZiB0aGUgbW91c2UgY3Vyc29yIGFsb25nIHRoZSBZIGF4aXMgZnJvbSB0aGUgZWRnZSBvZiB0aGUgY2FudmFzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGVja0NsaWNrKHsgb2Zmc2V0WCwgb2Zmc2V0WSB9OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsKG9mZnNldFgsIG9mZnNldFkpO1xuXG4gICAgICAvLyB0byBjbGljayBvbiB0aGUgY2VsbCB3aXRoIHRoZSBmbGFnIC0gZmlyc3QgeW91IG5lZWQgdG8gcmVtb3ZlIGl0XG4gICAgICBpZiAoIWNlbGwuaGFzRmxhZykge1xuICAgICAgICBpZiAoY2VsbC5oYXNCb21iKSB7XG4gICAgICAgICAgdGhpcy5vcGVuQm9tYkNlbGwoY2VsbCk7IC8vIGRyYXcgYSBib21iIGluIHRoZSBzcGVjaWZpZWQgY2VsbFxuICAgICAgICAgIHRoaXMub3BlbkFsbEJvbWJzKCk7IC8vIGRyYXcgYWxsIHRoZSBvdGhlciBib21ic1xuICAgICAgICAgIHRoaXMuc3RvcEdhbWUoKTsgLy8gc3RvcCB0aGUgZ2FtZVxuICAgICAgICB9IGVsc2UgaWYgKGNlbGwudmFsdWUgIT09IDApIHtcbiAgICAgICAgICB0aGlzLm9wZW5OdW1iZXJTcXVhcmUoY2VsbCk7IC8vIGRyYXcgYSBjZWxsIHdpdGggYSBudW1iZXJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9wZW5FbXB0eVNxdWFyZShjZWxsKTsgLy8gZHJhdyBhbiBlbXB0eSBjZWxsXG4gICAgICAgICAgdGhpcy5yZWN1cnNpdmVPcGVuQXJlYShjZWxsKTsgLy8gZ28gdGhyb3VnaCB0aGUgbmVpZ2hib3JzIGFuZCBkcmF3IHRoZSBjZWxscyB1bnRpbCB0aGUgbnVtYmVyIGFwcGVhcnMgaW4gdGhlIGNlbGxcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hlY2tJZkdhbWVTaG91bGRTdG9wcGVkKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhY2sgdGhlIHJpZ2h0IG1vdXNlIGJ1dHRvbiBjbGljayBvbiB0aGUgY2FudmFzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbW91c2VFdmVudCAtIGV2ZW50cyB0aGF0IG9jY3VyIGR1ZSB0byB0aGUgdXNlciBpbnRlcmFjdGluZyB3aXRoIGEgbW91c2VcbiAgICAgKi9cbiAgICBwcml2YXRlIGNoZWNrUmlnaHRCdXR0b25DbGljayhtb3VzZUV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAvLyBwcmV2ZW50IHRoZSBjb250ZXh0IG1lbnUgZnJvbSBvcGVuaW5nXG4gICAgICBtb3VzZUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGwobW91c2VFdmVudC5vZmZzZXRYLCBtb3VzZUV2ZW50Lm9mZnNldFkpO1xuXG4gICAgICBpZiAoIWNlbGwuaXNPcGVuKSB7XG4gICAgICAgIGlmICghY2VsbC5oYXNGbGFnKSB7XG4gICAgICAgICAgdGhpcy5zZXRGbGFnKGNlbGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVtb3ZlRmxhZyhjZWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNlbGwgb2YgdGhlIGdlbmVyYXRlZCBsZXZlbFxuICAgICAqXG4gICAgICogQHBhcmFtIG9mZnNldFggLSBvZmZzZXQgb2YgdGhlIG1vdXNlIGN1cnNvciBhbG9uZyB0aGUgWCBheGlzIGZyb20gdGhlIGVkZ2Ugb2YgdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gb2Zmc2V0IG9mIHRoZSBtb3VzZSBjdXJzb3IgYWxvbmcgdGhlIFkgYXhpcyBmcm9tIHRoZSBlZGdlIG9mIHRoZSBjYW52YXNcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldENlbGwob2Zmc2V0WDogbnVtYmVyLCBvZmZzZXRZOiBudW1iZXIpOiBDZWxsIHtcbiAgICAgIGNvbnN0IHggPSB0aGlzLmdlbmVyYXRvci5nZXRGbG9vck51bWJlcihvZmZzZXRYIC8gdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwpO1xuICAgICAgY29uc3QgeSA9IHRoaXMuZ2VuZXJhdG9yLmdldEZsb29yTnVtYmVyKG9mZnNldFkgLyB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbCk7XG5cbiAgICAgIHJldHVybiB0aGlzLnN5c3RlbS5jZWxsc1t5XVt4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIGFyZWEgb2YgY2VsbHMgYXJvdW5kIGEgZ2l2ZW4gY2VsbFxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlY3Vyc2l2ZU9wZW5BcmVhKGNlbGw6IENlbGwpOiB2b2lkIHtcbiAgICAgIGZvciAoY29uc3QgaW5kZXggaW4gY2VsbC5hcmVhKSB7XG4gICAgICAgIGNvbnN0IHN5c3RlbUNlbGwgPSB0aGlzLnN5c3RlbS5jZWxsc1tjZWxsLmFyZWFbaW5kZXhdLnldW2NlbGwuYXJlYVtpbmRleF0ueF07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNraXAgZnJvbSBwcm9jZXNzaW5nOlxuICAgICAgICAgKiAgLSBvcGVuIGNlbGxcbiAgICAgICAgICogIC0gZmxhZyBjZWxsXG4gICAgICAgICAqICAtIGJvbWIgY2VsbFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFzeXN0ZW1DZWxsLmlzT3BlbiAmJiAhc3lzdGVtQ2VsbC5oYXNGbGFnICYmICFzeXN0ZW1DZWxsLmhhc0JvbWIpIHtcbiAgICAgICAgICBpZiAoc3lzdGVtQ2VsbC52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuRW1wdHlTcXVhcmUoc3lzdGVtQ2VsbCk7XG5cbiAgICAgICAgICAgIHRoaXMucmVjdXJzaXZlT3BlbkFyZWEoc3lzdGVtQ2VsbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3Blbk51bWJlclNxdWFyZShzeXN0ZW1DZWxsKTtcblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBlbXB0eSBjZWxsXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgICAqL1xuICAgIHByaXZhdGUgb3BlbkVtcHR5U3F1YXJlKGNlbGw6IENlbGwpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd2VyLmRyYXdTcXVhcmUoe1xuICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbENvb3JkKGNlbGwueCksXG4gICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC55KSxcbiAgICAgIH0sIHRoaXMuY2VsbFBpeGVsc1NpemUsIE1BSU5fQkdfQ09MT1IpO1xuXG4gICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLnN5c3RlbS51c2VkQ2VsbHMrKztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIGNlbGwgd2l0aCBudW1iZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gZ2FtZSBib2FyZCBjZWxsXG4gICAgICovXG4gICAgcHJpdmF0ZSBvcGVuTnVtYmVyU3F1YXJlKGNlbGw6IENlbGwpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd2VyLmRyYXdOdW1iZXIoe1xuICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbENvb3JkKGNlbGwueCksXG4gICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC55KSxcbiAgICAgIH0sIHRoaXMuY2VsbFBpeGVsc1NpemUsIGNlbGwudmFsdWUpO1xuXG4gICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLnN5c3RlbS51c2VkQ2VsbHMrKztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIGNlbGwgd2l0aCBib21iXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgICAqL1xuICAgIHByaXZhdGUgb3BlbkJvbWJDZWxsKGNlbGw6IENlbGwpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd2VyLmRyYXdCb21iKHtcbiAgICAgICAgeDogdGhpcy5jYWxjUGl4ZWxDb29yZChjZWxsLngpLFxuICAgICAgICB5OiB0aGlzLmNhbGNQaXhlbENvb3JkKGNlbGwueSksXG4gICAgICB9LCB0aGlzLmNlbGxQaXhlbHNTaXplKTtcblxuICAgICAgY2VsbC5pc09wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5zeXN0ZW0udXNlZENlbGxzKys7XG4gICAgfVxuXG4gICAgLyoqIE9wZW4gYWxsIGJvbWJzIG9uIHRoZSBmaWVsZCAqL1xuICAgIHByaXZhdGUgb3BlbkFsbEJvbWJzKCk6IHZvaWQge1xuICAgICAgY29uc3QgeyBib21iUG9zaXRpb25zLCBjZWxscywgZmllbGRTaXplIH0gPSB0aGlzLnN5c3RlbTtcblxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBPYmplY3Qua2V5cyhjZWxscykubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBPYmplY3Qua2V5cyhjZWxsc1t5XSkubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICBpZiAoYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyh4ICsgeSAqIGZpZWxkU2l6ZSkpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkJvbWJDZWxsKGNlbGxzW3ldW3hdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBmbGFnIGluIGEgY2VsbCBhbmQgY291bnQgdGhlIGNvcnJlY3RseSBzZWxlY3RlZCBib21ic1xuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldEZsYWcoY2VsbDogQ2VsbCk6IHZvaWQge1xuICAgICAgdGhpcy5kcmF3ZXIuZHJhd0ZsYWcoe1xuICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbENvb3JkKGNlbGwueCksXG4gICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC55KSxcbiAgICAgIH0sIHRoaXMuY2VsbFBpeGVsc1NpemUpO1xuXG4gICAgICBjZWxsLmhhc0ZsYWcgPSB0cnVlO1xuICAgICAgdGhpcy5zeXN0ZW0udXNlZENlbGxzKys7XG5cbiAgICAgIHRoaXMuc3lzdGVtLmJvbWJMZWZ0ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQgLSAxO1xuICAgICAgLy8gZGlzcGxheWluZyB0aGUgbnVtYmVyIG9mIHJlbWFpbmluZyBib21icyBvdmVyIHRoZSBmaWVsZFxuICAgICAgdGhpcy5sZWZ0Qm9tYkNvbnRhaW5lci50ZXh0Q29udGVudCA9IHRoaXMuc3lzdGVtLmJvbWJMZWZ0LnRvU3RyaW5nKCk7XG5cbiAgICAgIGlmIChjZWxsLmhhc0JvbWIpIHtcbiAgICAgICAgdGhpcy5jb3VudENvcnJlY3RseVNlbGVjdGVkQm9tYnMrKztcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja0lmR2FtZVNob3VsZFN0b3BwZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZmxhZyBmcm9tIGNlbGxcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gZ2FtZSBib2FyZCBjZWxsXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmVGbGFnKGNlbGw6IENlbGwpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd2VyLmRyYXdTcXVhcmUoe1xuICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbENvb3JkKGNlbGwueCksXG4gICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC55KSxcbiAgICAgIH0sIHRoaXMuY2VsbFBpeGVsc1NpemUsIElOSVRJQUxfRklFTERfQkdfQ09MT1IsIGZhbHNlKTtcblxuICAgICAgY2VsbC5oYXNGbGFnID0gZmFsc2U7XG4gICAgICB0aGlzLnN5c3RlbS51c2VkQ2VsbHMtLTtcblxuICAgICAgdGhpcy5zeXN0ZW0uYm9tYkxlZnQgPSB0aGlzLnN5c3RlbS5ib21iTGVmdCArIDE7XG4gICAgICAvLyBkaXNwbGF5aW5nIHRoZSBudW1iZXIgb2YgcmVtYWluaW5nIGJvbWJzIG92ZXIgdGhlIGZpZWxkXG4gICAgICB0aGlzLmxlZnRCb21iQ29udGFpbmVyLnRleHRDb250ZW50ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQudG9TdHJpbmcoKTtcblxuICAgICAgaWYgKGNlbGwuaGFzQm9tYikge1xuICAgICAgICB0aGlzLmNvdW50Q29ycmVjdGx5U2VsZWN0ZWRCb21icy0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgaW5pdGlhbCBjb29yZGluYXRlcyBvZiB0aGUgY2VsbCBpbiBwaXhlbHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb29yZCAtIGNvb3JkaW5hdGUgb24gdGhlIHBsYXlpbmcgZmllbGRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNQaXhlbENvb3JkKGNvb3JkOiBGaWVsZENvb3JkaW5hdGUpOiBQaXhlbHNBbW91bnQge1xuICAgICAgcmV0dXJuIE51bWJlcihjb29yZCkgKiB0aGlzLmNlbGxQaXhlbHNTaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3AgZ2FtZVxuICAgICAqXG4gICAgICogQHBhcmFtIGlzV2luIC0gdHJ1ZSwgaWYgdGhlIGdhbWUgZW5kcyB3aXRoIGEgd2luXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdG9wR2FtZShpc1dpbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICB0aGlzLnN0b3BUaW1lcihpc1dpbik7XG5cbiAgICAgIC8vIHNob3cgdGhlIHJlc3RhcnQgYnV0dG9uXG4gICAgICB0aGlzLnJlc3VsdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXG4gICAgICBpZiAoaXNXaW4pIHtcbiAgICAgICAgLy8gaWYgeW91IHdvbiwgc2hvdyBjb25ncmF0dWxhdGlvbnNcbiAgICAgICAgdGhpcy53aW5Db250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyBpcyB0byBhbmltYXRlIHRoZSBiYWNrZ3JvdW5kIGFwcGVhcmFuY2VcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc3VsdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdyZXN1bHQtY29udGFpbmVyLS1pcy12aXNpYmxlJyk7XG4gICAgICB9LCA1MCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNvbmRpdGlvbnMgZm9yIHN0b3BwaW5nIHRoZSBnYW1lXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGVja0lmR2FtZVNob3VsZFN0b3BwZWQoKTogdm9pZCB7XG4gICAgICAvLyBoYXMgemVybyBib21iXG4gICAgICBpZiAoISh0aGlzLnN5c3RlbS5ib21iTGVmdCA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhbGwgYm9tYnMgYXJlIGNvcnJlY3RseSBzZWxlY3RlZFxuICAgICAgaWYgKCEodGhpcy5zeXN0ZW0uYm9tYkNvdW50ID09PSB0aGlzLmNvdW50Q29ycmVjdGx5U2VsZWN0ZWRCb21icykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhbGwgY2VsbHMgYXJlIG9wZW5lZFxuICAgICAgaWYgKCEodGhpcy5zeXN0ZW0udXNlZENlbGxzID09PSAodGhpcy5zeXN0ZW0uZmllbGRTaXplICogdGhpcy5zeXN0ZW0uZmllbGRTaXplKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBzdG9wIHRoZSBnYW1lIHdpdGggYSB3aW4gaWYgYWxsIHRoZSBib21icyBoYXZlIHJ1biBvdXQgYW5kIGFyZSBtYXJrZWQgd2l0aCBmbGFncyBjb3JyZWN0bHlcbiAgICAgIHRoaXMuc3RvcEdhbWUodHJ1ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY29udGFpbmVyIH0gZnJvbSAnLi4vY29tcG9zaXRpb24nO1xuaW1wb3J0IHsgTWF0aEdlbmVyYXRvciB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgR2VuZXJhdG9yIH0gZnJvbSAnLi9pbmRleCc7XG5cbmNvbnRhaW5lci5yZWdpc3RlclNpbmdsZXRvbjxNYXRoR2VuZXJhdG9yLCBHZW5lcmF0b3I+KCk7IiwiaW1wb3J0IHsgTWF0aEdlbmVyYXRvciB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogTWF0aCBudW1iZXIgZ2VuZXJhdG9yICovXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yIGltcGxlbWVudHMgTWF0aEdlbmVyYXRvciB7XG4gIC8qKlxuICAgKiBAcGFyYW0gbWF0aCAtIHJldHVybnMgTWF0aCBvYmplY3RcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBtYXRoOiBNYXRoLFxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBpbiBhIHNwZWNpZmllZCByYW5nZVxuICAgKlxuICAgKiBAcGFyYW0gbWluIC0gbWluaW11bSBudW1iZXIgZnJvbSB0aGUgaW50ZXJ2YWxcbiAgICogQHBhcmFtIG1heCAtIG1heGltdW0gbnVtYmVyIGZyb20gdGhlIGludGVydmFsXG4gICAqL1xuICBwdWJsaWMgZ2V0UmFuZG9tQXJiaXRyYXJ5KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Rmxvb3JOdW1iZXIodGhpcy5tYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdW5kcyBhIG51bWJlciB0byBhbiBpbnRlZ2VyXG4gICAqXG4gICAqIEBwYXJhbSBuIC0gb3JpZ2luYWwgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgZ2V0Rmxvb3JOdW1iZXIobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tYXRoLmZsb29yKG4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjb250YWluZXIgfSBmcm9tICcuLi9jb21wb3NpdGlvbic7XG5pbXBvcnQgeyBHYW1lU2V0dGluZ3MgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi9pbmRleCc7XG5cbmNvbnRhaW5lci5yZWdpc3RlclNpbmdsZXRvbjxHYW1lU2V0dGluZ3M+KCgpID0+IHNldHRpbmdzKTtcbiIsImltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgbGV2ZWxzIH0gZnJvbSAnLi9sZXZlbHMnO1xuXG4vKiogQmFzaWMgZ2FtZSBzZXR0aW5ncyAqL1xuZXhwb3J0IGNvbnN0IHNldHRpbmdzOiBHYW1lU2V0dGluZ3MgPSB7XG4gIC8qKiBTaXplIG9mIHRoZSBmaWVsZCBpbiBwaXhlbHMgKi9cbiAgY2FudmFzU2l6ZTogODAwLFxuXG4gIC8qKiBUaGUgcmF0aW8gb2YgdGhlIGRpc3BsYXkgcmVzb2x1dGlvbiBvZiB0aGUgY3VycmVudCBkZXZpY2UgaW4gcGh5c2ljYWwgcGl4ZWxzIHRvIHRoZSByZXNvbHV0aW9uIGluIGxvZ2ljYWwgKENTUykgcGl4ZWxzICovXG4gIGRldmljZVBpeGVsUmF0aW86IDEsXG5cbiAgLyoqIExpc3Qgb2YgZ2FtZSBkaWZmaWN1bHR5IGxldmVscyAqL1xuICBsZXZlbHMsXG59O1xuIiwiaW1wb3J0IHsgQ29tcGxleGl0eUxpc3QgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIExpc3Qgb2YgZ2FtZSBkaWZmaWN1bHR5IGxldmVscyAqL1xuZXhwb3J0IGNvbnN0IGxldmVsczogQ29tcGxleGl0eUxpc3QgPSB7XG4gIGJlZ2lubmVyOiB7XG4gICAgYm9tYkNvdW50OiAxMCxcbiAgICBmaWVsZFNpemU6IDIwLFxuICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgfSxcbiAgZWFzeToge1xuICAgIGJvbWJDb3VudDogMTUsXG4gICAgZmllbGRTaXplOiAxMCxcbiAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgfSxcbiAgbWVkaXVtOiB7XG4gICAgYm9tYkNvdW50OiA0MCxcbiAgICBmaWVsZFNpemU6IDIwLFxuICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgfSxcbiAgaGFyZDoge1xuICAgIGJvbWJDb3VudDogMTAwLFxuICAgIGZpZWxkU2l6ZTogMjAsXG4gICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICB9LFxuICBodWdlOiB7XG4gICAgYm9tYkNvdW50OiAyMjAsXG4gICAgZmllbGRTaXplOiAzMixcbiAgICBzZWxlY3RlZDogZmFsc2UsXG4gIH0sXG4gIGV4dHJlbWU6IHtcbiAgICBib21iQ291bnQ6IDE1MCxcbiAgICBmaWVsZFNpemU6IDIwLFxuICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBjb250YWluZXIgfSBmcm9tICcuLi9jb21wb3NpdGlvbic7XG5pbXBvcnQgeyBTb3VyY2VQcm92aWRlciB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgRmlsZVNvdXJjZSB9IGZyb20gJy4vaW5kZXgnO1xuXG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248U291cmNlUHJvdmlkZXIsIEZpbGVTb3VyY2U+KCk7IiwiaW1wb3J0IHsgU291cmNlUHJvdmlkZXIgfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0ICcuLi9pbWcvYm9tYi5wbmcnO1xuaW1wb3J0ICcuLi9pbWcvZmxhZy5wbmcnO1xuXG4vKiogVG8gaW50ZXJhY3Qgd2l0aCB0aGUgZmlsZSBzeXN0ZW0gKi9cbmV4cG9ydCBjbGFzcyBGaWxlU291cmNlIGltcGxlbWVudHMgU291cmNlUHJvdmlkZXIge1xuICAvKipcbiAgICogQHBhcmFtIEltYWdlUHJvdmlkZXIgLSByZXR1cm5zIGltYWdlIG9iamVjdFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBJbWFnZVByb3ZpZGVyOiB0eXBlb2YgSW1hZ2UsXG4gICkge31cblxuICAvKipcbiAgICogUmV0dXJucyBpbWFnZSBmaWxlXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIC0gaW1hZ2UgZmlsZSBuYW1lXG4gICAqL1xuICBwdWJsaWMgZ2V0SW1hZ2UobmFtZTogc3RyaW5nKTogQ2FudmFzSW1hZ2VTb3VyY2Uge1xuICAgIGNvbnN0IGltZyA9IG5ldyB0aGlzLkltYWdlUHJvdmlkZXIoKTtcblxuICAgIGltZy5zcmMgPSBgaW1nLyR7bmFtZX0ucG5nYDtcblxuICAgIHJldHVybiBpbWc7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gJy4uL2NvbXBvc2l0aW9uJztcbmltcG9ydCB7IFN0b3JhZ2VQcm92aWRlciB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgRGF0YVN0b3JhZ2UgfSBmcm9tICcuL2luZGV4JztcblxuY29udGFpbmVyLnJlZ2lzdGVyU2luZ2xldG9uPFN0b3JhZ2VQcm92aWRlciwgRGF0YVN0b3JhZ2U+KCk7IiwiaW1wb3J0IHsgU3RvcmFnZVByb3ZpZGVyLCBTdG9yYWdlSXRlbSwgU3RvcmFnZU5hbWUsIFN0b3JhZ2VWYWx1ZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogTG9uZy10ZXJtIHN0b3JhZ2Ugb2YgZ2FtZSBkYXRhICovXG5leHBvcnQgY2xhc3MgRGF0YVN0b3JhZ2UgaW1wbGVtZW50cyBTdG9yYWdlUHJvdmlkZXIge1xuICAvKipcbiAgICogQHBhcmFtIHN0b3JhZ2UgLSBXZWIgU3RvcmFnZSBBUEkgaW50ZXJmYWNlIHByb3ZpZGVzIGFjY2VzcyB0byBhIHBhcnRpY3VsYXIgZG9tYWluJ3Mgc2Vzc2lvbiBvciBsb2NhbCBzdG9yYWdlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2UsXG4gICkge31cblxuICAvKipcbiAgICogU2F2ZXMgYW4gaXRlbSB0byBzdG9yYWdlXG4gICAqXG4gICAqIEBwYXJhbSBzdG9yYWdlSXRlbSAtIHN0b3JlZCBpdGVtXG4gICAqIEBwYXJhbSBzdG9yYWdlSXRlbS5uYW1lIC0gbmFtZSBvZiBrZXkgaW4gdGhlIHN0b3JlXG4gICAqIEBwYXJhbSBzdG9yYWdlSXRlbS52YWx1ZSAtIHRoZSBrZXkgdmFsdWUgaW4gdGhlIHN0b3JlXG4gICAqL1xuICBwdWJsaWMgc2F2ZSh7IG5hbWUsIHZhbHVlIH06IFN0b3JhZ2VJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0obmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpdGVtIGZyb20gc3RvcmFnZVxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2Yga2V5IGluIHRoZSBzdG9yZVxuICAgKi9cbiAgcHVibGljIGdldChuYW1lOiBTdG9yYWdlTmFtZSk6IFN0b3JhZ2VWYWx1ZSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKG5hbWUpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgeyBjb250YWluZXIgfSBmcm9tICcuL2NvbXBvc2l0aW9uL2luZGV4JztcbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2dhbWUvdHlwZXMnO1xuXG5pbXBvcnQgJy4vaW5kZXguc2Nzcyc7XG5cbmNvbnN0IHNhcHBlciA9IGNvbnRhaW5lci5nZXQ8R2FtZT4oKTtcblxuc2FwcGVyLmluaXQoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=