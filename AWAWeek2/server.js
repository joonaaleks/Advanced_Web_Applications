/*
TITLE: Advanced Web Applications Course
TASK: Week 2 exercise
AUTHOR: Joona
DATE: 7.11.2022

REFERENCES:
Course material
https://expressjs.com/en/guide/routing.html
https://www.youtube.com/watch?v=1cjdlfB11Ss
https://stackoverflow.com/questions/28764822/req-body-cant-be-read-as-an-array
*/

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const list = [];

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "static")));

app.get("/hello", (req, res) => {
    res.json({msg: "Hello world"});
});

app.get("/echo/:id", (req, res) => {
    res.json(req.params);
});

app.post("/sum", (req, res) => {
    var sum = 0;
    for (var key in req.body.numbers) {
        if(req.body.numbers.hasOwnProperty(key)) {
            sum += req.body.numbers[key];
        }
    }
   
    res.json({sum: sum});
});

app.post("/list", (req, res) => { 
    list.push(req.body.list);
    res.json({list: list});
})

app.listen(port, () => console.log(("Server is running...")));


/*const http = require("http");
console.log("Server running...")
http.createServer(function(req,res) {
    res.write("Hello World!!");
    res.end();
    console.log("Browser reached us!")
}).listen(8000);*/