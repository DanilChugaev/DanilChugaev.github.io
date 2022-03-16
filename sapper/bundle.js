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

/***/ "./node_modules/just-engine/src/context/index.ts":
/*!*******************************************************!*\
  !*** ./node_modules/just-engine/src/context/index.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContextClass": () => (/* binding */ ContextClass)
/* harmony export */ });
/** Provides the context of the canvas */
var ContextClass = /** @class */ (function () {
    /**
     * @param domInstance - allows interact with the DOM tree
     */
    function ContextClass(domInstance) {
        this.domInstance = domInstance;
        /** Size of the field in pixels */
        this.canvasSize = 0;
        /** The ratio of the display resolution of the current device in physical pixels to the resolution in logical (CSS) pixels */
        this.devicePixelRatio = 0;
        /** Game will be drawn on this canvas */
        this.canvas = null;
        /** Canvas 2d context */
        this.context = null;
        var canvas = this.domInstance.getElement('canvas');
        if (!canvas) {
            throw new Error('Failed to find a canvas.');
        }
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }
    /**
     * Init context instance
     *
     * @param canvasSize - size of the field in pixels
     * @param devicePixelRatio - the ratio of the display resolution
     */
    ContextClass.prototype.init = function (canvasSize, devicePixelRatio) {
        this.canvasSize = canvasSize;
        this.devicePixelRatio = devicePixelRatio;
        this.normalizeScale();
    };
    /** Returns canvas 2d context */
    ContextClass.prototype.getInstance = function () {
        return this.context;
    };
    /**
     * Listen to clicking on the canvas by left mouse button
     *
     * @param callback - a function that is called after clicking on the canvas by left mouse button
     */
    ContextClass.prototype.listenCanvasClick = function (callback) {
        this.canvas.addEventListener('click', callback);
    };
    /**
     * Listen to clicking on the canvas by right mouse button
     *
     * @param callback - a function that is called after clicking on the canvas by right mouse button
     */
    ContextClass.prototype.listenCanvasContextMenu = function (callback) {
        this.canvas.addEventListener('contextmenu', callback);
    };
    /** Normalize canvas styles and context scale */
    ContextClass.prototype.normalizeScale = function () {
        if (!this.canvas || !this.context) {
            return;
        }
        var ratio = this.devicePixelRatio || 1;
        var size = this.canvasSize;
        this.canvas.width = size * ratio;
        this.canvas.height = size * ratio;
        this.canvas.style.width = size + "px";
        this.canvas.style.height = size + "px";
        this.context.imageSmoothingEnabled = false;
        this.context.scale(ratio, ratio);
    };
    Object.defineProperty(ContextClass, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["DomInterface"]; },
        enumerable: false,
        configurable: true
    });
    return ContextClass;
}());



/***/ }),

/***/ "./node_modules/just-engine/src/dom/index.ts":
/*!***************************************************!*\
  !*** ./node_modules/just-engine/src/dom/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DomClass": () => (/* binding */ DomClass)
/* harmony export */ });
/** Class allows interact with the DOM tree */
var DomClass = /** @class */ (function () {
    /**
     * @param windowInstance - window containing a DOM document
     */
    function DomClass(windowInstance) {
        this.windowInstance = windowInstance;
    }
    /**
     * Create HTML element
     *
     * @param name - name of HTML element
     */
    DomClass.prototype.createElement = function (name) {
        return this.windowInstance.document.createElement(name);
    };
    /**
     * Returns HTML element by ID
     *
     * @param id - ID of HTML element
     */
    DomClass.prototype.getElement = function (id) {
        return this.windowInstance.document.getElementById(id);
    };
    /**
     * Calls a callback after loading the DOM tree
     *
     * @param callback - function that is called after loading the DOM tree
     */
    DomClass.prototype.afterLoad = function (callback) {
        this.windowInstance.document.addEventListener('DOMContentLoaded', function (event) {
            callback(event);
        });
    };
    Object.defineProperty(DomClass, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["Window"]; },
        enumerable: false,
        configurable: true
    });
    return DomClass;
}());



/***/ }),

/***/ "./node_modules/just-engine/src/math/index.ts":
/*!****************************************************!*\
  !*** ./node_modules/just-engine/src/math/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MathClass": () => (/* binding */ MathClass)
/* harmony export */ });
/** Math number generator */
var MathClass = /** @class */ (function () {
    /**
     * @param math - returns Math object
     */
    function MathClass(math) {
        this.math = math;
    }
    /**
     * Returns a random integer in a specified range
     *
     * @param min - minimum number from the interval
     * @param max - maximum number from the interval
     */
    MathClass.prototype.getRandomArbitrary = function (min, max) {
        return this.getFloorNumber(this.math.random() * (max - min)) + min;
    };
    /**
     * Rounds a number to an integer
     *
     * @param n - original number
     */
    MathClass.prototype.getFloorNumber = function (n) {
        return this.math.floor(n);
    };
    Object.defineProperty(MathClass, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["Math"]; },
        enumerable: false,
        configurable: true
    });
    return MathClass;
}());



/***/ }),

/***/ "./node_modules/just-engine/src/source/index.ts":
/*!******************************************************!*\
  !*** ./node_modules/just-engine/src/source/index.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SourceClass": () => (/* binding */ SourceClass)
/* harmony export */ });
/** To interact with the file system */
var SourceClass = /** @class */ (function () {
    /**
     * @param ImageProvider - returns image object
     */
    function SourceClass(ImageProvider) {
        this.ImageProvider = ImageProvider;
    }
    /**
     * Returns image file
     *
     * @param name - image file name
     */
    SourceClass.prototype.getImage = function (name) {
        var img = new this.ImageProvider();
        img.src = "img/" + name + ".png";
        return img;
    };
    Object.defineProperty(SourceClass, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["typeof Image"]; },
        enumerable: false,
        configurable: true
    });
    return SourceClass;
}());



/***/ }),

/***/ "./node_modules/just-engine/src/storage/index.ts":
/*!*******************************************************!*\
  !*** ./node_modules/just-engine/src/storage/index.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageClass": () => (/* binding */ StorageClass)
/* harmony export */ });
/** Long-term storage of game data */
var StorageClass = /** @class */ (function () {
    /**
     * @param storage - Web Storage API interface provides access to a particular domain's session or local storage
     */
    function StorageClass(storage) {
        this.storage = storage;
    }
    /**
     * Saves an item to storage
     *
     * @param storageItem - stored item
     * @param storageItem.name - name of key in the store
     * @param storageItem.value - the key value in the store
     */
    StorageClass.prototype.save = function (_a) {
        var name = _a.name, value = _a.value;
        this.storage.setItem(name, value);
    };
    /**
     * Get item from storage
     *
     * @param name - name of key in the store
     */
    StorageClass.prototype.get = function (name) {
        return this.storage.getItem(name);
    };
    Object.defineProperty(StorageClass, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["Storage"]; },
        enumerable: false,
        configurable: true
    });
    return StorageClass;
}());



/***/ }),

/***/ "./node_modules/just-engine/src/ui/index.ts":
/*!**************************************************!*\
  !*** ./node_modules/just-engine/src/ui/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIClass": () => (/* binding */ UIClass)
/* harmony export */ });
/** Class to control the UI in the game */
var UIClass = /** @class */ (function () {
    /**
     * @param windowInstance - window containing a DOM document
     * @param arrayInstance - main Array object
     */
    function UIClass(windowInstance, arrayInstance) {
        this.windowInstance = windowInstance;
        this.arrayInstance = arrayInstance;
        /** Color variables from custom properties */
        this.colors = {};
        /** Main font in the game */
        this.font = '';
        this.init();
    }
    Object.defineProperty(UIClass.prototype, "getCustomProperties", {
        /**
         * Returns custom properties from `:root` declaration
         */
        get: function () {
            return this.customProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIClass.prototype, "getColors", {
        /**
         * Returns color variables from custom properties
         */
        get: function () {
            return this.colors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIClass.prototype, "getFont", {
        /**
         * Get font family
         */
        get: function () {
            return this.font;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Set properties
     */
    UIClass.prototype.init = function () {
        this.rootStyles = this.windowInstance.getComputedStyle(this.windowInstance.document.documentElement);
        this.setCustomProperties();
        this.setColors();
        this.setFont();
    };
    /**
     * Set custom properties from :root
     */
    UIClass.prototype.setCustomProperties = function () {
        var _this = this;
        this.customProperties = {};
        var customPropertiesValues = this.arrayInstance.from(this.rootStyles).filter(function (style) { return style.indexOf('--') === 0; });
        customPropertiesValues.forEach(function (prop) {
            // --custom-properties -> CUSTOM_PROPERTIES
            _this.customProperties[prop.split('-')
                .filter(function (item) { return item.length !== 0; })
                .map(function (item) { return item.toUpperCase(); })
                .join('_')] = _this.rootStyles.getPropertyValue(prop);
        });
    };
    /**
     * Set colors from custom properties
     */
    UIClass.prototype.setColors = function () {
        for (var key in this.customProperties) {
            if (key.indexOf('COLOR') >= 0) {
                this.colors[key] = this.customProperties[key];
            }
        }
        // сделать только для режима разработки
        console.log(this.colors);
    };
    /**
     * Set font family from custom properties
     */
    UIClass.prototype.setFont = function () {
        if (this.customProperties['FONT_FAMILY']) {
            this.font = this.customProperties['FONT_FAMILY'];
        }
    };
    Object.defineProperty(UIClass, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["Window", "ArrayConstructor"]; },
        enumerable: false,
        configurable: true
    });
    return UIClass;
}());



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

/***/ "./src/builder/di-register.ts":
/*!************************************!*\
  !*** ./src/builder/di-register.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/builder/index.ts");
/* harmony import */ var _di_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../di/register */ "./src/di/register.ts");


_di_register__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "BuilderInterface", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.BuilderClass });


/***/ }),

/***/ "./src/builder/index.ts":
/*!******************************!*\
  !*** ./src/builder/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BuilderClass": () => (/* binding */ BuilderClass)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/builder/constants.ts");

/** Class responsible for creating levels based on levels settings */
var BuilderClass = /** @class */ (function () {
    /**
     * @param mathInstance - math number generator
     */
    function BuilderClass(mathInstance) {
        this.mathInstance = mathInstance;
    }
    /**
     * Build level
     *
     * @param settings - basic game settings
     */
    BuilderClass.prototype.build = function (settings) {
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
    BuilderClass.prototype.getSelectedLevel = function (levels) {
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
    BuilderClass.prototype.generateMapStructure = function () {
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
    BuilderClass.prototype.generateCellArea = function (_a) {
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
    BuilderClass.prototype.generateRandomBombPositions = function (cellsCount) {
        var bombPositions = [];
        for (var index = 0; index < this.bombCount; index++) {
            var randomPosition = this.mathInstance.getRandomArbitrary(1, cellsCount);
            // if the generated position is already in the list, we generate it again
            while (bombPositions.includes(randomPosition)) {
                randomPosition = this.mathInstance.getRandomArbitrary(1, cellsCount);
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
    BuilderClass.prototype.calcBombsAroundCells = function (area, bombPositions) {
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
    Object.defineProperty(BuilderClass, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["MathInterface"]; },
        enumerable: false,
        configurable: true
    });
    return BuilderClass;
}());



/***/ }),

/***/ "./src/di/core.ts":
/*!************************!*\
  !*** ./src/di/core.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "container": () => (/* binding */ container)
/* harmony export */ });
/* harmony import */ var _wessberg_di__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wessberg/di */ "./node_modules/@wessberg/di/dist/esm/index.js");

var container = new _wessberg_di__WEBPACK_IMPORTED_MODULE_0__.DIContainer();


/***/ }),

/***/ "./src/di/engine/context-register.ts":
/*!*******************************************!*\
  !*** ./src/di/engine/context-register.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var just_engine_src_context_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! just-engine/src/context/index */ "./node_modules/just-engine/src/context/index.ts");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../register */ "./src/di/register.ts");


_register__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "ContextInterface", implementation: just_engine_src_context_index__WEBPACK_IMPORTED_MODULE_0__.ContextClass });


/***/ }),

/***/ "./src/di/engine/dom-register.ts":
/*!***************************************!*\
  !*** ./src/di/engine/dom-register.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var just_engine_src_dom_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! just-engine/src/dom/index */ "./node_modules/just-engine/src/dom/index.ts");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../register */ "./src/di/register.ts");


_register__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "DomInterface", implementation: just_engine_src_dom_index__WEBPACK_IMPORTED_MODULE_0__.DomClass });


/***/ }),

/***/ "./src/di/engine/math-register.ts":
/*!****************************************!*\
  !*** ./src/di/engine/math-register.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var just_engine_src_math_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! just-engine/src/math/index */ "./node_modules/just-engine/src/math/index.ts");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../register */ "./src/di/register.ts");


_register__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "MathInterface", implementation: just_engine_src_math_index__WEBPACK_IMPORTED_MODULE_0__.MathClass });


/***/ }),

/***/ "./src/di/engine/source-register.ts":
/*!******************************************!*\
  !*** ./src/di/engine/source-register.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var just_engine_src_source_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! just-engine/src/source/index */ "./node_modules/just-engine/src/source/index.ts");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../register */ "./src/di/register.ts");


_register__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "SourceInterface", implementation: just_engine_src_source_index__WEBPACK_IMPORTED_MODULE_0__.SourceClass });


/***/ }),

/***/ "./src/di/engine/storage-register.ts":
/*!*******************************************!*\
  !*** ./src/di/engine/storage-register.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var just_engine_src_storage_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! just-engine/src/storage/index */ "./node_modules/just-engine/src/storage/index.ts");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../register */ "./src/di/register.ts");


_register__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "StorageInterface", implementation: just_engine_src_storage_index__WEBPACK_IMPORTED_MODULE_0__.StorageClass });


/***/ }),

/***/ "./src/di/engine/ui-register.ts":
/*!**************************************!*\
  !*** ./src/di/engine/ui-register.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var just_engine_src_ui_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! just-engine/src/ui/index */ "./node_modules/just-engine/src/ui/index.ts");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../register */ "./src/di/register.ts");


_register__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "UIInterface", implementation: just_engine_src_ui_index__WEBPACK_IMPORTED_MODULE_0__.UIClass });


/***/ }),

/***/ "./src/di/register.ts":
/*!****************************!*\
  !*** ./src/di/register.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "container": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_0__.container)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "./src/di/core.ts");
/* harmony import */ var _builder_di_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../builder/di-register */ "./src/builder/di-register.ts");
/* harmony import */ var _drawer_di_register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../drawer/di-register */ "./src/drawer/di-register.ts");
/* harmony import */ var _settings_di_register__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../settings/di-register */ "./src/settings/di-register.ts");
/* harmony import */ var _game_di_register__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game/di-register */ "./src/game/di-register.ts");
/* harmony import */ var _engine_ui_register__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./engine/ui-register */ "./src/di/engine/ui-register.ts");
/* harmony import */ var _engine_context_register__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./engine/context-register */ "./src/di/engine/context-register.ts");
/* harmony import */ var _engine_dom_register__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./engine/dom-register */ "./src/di/engine/dom-register.ts");
/* harmony import */ var _engine_math_register__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./engine/math-register */ "./src/di/engine/math-register.ts");
/* harmony import */ var _engine_source_register__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./engine/source-register */ "./src/di/engine/source-register.ts");
/* harmony import */ var _engine_storage_register__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./engine/storage-register */ "./src/di/engine/storage-register.ts");

// game register




// engine register






_core__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return window; }, { identifier: "Window" });
_core__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return Math; }, { identifier: "Math" });
_core__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return Image; }, { identifier: "typeof Image" });
_core__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return window.localStorage; }, { identifier: "Storage" });
_core__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return Array; }, { identifier: "ArrayConstructor" });



/***/ }),

/***/ "./src/drawer/di-register.ts":
/*!***********************************!*\
  !*** ./src/drawer/di-register.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/drawer/index.ts");
/* harmony import */ var _di_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../di/register */ "./src/di/register.ts");


_di_register__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "DrawerInterface", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.DrawerClass });


/***/ }),

/***/ "./src/drawer/index.ts":
/*!*****************************!*\
  !*** ./src/drawer/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DrawerClass": () => (/* binding */ DrawerClass)
/* harmony export */ });
/** Class implements painting on canvas */
var DrawerClass = /** @class */ (function () {
    /**
     * @param contextInstance - provides the context of the canvas
     * @param sourceInstance - to interact with the file system
     * @param uiInstance - to control the UI in the game
     * @param settings - basic game settings
     */
    function DrawerClass(contextInstance, sourceInstance, uiInstance, settings) {
        this.contextInstance = contextInstance;
        this.sourceInstance = sourceInstance;
        this.uiInstance = uiInstance;
        this.settings = settings;
        /** Canvas 2d context */
        this.context = null;
        this.contextInstance.init(this.settings.canvasSize, this.settings.devicePixelRatio);
        this.context = this.contextInstance.getInstance();
        if (!this.context) {
            throw new Error('Failed to access the drawing context.');
        }
        this.bomb = this.sourceInstance.getImage('bomb');
        this.flag = this.sourceInstance.getImage('flag');
        this.colors = this.uiInstance.getColors;
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
    DrawerClass.prototype.drawSquare = function (_a, size, color, hasBorders) {
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
    DrawerClass.prototype.drawNumber = function (_a, size, value) {
        var x = _a.x, y = _a.y;
        this.drawSquare({ x: x, y: y }, size, this.colors.MAIN_BG_COLOR);
        /** font size should be less than the size of the square */
        this.context.font = size / 2 + "px " + this.uiInstance.getFont;
        this.context.fillStyle = this.colors.TEXT_COLOR;
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
    DrawerClass.prototype.drawBomb = function (_a, size) {
        var x = _a.x, y = _a.y;
        this.drawSquare({ x: x, y: y }, size, this.colors.FIELD_BG_COLOR, false);
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
    DrawerClass.prototype.drawFlag = function (_a, size) {
        var x = _a.x, y = _a.y;
        this.drawSquare({ x: x, y: y }, size, this.colors.FLAG_BG_COLOR, false);
        var imageSize = this.getImageSize(size);
        this.context.drawImage(this.flag, this.getImageCoord(x, size), this.getImageCoord(y, size), imageSize, imageSize);
    };
    /**
     * Calculates the size of the image squared
     *
     * @param size - square size in pixels
     */
    DrawerClass.prototype.getImageSize = function (size) {
        return size / 2;
    };
    /**
     * Returns coordinate of image in the cell
     *
     * @param cellCoord - x or y coordinate of cell
     * @param size - square size in pixels
     */
    DrawerClass.prototype.getImageCoord = function (cellCoord, size) {
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
    DrawerClass.prototype.drawBorders = function (_a, size) {
        var x = _a.x, y = _a.y;
        this.context.strokeStyle = this.colors.BORDER_COLOR;
        this.context.strokeRect(x, y, size, size);
    };
    Object.defineProperty(DrawerClass, Symbol.for("___CTOR_ARGS___"), {
        get: function () { return ["ContextInterface", "SourceInterface", "UIInterface", "GameSettings"]; },
        enumerable: false,
        configurable: true
    });
    return DrawerClass;
}());



/***/ }),

/***/ "./src/game/di-register.ts":
/*!*********************************!*\
  !*** ./src/game/di-register.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/game/index.ts");
/* harmony import */ var _di_register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../di/register */ "./src/di/register.ts");


_di_register__WEBPACK_IMPORTED_MODULE_1__.container.registerSingleton(undefined, { identifier: "GameInterface", implementation: _index__WEBPACK_IMPORTED_MODULE_0__.Sapper });


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
/** The main class of the game */
var Sapper = /** @class */ (function () {
    /**
     * @param settings - basic game settings
     * @param contextInstance - provides the context of the canvas
     * @param drawerInstance - for painting on canvas
     * @param domInstance - allows interact with the DOM tree
     * @param builderInstance - responsible for creating levels
     * @param mathInstance - math number generator
     * @param storageInstance - long-term storage of game data
     * @param uiInstance - to control the UI in the game
     */
    function Sapper(settings, contextInstance, drawerInstance, domInstance, builderInstance, mathInstance, storageInstance, uiInstance) {
        this.settings = settings;
        this.contextInstance = contextInstance;
        this.drawerInstance = drawerInstance;
        this.domInstance = domInstance;
        this.builderInstance = builderInstance;
        this.mathInstance = mathInstance;
        this.storageInstance = storageInstance;
        this.uiInstance = uiInstance;
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
        this.select = domInstance.getElement('select-level');
        this.startGameButton = domInstance.getElement('start-game');
        this.levelTime = domInstance.getElement('level-time');
        this.bestLevelTime = domInstance.getElement('best-level-time');
        this.canvas = domInstance.getElement('canvas');
        this.gameContainer = domInstance.getElement('game-container');
        this.resultContainer = domInstance.getElement('result-container');
        this.winContainer = domInstance.getElement('win-container');
        this.leftBombContainer = domInstance.getElement('left-bomb');
        this.timerContainer = domInstance.getElement('timer');
        this.currentTimeContainer = domInstance.getElement('current-time-container');
        this.bestTimeContainer = domInstance.getElement('best-time-container');
        this.colors = this.uiInstance.getColors;
        this.contextInstance.init(this.settings.canvasSize, this.settings.devicePixelRatio);
    }
    /** Initializes game engine after the DOM has loaded */
    Sapper.prototype.init = function () {
        var _this = this;
        this.domInstance.afterLoad(function () {
            var selectedLevel = _this.storageInstance.get('level') || 'easy';
            /** if we have previously selected the level, then set it again */
            _this.changeLevelInSettings(selectedLevel);
            for (var key in _this.settings.levels) {
                var option = _this.domInstance.createElement('option');
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
        this.system = this.builderInstance.build(this.settings);
        this.cellPixelsSize = this.system.pixelsCountInCell;
        // display bombs left and timer above the field
        this.leftBombContainer.textContent = this.system.bombLeft.toString();
        this.timerContainer.textContent = '0';
        this.changeVisibilityElements();
        this.makeInitialFill();
        this.startTimer();
        this.contextInstance.listenCanvasClick(this.checkClick.bind(this));
        this.contextInstance.listenCanvasContextMenu(this.checkRightButtonClick.bind(this));
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
            var currentLevel = this.storageInstance.get('level');
            var bestTimeStorageName = "best-time-" + currentLevel;
            var bestTime = this.storageInstance.get(bestTimeStorageName);
            var time = '';
            // display current time on the finish screen
            this.currentTimeContainer.textContent = currentTime;
            if (bestTime && Number(bestTime) < Number(currentTime)) {
                time = bestTime;
            }
            else {
                time = currentTime;
            }
            this.storageInstance.save({
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
        this.storageInstance.save({
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
        var bestTime = this.storageInstance.get("best-time-" + selectedLevel);
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
        this.drawerInstance.drawSquare({
            x: 0,
            y: 0,
        }, size, this.colors.FIELD_BG_COLOR);
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
        var x = this.mathInstance.getFloorNumber(offsetX / this.system.pixelsCountInCell);
        var y = this.mathInstance.getFloorNumber(offsetY / this.system.pixelsCountInCell);
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
        this.drawerInstance.drawSquare({
            x: this.calcPixelCoord(cell.x),
            y: this.calcPixelCoord(cell.y),
        }, this.cellPixelsSize, this.colors.MAIN_BG_COLOR);
        cell.isOpen = true;
        this.system.usedCells++;
    };
    /**
     * Open cell with number
     *
     * @param cell - game board cell
     */
    Sapper.prototype.openNumberSquare = function (cell) {
        this.drawerInstance.drawNumber({
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
        this.drawerInstance.drawBomb({
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
        this.drawerInstance.drawFlag({
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
        this.drawerInstance.drawSquare({
            x: this.calcPixelCoord(cell.x),
            y: this.calcPixelCoord(cell.y),
        }, this.cellPixelsSize, this.colors.FIELD_BG_COLOR, false);
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
        get: function () { return ["GameSettings", "ContextInterface", "DrawerInterface", "DomInterface", "BuilderInterface", "MathInterface", "StorageInterface", "UIInterface"]; },
        enumerable: false,
        configurable: true
    });
    return Sapper;
}());



/***/ }),

/***/ "./src/settings/di-register.ts":
/*!*************************************!*\
  !*** ./src/settings/di-register.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _di_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../di/register */ "./src/di/register.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/settings/index.ts");


_di_register__WEBPACK_IMPORTED_MODULE_0__.container.registerSingleton(function () { return _index__WEBPACK_IMPORTED_MODULE_1__["default"]; }, { identifier: "GameSettings" });


/***/ }),

/***/ "./src/settings/index.ts":
/*!*******************************!*\
  !*** ./src/settings/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
/** Small hardcode for 13 inch display */
if (window.innerHeight < 850) {
    settings.canvasSize = 600;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (settings);


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
/* harmony import */ var _di_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./di/register */ "./src/di/register.ts");
/* harmony import */ var _img_bomb_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/bomb.png */ "./src/img/bomb.png");
/* harmony import */ var _img_flag_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/flag.png */ "./src/img/flag.png");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");




var sapper = _di_register__WEBPACK_IMPORTED_MODULE_0__.container.get({ identifier: "GameInterface" });
sapper.init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNmMEM7QUFHbEI7QUFDQTtBQUVGO0FBRXRCLElBQU0sTUFBTSxHQUFHLHVEQUFhLGlDQUFpQixDQUFDO0FBRTlDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NhcHBlci8uL25vZGVfbW9kdWxlcy9Ad2Vzc2JlcmcvZGkvZGlzdC9lc20vY29uc3RydWN0b3ItYXJndW1lbnRzL2NvbnN0cnVjdG9yLWFyZ3VtZW50cy1pZGVudGlmaWVyLmpzIiwid2VicGFjazovL3NhcHBlci8uL25vZGVfbW9kdWxlcy9Ad2Vzc2JlcmcvZGkvZGlzdC9lc20vZGktY29udGFpbmVyL2RpLWNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9ub2RlX21vZHVsZXMvQHdlc3NiZXJnL2RpL2Rpc3QvZXNtL2luZGV4LmpzIiwid2VicGFjazovL3NhcHBlci8uL25vZGVfbW9kdWxlcy9Ad2Vzc2JlcmcvZGkvZGlzdC9lc20vcmVnaXN0cmF0aW9uLWtpbmQvcmVnaXN0cmF0aW9uLWtpbmQuanMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2ltZy9ib21iLnBuZyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvaW1nL2ZsYWcucG5nIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9pbmRleC5zY3NzPzIwNmYiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vbm9kZV9tb2R1bGVzL2p1c3QtZW5naW5lL3NyYy9jb250ZXh0L2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL25vZGVfbW9kdWxlcy9qdXN0LWVuZ2luZS9zcmMvZG9tL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL25vZGVfbW9kdWxlcy9qdXN0LWVuZ2luZS9zcmMvbWF0aC9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9ub2RlX21vZHVsZXMvanVzdC1lbmdpbmUvc3JjL3NvdXJjZS9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9ub2RlX21vZHVsZXMvanVzdC1lbmdpbmUvc3JjL3N0b3JhZ2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vbm9kZV9tb2R1bGVzL2p1c3QtZW5naW5lL3NyYy91aS9pbmRleC50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvYnVpbGRlci9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2J1aWxkZXIvZGktcmVnaXN0ZXIudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2J1aWxkZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2RpL2NvcmUudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2RpL2VuZ2luZS9jb250ZXh0LXJlZ2lzdGVyLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kaS9lbmdpbmUvZG9tLXJlZ2lzdGVyLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9kaS9lbmdpbmUvbWF0aC1yZWdpc3Rlci50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZGkvZW5naW5lL3NvdXJjZS1yZWdpc3Rlci50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZGkvZW5naW5lL3N0b3JhZ2UtcmVnaXN0ZXIudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2RpL2VuZ2luZS91aS1yZWdpc3Rlci50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZGkvcmVnaXN0ZXIudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2RyYXdlci9kaS1yZWdpc3Rlci50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvZHJhd2VyL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9nYW1lL2RpLXJlZ2lzdGVyLnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9nYW1lL2luZGV4LnRzIiwid2VicGFjazovL3NhcHBlci8uL3NyYy9zZXR0aW5ncy9kaS1yZWdpc3Rlci50cyIsIndlYnBhY2s6Ly9zYXBwZXIvLi9zcmMvc2V0dGluZ3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL3NldHRpbmdzL2xldmVscy50cyIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2FwcGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zYXBwZXIvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vc2FwcGVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBDT05TVFJVQ1RPUl9BUkdVTUVOVFNfU1lNQk9MX0lERU5USUZJRVIgPSBgX19fQ1RPUl9BUkdTX19fYDtcbmV4cG9ydCBjb25zdCBDT05TVFJVQ1RPUl9BUkdVTUVOVFNfU1lNQk9MID0gU3ltYm9sLmZvcihDT05TVFJVQ1RPUl9BUkdVTUVOVFNfU1lNQk9MX0lERU5USUZJRVIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RydWN0b3ItYXJndW1lbnRzLWlkZW50aWZpZXIuanMubWFwIiwiaW1wb3J0IHsgQ09OU1RSVUNUT1JfQVJHVU1FTlRTX1NZTUJPTCB9IGZyb20gXCIuLi9jb25zdHJ1Y3Rvci1hcmd1bWVudHMvY29uc3RydWN0b3ItYXJndW1lbnRzLWlkZW50aWZpZXJcIjtcbmltcG9ydCB7IFJlZ2lzdHJhdGlvbktpbmQgfSBmcm9tIFwiLi4vcmVnaXN0cmF0aW9uLWtpbmQvcmVnaXN0cmF0aW9uLWtpbmRcIjtcbi8qKlxuICogQSBEZXBlbmRlbmN5LUluamVjdGlvbiBjb250YWluZXIgdGhhdCBob2xkcyBzZXJ2aWNlcyBhbmQgY2FuIHByb2R1Y2UgaW5zdGFuY2VzIG9mIHRoZW0gYXMgcmVxdWlyZWQuXG4gKiBJdCBtaW1pY3MgcmVmbGVjdGlvbiBieSBwYXJzaW5nIHRoZSBhcHAgYXQgY29tcGlsZS10aW1lIGFuZCBzdXBwb3J0aW5nIHRoZSBnZW5lcmljLXJlZmxlY3Rpb24gc3ludGF4LlxuICogQGF1dGhvciBGcmVkZXJpayBXZXNzYmVyZ1xuICovXG5leHBvcnQgY2xhc3MgRElDb250YWluZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBtYXAgYmV0d2VlbiBpbnRlcmZhY2UgbmFtZXMgYW5kIHRoZSBzZXJ2aWNlcyB0aGF0IHNob3VsZCBiZSBkZXBlbmRlbmN5IGluamVjdGVkXG4gICAgICAgICAqIEB0eXBlIHtNYXA8c3RyaW5nLCBDb25zdHJ1Y3RvckFyZ3VtZW50W10+fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvckFyZ3VtZW50cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgTWFwIGJldHdlZW4gaWRlbnRpZnlpbmcgbmFtZXMgZm9yIHNlcnZpY2VzIGFuZCB0aGVpciBJUmVnaXN0cmF0aW9uUmVjb3Jkcy5cbiAgICAgICAgICogQHR5cGUge01hcDxzdHJpbmcsIFJlZ2lzdHJhdGlvblJlY29yZDx7fSwge30+Pn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VydmljZVJlZ2lzdHJ5ID0gbmV3IE1hcCgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBtYXAgYmV0d2VlbiBpZGVudGlmeWluZyBuYW1lcyBmb3Igc2VydmljZXMgYW5kIGNvbmNyZXRlIGluc3RhbmNlcyBvZiB0aGVpciBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICogQHR5cGUge01hcDxzdHJpbmcsICo+fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbnN0YW5jZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIHJlZ2lzdGVyU2luZ2xldG9uKG5ld0V4cHJlc3Npb24sIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IGNvdWxkIG5vdCBnZXQgc2VydmljZTogTm8gYXJndW1lbnRzIHdlcmUgZ2l2ZW4hYCk7XG4gICAgICAgIGlmIChuZXdFeHByZXNzaW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKFJlZ2lzdHJhdGlvbktpbmQuU0lOR0xFVE9OLCBuZXdFeHByZXNzaW9uLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKFJlZ2lzdHJhdGlvbktpbmQuU0lOR0xFVE9OLCBuZXdFeHByZXNzaW9uLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWdpc3RlclRyYW5zaWVudChuZXdFeHByZXNzaW9uLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBjb3VsZCBub3QgZ2V0IHNlcnZpY2U6IE5vIGFyZ3VtZW50cyB3ZXJlIGdpdmVuIWApO1xuICAgICAgICBpZiAobmV3RXhwcmVzc2lvbiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihSZWdpc3RyYXRpb25LaW5kLlRSQU5TSUVOVCwgbmV3RXhwcmVzc2lvbiwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihSZWdpc3RyYXRpb25LaW5kLlRSQU5TSUVOVCwgbmV3RXhwcmVzc2lvbiwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBpbnN0YW5jZSBvZiB0aGUgc2VydmljZSBtYXRjaGluZyB0aGUgaW50ZXJmYWNlIGdpdmVuIGFzIGEgZ2VuZXJpYyB0eXBlIHBhcmFtZXRlci5cbiAgICAgKiBGb3IgZXhhbXBsZSwgJ2NvbnRhaW5lci5nZXQ8SUZvbz4oKScgcmV0dXJucyBhIGNvbmNyZXRlIGluc3RhbmNlIG9mIHRoZSBpbXBsZW1lbnRhdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlXG4gICAgICogZ2VuZXJpYyBpbnRlcmZhY2UgbmFtZS5cbiAgICAgKlxuICAgICAqIFlvdSBzaG91bGQgbm90IHBhc3MgYW55IG9wdGlvbnMgdG8gdGhlIG1ldGhvZCBpZiB1c2luZyB0aGUgY29tcGlsZXIuIEl0IHdpbGwgZG8gdGhhdCBhdXRvbWF0aWNhbGx5LlxuICAgICAqIEBwYXJhbSB7SUdldE9wdGlvbnN9IFtvcHRpb25zXVxuICAgICAqIEByZXR1cm5zIHtUfVxuICAgICAqL1xuICAgIGdldChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSBjb3VsZCBub3QgZ2V0IHNlcnZpY2U6IE5vIG9wdGlvbnMgd2FzIGdpdmVuIWApO1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RJbnN0YW5jZShvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGEgc2VydmljZSBoYXMgYmVlbiByZWdpc3RlcmVkIG1hdGNoaW5nIHRoZSBpbnRlcmZhY2UgZ2l2ZW4gYXMgYSBnZW5lcmljIHR5cGUgcGFyYW1ldGVyLlxuICAgICAqIEZvciBleGFtcGxlLCAnY29udGFpbmVyLmdldDxJRm9vPigpJyByZXR1cm5zIGEgY29uY3JldGUgaW5zdGFuY2Ugb2YgdGhlIGltcGxlbWVudGF0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGVcbiAgICAgKiBnZW5lcmljIGludGVyZmFjZSBuYW1lLlxuICAgICAqXG4gICAgICogWW91IHNob3VsZCBub3QgcGFzcyBhbnkgb3B0aW9ucyB0byB0aGUgbWV0aG9kIGlmIHVzaW5nIHRoZSBjb21waWxlci4gSXQgd2lsbCBkbyB0aGF0IGF1dG9tYXRpY2FsbHkuXG4gICAgICogQHBhcmFtIHtJR2V0T3B0aW9uc30gW29wdGlvbnNdXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IGNvdWxkIG5vdCBnZXQgc2VydmljZTogTm8gb3B0aW9ucyB3YXMgZ2l2ZW4hYCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VSZWdpc3RyeS5oYXMob3B0aW9ucy5pZGVudGlmaWVyKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIoa2luZCwgbmV3RXhwcmVzc2lvbiwgb3B0aW9ucykge1xuICAgICAgICAvLyBUYWtlIGFsbCBvZiB0aGUgY29uc3RydWN0b3IgYXJndW1lbnRzIGZvciB0aGUgaW1wbGVtZW50YXRpb25cbiAgICAgICAgY29uc3QgaW1wbGVtZW50YXRpb25Bcmd1bWVudHMgPSBcImltcGxlbWVudGF0aW9uXCIgaW4gb3B0aW9ucyAmJiBvcHRpb25zLmltcGxlbWVudGF0aW9uICE9IG51bGwgJiYgb3B0aW9ucy5pbXBsZW1lbnRhdGlvbltDT05TVFJVQ1RPUl9BUkdVTUVOVFNfU1lNQk9MXSAhPSBudWxsID8gb3B0aW9ucy5pbXBsZW1lbnRhdGlvbltDT05TVFJVQ1RPUl9BUkdVTUVOVFNfU1lNQk9MXSA6IFtdO1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yQXJndW1lbnRzLnNldChvcHRpb25zLmlkZW50aWZpZXIsIGltcGxlbWVudGF0aW9uQXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlUmVnaXN0cnkuc2V0KG9wdGlvbnMuaWRlbnRpZmllciwgXCJpbXBsZW1lbnRhdGlvblwiIGluIG9wdGlvbnMgJiYgb3B0aW9ucy5pbXBsZW1lbnRhdGlvbiAhPSBudWxsXG4gICAgICAgICAgICA/IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsga2luZCB9KSA6IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsga2luZCwgbmV3RXhwcmVzc2lvbjogbmV3RXhwcmVzc2lvbiB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBhbiBpbnN0YW5jZSBleGlzdHMgdGhhdCBtYXRjaGVzIHRoZSBnaXZlbiBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZGVudGlmaWVyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzSW5zdGFuY2UoaWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShpZGVudGlmaWVyKSAhPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjYWNoZWQgaW5zdGFuY2UsIGlmIGFueSwgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZGVudGlmaWVyXG4gICAgICogQHJldHVybnMge1R8bnVsbH1cbiAgICAgKi9cbiAgICBnZXRJbnN0YW5jZShpZGVudGlmaWVyKSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5pbnN0YW5jZXMuZ2V0KGlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UgPT0gbnVsbCA/IG51bGwgOiBpbnN0YW5jZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBJUmVnaXN0cmF0aW9uUmVjb3JkIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRpZmllclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcGFyZW50XVxuICAgICAqIEByZXR1cm5zIHtSZWdpc3RyYXRpb25SZWNvcmQ8VD59XG4gICAgICovXG4gICAgZ2V0UmVnaXN0cmF0aW9uUmVjb3JkKHsgaWRlbnRpZmllciwgcGFyZW50Q2hhaW4gfSkge1xuICAgICAgICBjb25zdCByZWNvcmQgPSB0aGlzLnNlcnZpY2VSZWdpc3RyeS5nZXQoaWRlbnRpZmllcik7XG4gICAgICAgIGlmIChyZWNvcmQgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IGNvdWxkIG5vdCBmaW5kIGEgc2VydmljZSBmb3IgaWRlbnRpZmllcjogXCIke2lkZW50aWZpZXJ9XCIuICR7cGFyZW50Q2hhaW4gPT0gbnVsbCB8fCBwYXJlbnRDaGFpbi5sZW5ndGggPCAxID8gXCJcIiA6IGBJdCBpcyByZXF1aXJlZCBieSB0aGUgc2VydmljZTogJyR7cGFyZW50Q2hhaW4ubWFwKHBhcmVudCA9PiBwYXJlbnQuaWRlbnRpZmllcikuam9pbihcIiAtPiBcIil9Jy5gfSBSZW1lbWJlciB0byByZWdpc3RlciBpdCBhcyBhIHNlcnZpY2UhYCk7XG4gICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhY2hlcyB0aGUgZ2l2ZW4gaW5zdGFuY2Ugc28gdGhhdCBpdCBjYW4gYmUgcmV0cmlldmVkIGluIHRoZSBmdXR1cmUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkZW50aWZpZXJcbiAgICAgKiBAcGFyYW0ge1R9IGluc3RhbmNlXG4gICAgICogQHJldHVybnMge1R9XG4gICAgICovXG4gICAgc2V0SW5zdGFuY2UoaWRlbnRpZmllciwgaW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5pbnN0YW5jZXMuc2V0KGlkZW50aWZpZXIsIGluc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbGF6eSByZWZlcmVuY2UgdG8gYW5vdGhlciBzZXJ2aWNlXG4gICAgICogQHBhcmFtIGxhenlQb2ludGVyXG4gICAgICovXG4gICAgZ2V0TGF6eUlkZW50aWZpZXIobGF6eVBvaW50ZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh7fSwgeyBnZXQ6IChfLCBrZXkpID0+IGxhenlQb2ludGVyKClba2V5XSB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gaWRlbnRpZmllciBhbmQgcmV0dXJucyBpdC5cbiAgICAgKiBJdCBjaGVja3MgdGhlIGNvbnN0cnVjdG9yIGFyZ3VtZW50cyBhbmQgaW5qZWN0cyBhbnkgc2VydmljZXMgaXQgbWlnaHQgZGVwZW5kIG9uIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBwYXJhbSB7SUNvbnN0cnVjdEluc3RhbmNlT3B0aW9uczxUPn0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtUfVxuICAgICAqL1xuICAgIGNvbnN0cnVjdEluc3RhbmNlKHsgaWRlbnRpZmllciwgcGFyZW50Q2hhaW4gPSBbXSB9KSB7XG4gICAgICAgIGNvbnN0IHJlZ2lzdHJhdGlvblJlY29yZCA9IHRoaXMuZ2V0UmVnaXN0cmF0aW9uUmVjb3JkKHsgaWRlbnRpZmllciwgcGFyZW50Q2hhaW4gfSk7XG4gICAgICAgIC8vIElmIGFuIGluc3RhbmNlIGFscmVhZHkgZXhpc3RzIChhbmQgaXQgaXMgYSBzaW5nbGV0b24pLCByZXR1cm4gdGhhdCBvbmVcbiAgICAgICAgaWYgKHRoaXMuaGFzSW5zdGFuY2UoaWRlbnRpZmllcikgJiYgcmVnaXN0cmF0aW9uUmVjb3JkLmtpbmQgPT09IFJlZ2lzdHJhdGlvbktpbmQuU0lOR0xFVE9OKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShpZGVudGlmaWVyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIGluc3RhbnRpYXRlIGEgbmV3IG9uZVxuICAgICAgICBsZXQgaW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IG1lID0ge1xuICAgICAgICAgICAgaWRlbnRpZmllcixcbiAgICAgICAgICAgIHJlZjogdGhpcy5nZXRMYXp5SWRlbnRpZmllcigoKSA9PiBpbnN0YW5jZSlcbiAgICAgICAgfTtcbiAgICAgICAgLy8gSWYgYSB1c2VyLXByb3ZpZGVkIG5ldy1leHByZXNzaW9uIGhhcyBiZWVuIHByb3ZpZGVkLCBpbnZva2UgdGhhdCB0byBnZXQgYW4gaW5zdGFuY2UuXG4gICAgICAgIGlmIChcIm5ld0V4cHJlc3Npb25cIiBpbiByZWdpc3RyYXRpb25SZWNvcmQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVnaXN0cmF0aW9uUmVjb3JkLm5ld0V4cHJlc3Npb24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYENvdWxkIG5vdCBpbnN0YW50aWF0ZSB0aGUgc2VydmljZSB3aXRoIHRoZSBpZGVudGlmaWVyOiAnJHtyZWdpc3RyYXRpb25SZWNvcmQuaWRlbnRpZmllcn0nOiBZb3UgcHJvdmlkZWQgYSBjdXN0b20gaW5zdGFudGlhdGlvbiBhcmd1bWVudCwgYnV0IGl0IHdhc24ndCBvZiB0eXBlIGZ1bmN0aW9uLiBJdCBoYXMgdG8gYmUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgd2hhdGV2ZXIgc2hvdWxkIGJlIHVzZWQgYXMgYW4gaW5zdGFuY2Ugb2YgdGhlIFNlcnZpY2UhYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gcmVnaXN0cmF0aW9uUmVjb3JkLm5ld0V4cHJlc3Npb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGluc3RhbnRpYXRlIHRoZSBzZXJ2aWNlIHdpdGggdGhlIGlkZW50aWZpZXI6ICcke3JlZ2lzdHJhdGlvblJlY29yZC5pZGVudGlmaWVyfSc6IFdoZW4geW91IHJlZ2lzdGVyZWQgdGhlIHNlcnZpY2UsIHlvdSBwcm92aWRlZCBhIGN1c3RvbSBpbnN0YW50aWF0aW9uIGZ1bmN0aW9uLCBidXQgaXQgdGhyZXcgYW4gZXhjZXB0aW9uIHdoZW4gaXQgd2FzIHJ1biFgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIGFyZ3VtZW50cyBmb3IgdGhlIGlkZW50aWZpZXJcbiAgICAgICAgICAgIGNvbnN0IG1hcHBlZEFyZ3MgPSB0aGlzLmNvbnN0cnVjdG9yQXJndW1lbnRzLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgIGlmIChtYXBwZWRBcmdzID09IG51bGwpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gY291bGQgbm90IGZpbmQgY29uc3RydWN0b3IgYXJndW1lbnRzIGZvciB0aGUgc2VydmljZTogJyR7aWRlbnRpZmllcn0nLiBIYXZlIHlvdSByZWdpc3RlcmVkIGl0IGFzIGEgc2VydmljZT9gKTtcbiAgICAgICAgICAgIC8vIEluc3RhbnRpYXRlIGFsbCBvZiB0aGUgYXJndW1lbnQgc2VydmljZXMgKG9yIHJlLXVzZSB0aGVtIGlmIHRoZXkgd2VyZSByZWdpc3RlcmVkIGFzIHNpbmdsZXRvbnMpXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZUFyZ3MgPSBtYXBwZWRBcmdzLm1hcCgoZGVwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRlcCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRQYXJlbnQgPSBwYXJlbnRDaGFpbi5maW5kKHBhcmVudCA9PiBwYXJlbnQuaWRlbnRpZmllciA9PT0gZGVwKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZFBhcmVudCAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlZFBhcmVudC5yZWY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0SW5zdGFuY2UoeyBpZGVudGlmaWVyOiBkZXAsIHBhcmVudENoYWluOiBbLi4ucGFyZW50Q2hhaW4sIG1lXSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gY29uc3RydWN0IGFuIGluc3RhbmNlIHdpdGggJ25ldycgYW5kIGlmIGl0IGZhaWxzLCBjYWxsIHRoZSBpbXBsZW1lbnRhdGlvbiBkaXJlY3RseS5cbiAgICAgICAgICAgICAgICBjb25zdCBuZXdhYmxlID0gcmVnaXN0cmF0aW9uUmVjb3JkLmltcGxlbWVudGF0aW9uO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IG5ld2FibGUoLi4uaW5zdGFuY2VBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgIGlmIChyZWdpc3RyYXRpb25SZWNvcmQuaW1wbGVtZW50YXRpb24gPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gY291bGQgbm90IGNvbnN0cnVjdCBhIG5ldyBzZXJ2aWNlIG9mIGtpbmQ6ICR7aWRlbnRpZmllcn0uIFJlYXNvbjogTm8gaW1wbGVtZW50YXRpb24gd2FzIGdpdmVuIWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnN0cnVjdGFibGUgPSByZWdpc3RyYXRpb25SZWNvcmQuaW1wbGVtZW50YXRpb247XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHdpdGhvdXQgJ25ldycgYW5kIGNhbGwgdGhlIGltcGxlbWVudGF0aW9uIGFzIGEgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBjb25zdHJ1Y3RhYmxlKC4uLmluc3RhbmNlQXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlZ2lzdHJhdGlvblJlY29yZC5raW5kID09PSBSZWdpc3RyYXRpb25LaW5kLlNJTkdMRVRPTiA/IHRoaXMuc2V0SW5zdGFuY2UoaWRlbnRpZmllciwgaW5zdGFuY2UpIDogaW5zdGFuY2U7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGktY29udGFpbmVyLmpzLm1hcCIsImV4cG9ydCB7IERJQ29udGFpbmVyIH0gZnJvbSBcIi4vZGktY29udGFpbmVyL2RpLWNvbnRhaW5lclwiO1xuZXhwb3J0IHsgQ09OU1RSVUNUT1JfQVJHVU1FTlRTX1NZTUJPTCwgQ09OU1RSVUNUT1JfQVJHVU1FTlRTX1NZTUJPTF9JREVOVElGSUVSIH0gZnJvbSBcIi4vY29uc3RydWN0b3ItYXJndW1lbnRzL2NvbnN0cnVjdG9yLWFyZ3VtZW50cy1pZGVudGlmaWVyXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJleHBvcnQgdmFyIFJlZ2lzdHJhdGlvbktpbmQ7XG4oZnVuY3Rpb24gKFJlZ2lzdHJhdGlvbktpbmQpIHtcbiAgICBSZWdpc3RyYXRpb25LaW5kW1JlZ2lzdHJhdGlvbktpbmRbXCJTSU5HTEVUT05cIl0gPSAwXSA9IFwiU0lOR0xFVE9OXCI7XG4gICAgUmVnaXN0cmF0aW9uS2luZFtSZWdpc3RyYXRpb25LaW5kW1wiVFJBTlNJRU5UXCJdID0gMV0gPSBcIlRSQU5TSUVOVFwiO1xufSkoUmVnaXN0cmF0aW9uS2luZCB8fCAoUmVnaXN0cmF0aW9uS2luZCA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWdpc3RyYXRpb24ta2luZC5qcy5tYXAiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL2JvbWIucG5nXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9mbGFnLnBuZ1wiOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IERvbUludGVyZmFjZSB9IGZyb20gJy4uL2RvbS90eXBlcyc7XG5pbXBvcnQgeyBDYW52YXNDb250ZXh0LCBDb250ZXh0SW50ZXJmYWNlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBQcm92aWRlcyB0aGUgY29udGV4dCBvZiB0aGUgY2FudmFzICovXG5leHBvcnQgY2xhc3MgQ29udGV4dENsYXNzIGltcGxlbWVudHMgQ29udGV4dEludGVyZmFjZSB7XG4gIC8qKiBTaXplIG9mIHRoZSBmaWVsZCBpbiBwaXhlbHMgKi9cbiAgcHJpdmF0ZSBjYW52YXNTaXplID0gMDtcblxuICAvKiogVGhlIHJhdGlvIG9mIHRoZSBkaXNwbGF5IHJlc29sdXRpb24gb2YgdGhlIGN1cnJlbnQgZGV2aWNlIGluIHBoeXNpY2FsIHBpeGVscyB0byB0aGUgcmVzb2x1dGlvbiBpbiBsb2dpY2FsIChDU1MpIHBpeGVscyAqL1xuICBwcml2YXRlIGRldmljZVBpeGVsUmF0aW8gPSAwO1xuXG4gIC8qKiBHYW1lIHdpbGwgYmUgZHJhd24gb24gdGhpcyBjYW52YXMgKi9cbiAgcHJpdmF0ZSBjYW52YXM6IE51bGxhYmxlPEhUTUxDYW52YXNFbGVtZW50PiA9IG51bGw7XG5cbiAgLyoqIENhbnZhcyAyZCBjb250ZXh0ICovXG4gIHByaXZhdGUgY29udGV4dDogTnVsbGFibGU8Q2FudmFzQ29udGV4dD4gPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gZG9tSW5zdGFuY2UgLSBhbGxvd3MgaW50ZXJhY3Qgd2l0aCB0aGUgRE9NIHRyZWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZG9tSW5zdGFuY2U6IERvbUludGVyZmFjZSxcbiAgKSB7XG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5kb21JbnN0YW5jZS5nZXRFbGVtZW50KCdjYW52YXMnKTtcblxuICAgIGlmICghY2FudmFzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmaW5kIGEgY2FudmFzLicpO1xuICAgIH1cblxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBjb250ZXh0IGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSBjYW52YXNTaXplIC0gc2l6ZSBvZiB0aGUgZmllbGQgaW4gcGl4ZWxzXG4gICAqIEBwYXJhbSBkZXZpY2VQaXhlbFJhdGlvIC0gdGhlIHJhdGlvIG9mIHRoZSBkaXNwbGF5IHJlc29sdXRpb25cbiAgICovXG4gIHB1YmxpYyBpbml0KGNhbnZhc1NpemU6IG51bWJlciwgZGV2aWNlUGl4ZWxSYXRpbzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jYW52YXNTaXplID0gY2FudmFzU2l6ZTtcbiAgICB0aGlzLmRldmljZVBpeGVsUmF0aW8gPSBkZXZpY2VQaXhlbFJhdGlvO1xuXG4gICAgdGhpcy5ub3JtYWxpemVTY2FsZSgpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgY2FudmFzIDJkIGNvbnRleHQgKi9cbiAgcHVibGljIGdldEluc3RhbmNlKCk6IENhbnZhc0NvbnRleHQge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIGNsaWNraW5nIG9uIHRoZSBjYW52YXMgYnkgbGVmdCBtb3VzZSBidXR0b25cbiAgICpcbiAgICogQHBhcmFtIGNhbGxiYWNrIC0gYSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBhZnRlciBjbGlja2luZyBvbiB0aGUgY2FudmFzIGJ5IGxlZnQgbW91c2UgYnV0dG9uXG4gICAqL1xuICBwdWJsaWMgbGlzdGVuQ2FudmFzQ2xpY2soY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gY2xpY2tpbmcgb24gdGhlIGNhbnZhcyBieSByaWdodCBtb3VzZSBidXR0b25cbiAgICpcbiAgICogQHBhcmFtIGNhbGxiYWNrIC0gYSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBhZnRlciBjbGlja2luZyBvbiB0aGUgY2FudmFzIGJ5IHJpZ2h0IG1vdXNlIGJ1dHRvblxuICAgKi9cbiAgcHVibGljIGxpc3RlbkNhbnZhc0NvbnRleHRNZW51KGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKiogTm9ybWFsaXplIGNhbnZhcyBzdHlsZXMgYW5kIGNvbnRleHQgc2NhbGUgKi9cbiAgcHJpdmF0ZSBub3JtYWxpemVTY2FsZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2FudmFzIHx8ICF0aGlzLmNvbnRleHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByYXRpbyA9IHRoaXMuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmNhbnZhc1NpemU7XG5cbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHNpemUgKiByYXRpbztcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBzaXplICogcmF0aW87XG5cbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3NpemV9cHhgO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuXG4gICAgdGhpcy5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuY29udGV4dC5zY2FsZShyYXRpbywgcmF0aW8pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEb21JbnRlcmZhY2UgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIENsYXNzIGFsbG93cyBpbnRlcmFjdCB3aXRoIHRoZSBET00gdHJlZSAqL1xuZXhwb3J0IGNsYXNzIERvbUNsYXNzIGltcGxlbWVudHMgRG9tSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB3aW5kb3dJbnN0YW5jZSAtIHdpbmRvdyBjb250YWluaW5nIGEgRE9NIGRvY3VtZW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHdpbmRvd0luc3RhbmNlOiBXaW5kb3csXG4gICkge31cblxuICAvKipcbiAgICogQ3JlYXRlIEhUTUwgZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2YgSFRNTCBlbGVtZW50XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcpOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4ge1xuICAgIHJldHVybiB0aGlzLndpbmRvd0luc3RhbmNlLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBIVE1MIGVsZW1lbnQgYnkgSURcbiAgICpcbiAgICogQHBhcmFtIGlkIC0gSUQgb2YgSFRNTCBlbGVtZW50XG4gICAqL1xuICBwdWJsaWMgZ2V0RWxlbWVudChpZDogc3RyaW5nKTogTnVsbGFibGU8SFRNTEVsZW1lbnQ+IHtcbiAgICByZXR1cm4gdGhpcy53aW5kb3dJbnN0YW5jZS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgYSBjYWxsYmFjayBhZnRlciBsb2FkaW5nIHRoZSBET00gdHJlZVxuICAgKlxuICAgKiBAcGFyYW0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBhZnRlciBsb2FkaW5nIHRoZSBET00gdHJlZVxuICAgKi9cbiAgcHVibGljIGFmdGVyTG9hZChjYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMud2luZG93SW5zdGFuY2UuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTWF0aEludGVyZmFjZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogTWF0aCBudW1iZXIgZ2VuZXJhdG9yICovXG5leHBvcnQgY2xhc3MgTWF0aENsYXNzIGltcGxlbWVudHMgTWF0aEludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0gbWF0aCAtIHJldHVybnMgTWF0aCBvYmplY3RcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBtYXRoOiBNYXRoLFxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBpbiBhIHNwZWNpZmllZCByYW5nZVxuICAgKlxuICAgKiBAcGFyYW0gbWluIC0gbWluaW11bSBudW1iZXIgZnJvbSB0aGUgaW50ZXJ2YWxcbiAgICogQHBhcmFtIG1heCAtIG1heGltdW0gbnVtYmVyIGZyb20gdGhlIGludGVydmFsXG4gICAqL1xuICBwdWJsaWMgZ2V0UmFuZG9tQXJiaXRyYXJ5KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Rmxvb3JOdW1iZXIodGhpcy5tYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdW5kcyBhIG51bWJlciB0byBhbiBpbnRlZ2VyXG4gICAqXG4gICAqIEBwYXJhbSBuIC0gb3JpZ2luYWwgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgZ2V0Rmxvb3JOdW1iZXIobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tYXRoLmZsb29yKG4pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTb3VyY2VJbnRlcmZhY2UgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIFRvIGludGVyYWN0IHdpdGggdGhlIGZpbGUgc3lzdGVtICovXG5leHBvcnQgY2xhc3MgU291cmNlQ2xhc3MgaW1wbGVtZW50cyBTb3VyY2VJbnRlcmZhY2Uge1xuICAvKipcbiAgICogQHBhcmFtIEltYWdlUHJvdmlkZXIgLSByZXR1cm5zIGltYWdlIG9iamVjdFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBJbWFnZVByb3ZpZGVyOiB0eXBlb2YgSW1hZ2UsXG4gICkge31cblxuICAvKipcbiAgICogUmV0dXJucyBpbWFnZSBmaWxlXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIC0gaW1hZ2UgZmlsZSBuYW1lXG4gICAqL1xuICBwdWJsaWMgZ2V0SW1hZ2UobmFtZTogc3RyaW5nKTogQ2FudmFzSW1hZ2VTb3VyY2Uge1xuICAgIGNvbnN0IGltZyA9IG5ldyB0aGlzLkltYWdlUHJvdmlkZXIoKTtcblxuICAgIGltZy5zcmMgPSBgaW1nLyR7bmFtZX0ucG5nYDtcblxuICAgIHJldHVybiBpbWc7XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JhZ2VJbnRlcmZhY2UsIFN0b3JhZ2VJdGVtLCBTdG9yYWdlTmFtZSwgU3RvcmFnZVZhbHVlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBMb25nLXRlcm0gc3RvcmFnZSBvZiBnYW1lIGRhdGEgKi9cbmV4cG9ydCBjbGFzcyBTdG9yYWdlQ2xhc3MgaW1wbGVtZW50cyBTdG9yYWdlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSBzdG9yYWdlIC0gV2ViIFN0b3JhZ2UgQVBJIGludGVyZmFjZSBwcm92aWRlcyBhY2Nlc3MgdG8gYSBwYXJ0aWN1bGFyIGRvbWFpbidzIHNlc3Npb24gb3IgbG9jYWwgc3RvcmFnZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlLFxuICApIHt9XG5cbiAgLyoqXG4gICAqIFNhdmVzIGFuIGl0ZW0gdG8gc3RvcmFnZVxuICAgKlxuICAgKiBAcGFyYW0gc3RvcmFnZUl0ZW0gLSBzdG9yZWQgaXRlbVxuICAgKiBAcGFyYW0gc3RvcmFnZUl0ZW0ubmFtZSAtIG5hbWUgb2Yga2V5IGluIHRoZSBzdG9yZVxuICAgKiBAcGFyYW0gc3RvcmFnZUl0ZW0udmFsdWUgLSB0aGUga2V5IHZhbHVlIGluIHRoZSBzdG9yZVxuICAgKi9cbiAgcHVibGljIHNhdmUoeyBuYW1lLCB2YWx1ZSB9OiBTdG9yYWdlSXRlbSk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaXRlbSBmcm9tIHN0b3JhZ2VcbiAgICpcbiAgICogQHBhcmFtIG5hbWUgLSBuYW1lIG9mIGtleSBpbiB0aGUgc3RvcmVcbiAgICovXG4gIHB1YmxpYyBnZXQobmFtZTogU3RvcmFnZU5hbWUpOiBTdG9yYWdlVmFsdWUge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShuYW1lKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVUlJbnRlcmZhY2UsIEN1c3RvbVByb3BlcnRpZXMgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIENsYXNzIHRvIGNvbnRyb2wgdGhlIFVJIGluIHRoZSBnYW1lICovXG5leHBvcnQgY2xhc3MgVUlDbGFzcyBpbXBsZW1lbnRzIFVJSW50ZXJmYWNlIHtcbiAgLyoqIEFuIG9iamVjdCB0aGF0IGlzIGEgQ1NTIGRlY2xhcmF0aW9uIGJsb2NrLCBhbmQgZXhwb3NlcyBzdHlsZSBpbmZvcm1hdGlvbiBhbmQgdmFyaW91cyBzdHlsZS1yZWxhdGVkIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgKi9cbiAgcHJpdmF0ZSByb290U3R5bGVzOiBDU1NTdHlsZURlY2xhcmF0aW9uO1xuXG4gIC8qKiBWYXJpYWJsZXMgZnJvbSBgOnJvb3RgIGRlY2xhcmF0aW9uICovXG4gIHByaXZhdGUgY3VzdG9tUHJvcGVydGllczogQ3VzdG9tUHJvcGVydGllcztcblxuICAvKiogQ29sb3IgdmFyaWFibGVzIGZyb20gY3VzdG9tIHByb3BlcnRpZXMgKi9cbiAgcHJpdmF0ZSBjb2xvcnM6IEN1c3RvbVByb3BlcnRpZXMgPSB7fTtcblxuICAvKiogTWFpbiBmb250IGluIHRoZSBnYW1lICovXG4gIHByaXZhdGUgZm9udCA9ICcnO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gd2luZG93SW5zdGFuY2UgLSB3aW5kb3cgY29udGFpbmluZyBhIERPTSBkb2N1bWVudFxuICAgKiBAcGFyYW0gYXJyYXlJbnN0YW5jZSAtIG1haW4gQXJyYXkgb2JqZWN0XG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHdpbmRvd0luc3RhbmNlOiBXaW5kb3csXG4gICAgcHJpdmF0ZSBhcnJheUluc3RhbmNlOiBBcnJheUNvbnN0cnVjdG9yLFxuICApIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGN1c3RvbSBwcm9wZXJ0aWVzIGZyb20gYDpyb290YCBkZWNsYXJhdGlvblxuICAgKi9cbiAgcHVibGljIGdldCBnZXRDdXN0b21Qcm9wZXJ0aWVzKCk6IEN1c3RvbVByb3BlcnRpZXMge1xuICAgIHJldHVybiB0aGlzLmN1c3RvbVByb3BlcnRpZXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjb2xvciB2YXJpYWJsZXMgZnJvbSBjdXN0b20gcHJvcGVydGllc1xuICAgKi9cbiAgcHVibGljIGdldCBnZXRDb2xvcnMoKTogQ3VzdG9tUHJvcGVydGllcyB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3JzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmb250IGZhbWlseVxuICAgKi9cbiAgcHVibGljIGdldCBnZXRGb250KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZm9udDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgcHJvcGVydGllc1xuICAgKi9cbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMucm9vdFN0eWxlcyA9IHRoaXMud2luZG93SW5zdGFuY2UuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLndpbmRvd0luc3RhbmNlLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG5cbiAgICB0aGlzLnNldEN1c3RvbVByb3BlcnRpZXMoKTtcbiAgICB0aGlzLnNldENvbG9ycygpO1xuICAgIHRoaXMuc2V0Rm9udCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBjdXN0b20gcHJvcGVydGllcyBmcm9tIDpyb290XG4gICAqL1xuICBwcml2YXRlIHNldEN1c3RvbVByb3BlcnRpZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jdXN0b21Qcm9wZXJ0aWVzID0ge307XG5cbiAgICBjb25zdCBjdXN0b21Qcm9wZXJ0aWVzVmFsdWVzID0gdGhpcy5hcnJheUluc3RhbmNlLmZyb20odGhpcy5yb290U3R5bGVzKS5maWx0ZXIoc3R5bGUgPT4gc3R5bGUuaW5kZXhPZignLS0nKSA9PT0gMCk7XG5cbiAgICBjdXN0b21Qcm9wZXJ0aWVzVmFsdWVzLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAvLyAtLWN1c3RvbS1wcm9wZXJ0aWVzIC0+IENVU1RPTV9QUk9QRVJUSUVTXG4gICAgICB0aGlzLmN1c3RvbVByb3BlcnRpZXNbXG4gICAgICAgIHByb3Auc3BsaXQoJy0nKVxuICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAubWFwKGl0ZW0gPT4gaXRlbS50b1VwcGVyQ2FzZSgpKVxuICAgICAgICAgIC5qb2luKCdfJyldID0gdGhpcy5yb290U3R5bGVzLmdldFByb3BlcnR5VmFsdWUocHJvcCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGNvbG9ycyBmcm9tIGN1c3RvbSBwcm9wZXJ0aWVzXG4gICAqL1xuICBwcml2YXRlIHNldENvbG9ycygpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmN1c3RvbVByb3BlcnRpZXMpIHtcbiAgICAgIGlmIChrZXkuaW5kZXhPZignQ09MT1InKSA+PSAwKSB7XG4gICAgICAgIHRoaXMuY29sb3JzW2tleV0gPSB0aGlzLmN1c3RvbVByb3BlcnRpZXNba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDRgdC00LXQu9Cw0YLRjCDRgtC+0LvRjNC60L4g0LTQu9GPINGA0LXQttC40LzQsCDRgNCw0LfRgNCw0LHQvtGC0LrQuFxuICAgIGNvbnNvbGUubG9nKHRoaXMuY29sb3JzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZm9udCBmYW1pbHkgZnJvbSBjdXN0b20gcHJvcGVydGllc1xuICAgKi9cbiAgcHJpdmF0ZSBzZXRGb250KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1c3RvbVByb3BlcnRpZXNbJ0ZPTlRfRkFNSUxZJ10pIHtcbiAgICAgIHRoaXMuZm9udCA9IHRoaXMuY3VzdG9tUHJvcGVydGllc1snRk9OVF9GQU1JTFknXTtcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBBcmVhU3RydWN0dXJlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQ29vcmRpbmF0ZXMgb2YgbmVpZ2hib3JpbmcgY2VsbHMgcmVsYXRpdmUgdG8gdGhlIGNlbnRlciBjZWxsXG4gKlxuICogQGV4YW1wbGVcbiAqICAjMCMxIzIjXG4gKiAgIzctOC0zI1xuICogICM2IzUjNCNcbiAqL1xuZXhwb3J0IGNvbnN0IEFSRUFfU1RSVUNUVVJFOiBBcmVhU3RydWN0dXJlID0ge1xuICAwOiB7IHg6IC0xLCB5OiAtMSB9LFxuICAxOiB7IHg6ICAwLCB5OiAtMSB9LFxuICAyOiB7IHg6ICAxLCB5OiAtMSB9LFxuICAzOiB7IHg6ICAxLCB5OiAgMCB9LFxuICA0OiB7IHg6ICAxLCB5OiAgMSB9LFxuICA1OiB7IHg6ICAwLCB5OiAgMSB9LFxuICA2OiB7IHg6IC0xLCB5OiAgMSB9LFxuICA3OiB7IHg6IC0xLCB5OiAgMCB9LFxufTtcbiIsImltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gJy4uL2RpL3JlZ2lzdGVyJztcbmltcG9ydCB7IEJ1aWxkZXJJbnRlcmZhY2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEJ1aWxkZXJDbGFzcyB9IGZyb20gJy4vaW5kZXgnO1xuXG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248QnVpbGRlckludGVyZmFjZSwgQnVpbGRlckNsYXNzPigpOyIsImltcG9ydCB7IE1hdGhJbnRlcmZhY2UgfSBmcm9tICdqdXN0LWVuZ2luZS9zcmMvbWF0aC90eXBlcyc7XG5cbmltcG9ydCB7IENvbXBsZXhpdHksIENvbXBsZXhpdHlMaXN0LCBHYW1lU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy90eXBlcyc7XG5pbXBvcnQgeyBBcmVhU3RydWN0dXJlLCBNYXBTdHJ1Y3R1cmUsIEJ1aWxkZXJJbnRlcmZhY2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEFSRUFfU1RSVUNUVVJFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKiogQ2xhc3MgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGxldmVscyBiYXNlZCBvbiBsZXZlbHMgc2V0dGluZ3MgKi9cbmV4cG9ydCBjbGFzcyBCdWlsZGVyQ2xhc3MgaW1wbGVtZW50cyBCdWlsZGVySW50ZXJmYWNlIHtcbiAgICAvKiogU2l6ZSBvZiB0aGUgZmllbGQgaW4gY2VsbHMgKi9cbiAgICBwcml2YXRlIGZpZWxkU2l6ZTogQ2VsbEFtb3VudDtcblxuICAgIC8qKiBTaXplIG9mIHRoZSBmaWVsZCBpbiBwaXhlbHMgKi9cbiAgICBwcml2YXRlIGNhbnZhc1NpemU6IFBpeGVsc0Ftb3VudDtcblxuICAgIC8qKiBOdW1iZXIgb2YgbGV2ZWwgYm9tYnMgKi9cbiAgICBwcml2YXRlIGJvbWJDb3VudDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1hdGhJbnN0YW5jZSAtIG1hdGggbnVtYmVyIGdlbmVyYXRvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG1hdGhJbnN0YW5jZTogTWF0aEludGVyZmFjZSxcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZCBsZXZlbFxuICAgICAqXG4gICAgICogQHBhcmFtIHNldHRpbmdzIC0gYmFzaWMgZ2FtZSBzZXR0aW5nc1xuICAgICAqL1xuICAgIHB1YmxpYyBidWlsZChzZXR0aW5nczogR2FtZVNldHRpbmdzKTogTWFwU3RydWN0dXJlIHtcbiAgICAgIGNvbnN0IHsgZmllbGRTaXplLCBib21iQ291bnQgfSA9IHRoaXMuZ2V0U2VsZWN0ZWRMZXZlbChzZXR0aW5ncy5sZXZlbHMpO1xuXG4gICAgICB0aGlzLmZpZWxkU2l6ZSA9IGZpZWxkU2l6ZTtcbiAgICAgIHRoaXMuYm9tYkNvdW50ID0gYm9tYkNvdW50O1xuICAgICAgdGhpcy5jYW52YXNTaXplID0gc2V0dGluZ3MuY2FudmFzU2l6ZTtcblxuICAgICAgY29uc3QgbWFwID0gdGhpcy5nZW5lcmF0ZU1hcFN0cnVjdHVyZSgpO1xuXG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNlbGVjdGVkIGRpZmZpY3VsdHkgbGV2ZWwgZnJvbSB0aGUgbGlzdCBvZiBsZXZlbHMgZnJvbSB0aGUgc2V0dGluZ3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsZXZlbHMgLSBsaXN0IG9mIHBvc3NpYmxlIGxldmVscyBvZiBkaWZmaWN1bHR5IG9mIHRoZSBnYW1lXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZExldmVsKGxldmVsczogQ29tcGxleGl0eUxpc3QpOiBDb21wbGV4aXR5IHtcbiAgICAgIGxldCBzZWxlY3RlZExldmVsOiBDb21wbGV4aXR5O1xuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBsZXZlbHMpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAobGV2ZWxzW2tleV0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgc2VsZWN0ZWRMZXZlbCA9IGxldmVsc1trZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxlY3RlZExldmVsO1xuICAgIH1cblxuICAgIC8qKiBHZW5lcmF0ZXMgdGhlIGZpZWxkIHN0cnVjdHVyZSBmb3IgdGhlIHNlbGVjdGVkIGRpZmZpY3VsdHkgbGV2ZWwgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlTWFwU3RydWN0dXJlKCk6IE1hcFN0cnVjdHVyZSB7XG4gICAgICBjb25zdCBtYXBTdHJ1Y3R1cmU6IE1hcFN0cnVjdHVyZSA9IHtcbiAgICAgICAgcGl4ZWxzQ291bnRJbkNlbGw6IHRoaXMuY2FudmFzU2l6ZSAvIHRoaXMuZmllbGRTaXplLFxuICAgICAgICBib21iQ291bnQ6IHRoaXMuYm9tYkNvdW50LFxuICAgICAgICBib21iTGVmdDogdGhpcy5ib21iQ291bnQsXG4gICAgICAgIHVzZWRDZWxsczogMCxcbiAgICAgICAgY2VsbHM6IHt9LFxuICAgICAgICBib21iUG9zaXRpb25zOiBbXSxcbiAgICAgICAgZmllbGRTaXplOiB0aGlzLmZpZWxkU2l6ZSxcbiAgICAgIH07XG5cbiAgICAgIG1hcFN0cnVjdHVyZS5ib21iUG9zaXRpb25zID0gdGhpcy5nZW5lcmF0ZVJhbmRvbUJvbWJQb3NpdGlvbnModGhpcy5maWVsZFNpemUgKiB0aGlzLmZpZWxkU2l6ZSk7XG5cbiAgICAgIC8vIHRyYXZlcnNhbCBvZiBhcnJheXMgZ29lcyBmcm9tIGxlZnQgdG8gcmlnaHQgYW5kIGZyb20gdG9wIHRvIGJvdHRvbVxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmZpZWxkU2l6ZTsgeSsrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5maWVsZFNpemU7IHgrKykge1xuICAgICAgICAgIGNvbnN0IHJvdzogbnVtYmVyID0geTtcbiAgICAgICAgICBjb25zdCBjZWxsOiBudW1iZXIgPSB4O1xuXG4gICAgICAgICAgaWYgKCFtYXBTdHJ1Y3R1cmUuY2VsbHNbcm93XSkge1xuICAgICAgICAgICAgbWFwU3RydWN0dXJlLmNlbGxzW3Jvd10gPSB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBoYXNCb21iOiBib29sZWFuID0gbWFwU3RydWN0dXJlLmJvbWJQb3NpdGlvbnMuaW5jbHVkZXMoeCArIHkgKiB0aGlzLmZpZWxkU2l6ZSk7XG4gICAgICAgICAgY29uc3QgYXJlYTogQXJlYVN0cnVjdHVyZSA9IHRoaXMuZ2VuZXJhdGVDZWxsQXJlYSh7IHgsIHkgfSk7XG5cbiAgICAgICAgICBjb25zdCBjZWxsU3RydWN0dXJlOiBDZWxsID0ge1xuICAgICAgICAgICAgeTogcm93LFxuICAgICAgICAgICAgeDogY2VsbCxcbiAgICAgICAgICAgIGFyZWEsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChoYXNCb21iKSB7XG4gICAgICAgICAgICBjZWxsU3RydWN0dXJlLmhhc0JvbWIgPSBoYXNCb21iO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjZWxsU3RydWN0dXJlLnZhbHVlID0gdGhpcy5jYWxjQm9tYnNBcm91bmRDZWxscyhhcmVhLCBtYXBTdHJ1Y3R1cmUuYm9tYlBvc2l0aW9ucyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWFwU3RydWN0dXJlLmNlbGxzW3Jvd11bY2VsbF0gPSBjZWxsU3RydWN0dXJlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXBTdHJ1Y3R1cmU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgcmVnaW9uIG9mIGNlbGxzIHdpdGggdGhlaXIgY29vcmRpbmF0ZXMgYXJvdW5kIHRoZSBzZWxlY3RlZCBjZWxsIGJhc2VkIG9uIGl0cyBjb29yZGluYXRlc1xuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICAgKiBAcGFyYW0gY2VsbC54IC0gdGhlIHggY29vcmRpbmF0ZSBvbiB0aGUgcGxheWluZyBmaWVsZFxuICAgICAqIEBwYXJhbSBjZWxsLnkgLSB0aGUgeSBjb29yZGluYXRlIG9uIHRoZSBwbGF5aW5nIGZpZWxkXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUNlbGxBcmVhKHsgeCwgeSB9OiBDZWxsKTogQXJlYVN0cnVjdHVyZSB7XG4gICAgICBjb25zdCBhcmVhOiBBcmVhU3RydWN0dXJlID0ge307XG5cbiAgICAgIC8vIDggLSB0aGUgbnVtYmVyIG9mIGNlbGxzIGFyb3VuZCB0aGUgY2VudHJhbFxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDg7IGluZGV4KyspIHtcbiAgICAgICAgLyoqIENoZWNraW5nIGlmIHRoZSBjZWxsIGdvZXMgYmV5b25kIHRoZSBsZWZ0IGFuZCB0b3AgYm9yZGVycyBvZiB0aGUgZmllbGQgKi9cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoeCArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS54IDwgMCB8fCB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnkgPCAwKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiogQ2hlY2tpbmcgaWYgdGhlIGNlbGwgZ29lcyBiZXlvbmQgdGhlIHJpZ2h0IGFuZCBib3R0b20gYm9yZGVycyBvZiB0aGUgZmllbGQgKi9cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoeCArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS54ID49IHRoaXMuZmllbGRTaXplIHx8IHkgKyBBUkVBX1NUUlVDVFVSRVtpbmRleF0ueSA+PSB0aGlzLmZpZWxkU2l6ZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhcmVhW2luZGV4XSA9IHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgeDogeCArIEFSRUFfU1RSVUNUVVJFW2luZGV4XS54LFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB5OiB5ICsgQVJFQV9TVFJVQ1RVUkVbaW5kZXhdLnksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcmVhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyByYW5kb20gcG9zaXRpb25zIGZvciBwbGFjaW5nIGJvbWJzIG9uIHRoZSBmaWVsZFxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGxzQ291bnQgLSBudW1iZXIgb2YgY2VsbHMgb2YgdGhlIHBsYXlpbmcgZmllbGRcbiAgICAgKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlUmFuZG9tQm9tYlBvc2l0aW9ucyhjZWxsc0NvdW50OiBDZWxsQW1vdW50KTogbnVtYmVyW10ge1xuICAgICAgY29uc3QgYm9tYlBvc2l0aW9uczogQm9tYlBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5ib21iQ291bnQ7IGluZGV4KyspIHtcbiAgICAgICAgbGV0IHJhbmRvbVBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLm1hdGhJbnN0YW5jZS5nZXRSYW5kb21BcmJpdHJhcnkoMSwgY2VsbHNDb3VudCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIGdlbmVyYXRlZCBwb3NpdGlvbiBpcyBhbHJlYWR5IGluIHRoZSBsaXN0LCB3ZSBnZW5lcmF0ZSBpdCBhZ2FpblxuICAgICAgICB3aGlsZSAoYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyhyYW5kb21Qb3NpdGlvbikpIHtcbiAgICAgICAgICByYW5kb21Qb3NpdGlvbiA9IHRoaXMubWF0aEluc3RhbmNlLmdldFJhbmRvbUFyYml0cmFyeSgxLCBjZWxsc0NvdW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvbWJQb3NpdGlvbnMucHVzaChyYW5kb21Qb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBib21iUG9zaXRpb25zLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3VudHMgdGhlIG51bWJlciBvZiBib21icyBhcm91bmQgdGhlIGNlbGxcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcmVhIC0gbmVpZ2hib3JpbmcgY2VsbHMgcmVsYXRpdmUgdG8gdGhlIGNlbnRlciBjZWxsXG4gICAgICogQHBhcmFtIGJvbWJQb3NpdGlvbnMgLSBwb3NpdGlvbnMgb2YgYm9tYnMgb24gdGhlIGZpZWxkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjQm9tYnNBcm91bmRDZWxscyhhcmVhOiBBcmVhU3RydWN0dXJlLCBib21iUG9zaXRpb25zOiBCb21iUG9zaXRpb25zKTogbnVtYmVyIHtcbiAgICAgIGxldCByZXN1bHQgPSAwO1xuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBhcmVhKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgY2VsbCA9IGFyZWFba2V5XTtcblxuICAgICAgICBpZiAoYm9tYlBvc2l0aW9ucy5pbmNsdWRlcyhjZWxsLnggKyBjZWxsLnkgKiB0aGlzLmZpZWxkU2l6ZSkpIHtcbiAgICAgICAgICByZXN1bHQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IERJQ29udGFpbmVyIH0gZnJvbSAnQHdlc3NiZXJnL2RpJztcblxuZXhwb3J0IGNvbnN0IGNvbnRhaW5lciA9IG5ldyBESUNvbnRhaW5lcigpOyIsImltcG9ydCB7IENvbnRleHRJbnRlcmZhY2UgfSBmcm9tICdqdXN0LWVuZ2luZS9zcmMvY29udGV4dC90eXBlcyc7XG5pbXBvcnQgeyBDb250ZXh0Q2xhc3MgfSBmcm9tICdqdXN0LWVuZ2luZS9zcmMvY29udGV4dC9pbmRleCc7XG5cbmltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gJy4uL3JlZ2lzdGVyJztcblxuY29udGFpbmVyLnJlZ2lzdGVyU2luZ2xldG9uPENvbnRleHRJbnRlcmZhY2UsIENvbnRleHRDbGFzcz4oKTsiLCJpbXBvcnQgeyBEb21JbnRlcmZhY2UgfSBmcm9tICdqdXN0LWVuZ2luZS9zcmMvZG9tL3R5cGVzJztcbmltcG9ydCB7IERvbUNsYXNzIH0gZnJvbSAnanVzdC1lbmdpbmUvc3JjL2RvbS9pbmRleCc7XG5cbmltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gJy4uL3JlZ2lzdGVyJztcblxuY29udGFpbmVyLnJlZ2lzdGVyU2luZ2xldG9uPERvbUludGVyZmFjZSwgRG9tQ2xhc3M+KCk7IiwiaW1wb3J0IHsgTWF0aEludGVyZmFjZSB9IGZyb20gJ2p1c3QtZW5naW5lL3NyYy9tYXRoL3R5cGVzJztcbmltcG9ydCB7IE1hdGhDbGFzcyB9IGZyb20gJ2p1c3QtZW5naW5lL3NyYy9tYXRoL2luZGV4JztcblxuaW1wb3J0IHsgY29udGFpbmVyIH0gZnJvbSAnLi4vcmVnaXN0ZXInO1xuXG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248TWF0aEludGVyZmFjZSwgTWF0aENsYXNzPigpOyIsImltcG9ydCB7IFNvdXJjZUludGVyZmFjZSB9IGZyb20gJ2p1c3QtZW5naW5lL3NyYy9zb3VyY2UvdHlwZXMnO1xuaW1wb3J0IHsgU291cmNlQ2xhc3MgfSBmcm9tICdqdXN0LWVuZ2luZS9zcmMvc291cmNlL2luZGV4JztcblxuaW1wb3J0IHsgY29udGFpbmVyIH0gZnJvbSAnLi4vcmVnaXN0ZXInO1xuXG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248U291cmNlSW50ZXJmYWNlLCBTb3VyY2VDbGFzcz4oKTsiLCJpbXBvcnQgeyBTdG9yYWdlSW50ZXJmYWNlIH0gZnJvbSAnanVzdC1lbmdpbmUvc3JjL3N0b3JhZ2UvdHlwZXMnO1xuaW1wb3J0IHsgU3RvcmFnZUNsYXNzIH0gZnJvbSAnanVzdC1lbmdpbmUvc3JjL3N0b3JhZ2UvaW5kZXgnO1xuXG5pbXBvcnQgeyBjb250YWluZXIgfSBmcm9tICcuLi9yZWdpc3Rlcic7XG5cbmNvbnRhaW5lci5yZWdpc3RlclNpbmdsZXRvbjxTdG9yYWdlSW50ZXJmYWNlLCBTdG9yYWdlQ2xhc3M+KCk7IiwiaW1wb3J0IHsgVUlJbnRlcmZhY2UgfSBmcm9tICdqdXN0LWVuZ2luZS9zcmMvdWkvdHlwZXMnO1xuaW1wb3J0IHsgVUlDbGFzcyB9IGZyb20gJ2p1c3QtZW5naW5lL3NyYy91aS9pbmRleCc7XG5cbmltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gJy4uL3JlZ2lzdGVyJztcblxuY29udGFpbmVyLnJlZ2lzdGVyU2luZ2xldG9uPFVJSW50ZXJmYWNlLCBVSUNsYXNzPigpOyIsImltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gJy4vY29yZSc7XG5cbi8vIGdhbWUgcmVnaXN0ZXJcbmltcG9ydCAnLi4vYnVpbGRlci9kaS1yZWdpc3Rlcic7XG5pbXBvcnQgJy4uL2RyYXdlci9kaS1yZWdpc3Rlcic7XG5pbXBvcnQgJy4uL3NldHRpbmdzL2RpLXJlZ2lzdGVyJztcbmltcG9ydCAnLi4vZ2FtZS9kaS1yZWdpc3Rlcic7XG5cbi8vIGVuZ2luZSByZWdpc3RlclxuaW1wb3J0ICcuL2VuZ2luZS91aS1yZWdpc3Rlcic7XG5pbXBvcnQgJy4vZW5naW5lL2NvbnRleHQtcmVnaXN0ZXInO1xuaW1wb3J0ICcuL2VuZ2luZS9kb20tcmVnaXN0ZXInO1xuaW1wb3J0ICcuL2VuZ2luZS9tYXRoLXJlZ2lzdGVyJztcbmltcG9ydCAnLi9lbmdpbmUvc291cmNlLXJlZ2lzdGVyJztcbmltcG9ydCAnLi9lbmdpbmUvc3RvcmFnZS1yZWdpc3Rlcic7XG5cbmNvbnRhaW5lci5yZWdpc3RlclNpbmdsZXRvbjxXaW5kb3c+KCgpID0+IHdpbmRvdyk7XG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248TWF0aD4oKCkgPT4gTWF0aCk7XG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248dHlwZW9mIEltYWdlPigoKSA9PiBJbWFnZSk7XG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248U3RvcmFnZT4oKCkgPT4gd2luZG93LmxvY2FsU3RvcmFnZSk7XG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248QXJyYXlDb25zdHJ1Y3Rvcj4oKCkgPT4gQXJyYXkpO1xuXG5leHBvcnQgeyBjb250YWluZXIgfTtcblxuIiwiaW1wb3J0IHsgY29udGFpbmVyIH0gZnJvbSAnLi4vZGkvcmVnaXN0ZXInO1xuaW1wb3J0IHsgRHJhd2VySW50ZXJmYWNlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBEcmF3ZXJDbGFzcyB9IGZyb20gJy4vaW5kZXgnO1xuXG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248RHJhd2VySW50ZXJmYWNlLCBEcmF3ZXJDbGFzcz4oKTsiLCJpbXBvcnQgeyBVSUludGVyZmFjZSwgQ3VzdG9tUHJvcGVydGllcyB9IGZyb20gJ2p1c3QtZW5naW5lL3NyYy91aS90eXBlcyc7XG5pbXBvcnQgeyBDYW52YXNDb250ZXh0LCBDb250ZXh0SW50ZXJmYWNlIH0gZnJvbSAnanVzdC1lbmdpbmUvc3JjL2NvbnRleHQvdHlwZXMnO1xuaW1wb3J0IHsgU291cmNlSW50ZXJmYWNlIH0gZnJvbSAnanVzdC1lbmdpbmUvc3JjL3NvdXJjZS90eXBlcyc7XG5cbmltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gJy4uL3NldHRpbmdzL3R5cGVzJztcblxuaW1wb3J0IHsgRHJhd2VySW50ZXJmYWNlIH0gZnJvbSAnLi90eXBlcyc7XG5cblxuLyoqIENsYXNzIGltcGxlbWVudHMgcGFpbnRpbmcgb24gY2FudmFzICovXG5leHBvcnQgY2xhc3MgRHJhd2VyQ2xhc3MgaW1wbGVtZW50cyBEcmF3ZXJJbnRlcmZhY2Uge1xuICAvKiogQ2FudmFzIDJkIGNvbnRleHQgKi9cbiAgcHJpdmF0ZSBjb250ZXh0OiBDYW52YXNDb250ZXh0ID0gbnVsbDtcblxuICAvKiogQm9tYiBpbWFnZSAqL1xuICBwcml2YXRlIGJvbWI6IENhbnZhc0ltYWdlU291cmNlO1xuXG4gIC8qKiBGbGFnIGltYWdlICovXG4gIHByaXZhdGUgZmxhZzogQ2FudmFzSW1hZ2VTb3VyY2U7XG5cbiAgLyoqIENvbG9yIHZhcmlhYmxlcyBmcm9tIGN1c3RvbSBwcm9wZXJ0aWVzICovXG4gIHByaXZhdGUgY29sb3JzOiBDdXN0b21Qcm9wZXJ0aWVzO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gY29udGV4dEluc3RhbmNlIC0gcHJvdmlkZXMgdGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhc1xuICAgKiBAcGFyYW0gc291cmNlSW5zdGFuY2UgLSB0byBpbnRlcmFjdCB3aXRoIHRoZSBmaWxlIHN5c3RlbVxuICAgKiBAcGFyYW0gdWlJbnN0YW5jZSAtIHRvIGNvbnRyb2wgdGhlIFVJIGluIHRoZSBnYW1lXG4gICAqIEBwYXJhbSBzZXR0aW5ncyAtIGJhc2ljIGdhbWUgc2V0dGluZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29udGV4dEluc3RhbmNlOiBDb250ZXh0SW50ZXJmYWNlLFxuICAgIHByaXZhdGUgc291cmNlSW5zdGFuY2U6IFNvdXJjZUludGVyZmFjZSxcbiAgICBwcml2YXRlIHVpSW5zdGFuY2U6IFVJSW50ZXJmYWNlLFxuICAgIHByaXZhdGUgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyxcbiAgKSB7XG4gICAgdGhpcy5jb250ZXh0SW5zdGFuY2UuaW5pdCh0aGlzLnNldHRpbmdzLmNhbnZhc1NpemUsIHRoaXMuc2V0dGluZ3MuZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0SW5zdGFuY2UuZ2V0SW5zdGFuY2UoKTtcblxuICAgIGlmICghdGhpcy5jb250ZXh0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBhY2Nlc3MgdGhlIGRyYXdpbmcgY29udGV4dC4nKTtcbiAgICB9XG5cbiAgICB0aGlzLmJvbWIgPSB0aGlzLnNvdXJjZUluc3RhbmNlLmdldEltYWdlKCdib21iJyk7XG4gICAgdGhpcy5mbGFnID0gdGhpcy5zb3VyY2VJbnN0YW5jZS5nZXRJbWFnZSgnZmxhZycpO1xuICAgIHRoaXMuY29sb3JzID0gdGhpcy51aUluc3RhbmNlLmdldENvbG9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3cyBhbiBlbXB0eSBzcXVhcmVcbiAgICpcbiAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICogQHBhcmFtIGNlbGwueCAtIGNlbGwgeCBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBjZWxsLnkgLSBjZWxsIHkgY29vcmRpbmF0ZVxuICAgKiBAcGFyYW0gc2l6ZSAtIHNxdWFyZSBzaXplIGluIHBpeGVsc1xuICAgKiBAcGFyYW0gY29sb3IgLSBzcXVhcmUgY29sb3JcbiAgICogQHBhcmFtIGhhc0JvcmRlcnMgLSB3aGV0aGVyIHRvIGRyYXcgYm9yZGVycyBhdCBhIHNxdWFyZVxuICAgKi9cbiAgcHVibGljIGRyYXdTcXVhcmUoeyB4LCB5IH06IENlbGwsIHNpemU6IFBpeGVsc0Ftb3VudCwgY29sb3I6IHN0cmluZywgaGFzQm9yZGVycyA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeCwgeSwgc2l6ZSwgc2l6ZSk7XG5cbiAgICBpZiAoaGFzQm9yZGVycykge1xuICAgICAgdGhpcy5kcmF3Qm9yZGVycyh7IHgsIHkgfSwgc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIHNxdWFyZSB3aXRoIG51bWJlclxuICAgKlxuICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgKiBAcGFyYW0gY2VsbC54IC0gY2VsbCB4IGNvb3JkaW5hdGVcbiAgICogQHBhcmFtIGNlbGwueSAtIGNlbGwgeSBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBzaXplIC0gc3F1YXJlIHNpemUgaW4gcGl4ZWxzXG4gICAqIEBwYXJhbSB2YWx1ZSAtIG51bWJlciB0byBkcmF3XG4gICAqL1xuICBwdWJsaWMgZHJhd051bWJlcih7IHgsIHkgfTogQ2VsbCwgc2l6ZTogUGl4ZWxzQW1vdW50LCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5kcmF3U3F1YXJlKHsgeCwgeSB9LCBzaXplLCB0aGlzLmNvbG9ycy5NQUlOX0JHX0NPTE9SKTtcblxuICAgIC8qKiBmb250IHNpemUgc2hvdWxkIGJlIGxlc3MgdGhhbiB0aGUgc2l6ZSBvZiB0aGUgc3F1YXJlICovXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgJHtzaXplIC8gMn1weCAke3RoaXMudWlJbnN0YW5jZS5nZXRGb250fWA7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY29sb3JzLlRFWFRfQ09MT1I7XG5cbiAgICAvKiogc2luY2UgdGhlIG51bWJlciBpcyBzdHJldGNoZWQgdXB3YXJkcywgZm9yIGNlbnRlcmluZywgd2UgZGl2aWRlIHRoZSB3aWR0aCBieSBhIGxhcmdlciBudW1iZXIgdGhhbiB0aGUgaGVpZ2h0ICovXG4gICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHZhbHVlLnRvU3RyaW5nKCksIHggKyAoc2l6ZSAvIDIuNSksIHkgKyAoc2l6ZSAvIDEuNSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIHNxdWFyZSB3aXRoIGJvbWJcbiAgICpcbiAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICogQHBhcmFtIGNlbGwueCAtIGNlbGwgeCBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBjZWxsLnkgLSBjZWxsIHkgY29vcmRpbmF0ZVxuICAgKiBAcGFyYW0gc2l6ZSAtIHNxdWFyZSBzaXplIGluIHBpeGVsc1xuICAgKi9cbiAgcHVibGljIGRyYXdCb21iKHsgeCwgeSB9OiBDZWxsLCBzaXplOiBQaXhlbHNBbW91bnQpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXdTcXVhcmUoeyB4LCB5IH0sIHNpemUsIHRoaXMuY29sb3JzLkZJRUxEX0JHX0NPTE9SLCBmYWxzZSk7XG5cbiAgICBjb25zdCBpbWFnZVNpemU6IG51bWJlciA9IHRoaXMuZ2V0SW1hZ2VTaXplKHNpemUpO1xuXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmJvbWIsIHRoaXMuZ2V0SW1hZ2VDb29yZCh4LCBzaXplKSwgdGhpcy5nZXRJbWFnZUNvb3JkKHksIHNpemUpLCBpbWFnZVNpemUsIGltYWdlU2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogRHJhd3Mgc3F1YXJlIHdpdGggZmxhZ1xuICAgKlxuICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgKiBAcGFyYW0gY2VsbC54IC0gY2VsbCB4IGNvb3JkaW5hdGVcbiAgICogQHBhcmFtIGNlbGwueSAtIGNlbGwgeSBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBzaXplIC0gc3F1YXJlIHNpemUgaW4gcGl4ZWxzXG4gICAqL1xuICBwdWJsaWMgZHJhd0ZsYWcoeyB4LCB5IH06IENlbGwsIHNpemU6IFBpeGVsc0Ftb3VudCk6IHZvaWQge1xuICAgIHRoaXMuZHJhd1NxdWFyZSh7IHgsIHkgfSwgc2l6ZSwgdGhpcy5jb2xvcnMuRkxBR19CR19DT0xPUiwgZmFsc2UpO1xuXG4gICAgY29uc3QgaW1hZ2VTaXplOiBudW1iZXIgPSB0aGlzLmdldEltYWdlU2l6ZShzaXplKTtcblxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5mbGFnLCB0aGlzLmdldEltYWdlQ29vcmQoeCwgc2l6ZSksIHRoaXMuZ2V0SW1hZ2VDb29yZCh5LCBzaXplKSwgaW1hZ2VTaXplLCBpbWFnZVNpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNpemUgb2YgdGhlIGltYWdlIHNxdWFyZWRcbiAgICpcbiAgICogQHBhcmFtIHNpemUgLSBzcXVhcmUgc2l6ZSBpbiBwaXhlbHNcbiAgICovXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKHNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIHNpemUgLyAyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY29vcmRpbmF0ZSBvZiBpbWFnZSBpbiB0aGUgY2VsbFxuICAgKlxuICAgKiBAcGFyYW0gY2VsbENvb3JkIC0geCBvciB5IGNvb3JkaW5hdGUgb2YgY2VsbFxuICAgKiBAcGFyYW0gc2l6ZSAtIHNxdWFyZSBzaXplIGluIHBpeGVsc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbWFnZUNvb3JkKGNlbGxDb29yZDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBjZWxsQ29vcmQgKyAoc2l6ZSAvIDQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIGJvcmRlcnMgZm9yIHNxdWFyZVxuICAgKlxuICAgKiBAcGFyYW0gY2VsbCAtIGdhbWUgYm9hcmQgY2VsbFxuICAgKiBAcGFyYW0gY2VsbC54IC0gY2VsbCB4IGNvb3JkaW5hdGVcbiAgICogQHBhcmFtIGNlbGwueSAtIGNlbGwgeSBjb29yZGluYXRlXG4gICAqIEBwYXJhbSBzaXplIC0gc3F1YXJlIHNpemUgaW4gcGl4ZWxzXG4gICAqL1xuICBwcml2YXRlIGRyYXdCb3JkZXJzKHsgeCwgeSB9OiBDZWxsLCBzaXplOiBQaXhlbHNBbW91bnQpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9ycy5CT1JERVJfQ09MT1I7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QoeCwgeSwgc2l6ZSwgc2l6ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gJy4uL2RpL3JlZ2lzdGVyJztcbmltcG9ydCB7IEdhbWVJbnRlcmZhY2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFNhcHBlciB9IGZyb20gJy4vaW5kZXgnO1xuXG5jb250YWluZXIucmVnaXN0ZXJTaW5nbGV0b248R2FtZUludGVyZmFjZSwgU2FwcGVyPigpOyIsIlxuaW1wb3J0IHsgVUlJbnRlcmZhY2UsIEN1c3RvbVByb3BlcnRpZXMgfSBmcm9tICdqdXN0LWVuZ2luZS9zcmMvdWkvdHlwZXMnO1xuaW1wb3J0IHsgU3RvcmFnZUludGVyZmFjZSB9IGZyb20gJ2p1c3QtZW5naW5lL3NyYy9zdG9yYWdlL3R5cGVzJztcbmltcG9ydCB7IENvbnRleHRJbnRlcmZhY2UgfSBmcm9tICdqdXN0LWVuZ2luZS9zcmMvY29udGV4dC90eXBlcyc7XG5pbXBvcnQgeyBEb21JbnRlcmZhY2UgfSBmcm9tICdqdXN0LWVuZ2luZS9zcmMvZG9tL3R5cGVzJztcbmltcG9ydCB7IE1hdGhJbnRlcmZhY2UgfSBmcm9tICdqdXN0LWVuZ2luZS9zcmMvbWF0aC90eXBlcyc7XG5cbmltcG9ydCB7IERyYXdlckludGVyZmFjZSB9IGZyb20gJy4uL2RyYXdlci90eXBlcyc7XG5pbXBvcnQgeyBHYW1lU2V0dGluZ3MgfSBmcm9tICcuLi9zZXR0aW5ncy90eXBlcyc7XG5pbXBvcnQgeyBNYXBTdHJ1Y3R1cmUsIEJ1aWxkZXJJbnRlcmZhY2UgfSBmcm9tICcuLi9idWlsZGVyL3R5cGVzJztcblxuaW1wb3J0IHsgR2FtZUludGVyZmFjZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogVGhlIG1haW4gY2xhc3Mgb2YgdGhlIGdhbWUgKi9cbmV4cG9ydCBjbGFzcyBTYXBwZXIgaW1wbGVtZW50cyBHYW1lSW50ZXJmYWNlIHtcbiAgICAvKiogSFRNTCBzZWxlY3QgZm9yIGNob2ljZSBvZiBkaWZmaWN1bHR5IGxldmVsICovXG4gICAgcHJpdmF0ZSBzZWxlY3Q6IE51bGxhYmxlPEhUTUxTZWxlY3RFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogSFRNTCBidXR0b24gZm9yIHN0YXJ0IGdhbWUgKi9cbiAgICBwcml2YXRlIHN0YXJ0R2FtZUJ1dHRvbjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcblxuICAgICAvKiogQ29udGFpbmVyIGZvciBiZXN0IGxldmVsIHRpbWUgKi9cbiAgICAgcHJpdmF0ZSBsZXZlbFRpbWU6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogVG8gZGlzcGxheSBiZXN0IGxldmVsIHRpbWUgYmVmb3JlIHRoZSBnYW1lICovXG4gICAgcHJpdmF0ZSBiZXN0TGV2ZWxUaW1lOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIEVsZW1lbnQgb24gd2hpY2ggdGhlIGdhbWUgd2lsbCBiZSBkcmF3biAqL1xuICAgIHByaXZhdGUgY2FudmFzOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIENvbnRhaW5lciBmb3IgZmllbGRzIGFuZCBvdGhlciBjb250YWluZXJzICovXG4gICAgcHJpdmF0ZSBnYW1lQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIFRvIGRpc3BsYXkgdGhlIHJlc3VsdHMgb2YgdGhlIGdhbWUgKi9cbiAgICBwcml2YXRlIHJlc3VsdENvbnRhaW5lcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+ID0gbnVsbDtcblxuICAgIC8qKiBDb250YWluZXIgZm9yIGN1cnJlbnQgdGltZSBhbmQgYmVzdCB0aW1lIG9mIHRoZSBnYW1lICovXG4gICAgcHJpdmF0ZSB3aW5Db250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogVG8gZGlzcGxheSB0aGUgcmVtYWluaW5nIG51bWJlciBvZiBib21icyAqL1xuICAgIHByaXZhdGUgbGVmdEJvbWJDb250YWluZXI6IE51bGxhYmxlPEhUTUxFbGVtZW50PiA9IG51bGw7XG5cbiAgICAvKiogdG8gZGlzcGxheSB0aGUgdGltZSBzaW5jZSB0aGUgc3RhcnQgb2YgdGhlIGdhbWUgKi9cbiAgICBwcml2YXRlIHRpbWVyQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIENvbnRhaW5lciBmb3IgY3VycmVudCB0aW1lIG9mIHRoZSBnYW1lIGluIHdpbiBjb250YWluZXIgKi9cbiAgICBwcml2YXRlIGN1cnJlbnRUaW1lQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIENvbnRhaW5lciBmb3IgYmVzdCB0aW1lIG9mIHRoZSBnYW1lIGluIHdpbiBjb250YWluZXIgKi9cbiAgICBwcml2YXRlIGJlc3RUaW1lQ29udGFpbmVyOiBOdWxsYWJsZTxIVE1MRWxlbWVudD4gPSBudWxsO1xuXG4gICAgLyoqIFN0cnVjdHVyZSBvZiB0aGUgZmllbGQgb2YgdGhlIHNlbGVjdGVkIGxldmVsIG9mIGRpZmZpY3VsdHkgKi9cbiAgICBwcml2YXRlIHN5c3RlbTogTWFwU3RydWN0dXJlO1xuXG4gICAgLyoqIENlbGwgc2l6ZSBpbiBwaXhlbHMgKi9cbiAgICBwcml2YXRlIGNlbGxQaXhlbHNTaXplOiBQaXhlbHNBbW91bnQ7XG5cbiAgICAvKiogVGltZXIgZm9yIGNvdW50aW5nIHRpbWUgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHByaXZhdGUgdGltZXJJbnRlcnZhbDogYW55OyAvLyB0b2RvOiBmaXggdHlwZVxuXG4gICAgLyoqIE51bWJlciBvZiBjb3JyZWN0bHkgYWxsb2NhdGVkIGJvbWJzICovXG4gICAgcHJpdmF0ZSBjb3VudENvcnJlY3RseVNlbGVjdGVkQm9tYnMgPSAwO1xuXG4gICAgLyoqIENvbG9yIHZhcmlhYmxlcyBmcm9tIGN1c3RvbSBwcm9wZXJ0aWVzICovXG4gICAgcHJpdmF0ZSBjb2xvcnM6IEN1c3RvbVByb3BlcnRpZXM7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc2V0dGluZ3MgLSBiYXNpYyBnYW1lIHNldHRpbmdzXG4gICAgICogQHBhcmFtIGNvbnRleHRJbnN0YW5jZSAtIHByb3ZpZGVzIHRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gZHJhd2VySW5zdGFuY2UgLSBmb3IgcGFpbnRpbmcgb24gY2FudmFzXG4gICAgICogQHBhcmFtIGRvbUluc3RhbmNlIC0gYWxsb3dzIGludGVyYWN0IHdpdGggdGhlIERPTSB0cmVlXG4gICAgICogQHBhcmFtIGJ1aWxkZXJJbnN0YW5jZSAtIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBsZXZlbHNcbiAgICAgKiBAcGFyYW0gbWF0aEluc3RhbmNlIC0gbWF0aCBudW1iZXIgZ2VuZXJhdG9yXG4gICAgICogQHBhcmFtIHN0b3JhZ2VJbnN0YW5jZSAtIGxvbmctdGVybSBzdG9yYWdlIG9mIGdhbWUgZGF0YVxuICAgICAqIEBwYXJhbSB1aUluc3RhbmNlIC0gdG8gY29udHJvbCB0aGUgVUkgaW4gdGhlIGdhbWVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzZXR0aW5nczogR2FtZVNldHRpbmdzLFxuICAgICAgICBwcml2YXRlIGNvbnRleHRJbnN0YW5jZTogQ29udGV4dEludGVyZmFjZSxcbiAgICAgICAgcHJpdmF0ZSBkcmF3ZXJJbnN0YW5jZTogRHJhd2VySW50ZXJmYWNlLFxuICAgICAgICBwcml2YXRlIGRvbUluc3RhbmNlOiBEb21JbnRlcmZhY2UsXG4gICAgICAgIHByaXZhdGUgYnVpbGRlckluc3RhbmNlOiBCdWlsZGVySW50ZXJmYWNlLFxuICAgICAgICBwcml2YXRlIG1hdGhJbnN0YW5jZTogTWF0aEludGVyZmFjZSxcbiAgICAgICAgcHJpdmF0ZSBzdG9yYWdlSW5zdGFuY2U6IFN0b3JhZ2VJbnRlcmZhY2UsXG4gICAgICAgIHByaXZhdGUgdWlJbnN0YW5jZTogVUlJbnRlcmZhY2UsXG4gICAgKSB7XG4gICAgICB0aGlzLnNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD5kb21JbnN0YW5jZS5nZXRFbGVtZW50KCdzZWxlY3QtbGV2ZWwnKTtcbiAgICAgIHRoaXMuc3RhcnRHYW1lQnV0dG9uID0gZG9tSW5zdGFuY2UuZ2V0RWxlbWVudCgnc3RhcnQtZ2FtZScpO1xuICAgICAgdGhpcy5sZXZlbFRpbWUgPSBkb21JbnN0YW5jZS5nZXRFbGVtZW50KCdsZXZlbC10aW1lJyk7XG4gICAgICB0aGlzLmJlc3RMZXZlbFRpbWUgPSBkb21JbnN0YW5jZS5nZXRFbGVtZW50KCdiZXN0LWxldmVsLXRpbWUnKTtcbiAgICAgIHRoaXMuY2FudmFzID0gZG9tSW5zdGFuY2UuZ2V0RWxlbWVudCgnY2FudmFzJyk7XG4gICAgICB0aGlzLmdhbWVDb250YWluZXIgPSBkb21JbnN0YW5jZS5nZXRFbGVtZW50KCdnYW1lLWNvbnRhaW5lcicpO1xuICAgICAgdGhpcy5yZXN1bHRDb250YWluZXIgPSBkb21JbnN0YW5jZS5nZXRFbGVtZW50KCdyZXN1bHQtY29udGFpbmVyJyk7XG4gICAgICB0aGlzLndpbkNvbnRhaW5lciA9IGRvbUluc3RhbmNlLmdldEVsZW1lbnQoJ3dpbi1jb250YWluZXInKTtcbiAgICAgIHRoaXMubGVmdEJvbWJDb250YWluZXIgPSBkb21JbnN0YW5jZS5nZXRFbGVtZW50KCdsZWZ0LWJvbWInKTtcbiAgICAgIHRoaXMudGltZXJDb250YWluZXIgPSBkb21JbnN0YW5jZS5nZXRFbGVtZW50KCd0aW1lcicpO1xuICAgICAgdGhpcy5jdXJyZW50VGltZUNvbnRhaW5lciA9IGRvbUluc3RhbmNlLmdldEVsZW1lbnQoJ2N1cnJlbnQtdGltZS1jb250YWluZXInKTtcbiAgICAgIHRoaXMuYmVzdFRpbWVDb250YWluZXIgPSBkb21JbnN0YW5jZS5nZXRFbGVtZW50KCdiZXN0LXRpbWUtY29udGFpbmVyJyk7XG4gICAgICB0aGlzLmNvbG9ycyA9IHRoaXMudWlJbnN0YW5jZS5nZXRDb2xvcnM7XG5cbiAgICAgIHRoaXMuY29udGV4dEluc3RhbmNlLmluaXQodGhpcy5zZXR0aW5ncy5jYW52YXNTaXplLCB0aGlzLnNldHRpbmdzLmRldmljZVBpeGVsUmF0aW8pO1xuICAgIH1cblxuICAgIC8qKiBJbml0aWFsaXplcyBnYW1lIGVuZ2luZSBhZnRlciB0aGUgRE9NIGhhcyBsb2FkZWQgKi9cbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICAgIHRoaXMuZG9tSW5zdGFuY2UuYWZ0ZXJMb2FkKCgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRMZXZlbCA9IHRoaXMuc3RvcmFnZUluc3RhbmNlLmdldCgnbGV2ZWwnKSB8fCAnZWFzeSc7XG5cbiAgICAgICAgLyoqIGlmIHdlIGhhdmUgcHJldmlvdXNseSBzZWxlY3RlZCB0aGUgbGV2ZWwsIHRoZW4gc2V0IGl0IGFnYWluICovXG4gICAgICAgIHRoaXMuY2hhbmdlTGV2ZWxJblNldHRpbmdzKHNlbGVjdGVkTGV2ZWwpO1xuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuc2V0dGluZ3MubGV2ZWxzKSB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uID0gPEhUTUxPcHRpb25FbGVtZW50PiB0aGlzLmRvbUluc3RhbmNlLmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXG4gICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0ga2V5O1xuICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGtleTtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdGhpcy5zZXR0aW5ncy5sZXZlbHNba2V5XS5zZWxlY3RlZDtcblxuICAgICAgICAgIC8qKiBzdWJzdGl0dXRlIHRoZSBzZWxlY3Rpb24gb3B0aW9ucyBpbnRvIHRoZSBzZWxlY3QgZnJvbSB0aGUgc2V0dGluZ3MgKi9cbiAgICAgICAgICB0aGlzLnNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VMZXZlbC5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5zdGFydEdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN0YXJ0LmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBHZW5lcmF0ZSBsZXZlbCBhbmQgc3RhcnQgdGhlIGdhbWUgKi9cbiAgICBwcml2YXRlIHN0YXJ0KCk6IHZvaWQge1xuICAgICAgdGhpcy5zeXN0ZW0gPSB0aGlzLmJ1aWxkZXJJbnN0YW5jZS5idWlsZCh0aGlzLnNldHRpbmdzKTtcbiAgICAgIHRoaXMuY2VsbFBpeGVsc1NpemUgPSB0aGlzLnN5c3RlbS5waXhlbHNDb3VudEluQ2VsbDtcblxuICAgICAgLy8gZGlzcGxheSBib21icyBsZWZ0IGFuZCB0aW1lciBhYm92ZSB0aGUgZmllbGRcbiAgICAgIHRoaXMubGVmdEJvbWJDb250YWluZXIudGV4dENvbnRlbnQgPSB0aGlzLnN5c3RlbS5ib21iTGVmdC50b1N0cmluZygpO1xuICAgICAgdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudCA9ICcwJztcblxuICAgICAgdGhpcy5jaGFuZ2VWaXNpYmlsaXR5RWxlbWVudHMoKTtcbiAgICAgIHRoaXMubWFrZUluaXRpYWxGaWxsKCk7XG4gICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcblxuICAgICAgdGhpcy5jb250ZXh0SW5zdGFuY2UubGlzdGVuQ2FudmFzQ2xpY2sodGhpcy5jaGVja0NsaWNrLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5jb250ZXh0SW5zdGFuY2UubGlzdGVuQ2FudmFzQ29udGV4dE1lbnUodGhpcy5jaGVja1JpZ2h0QnV0dG9uQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqIFN0YXJ0IHRpbWVyIGZvciBjb3VudGluZyB0aGUgbGV2ZWwgdGltZSAoaW4gc2Vjb25kcykgKi9cbiAgICBwcml2YXRlIHN0YXJ0VGltZXIoKTogdm9pZCB7XG4gICAgICBsZXQgc2Vjb25kcyA9IDA7XG5cbiAgICAgIC8vIGRpc3BsYXkgdGhlIGN1cnJlbnQgdGltZSBhYm92ZSB0aGUgZmllbGRcbiAgICAgIHRoaXMudGltZXJDb250YWluZXIudGV4dENvbnRlbnQgPSBTdHJpbmcoc2Vjb25kcysrKTtcblxuICAgICAgLy8gdXBkYXRlIHRoZSB0aW1lciBvbmNlIHBlciBzZWNvbmRcbiAgICAgIHRoaXMudGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudCA9IFN0cmluZyhzZWNvbmRzKyspO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcCB0aW1lciBhbmQgc2F2ZSB0aGUgbGV2ZWwgdGltZSBjb3VudFxuICAgICAqXG4gICAgICogQHBhcmFtIGlzV2luIC0gdHJ1ZSwgaWYgdGhlIGdhbWUgZW5kcyB3aXRoIGEgd2luXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdG9wVGltZXIoaXNXaW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lckludGVydmFsKTtcblxuICAgICAgaWYgKGlzV2luKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gdGhpcy50aW1lckNvbnRhaW5lci50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgY3VycmVudExldmVsID0gdGhpcy5zdG9yYWdlSW5zdGFuY2UuZ2V0KCdsZXZlbCcpO1xuICAgICAgICBjb25zdCBiZXN0VGltZVN0b3JhZ2VOYW1lID0gYGJlc3QtdGltZS0ke2N1cnJlbnRMZXZlbH1gO1xuICAgICAgICBjb25zdCBiZXN0VGltZSA9IHRoaXMuc3RvcmFnZUluc3RhbmNlLmdldChiZXN0VGltZVN0b3JhZ2VOYW1lKTtcbiAgICAgICAgbGV0IHRpbWUgPSAnJztcblxuICAgICAgICAvLyBkaXNwbGF5IGN1cnJlbnQgdGltZSBvbiB0aGUgZmluaXNoIHNjcmVlblxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lQ29udGFpbmVyLnRleHRDb250ZW50ID0gY3VycmVudFRpbWU7XG5cbiAgICAgICAgaWYgKGJlc3RUaW1lICYmIE51bWJlcihiZXN0VGltZSkgPCBOdW1iZXIoY3VycmVudFRpbWUpKSB7XG4gICAgICAgICAgdGltZSA9IGJlc3RUaW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RvcmFnZUluc3RhbmNlLnNhdmUoe1xuICAgICAgICAgIG5hbWU6IGJlc3RUaW1lU3RvcmFnZU5hbWUsXG4gICAgICAgICAgdmFsdWU6IHRpbWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRpc3BsYXkgYmVzdCB0aW1lIG9uIHRoZSBmaW5pc2ggc2NyZWVuXG4gICAgICAgIHRoaXMuYmVzdFRpbWVDb250YWluZXIudGV4dENvbnRlbnQgPSB0aW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoYW5nZXMgdGhlIGxldmVsIGFmdGVyIGNoYW5naW5nIHRoZSB2YWx1ZSBpbiB0aGUgc2VsZWN0XG4gICAgICpcbiAgICAgKiAgQHBhcmFtIGV2ZW50IC0gRE9NIGV2ZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGFuZ2VMZXZlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMuY2hhbmdlTGV2ZWxJblNldHRpbmdzKGV2ZW50LnRhcmdldC52YWx1ZSk7XG5cbiAgICAgIHRoaXMuc3RvcmFnZUluc3RhbmNlLnNhdmUoe1xuICAgICAgICBuYW1lOiAnbGV2ZWwnLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSBsZXZlbCBvZiB0aGUgZ2FtZSBpbiB0aGUgc2V0dGluZ3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzZWxlY3RlZExldmVsIC0gbmFtYSBvZiBzZWxlY3RlZCBsZXZlbFxuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlTGV2ZWxJblNldHRpbmdzKHNlbGVjdGVkTGV2ZWw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgY29uc3QgYmVzdFRpbWUgPSB0aGlzLnN0b3JhZ2VJbnN0YW5jZS5nZXQoYGJlc3QtdGltZS0ke3NlbGVjdGVkTGV2ZWx9YCk7XG5cbiAgICAgIC8vIGlmIHRoZSBsZXZlbCB3YXMgcGFzc2VkIGVhcmxpZXIsIHRoZW4gZGlzcGxheSBpdHMgYmVzdCB0aW1lIG9uIHRoZSBzdGFydCBzY3JlZW5cbiAgICAgIGlmIChiZXN0VGltZSkge1xuICAgICAgICB0aGlzLmxldmVsVGltZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgdGhpcy5iZXN0TGV2ZWxUaW1lLnRleHRDb250ZW50ID0gYmVzdFRpbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxldmVsVGltZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnNldHRpbmdzLmxldmVscykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2V0dGluZ3MubGV2ZWxzW2tleV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy5zZXR0aW5ncy5sZXZlbHNbc2VsZWN0ZWRMZXZlbF0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKiBDaGFuZ2VzIHZpc2liaWxpdHkgb2YgZ2FtZSBlbGVtZW50cyBvbiB0aGUgcGFnZSBhZnRlciBzdGFydCBvZiB0aGUgZ2FtZSAqL1xuICAgIHByaXZhdGUgY2hhbmdlVmlzaWJpbGl0eUVsZW1lbnRzKCk6IHZvaWQge1xuICAgICAgdGhpcy5zdGFydEdhbWVCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMuc2VsZWN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLmxldmVsVGltZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy5nYW1lQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICB0aGlzLmNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICAvKiogRmlsbHMgdGhlIGVudGlyZSBjYW52YXMgYnkgZGVmYXVsdCB3aXRoIHRoZSBkZWZhdWx0IGNvbG9yICovXG4gICAgcHJpdmF0ZSBtYWtlSW5pdGlhbEZpbGwoKTogdm9pZCB7XG4gICAgICBjb25zdCBzaXplOiBQaXhlbHNBbW91bnQgPSB0aGlzLnNldHRpbmdzLmNhbnZhc1NpemU7XG5cbiAgICAgIHRoaXMuZHJhd2VySW5zdGFuY2UuZHJhd1NxdWFyZSh7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICB9LCBzaXplLCB0aGlzLmNvbG9ycy5GSUVMRF9CR19DT0xPUik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhY2sgdGhlIGNsaWNrIG9uIHRoZSBjYW52YXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBtb3VzZUV2ZW50IC0gZXZlbnRzIHRoYXQgb2NjdXIgZHVlIHRvIHRoZSB1c2VyIGludGVyYWN0aW5nIHdpdGggYSBtb3VzZVxuICAgICAqIEBwYXJhbSBtb3VzZUV2ZW50Lm9mZnNldFggLSBvZmZzZXQgb2YgdGhlIG1vdXNlIGN1cnNvciBhbG9uZyB0aGUgWCBheGlzIGZyb20gdGhlIGVkZ2Ugb2YgdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBtb3VzZUV2ZW50Lm9mZnNldFkgLSBvZmZzZXQgb2YgdGhlIG1vdXNlIGN1cnNvciBhbG9uZyB0aGUgWSBheGlzIGZyb20gdGhlIGVkZ2Ugb2YgdGhlIGNhbnZhc1xuICAgICAqL1xuICAgIHByaXZhdGUgY2hlY2tDbGljayh7IG9mZnNldFgsIG9mZnNldFkgfTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbChvZmZzZXRYLCBvZmZzZXRZKTtcblxuICAgICAgLy8gdG8gY2xpY2sgb24gdGhlIGNlbGwgd2l0aCB0aGUgZmxhZyAtIGZpcnN0IHlvdSBuZWVkIHRvIHJlbW92ZSBpdFxuICAgICAgaWYgKCFjZWxsLmhhc0ZsYWcpIHtcbiAgICAgICAgaWYgKGNlbGwuaGFzQm9tYikge1xuICAgICAgICAgIHRoaXMub3BlbkJvbWJDZWxsKGNlbGwpOyAvLyBkcmF3IGEgYm9tYiBpbiB0aGUgc3BlY2lmaWVkIGNlbGxcbiAgICAgICAgICB0aGlzLm9wZW5BbGxCb21icygpOyAvLyBkcmF3IGFsbCB0aGUgb3RoZXIgYm9tYnNcbiAgICAgICAgICB0aGlzLnN0b3BHYW1lKCk7IC8vIHN0b3AgdGhlIGdhbWVcbiAgICAgICAgfSBlbHNlIGlmIChjZWxsLnZhbHVlICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5vcGVuTnVtYmVyU3F1YXJlKGNlbGwpOyAvLyBkcmF3IGEgY2VsbCB3aXRoIGEgbnVtYmVyXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcGVuRW1wdHlTcXVhcmUoY2VsbCk7IC8vIGRyYXcgYW4gZW1wdHkgY2VsbFxuICAgICAgICAgIHRoaXMucmVjdXJzaXZlT3BlbkFyZWEoY2VsbCk7IC8vIGdvIHRocm91Z2ggdGhlIG5laWdoYm9ycyBhbmQgZHJhdyB0aGUgY2VsbHMgdW50aWwgdGhlIG51bWJlciBhcHBlYXJzIGluIHRoZSBjZWxsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoZWNrSWZHYW1lU2hvdWxkU3RvcHBlZCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYWNrIHRoZSByaWdodCBtb3VzZSBidXR0b24gY2xpY2sgb24gdGhlIGNhbnZhc1xuICAgICAqXG4gICAgICogQHBhcmFtIG1vdXNlRXZlbnQgLSBldmVudHMgdGhhdCBvY2N1ciBkdWUgdG8gdGhlIHVzZXIgaW50ZXJhY3Rpbmcgd2l0aCBhIG1vdXNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGVja1JpZ2h0QnV0dG9uQ2xpY2sobW91c2VFdmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgLy8gcHJldmVudCB0aGUgY29udGV4dCBtZW51IGZyb20gb3BlbmluZ1xuICAgICAgbW91c2VFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsKG1vdXNlRXZlbnQub2Zmc2V0WCwgbW91c2VFdmVudC5vZmZzZXRZKTtcblxuICAgICAgaWYgKCFjZWxsLmlzT3Blbikge1xuICAgICAgICBpZiAoIWNlbGwuaGFzRmxhZykge1xuICAgICAgICAgIHRoaXMuc2V0RmxhZyhjZWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUZsYWcoY2VsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjZWxsIG9mIHRoZSBnZW5lcmF0ZWQgbGV2ZWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gb2Zmc2V0IG9mIHRoZSBtb3VzZSBjdXJzb3IgYWxvbmcgdGhlIFggYXhpcyBmcm9tIHRoZSBlZGdlIG9mIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAtIG9mZnNldCBvZiB0aGUgbW91c2UgY3Vyc29yIGFsb25nIHRoZSBZIGF4aXMgZnJvbSB0aGUgZWRnZSBvZiB0aGUgY2FudmFzXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRDZWxsKG9mZnNldFg6IG51bWJlciwgb2Zmc2V0WTogbnVtYmVyKTogQ2VsbCB7XG4gICAgICBjb25zdCB4ID0gdGhpcy5tYXRoSW5zdGFuY2UuZ2V0Rmxvb3JOdW1iZXIob2Zmc2V0WCAvIHRoaXMuc3lzdGVtLnBpeGVsc0NvdW50SW5DZWxsKTtcbiAgICAgIGNvbnN0IHkgPSB0aGlzLm1hdGhJbnN0YW5jZS5nZXRGbG9vck51bWJlcihvZmZzZXRZIC8gdGhpcy5zeXN0ZW0ucGl4ZWxzQ291bnRJbkNlbGwpO1xuXG4gICAgICByZXR1cm4gdGhpcy5zeXN0ZW0uY2VsbHNbeV1beF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiBhcmVhIG9mIGNlbGxzIGFyb3VuZCBhIGdpdmVuIGNlbGxcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gZ2FtZSBib2FyZCBjZWxsXG4gICAgICovXG4gICAgcHJpdmF0ZSByZWN1cnNpdmVPcGVuQXJlYShjZWxsOiBDZWxsKTogdm9pZCB7XG4gICAgICBmb3IgKGNvbnN0IGluZGV4IGluIGNlbGwuYXJlYSkge1xuICAgICAgICBjb25zdCBzeXN0ZW1DZWxsID0gdGhpcy5zeXN0ZW0uY2VsbHNbY2VsbC5hcmVhW2luZGV4XS55XVtjZWxsLmFyZWFbaW5kZXhdLnhdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBza2lwIGZyb20gcHJvY2Vzc2luZzpcbiAgICAgICAgICogIC0gb3BlbiBjZWxsXG4gICAgICAgICAqICAtIGZsYWcgY2VsbFxuICAgICAgICAgKiAgLSBib21iIGNlbGxcbiAgICAgICAgICovXG4gICAgICAgIGlmICghc3lzdGVtQ2VsbC5pc09wZW4gJiYgIXN5c3RlbUNlbGwuaGFzRmxhZyAmJiAhc3lzdGVtQ2VsbC5oYXNCb21iKSB7XG4gICAgICAgICAgaWYgKHN5c3RlbUNlbGwudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkVtcHR5U3F1YXJlKHN5c3RlbUNlbGwpO1xuXG4gICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZU9wZW5BcmVhKHN5c3RlbUNlbGwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5OdW1iZXJTcXVhcmUoc3lzdGVtQ2VsbCk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gZW1wdHkgY2VsbFxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGwgLSBnYW1lIGJvYXJkIGNlbGxcbiAgICAgKi9cbiAgICBwcml2YXRlIG9wZW5FbXB0eVNxdWFyZShjZWxsOiBDZWxsKTogdm9pZCB7XG4gICAgICB0aGlzLmRyYXdlckluc3RhbmNlLmRyYXdTcXVhcmUoe1xuICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbENvb3JkKGNlbGwueCksXG4gICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC55KSxcbiAgICAgIH0sIHRoaXMuY2VsbFBpeGVsc1NpemUsIHRoaXMuY29sb3JzLk1BSU5fQkdfQ09MT1IpO1xuXG4gICAgICBjZWxsLmlzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLnN5c3RlbS51c2VkQ2VsbHMrKztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIGNlbGwgd2l0aCBudW1iZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gZ2FtZSBib2FyZCBjZWxsXG4gICAgICovXG4gICAgcHJpdmF0ZSBvcGVuTnVtYmVyU3F1YXJlKGNlbGw6IENlbGwpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd2VySW5zdGFuY2UuZHJhd051bWJlcih7XG4gICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC54KSxcbiAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxDb29yZChjZWxsLnkpLFxuICAgICAgfSwgdGhpcy5jZWxsUGl4ZWxzU2l6ZSwgY2VsbC52YWx1ZSk7XG5cbiAgICAgIGNlbGwuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3lzdGVtLnVzZWRDZWxscysrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gY2VsbCB3aXRoIGJvbWJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gZ2FtZSBib2FyZCBjZWxsXG4gICAgICovXG4gICAgcHJpdmF0ZSBvcGVuQm9tYkNlbGwoY2VsbDogQ2VsbCk6IHZvaWQge1xuICAgICAgdGhpcy5kcmF3ZXJJbnN0YW5jZS5kcmF3Qm9tYih7XG4gICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC54KSxcbiAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxDb29yZChjZWxsLnkpLFxuICAgICAgfSwgdGhpcy5jZWxsUGl4ZWxzU2l6ZSk7XG5cbiAgICAgIGNlbGwuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3lzdGVtLnVzZWRDZWxscysrO1xuICAgIH1cblxuICAgIC8qKiBPcGVuIGFsbCBib21icyBvbiB0aGUgZmllbGQgKi9cbiAgICBwcml2YXRlIG9wZW5BbGxCb21icygpOiB2b2lkIHtcbiAgICAgIGNvbnN0IHsgYm9tYlBvc2l0aW9ucywgY2VsbHMsIGZpZWxkU2l6ZSB9ID0gdGhpcy5zeXN0ZW07XG5cbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgT2JqZWN0LmtleXMoY2VsbHMpLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgT2JqZWN0LmtleXMoY2VsbHNbeV0pLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgaWYgKGJvbWJQb3NpdGlvbnMuaW5jbHVkZXMoeCArIHkgKiBmaWVsZFNpemUpKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5Cb21iQ2VsbChjZWxsc1t5XVt4XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgZmxhZyBpbiBhIGNlbGwgYW5kIGNvdW50IHRoZSBjb3JyZWN0bHkgc2VsZWN0ZWQgYm9tYnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gZ2FtZSBib2FyZCBjZWxsXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRGbGFnKGNlbGw6IENlbGwpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd2VySW5zdGFuY2UuZHJhd0ZsYWcoe1xuICAgICAgICB4OiB0aGlzLmNhbGNQaXhlbENvb3JkKGNlbGwueCksXG4gICAgICAgIHk6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC55KSxcbiAgICAgIH0sIHRoaXMuY2VsbFBpeGVsc1NpemUpO1xuXG4gICAgICBjZWxsLmhhc0ZsYWcgPSB0cnVlO1xuICAgICAgdGhpcy5zeXN0ZW0udXNlZENlbGxzKys7XG5cbiAgICAgIHRoaXMuc3lzdGVtLmJvbWJMZWZ0ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQgLSAxO1xuICAgICAgLy8gZGlzcGxheWluZyB0aGUgbnVtYmVyIG9mIHJlbWFpbmluZyBib21icyBvdmVyIHRoZSBmaWVsZFxuICAgICAgdGhpcy5sZWZ0Qm9tYkNvbnRhaW5lci50ZXh0Q29udGVudCA9IHRoaXMuc3lzdGVtLmJvbWJMZWZ0LnRvU3RyaW5nKCk7XG5cbiAgICAgIGlmIChjZWxsLmhhc0JvbWIpIHtcbiAgICAgICAgdGhpcy5jb3VudENvcnJlY3RseVNlbGVjdGVkQm9tYnMrKztcbiAgICAgIH1cblxuICAgICAgdGhpcy5jaGVja0lmR2FtZVNob3VsZFN0b3BwZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZmxhZyBmcm9tIGNlbGxcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjZWxsIC0gZ2FtZSBib2FyZCBjZWxsXG4gICAgICovXG4gICAgcHJpdmF0ZSByZW1vdmVGbGFnKGNlbGw6IENlbGwpOiB2b2lkIHtcbiAgICAgIHRoaXMuZHJhd2VySW5zdGFuY2UuZHJhd1NxdWFyZSh7XG4gICAgICAgIHg6IHRoaXMuY2FsY1BpeGVsQ29vcmQoY2VsbC54KSxcbiAgICAgICAgeTogdGhpcy5jYWxjUGl4ZWxDb29yZChjZWxsLnkpLFxuICAgICAgfSwgdGhpcy5jZWxsUGl4ZWxzU2l6ZSwgdGhpcy5jb2xvcnMuRklFTERfQkdfQ09MT1IsIGZhbHNlKTtcblxuICAgICAgY2VsbC5oYXNGbGFnID0gZmFsc2U7XG4gICAgICB0aGlzLnN5c3RlbS51c2VkQ2VsbHMtLTtcblxuICAgICAgdGhpcy5zeXN0ZW0uYm9tYkxlZnQgPSB0aGlzLnN5c3RlbS5ib21iTGVmdCArIDE7XG4gICAgICAvLyBkaXNwbGF5aW5nIHRoZSBudW1iZXIgb2YgcmVtYWluaW5nIGJvbWJzIG92ZXIgdGhlIGZpZWxkXG4gICAgICB0aGlzLmxlZnRCb21iQ29udGFpbmVyLnRleHRDb250ZW50ID0gdGhpcy5zeXN0ZW0uYm9tYkxlZnQudG9TdHJpbmcoKTtcblxuICAgICAgaWYgKGNlbGwuaGFzQm9tYikge1xuICAgICAgICB0aGlzLmNvdW50Q29ycmVjdGx5U2VsZWN0ZWRCb21icy0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgaW5pdGlhbCBjb29yZGluYXRlcyBvZiB0aGUgY2VsbCBpbiBwaXhlbHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb29yZCAtIGNvb3JkaW5hdGUgb24gdGhlIHBsYXlpbmcgZmllbGRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGNQaXhlbENvb3JkKGNvb3JkOiBGaWVsZENvb3JkaW5hdGUpOiBQaXhlbHNBbW91bnQge1xuICAgICAgcmV0dXJuIE51bWJlcihjb29yZCkgKiB0aGlzLmNlbGxQaXhlbHNTaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3AgZ2FtZVxuICAgICAqXG4gICAgICogQHBhcmFtIGlzV2luIC0gdHJ1ZSwgaWYgdGhlIGdhbWUgZW5kcyB3aXRoIGEgd2luXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdG9wR2FtZShpc1dpbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgICB0aGlzLnN0b3BUaW1lcihpc1dpbik7XG5cbiAgICAgIC8vIHNob3cgdGhlIHJlc3RhcnQgYnV0dG9uXG4gICAgICB0aGlzLnJlc3VsdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXG4gICAgICBpZiAoaXNXaW4pIHtcbiAgICAgICAgLy8gaWYgeW91IHdvbiwgc2hvdyBjb25ncmF0dWxhdGlvbnNcbiAgICAgICAgdGhpcy53aW5Db250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyBpcyB0byBhbmltYXRlIHRoZSBiYWNrZ3JvdW5kIGFwcGVhcmFuY2VcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc3VsdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdyZXN1bHQtY29udGFpbmVyLS1pcy12aXNpYmxlJyk7XG4gICAgICB9LCA1MCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGNvbmRpdGlvbnMgZm9yIHN0b3BwaW5nIHRoZSBnYW1lXG4gICAgICovXG4gICAgcHJpdmF0ZSBjaGVja0lmR2FtZVNob3VsZFN0b3BwZWQoKTogdm9pZCB7XG4gICAgICAvLyBoYXMgemVybyBib21iXG4gICAgICBpZiAoISh0aGlzLnN5c3RlbS5ib21iTGVmdCA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhbGwgYm9tYnMgYXJlIGNvcnJlY3RseSBzZWxlY3RlZFxuICAgICAgaWYgKCEodGhpcy5zeXN0ZW0uYm9tYkNvdW50ID09PSB0aGlzLmNvdW50Q29ycmVjdGx5U2VsZWN0ZWRCb21icykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBhbGwgY2VsbHMgYXJlIG9wZW5lZFxuICAgICAgaWYgKCEodGhpcy5zeXN0ZW0udXNlZENlbGxzID09PSAodGhpcy5zeXN0ZW0uZmllbGRTaXplICogdGhpcy5zeXN0ZW0uZmllbGRTaXplKSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBzdG9wIHRoZSBnYW1lIHdpdGggYSB3aW4gaWYgYWxsIHRoZSBib21icyBoYXZlIHJ1biBvdXQgYW5kIGFyZSBtYXJrZWQgd2l0aCBmbGFncyBjb3JyZWN0bHlcbiAgICAgIHRoaXMuc3RvcEdhbWUodHJ1ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY29udGFpbmVyIH0gZnJvbSAnLi4vZGkvcmVnaXN0ZXInO1xuaW1wb3J0IHsgR2FtZVNldHRpbmdzIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi9pbmRleCc7XG5cbmNvbnRhaW5lci5yZWdpc3RlclNpbmdsZXRvbjxHYW1lU2V0dGluZ3M+KCgpID0+IHNldHRpbmdzKTtcbiIsImltcG9ydCB7IEdhbWVTZXR0aW5ncyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgbGV2ZWxzIH0gZnJvbSAnLi9sZXZlbHMnO1xuXG4vKiogQmFzaWMgZ2FtZSBzZXR0aW5ncyAqL1xuY29uc3Qgc2V0dGluZ3M6IEdhbWVTZXR0aW5ncyA9IHtcbiAgLyoqIFNpemUgb2YgdGhlIGZpZWxkIGluIHBpeGVscyAqL1xuICBjYW52YXNTaXplOiA4MDAsXG5cbiAgLyoqIFRoZSByYXRpbyBvZiB0aGUgZGlzcGxheSByZXNvbHV0aW9uIG9mIHRoZSBjdXJyZW50IGRldmljZSBpbiBwaHlzaWNhbCBwaXhlbHMgdG8gdGhlIHJlc29sdXRpb24gaW4gbG9naWNhbCAoQ1NTKSBwaXhlbHMgKi9cbiAgZGV2aWNlUGl4ZWxSYXRpbzogMSxcblxuICAvKiogTGlzdCBvZiBnYW1lIGRpZmZpY3VsdHkgbGV2ZWxzICovXG4gIGxldmVscyxcbn07XG5cbi8qKiBTbWFsbCBoYXJkY29kZSBmb3IgMTMgaW5jaCBkaXNwbGF5ICovXG5pZiAod2luZG93LmlubmVySGVpZ2h0IDwgODUwKSB7XG4gIHNldHRpbmdzLmNhbnZhc1NpemUgPSA2MDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdzOyIsImltcG9ydCB7IENvbXBsZXhpdHlMaXN0IH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBMaXN0IG9mIGdhbWUgZGlmZmljdWx0eSBsZXZlbHMgKi9cbmV4cG9ydCBjb25zdCBsZXZlbHM6IENvbXBsZXhpdHlMaXN0ID0ge1xuICBiZWdpbm5lcjoge1xuICAgIGJvbWJDb3VudDogMTAsXG4gICAgZmllbGRTaXplOiAyMCxcbiAgICBzZWxlY3RlZDogZmFsc2UsXG4gIH0sXG4gIGVhc3k6IHtcbiAgICBib21iQ291bnQ6IDE1LFxuICAgIGZpZWxkU2l6ZTogMTAsXG4gICAgc2VsZWN0ZWQ6IHRydWUsXG4gIH0sXG4gIG1lZGl1bToge1xuICAgIGJvbWJDb3VudDogNDAsXG4gICAgZmllbGRTaXplOiAyMCxcbiAgICBzZWxlY3RlZDogZmFsc2UsXG4gIH0sXG4gIGhhcmQ6IHtcbiAgICBib21iQ291bnQ6IDEwMCxcbiAgICBmaWVsZFNpemU6IDIwLFxuICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgfSxcbiAgaHVnZToge1xuICAgIGJvbWJDb3VudDogMjIwLFxuICAgIGZpZWxkU2l6ZTogMzIsXG4gICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICB9LFxuICBleHRyZW1lOiB7XG4gICAgYm9tYkNvdW50OiAxNTAsXG4gICAgZmllbGRTaXplOiAyMCxcbiAgICBzZWxlY3RlZDogZmFsc2UsXG4gIH0sXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IHsgY29udGFpbmVyIH0gZnJvbSAnLi9kaS9yZWdpc3Rlcic7XG5pbXBvcnQgeyBHYW1lSW50ZXJmYWNlIH0gZnJvbSAnLi9nYW1lL3R5cGVzJztcblxuaW1wb3J0ICcuL2ltZy9ib21iLnBuZyc7XG5pbXBvcnQgJy4vaW1nL2ZsYWcucG5nJztcblxuaW1wb3J0ICcuL2luZGV4LnNjc3MnO1xuXG5jb25zdCBzYXBwZXIgPSBjb250YWluZXIuZ2V0PEdhbWVJbnRlcmZhY2U+KCk7XG5cbnNhcHBlci5pbml0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9