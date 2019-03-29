"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API = (function () {
    function API(port) {
        this.GET = new (function () {
            function class_1() {
            }
            Object.defineProperty(class_1.prototype, "setApp", {
                set: function (app) {
                    this.app = app;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(class_1.prototype, "setPath", {
                set: function (path) {
                    this.path = path;
                },
                enumerable: true,
                configurable: true
            });
            class_1.prototype.indexHTML = function () {
                var endPoint = "/";
                this.app.get(endPoint, function (_, response) {
                    response.sendFile(this.path.join(__dirname + "../html/index.html"));
                    console.log("serve => index.html");
                });
            };
            return class_1;
        }());
        var express = require("express");
        var bodyParser = require('body-parser');
        this.path = require('path');
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.listen(port);
        console.log("Server started! at => http://localhost:" + port);
    }
    Object.defineProperty(API.prototype, "getApp", {
        get: function () {
            return this.app;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(API.prototype, "getPath", {
        get: function () {
            return this.path;
        },
        enumerable: true,
        configurable: true
    });
    API.prototype.POST = function () {
        var _this = this;
        var login = function () {
            var endPoint = "/login";
            _this.app.post(endPoint, function (request, response) {
                var firstname = request.body.firstname;
                var lastname = request.body.lastname;
                response.send("name is: " + name + " <> lastname is " + lastname);
                console.log(request.body);
            });
        };
    };
    return API;
}());
exports.API = API;
//# sourceMappingURL=restFullApi.js.map