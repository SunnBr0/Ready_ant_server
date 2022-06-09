import geckos from '@geckos.io/server'
import http from 'http'
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'



var ant_data = {}
var bool = false

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    const { id, maxMessageSize,roomId } = channel
    console.log(`id = ${id}\nmax = ${maxMessageSize}\nroomid = ${roomId}`)
    setInterval(()=>{
        if(bool){
            fs.readFile(__dirname + `/ant_condition/basic_ant.json`,'utf-8',(err,data)=>{
                if(err) throw err
                io.room(channel.roomId).emit("get_ant_data",data)
            })
        }

    },1000/45)
    
    //clinet button
    channel.on("start",sigh =>{
        bool = sigh
    })

    channel.on('chat message', data => {
        console.log(`got ${data} from "chat message"`)
        // emit the "chat message" data to all channels in the same room
        io.room(channel.roomId).emit('chat message', data)
    })
    channel.onDisconnect(() => {
        console.log(`${channel.id} got disconnected`)
    })
})


server.listen(8080,()=>{
    console.log("server up")
})