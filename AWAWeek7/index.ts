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
import express, { Express, Request, Response } from "express"

type Vehicle = {
    model: string;
    color: string;
    year: number;
    power: number;
}

const all_vehicles: Vehicle[] = [];

const app: Express = express()
const port: number = 3000

app.use(express.json());
app.use(express.urlencoded());

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello world")
})

app.post("/vehicle/add", (req: Request, res: Response) => {
    if (req.body.hasOwnProperty("bodyType")) {
        type Car = Vehicle & {
            bodyType: string,
            wheelCount: number
        }
        const car: Car = {
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            power: req.body.power,
            bodyType: req.body.bodyType,
            wheelCount: req.body.wheelCount
        }
        all_vehicles.push(car)
        console.log(car)
    } else if (req.body.hasOwnProperty("draft")) {
        type Boat = Vehicle & {
            draft: number
        }
        const boat: Boat = {
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            power: req.body.power,
            draft: req.body.draft
        }
        all_vehicles.push(boat)
        console.log(boat)
    } else if (req.body.hasOwnProperty("wingspan")) {
        type Plane = Vehicle & {
            wingspan: number
        }
        const plane: Plane = {
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            power: req.body.power,
            wingspan: req.body.wingspan
        }
        all_vehicles.push(plane)
        console.log(plane)
    } else {
        const vehicle: Vehicle = {
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            power: req.body.power,
        }
        all_vehicles.push(vehicle)
        console.log(vehicle)
    }
    return res.status(201).send("Vehicle added");
})

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    const model: string = req.params.model;
    const fetchVehicle = all_vehicles.find(vehicle => vehicle.model === model);
    if (fetchVehicle) {
        return res.send(fetchVehicle)
    } else {
        return res.status(404).send("Error: Not found")
    }
})

app.listen(port, () => {
    console.log("Server running...")
})