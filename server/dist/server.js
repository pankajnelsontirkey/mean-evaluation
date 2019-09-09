/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/db.js":
/*!**************************!*\
  !*** ./src/config/db.js ***!
  \**************************/
/*! exports provided: DB_INIT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DB_INIT\", function() { return DB_INIT; });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nvar DB_URI;\nvar DB_INIT = function DB_INIT(DB_URI) {\n  switch (\"development\") {\n    case 'development':\n      DB_URI = process.env.DB_LOCAL_URI;\n      break;\n\n    case 'production':\n      DB_URI = process.env.DB_CLOUD_URI;\n      break;\n  }\n\n  console.log(DB_URI);\n  mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Promise = global.Promise; // mongoose.connect(DB_URI, { useNewUrlParser: true });\n};\n\n//# sourceURL=webpack:///./src/config/db.js?");

/***/ }),

/***/ "./src/controllers/authController.js":
/*!*******************************************!*\
  !*** ./src/controllers/authController.js ***!
  \*******************************************/
/*! exports provided: authController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"authController\", function() { return authController; });\n/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.array.find */ \"core-js/modules/es6.array.find\");\n/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _models_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/models */ \"./src/models/models.js\");\n\n\nvar authController = {\n  login: function login(req, res) {\n    _models_models__WEBPACK_IMPORTED_MODULE_1__[\"userModel\"].find({\n      email: req.body.email\n    }, function (err, user) {\n      if (err) {\n        res.status(500).send({\n          message: err\n        });\n      }\n\n      if (!user) {\n        res.status(404).send({\n          message: 'Email not found'\n        });\n      }\n\n      res.status(200).json(user);\n    });\n  },\n  signup: function signup(req, res) {\n    var user = new _models_models__WEBPACK_IMPORTED_MODULE_1__[\"userModel\"](req.body);\n    user.save().then(function (user) {\n      console.log(user);\n      res.status(200).json(user);\n    });\n  }\n};\n\n//# sourceURL=webpack:///./src/controllers/authController.js?");

/***/ }),

/***/ "./src/expressApp.js":
/*!***************************!*\
  !*** ./src/expressApp.js ***!
  \***************************/
/*! exports provided: ExpressApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ExpressApp\", function() { return ExpressApp; });\n/* harmony import */ var core_js_modules_es6_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.object.define-property */ \"core-js/modules/es6.object.define-property\");\n/* harmony import */ var core_js_modules_es6_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_define_property__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _routes_api_testRoutes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/api/testRoutes */ \"./src/routes/api/testRoutes.js\");\n/* harmony import */ var _routes_authRoutes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/authRoutes */ \"./src/routes/authRoutes.js\");\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\nvar ExpressApp =\n/*#__PURE__*/\nfunction () {\n  function ExpressApp() {\n    _classCallCheck(this, ExpressApp);\n\n    this.app = express__WEBPACK_IMPORTED_MODULE_1___default()();\n    this.config();\n  }\n\n  _createClass(ExpressApp, [{\n    key: \"config\",\n    value: function config() {\n      this.app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\n      this.app.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n        extended: false\n      }));\n      this.app.use(cors__WEBPACK_IMPORTED_MODULE_3___default()());\n      this.app.use('/', _routes_authRoutes__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n      this.app.use('/api/v1', _routes_api_testRoutes__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    }\n  }]);\n\n  return ExpressApp;\n}();\n\n//# sourceURL=webpack:///./src/expressApp.js?");

/***/ }),

/***/ "./src/models/models.js":
/*!******************************!*\
  !*** ./src/models/models.js ***!
  \******************************/
/*! exports provided: userModel, tokenModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"userModel\", function() { return userModel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tokenModel\", function() { return tokenModel; });\n/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ \"core-js/modules/es6.promise\");\n/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.object.to-string */ \"core-js/modules/es6.object.to-string\");\n/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es6_date_now__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.date.now */ \"core-js/modules/es6.date.now\");\n/* harmony import */ var core_js_modules_es6_date_now__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_date_now__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"regenerator-runtime/runtime\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\nvar Schema = __webpack_require__(/*! mongoose */ \"mongoose\").Schema;\n\nvar SECRET = process.env.SECRET;\nvar userSchema = new Schema({\n  email: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  password: {\n    type: String,\n    required: true\n  },\n  firstName: {\n    type: String,\n    required: true\n  },\n  lastName: {\n    type: String,\n    required: true\n  },\n  dob: {\n    type: Date\n    /* , required: true  */\n\n  },\n  emailVerified: {\n    type: Boolean,\n    \"default\": false\n  },\n  passwordResetToken: {\n    type: String,\n    \"default\": null\n  },\n  passwordResetExpires: {\n    type: Date,\n    \"default\": null\n  }\n});\n/* to replace plain text password with its hash before saving to db */\n\nuserSchema.pre('save',\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(next) {\n    var hash;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return bcrypt__WEBPACK_IMPORTED_MODULE_5__[\"hash\"](this.password, 10);\n\n          case 2:\n            hash = _context.sent;\n            this.password = hash;\n            next();\n\n          case 5:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, this);\n  }));\n\n  return function (_x) {\n    return _ref.apply(this, arguments);\n  };\n}());\n/* to validate  password that arrives from login with the one save in db */\n\nuserSchema.methods.validatePassword =\n/*#__PURE__*/\nfunction () {\n  var _ref2 = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee2(password) {\n    var passwordMatch;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.next = 2;\n            return bcrypt__WEBPACK_IMPORTED_MODULE_5__[\"compare\"](password, this.password);\n\n          case 2:\n            passwordMatch = _context2.sent;\n            return _context2.abrupt(\"return\", passwordMatch);\n\n          case 4:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, this);\n  }));\n\n  return function (_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n/* to generate a JWT token to be sent as response on successful login */\n\n\nuserSchema.methods.generateJWT =\n/*#__PURE__*/\n_asyncToGenerator(\n/*#__PURE__*/\nregeneratorRuntime.mark(function _callee3() {\n  var today, expirationDate;\n  return regeneratorRuntime.wrap(function _callee3$(_context3) {\n    while (1) {\n      switch (_context3.prev = _context3.next) {\n        case 0:\n          today = new Date();\n          expirationDate = new Date(today);\n          expirationDate.setDate(today.getDate() + 60);\n          return _context3.abrupt(\"return\", jsonwebtoken__WEBPACK_IMPORTED_MODULE_6__[\"sign\"]({\n            email: this.email,\n            id: this._id,\n            expiresIn: parseInt(expirationDate.getTime() / 1000, 10)\n          }, SECRET));\n\n        case 4:\n        case \"end\":\n          return _context3.stop();\n      }\n    }\n  }, _callee3, this);\n}));\n/* for use when creating tokens for emailVerification & forgot/reset password use cases */\n\nvar tokenSchema = new Schema({\n  _id: {\n    type: mongoose__WEBPACK_IMPORTED_MODULE_4__[\"Schema\"].Types.ObjectId,\n    required: true,\n    ref: 'Users'\n  },\n  token: {\n    type: String,\n    required: true\n  },\n\n  /* 'createdAt' - 'expires' set to 24hrs (*60*60) in seconds */\n  createdAt: {\n    type: Date,\n    required: true,\n    \"default\": Date.now,\n    expires: 86400\n  }\n}); // eslint-disable-next-line new-cap\n\nvar userModel = new mongoose__WEBPACK_IMPORTED_MODULE_4__[\"model\"]('users', userSchema);\nvar tokenModel = new mongoose__WEBPACK_IMPORTED_MODULE_4__[\"model\"]('tokens', tokenSchema);\n\n//# sourceURL=webpack:///./src/models/models.js?");

/***/ }),

/***/ "./src/routes/api/testRoutes.js":
/*!**************************************!*\
  !*** ./src/routes/api/testRoutes.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\nvar router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\nrouter.get('/', function (req, res) {\n  res.send(\"Received a GET request at '/api/v1'\");\n});\nrouter.post('/', function (req, res) {\n  console.log(req.body);\n  res.send(\"Received a POST request at '/api/v1'\");\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/routes/api/testRoutes.js?");

/***/ }),

/***/ "./src/routes/authRoutes.js":
/*!**********************************!*\
  !*** ./src/routes/authRoutes.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_authController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/authController */ \"./src/controllers/authController.js\");\n\n\nvar router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n/* router.get('/login', (req, res) => {\n  res.send('received GET req at /login');\n}); */\n\nrouter.post('/login', _controllers_authController__WEBPACK_IMPORTED_MODULE_1__[\"authController\"].login);\n/* router.get('/signup', (req, res) => {\n  res.send('received GET req at /signup');\n}); */\n\nrouter.post('/signup', _controllers_authController__WEBPACK_IMPORTED_MODULE_1__[\"authController\"].signup);\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/routes/authRoutes.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _expressApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expressApp */ \"./src/expressApp.js\");\n/* harmony import */ var _config_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/db */ \"./src/config/db.js\");\n\nObject(dotenv__WEBPACK_IMPORTED_MODULE_0__[\"config\"])();\n\n\nvar App = new _expressApp__WEBPACK_IMPORTED_MODULE_1__[\"ExpressApp\"]().app;\nvar PORT = process.env.PORT;\nObject(_config_db__WEBPACK_IMPORTED_MODULE_2__[\"DB_INIT\"])();\nApp.listen(PORT, function () {\n  console.log(\"Server is listening on port: \".concat(PORT));\n});\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "core-js/modules/es6.array.find":
/*!*************************************************!*\
  !*** external "core-js/modules/es6.array.find" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/modules/es6.array.find\");\n\n//# sourceURL=webpack:///external_%22core-js/modules/es6.array.find%22?");

/***/ }),

/***/ "core-js/modules/es6.date.now":
/*!***********************************************!*\
  !*** external "core-js/modules/es6.date.now" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/modules/es6.date.now\");\n\n//# sourceURL=webpack:///external_%22core-js/modules/es6.date.now%22?");

/***/ }),

/***/ "core-js/modules/es6.object.define-property":
/*!*************************************************************!*\
  !*** external "core-js/modules/es6.object.define-property" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/modules/es6.object.define-property\");\n\n//# sourceURL=webpack:///external_%22core-js/modules/es6.object.define-property%22?");

/***/ }),

/***/ "core-js/modules/es6.object.to-string":
/*!*******************************************************!*\
  !*** external "core-js/modules/es6.object.to-string" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/modules/es6.object.to-string\");\n\n//# sourceURL=webpack:///external_%22core-js/modules/es6.object.to-string%22?");

/***/ }),

/***/ "core-js/modules/es6.promise":
/*!**********************************************!*\
  !*** external "core-js/modules/es6.promise" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"core-js/modules/es6.promise\");\n\n//# sourceURL=webpack:///external_%22core-js/modules/es6.promise%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "regenerator-runtime/runtime":
/*!**********************************************!*\
  !*** external "regenerator-runtime/runtime" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"regenerator-runtime/runtime\");\n\n//# sourceURL=webpack:///external_%22regenerator-runtime/runtime%22?");

/***/ })

/******/ });