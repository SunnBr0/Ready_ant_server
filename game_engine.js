import * as fs from "node:fs"
import { full_path, dir_path_folder_test } from "./server/path_name_dir.mjs"
class Ant {
    constructor(parametrs) {
        this.Ant = parametrs.Ant
           
    }
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function moveAnt(obj) {
    let array_ant = obj.coordinates
    setInterval(() => {
        for (let item = 0; item < array_ant.length; item++) {
            array_ant[item]["x"] = randomNum(50, 500)
            array_ant[item]["y"] = randomNum(50, 500)
            array_ant[item]["angle"] = randomNum(0, 360)
        }
        fs.writeFile(full_path("/ant_basic/ant_rs.json"), JSON.stringify(obj), (err) => {

        })
    }, 1000)
}

function cercitMove(obj) {
    let ant_obj = obj.Ant
    let array_ant = ant_obj.pos
    let angle_ant = ant_obj.angle
    let angle = 0
    let radius = 200
    let dx = 20
    let dx_pos = 200
    let dy = 30
    let dy_pos = 200
    let delta_angle = 180
    let radius_number = 0
    setInterval(() => {
        for (let item = 0; item < array_ant.length; item++) {
            if (angle === 360) {
                angle = 0
            }

            if (radius_number == 3) {
                radius_number = 0
            }
            let gradus = angle * Math.PI / 180
            array_ant[item][0] = radius * Math.cos(gradus) + dx * radius_number + dx_pos//+ randomNum(50,250)
            array_ant[item][1] = radius * Math.sin(gradus) + dy * radius_number + dy_pos//+ randomNum(50,250)
            angle_ant[item] = angle + delta_angle
            radius_number++
            angle += 0.1
        }
        fs.writeFile(full_path("/ant_basic/ant_rs.json"), JSON.stringify(obj), (err) => {

        })
    }, 50)
}
let ant = new Ant(
    {
        "Ant":
        {
            "angle": [0.0, 0.0,0.0],
            "pos": [[-125.7102279663086, 10.0], [960.0, 0.0],[960.0, 0.0]]
        }
    }
)

cercitMove(ant)
