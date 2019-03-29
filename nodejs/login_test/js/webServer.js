"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restFullApi_1 = require("./restFullApi");
var restFullApi_2 = require("./restFullApi");
var WebServer = (function () {
    function WebServer(port) {
        this.port = port;
        this.addEndPoints();
        this.start();
    }
    WebServer.prototype.addEndPoints = function () {
        var endPoint = new restFullApi_1.addEndPoint();
        endPoint.index();
        endPoint.users();
        endPoint.findAllUsers();
    };
    WebServer.prototype.start = function () {
        var start = new restFullApi_2.StartAPI(this.port);
        start;
    };
    return WebServer;
}());
var port = 3000;
new WebServer(port);
//# sourceMappingURL=webServer.js.map