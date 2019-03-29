"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var restFullApi_1 = require("./restFullApi");
var WebServer = (function (_super) {
    __extends(WebServer, _super);
    function WebServer() {
        var _this = this;
        var port = "3000";
        _this = _super.call(this, port) || this;
        return _this;
    }
    return WebServer;
}(restFullApi_1.API));
var web = new WebServer();
var app = web.getApp;
var path = web.getPath;
console.log("app = " + app + " <> path = " + path);
web.GET.setApp = app;
web.GET.setPath = path;
web.GET.indexHTML;
//# sourceMappingURL=webServer.js.map