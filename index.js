const http = require("http");
const EventEmitter = require("events");

const myEmitter = new EventEmitter();
const counts = { login: 0, logout: 0, purchase: 0, profile: 0 };

myEmitter.on("updateCount", (type) => {
    counts[type] = counts[type] + 1;
    console.log("Event happened: " + type);
});


http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    if (req.url.includes("/login")) {
        myEmitter.emit("updateCount", "login");
        res.write("<h1>Login Done</h1>");
    } 
    

    else if (req.url.includes("/logout")) {
        myEmitter.emit("updateCount", "logout");
        res.write("<h1>Logout Done</h1>");
    } 

    else if (req.url.includes("/purchase")) {
        myEmitter.emit("updateCount", "purchase");
        res.write("<h1>Purchase Done</h1>");
    } 

    else if (req.url.includes("/profile")) {
        myEmitter.emit("updateCount", "profile");
        res.write("<h1>Profile Updated</h1>");
    }

    else if (req.url.includes("/summary")) {
        res.write("<h1>Final Summary</h1>");
        res.write("<p>Logins: " + counts.login + "</p>");
        res.write("<p>Logouts: " + counts.logout + "</p>");
        res.write("<p>Purchases: " + counts.purchase + "</p>");
        res.write("<p>Profile Updates: " + counts.profile + "</p>");
        res.end();
        return;
    }

    res.write("<h2>Action Buttons</h2>");
    res.write("<a href='/login'><button>Login</button></a><br><br>");
    res.write("<a href='/logout'><button>Logout</button></a><br><br>");
    res.write("<a href='/purchase'><button>Purchase</button></a><br><br>");
    res.write("<a href='/profile'><button>Update Profile</button></a><br><br>");
    res.write("<a href='/summary'><button>Generate Summary</button></a>");
    
    res.end();

}).listen(3000, () => {
    console.log("Server started at http://localhost:3000");
})