# Table of Contents

- [Connecting Services](#connecting-services)
  * [Overview](#overview)
  * [Software requirements](#software-requirements)
    + [Programs](#programs)
    + [IDE](#ide)
  * [Folder structure](#folder-structure)
    + [Root folder](#root-folder)
      - [package.json](#packagejson)
        * [package.json structure](#packagejson-structure)
    + [.vscode](#vscode)
    + [`ts` folder](#-ts--folder)
      - [tsconfig.json](#tsconfigjson)
    + [`js` folder](#-js--folder)
    + [`html` folder](#-html--folder)
  * [Connection to database](#connection-to-database)
    + [Pre-requisites](#pre-requisites)
    + [`mongoConnection.ts`](#-mongoconnectionts-)
  * [index.html](#indexhtml)
  * [Rest Full API](#rest-full-api)
  * [webserver.ts](#webserverts)
  * [Start the connection](#start-the-connection)

# Connecting Services

## Overview

In this step-by-step document you will be able to connect your HTML webpages to perform operations into a database such as, insert new records, search for records  updating records and more.

To accomplish this we need to understand the following picture

![structure](img/structure.png)

`HTML` webpages needs of `JavaScript` in order to interact with  `mongodb,` this communication is possible with `nodejs` which is the one in charge to perform it.

## Software requirements

### Programs

| #    | Name       | Summary                                                      | Link                                                         |
| ---- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1    | mongoDB    | is a *No SQL database*                                       | [Download](https://www.mongodb.com/download-center/community) |
| 2    | NodeJS     | is a `JavaScript` in server side                             | [Download](https://nodejs.org/en/download)                   |
| 3    | nodemon    | is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected | [Download](https://www.npmjs.com/package/nodemon)            |
| 4    | TypeScript | It is a superset of `JavaScript`                             | [Download](https://www.typescriptlang.org/)                  |

> Note: to install `nodemon` & `typescript` you need to have a `package.json` in the root directory, typing `npm init` (after NodeJS installation) will generate it | [npm init reference](https://docs.npmjs.com/cli/init)

### IDE

The `IDE` to be used here will be *Visual Studio Code* because it has support for `TypeScript` language with other kindness

[Download Visual Studio Code](https://code.visualstudio.com/download)

## Folder structure

Create the following folders

```bash
$ mkdir -p .vscode ts/database ts/services js html
```

`ts` stand for TypeScript files

Where:

- `.vscode`: will be the folder that contains the file `task.json`, this file is the configuration file for *Visual Studio Code*
- `ts/database`: will be the folder that contains the file(s) in order to establish the connection with `mongodb`
- `ts/services`: will be the folder that contains the file(s) in order to create a *[Rest full API](<https://searchmicroservices.techtarget.com/definition/RESTful-API>)*
- `js`: will be the folder that contains the `JavaScript` files
- `html`:  will be the folder that contains the `HTML`/`CSS` 

### Root folder

The `root folder` is the main folder that will contains the `ts folder`, `js folder` and the `HTML folder`. By thus this folder needs to be created as well

#### package.json

The file `package.json` is the file that contains information of the project and their dependencies

```json
{
  "name": "nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "<file>.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "<author>",
  "license": "ISC",
  "dependencies": {
    "@types/module-alias": "^2.0.0",
    "@types/node": "^11.12.0",
    "body-parser": "^1.18.3",
    "express": "^4.16.4",
    "module-alias": "^2.2.0",
    "mongodb": "^2.2.33",
    "mongodb-stitch-browser-sdk": "^4.3.2",
    "nodemon": "^1.18.10"
  },
  "_moduleAliases": {
    "@services": "./<root_folder>/js/services",
    "@databases": "./<root_folder>/js/databases"
  }
}

```

##### package.json structure

The following sections are the most important for the file

- `dependencies`: in this section will be the third party node modules needed for the project and their specific version

- `_moduleAliases`: TypeScript uses aliases to import other `ts` files, and when TypeScript compile the `js` file, the aliases also are compile into it, for that reason the aliases in this section must be identical to the aliases into `tsconfig.json` *paths* section, [references](<https://medium.com/@caludio/how-to-use-module-path-aliases-in-visual-studio-typescript-and-javascript-e7851df8eeaa>)

  

### .vscode

This folder contains `task.json` which is the configuration file for *Visual Studio Code*

```json
// See https://go.microsoft.com/fwlink/?LinkId=733558
// for the documentation about the tasks.json format

{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "TypeScript Compiler",
            "type": "shell",
            "command": "tsc",
            "args": [
                "-p",
                ".vscode/../ts",
                "--watch"
            ],
            "problemMatcher": "$tsc",
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                "echo": true,
                "reveal": "silent",
                "focus": false,
                "panel": "shared",
                "showReuseMessage": true,
                "clear": false
            }
        }
    ]
}

```

These are the section more important of the file:

- `command`: tsc is the command that compile the *tsc's* file to JavaScript file
- `args`: 
  - `-p`, `.vscode/../ts`:find for the folder that contains the `ts` files to be compiled
  - `--watch`: mean that every time you saved a file a task running in background will compile the file automatically

### `ts` folder

This folder will contains the file `tsconfig.json`, this file is needed by `Visual Studio Code` to know how the *TypeScript* files will be compiled.

> The browser does not understand about TypeScript files, for this reason we need to compile our files in order to convert them to JavaScript files. The main advantage of TypeScript is that being a superset of `JavaScript` will let us know about possible errors in real time to debug more exactly

#### tsconfig.json

This file is a configuration file for TypeScript, this file will tells to the compiler in which way the files will be compiled. Create the file in `ts folder` with the following content

```json
{
    "compilerOptions": {
        "target": "es5",
        //"outFile": "../js/app.js",
        "outDir": "../js",
        "removeComments": true,
        "moduleResolution": "node",
        "baseUrl": ".",
        "paths": {
            "@services/*": ["services/*"],
            "@database/*": ["database/*"]
        }
    }
}
```

The following is an explanation about the important keys, values in the file

- `outFile`: uncomment this if you need that all the compile output into a single `js` file
- `baseUrl`: this is the relative path where your project resides
- `paths`: in this section you will specific the aliases for routes to import other `js` files, the aliases defined here must be equal to the ones in the section `_moduleAliases` from `package.json`



for all others key check this [document](<https://www.typescriptlang.org/docs/handbook/compiler-options.html>)

### `js` folder

This folder will contains all `JavaScript` files compiled from a <file.ts>.in the same hierarchy

### `html` folder

This folder will contains all `html/css files`

## Connection to database

### Pre-requisites

Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a new database to get the data required in the `mongoConenction.fs` file

### `mongoConnection.ts`

The connection to database will be performed by the driver in [NodeJS](<https://mongodb.github.io/node-mongodb-native/>), create the following script into `ts/database` folder and name it as "mongoConnection.js"

```javascript
/*Create a connection for mongoDB*/

import { connect } from "net";
import { disconnect } from "cluster";

// Import node modules
let MongoClient = require("mongodb").MongoClient;
let user = "<database_user>";
let password = "<database_password>";
let cluster = "<database_cluster>"
let clusterPort = "<database_cluster_port>"
let externalDB = "<database_db>";
let clusterOptions = "<database_cluster_options>";
let uri = `mongodb://${user}:${password}@${cluster}:${clusterPort}/${externalDB}?${clusterOptions}`;

let _db;

module.exports = {

  connectToServer: function( callback: any ) {
    MongoClient.connect( uri, function( err: object, db: object ) {
      _db = db;
      console.log(`(info) Connected to: ${externalDB}`);
      return callback( err );
    } );
  },

  getConnection: function() {
    return _db;
  },

  disconnect: function() {
    _db.close();
    console.log(`(info) Disconnected from: ${externalDB}`);
  }

};
```

The above script will connect to database and this connection can be reused to reduce the total number of connections to the database

## index.html

Create the file `index.html` into `html` folder, this file will be serve on the URL `http://localhost:3000`

```javascript
<!DOCTYPE html>
<html>
<body>
	<form method="POST" action="http://localhost:3000/api/users" enctype="application/x-www-form-urlencoded">
	  First name:<br>
	  <input type="text" name="firstName" value="Mickey">
	  <br>
	  Last name:<br>
	  <input type="text" name="lastName" value="Mouse">
	  <br><br>
	  <input type="submit" value="Submit">
	</form> 
</body>
</html>
```



## Rest Full API

To create a *Rest Full API* we will use the following `NodeJS` script

```javascript
/*RestFull API*/

// Import local node modules
let express = require("express");
let assert = require("assert");
let bodyParser = require('body-parser');
let path = require('path');
// Import custom node modules
let mongoUtil = require( "../database/mongoConnection" );

// Define variables
let app = express();
let collection = "<database_connection>";

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

export class addEndPoint{

    // GET endpoints
    index(){
        let endPoint: string = "/";
        app.get(endPoint, function(_, response) {
            response.sendFile(path.join(__dirname + "/../html/index.html"));
        })
    }

    // POST endpoints
    users(){
        let endpoint: string = "/api/users"
        app.post(endpoint, function(request: any, response: any) {
            let firstName = request.body.firstName;
            let lastName = request.body.lastName;
            response.send(`firstName: ${firstName} <> lastName: ${lastName}`);
            console.log(request.body);
        });
    }

    findAllUsers(){
        let endpoint: string = "/api/queries/findAllUsers"
        app.post(endpoint, function(request: any, response: any) {

            mongoUtil.connectToServer( function( err: object ) {
                // instantiate the connection 
                let db = mongoUtil.getConnection();
              
                db.collection(collection).find({}).toArray(function(err: object, result: object) {
                  assert.equal(null, err);
                  // Show results
                  console.log(result);
                  response.send(result);
                  // Disconnect
                  mongoUtil.disconnect();
                });
              });
        });
    }
}

export class StartAPI{
    constructor(port: number){
        // Start the server
        app.listen(port);
        console.log(`(info) Server started! at => http://localhost:${port}`);
    }
}
```

The *GET*  and  *POST* endpoints are examples, you can build more if you want.

## webserver.ts

The `webserver.ts` is the main file that will raise up a `NodeJS` server and the `Rest Full API` services

```javascript
/* WebServer*/

// Local imports
require("module-alias/register");
import { addEndPoint } from "@services/restFullApi";
import { StartAPI } from "@services/restFullApi";

class WebServer{
    port: number;
    constructor(port: number){
        this.port = port;
        this.addEndPoints();
        this.start();
    }

    addEndPoints(){
        // Add endpoints
        let endPoint = new addEndPoint();
        // Call needed enpoints
        endPoint.index();
        endPoint.users();
        endPoint.findAllUsers();
    }
    start(){
        let start = new StartAPI(this.port);
        start;
    }
}

// Define webserver port
let port = 3000;
// Start the webserver
new WebServer(port);
```

## Start the connection

Run the file `webserver.ts` with the following command:

```bash
$ nodemon webserver.js
```

`nodemon` is the daemon for `NodeJS` that will restart the connection on every change you perform to each `ts` file involved into `webserver.ts`

> Notice that the file with ext `js` is running instead the file with ext `ts` because the browsers does not understand the `ts` file, so as TypeScript in this point compile automatically the `js` files the nodemon takes the compiled changes and restart the `webserver.js`