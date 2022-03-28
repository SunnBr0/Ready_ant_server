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
let figurals = []
for (const obj of file) {
    let json = fs.readFileSync(obj)
    figurals.push(JSON.parse(json))
}

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
    // принимает с клиента данные
    socket.on("start_firgure",(data)=>{
        bool = data
    })
    setInterval(()=>{
        socket.emit("printfigural",figurals,(response)=>{
            if(response && bool){
                for (const i in figurals) {
                    if(i == 0){
                        figure1(figurals[i])
                    }else if(i == 1){
                        figure2(figurals[i])
                    }else if(i ==  2){
                        figure3(figurals[i])
                    }
                }
            }
        })
    },1000/48)

        
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
})
let figure1 = (figural) =>{
    cout+=Math.PI/6
    figural.x=100*Math.cos(cout*0.1)+250
    figural.y=100*Math.sin(cout*0.1)+250
    //console.log("нарисовалось?(c socket)")
}

let figure2 = (figural) =>{
    cout+=Math.PI/6
    figural.x=100*Math.sin(cout*0.1)+100
    figural.y=100*Math.cos(cout*0.1)+100
}
let figure3 = (figural) =>{
    cout+=Math.PI/6
    figural.x=10*Math.cos(cout*0.1)+75
    figural.y=10*Math.sin(cout*0.1)+75
}