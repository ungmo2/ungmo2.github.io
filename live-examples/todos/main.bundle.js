webpackJsonp([2,4],{

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(72);


/***/ }),

/***/ 71:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 71;


/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(86);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-root',
        template: "<app-todos></app-todos>"
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_todos_component__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_todo_form_component__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_todo_list_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_todo_component__ = __webpack_require__(84);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__components_todos_component__["a" /* TodosComponent */],
            __WEBPACK_IMPORTED_MODULE_6__components_todo_form_component__["a" /* TodoFormComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_todo_list_component__["a" /* TodoListComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_todo_component__["a" /* TodoComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TodoFormComponent = (function () {
    function TodoFormComponent() {
        // 부모컴포넌트 todos와의 통신
        this.onAdd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    TodoFormComponent.prototype.onClickAddBtn = function () {
        if (!this.label)
            return;
        // 부모컴포넌트 todos에게 label을 전달
        this.onAdd.emit(this.label);
        this.label = '';
    };
    return TodoFormComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", Object)
], TodoFormComponent.prototype, "onAdd", void 0);
TodoFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-todo-form',
        template: "\n    <div class=\"input-group\">\n      <input type=\"text\" name=\"label\" [(ngModel)]=\"label\"  class=\"form-control\" placeholder=\"Todo\">\n      <span class=\"input-group-btn\">\n        <button class=\"btn btn-info\" (click)=\"onClickAddBtn()\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span></button>\n      </span>\n    </div>\n  "
    })
], TodoFormComponent);

//# sourceMappingURL=todo-form.component.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TodoListComponent = (function () {
    function TodoListComponent() {
        // 부모컴포넌트 todos와의 통신을 위해
        this.onComplete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onRemove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    return TodoListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], TodoListComponent.prototype, "todos", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", Object)
], TodoListComponent.prototype, "onComplete", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", Object)
], TodoListComponent.prototype, "onRemove", void 0);
TodoListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-todo-list',
        template: "\n    <ul>\n      <li *ngFor=\"let todo of todos\">\n        <app-todo [todo]=\"todo\" (onComplete)=\"onComplete.emit($event)\" (onRemove)=\"onRemove.emit($event)\"></app-todo>\n      </li>\n    </ul>\n  ",
        styles: ["\n    ul {\n      margin-top: 20px;\n      padding: 0;\n    }\n    li {\n      list-style-type: none;\n    }\n  "]
    })
], TodoListComponent);

//# sourceMappingURL=todo-list.component.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TodoComponent = (function () {
    function TodoComponent() {
        // 부모컴포넌트 todo-list와의 통신을 위해
        this.onComplete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
        this.onRemove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* EventEmitter */]();
    }
    return TodoComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* Input */])(),
    __metadata("design:type", Object)
], TodoComponent.prototype, "todo", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", Object)
], TodoComponent.prototype, "onComplete", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_2" /* Output */])(),
    __metadata("design:type", Object)
], TodoComponent.prototype, "onRemove", void 0);
TodoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-todo',
        template: "\n    <div class=\"item\" [ngClass]=\"{ complete: todo.completed }\">\n      <div class=\"item-label\">{{ todo.label }}</div>\n      <div class=\"item-btn-wrap\">\n        <button type=\"button\" class=\"btn btn-success btn-sm\" (click)=\"onComplete.emit(todo)\">\n          <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n        </button>\n        <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"onRemove.emit(todo)\">\n          <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>\n        </button>\n      </div>\n    </div>\n  ",
        styles: ["\n    .item {\n      width: 100%;\n      height: 40px;\n      line-height: 40px;\n      border-bottom: 1px solid #cccccc;\n      margin-bottom: 20px;\n    }\n    .complete .item-label {\n      text-decoration: line-through;\n    }\n    .item-label {\n      float: left;\n      padding-left: 10px;\n    }\n    .item-btn-wrap {\n      float: right;\n    }\n  "]
    })
], TodoComponent);

//# sourceMappingURL=todo.component.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TodosComponent = (function () {
    function TodosComponent() {
    }
    TodosComponent.prototype.addTodo = function (label) {
        if (!this.todos) {
            this.todos = [{ id: 1, label: label, completed: false }];
        }
        else {
            this.todos = [{ id: this.todos.length + 1, label: label, completed: false }].concat(this.todos);
        }
    };
    TodosComponent.prototype.completeTodo = function (todo) {
        for (var i = 0; i < this.todos.length; i++) {
            if (this.todos[i].id === todo.id) {
                this.todos[i].completed = !this.todos[i].completed;
            }
        }
        // this.todos = this.todos.map(
        //   item => item.id === todo.id ? Object.assign({}, item, { completed: true }) : item
        // );
        console.table(this.todos);
    };
    TodosComponent.prototype.removeTodo = function (todo) {
        // Object destructuring
        this.todos = this.todos.filter(function (_a) {
            var id = _a.id;
            return id !== todo.id;
        });
        console.table(this.todos);
    };
    return TodosComponent;
}());
TodosComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'app-todos',
        template: "\n    <h1>todos</h1>\n    <div>\n      <app-todo-form (onAdd)=\"addTodo($event)\"></app-todo-form>\n      <app-todo-list [todos]=\"todos\" (onComplete)=\"completeTodo($event)\" (onRemove)=\"removeTodo($event)\"></app-todo-list>\n    </div>\n    <pre *ngIf=\"(todos)?.length\">{{ todos | json }}</pre>\n  ",
        styles: ["\n    :host {\n      display: block;\n      max-width: 550px;\n      margin: 0 auto;\n    }\n    :host /deep/ .btn:focus,.btn:active {\n      outline: none !important;\n    }\n    h1 {\n      font-size: 80px;\n      font-weight: 300;\n      text-align: center;\n      color: #5bc0de;\n      margin-bottom: 30px;\n    }\n  "]
    })
], TodosComponent);

//# sourceMappingURL=todos.component.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[170]);
//# sourceMappingURL=main.bundle.js.map