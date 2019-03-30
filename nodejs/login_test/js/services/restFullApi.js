"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var assert = require("assert");
var bodyParser = require('body-parser');
var path = require('path');
var mongoUtil = require("../database/mongoConnection");
var app = express();
var collection = "employee";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var addEndPoint = (function () {
    function addEndPoint() {
    }
    addEndPoint.prototype.index = function () {
        var endPoint = "/";
        app.get(endPoint, function (_, response) {
            response.sendFile(path.join(__dirname + "/../html/index.html"));
        });
    };
    addEndPoint.prototype.users = function () {
        var endpoint = "/api/users";
        app.post(endpoint, function (request, response) {
            var firstName = request.body.firstName;
            var lastName = request.body.lastName;
            response.send("firstName: " + firstName + " <> lastName: " + lastName);
            console.log(request.body);
        });
    };
    addEndPoint.prototype.findAllUsers = function () {
        var endpoint = "/api/queries/findAllUsers";
        app.post(endpoint, function (request, response) {
            mongoUtil.connectToServer(function (err) {
                var db = mongoUtil.getConnection();
                db.collection(collection).find({}).toArray(function (err, result) {
                    assert.equal(null, err);
                    console.log(result);
                    response.send(result);
                    mongoUtil.disconnect();
                });
            });
        });
    };
    return addEndPoint;
}());
exports.addEndPoint = addEndPoint;
var StartAPI = (function () {
    function StartAPI(port) {
        app.listen(port);
        console.log("(info) Server started! at => http://localhost:" + port);
    }
    return StartAPI;
}());
exports.StartAPI = StartAPI;
