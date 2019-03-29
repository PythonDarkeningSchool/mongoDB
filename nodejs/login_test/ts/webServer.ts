/* WebServer*/

// Local imports
import {addEndPoint} from "./restFullApi";
import {StartAPI} from "./restFullApi";

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

