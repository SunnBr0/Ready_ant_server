const express = require("express")
const fs = require('fs')
const http = require("http")
const path = require("path")
const socketIO = require("socket.io")
const folderPath = './figurage'

const app = express()
const server = http.Server(app)
const io = socketIO(server)

let file = fs.readdirSync(folderPath).map(fileName =>{
    return path.join(folderPath,fileName)
})
let json = fs.readFileSync(file[0])
let figural = JSON.parse(json)

app.set("port",5000)
app.use("/static",express.static(__dirname + "/static"))

app.get("/",(request,response) =>{
    response.sendFile(path.join(__dirname + "/static","index.html"))
})

server.listen(5000,() => {
    console.log("Starting server on port 5000")
})
const players = []
let count = 1
let cout = 0
let bool = false
io.on("connection", (socket) =>{
    //for (let i = 0; i < 1000; i++) {
    socket.emit("new figural",figural)
    //     if (bool == true) {
    //         cout+=Math.PI/6
    //         if(cout>=2*Math.PI){
    //             cout = -2*Math.PI
    //         }
    //         figural.x=100*Math.cos(cout*0.1)+300
    //         figural.y=100*Math.sin(cout*0.1)+400
    //         bool = false
    // }
        
    //}
    socket.on("signal",(data)=>{
        bool = data
        if (bool == true) {
            cout+=Math.PI/6
            // if(cout>=2*Math.PI){
            //     cout = -2*Math.PI
            // }
            figural.x=100*Math.cos(cout*0.1)+500
            figural.y=100*Math.sin(cout*0.1)+500
            bool = false
        }
        socket.emit("new figural",figural)
        console.log("нарисовалось?(c socket)",bool)
    })
    console.log("нарисовалось?(не из socket)",bool)
    // принимает с клиента данные
    socket.on("new player",()=>{
        players.push({
            id: socket.id,
            count: count,
        })
        count++
        //отправляет на клиент данные
        socket.emit("state",players)
    })
    socket.on("disconnect",() =>{
        players.pop()
        socket.emit("state",players)
        count--
    })

    // отправляет на клиент данные socket.id ,
    //а new это ключ по которому можно отследить
    /*
    socket.emit("new",socket.id)
    socket.on("hello server",(data) =>{
        console.log(data)
    })
    */
})
