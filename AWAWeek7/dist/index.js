"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
TITLE: Advanced Web Applications Course
TASK: Week 7 exercise
AUTHOR: Joona Pellinen
DATE: 15.01.2022

REFERENCES:
Course material
Typescript Documentation
https://bobbyhadz.com/blog/typescript-export-types
https://bobbyhadz.com/blog/typescript-add-property-to-type
*/
const express_1 = __importDefault(require("express"));
const all_vehicles = [];
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
app.post("/vehicle/add", (req, res) => {
    if (req.body.hasOwnProperty("bodyType")) {
        const car = {
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            power: req.body.power,
            bodyType: req.body.bodyType,
            wheelCount: req.body.wheelCount
        };
        all_vehicles.push(car);
        console.log(car);
    }
    else if (req.body.hasOwnProperty("draft")) {
        const boat = {
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            power: req.body.power,
            draft: req.body.draft
        };
        all_vehicles.push(boat);
        console.log(boat);
    }
    else if (req.body.hasOwnProperty("wingspan")) {
        const plane = {
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            power: req.body.power,
            wingspan: req.body.wingspan
        };
        all_vehicles.push(plane);
        console.log(plane);
    }
    else {
        const vehicle = {
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            power: req.body.power,
        };
        all_vehicles.push(vehicle);
        console.log(vehicle);
    }
    return res.status(201).send("Vehicle added");
});
app.get("/vehicle/search/:model", (req, res) => {
    const model = req.params.model;
    const fetchVehicle = all_vehicles.find(vehicle => vehicle.model === model);
    if (fetchVehicle) {
        return res.send(fetchVehicle);
    }
    else {
        return res.status(404).send("Error: Not found");
    }
});
app.listen(port, () => {
    console.log("Server running...");
});
