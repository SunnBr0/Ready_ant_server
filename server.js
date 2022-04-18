import geckos from '@geckos.io/server'
import http from 'http'
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'

var ant_data = {}
var bool = false
var angle = 0

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fs.readFile(__dirname + "/ant_condition/basic_ant.json",'utf-8',(err,data)=>{
    if(err) throw err
    ant_data = JSON.parse(data)
    console.log(JSON.parse(data))
})

const app = express()
const server = http.createServer(app)
const io = geckos()

app.use(express.static(__dirname + "/static"))

app.get("/",(req,res)=>{
    res.sendFile("index.html")
})

io.listen(3000) // default port is 9208
io.addServer(server)


io.onConnection(channel => {
    //channel.emit("get_ant_data",ant_data)
console.log(`HIE`)
    channel.on('start',(sign)=>{
        if (sign){
            // circle(ant_data)
            setInterval(()=>{
                    channel.emit("get_ant_data",ant_data)
                    circle(ant_data)
            },1000/60)
        }
        // channel.emit("get_ant_data",ant_data)
    })

/*Рабочее
setInterval(()=>{
        if (bool) {
            channel.emit("get_ant_data",ant_data)
            circle(ant_data)
        }
            // channel.emit("get_ant_data",ant_data)
            // circle(ant_data)
    },1000/60)*/
// ЧЕРЕЗ ИНТЕРВАЛ
    channel.on('start',(sign)=>{
        bool = sign
    })
    console.log(ant_data.x)
    if (bool) {
        setInterval(()=>{
            channel.emit("get_ant_data",ant_data)
            circle(ant_data)
        },1000/60)
        
    }
  //channel.emit("get_ant_data",ant_data)
  channel.on('chat message', data => {
    console.log(`got ${data} from "chat message"`)
    // emit the "chat message" data to all channels in the same room
    io.room(channel.roomId).emit('chat message', data)
  })
  channel.onDisconnect(() => {
    console.log(`${channel.id} got disconnected`)
  })
})

function circle(json) {
    angle+=Math.PI/6
    // if (angle*12 == 2*Math.PI){
    //     angle = 0
    // }
    json.x=100*Math.cos(angle*0.1)+250
    json.y=100*Math.sin(angle*0.1)+250
}

server.listen(8080,()=>{
    console.log("server up")
})