// Local imports
import {API} from "./restFullApi";

class WebServer extends API{
    constructor(){
        // Define the port for webserver
        let port = "3000";
        // Send the port to parent constructor to start the webserver
        super(port);
    }
}
    
// Start the webserver
let web = new WebServer();
// FROM HERE THIS NOT WORKING!!!!!
// Get the app (express instantiation) and path
let app = web.getApp;
let path = web.getPath;
console.log(`app = ${app} <> path = ${path}`);
// Set the app & path in the inner class
web.GET.setApp = app;
web.GET.setPath = path;
// Serve the main index.html
web.GET.indexHTML;

