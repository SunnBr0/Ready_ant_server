import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

class Ants1{
    constructor(coord,height,width,color){
        this.coordinates = coord
        this.height = height
        this.width = width
        this.color = color
    }
}

function randomNum (min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function moveAnt(obj){
    let angle = 0
    let count = 64
    let random = 1
    setInterval(()=>{
        random = randomNum(1,150)
        angle+=Math.PI/count
        if(2*Math.PI == angle){
            angle = 0
        }
        for(let i = 0;i<obj.coordinates.length;i++){
            
            // obj.coordinates[i][0] = 100*Math.cos(angle)+250+random*(i+1)
            // obj.coordinates[i][1] = 100*Math.sin(angle)+250+random*(i+1)
            obj.coordinates[i][0] = 250*Math.sin(random*(i+1))+250
            obj.coordinates[i][1] = 250*Math.cos(random*(i+1))+250
            
        }
        fs.writeFile(__dirname + `/ant_condition/basic_ant.json`,JSON.stringify(obj),(err)=>{
        
        })
    },1000/120)

}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// создание муравьёв
const countAntmove = [[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],
[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],
[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],
[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],
[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],[10,20],[30,21],[30,21],[10,20],[30,21],[30,21]]
let ant = new Ants1(countAntmove,10,70,"red")

moveAnt(ant)
console.log(ant.coordinates[0][0])
console.log(__dirname)
