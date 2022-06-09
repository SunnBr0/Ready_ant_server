import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

class Ants{
    constructor(x,y,height,width){
        this.x = x
        this.y = y
        this.height = height
        this.width = width
    }
}

function addAnt(obj){
    let angle = 0
    let count = 8
    setInterval(()=>{
        angle+=Math.PI/count
        if(2*Math.PI == angle){
            angle = 0
        }
        obj.x = 100*Math.cos(angle)+250
        obj.y = 100*Math.sin(angle)+250
        fs.writeFile(__dirname + `/ant_condition/basic_ant.json`,JSON.stringify(obj),(err)=>{
        
        })
    },1000/45)

}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let ant = new Ants(10,20,30,40)

addAnt(ant)
console.log(ant)
console.log(__dirname)
