const button = document.querySelector('#start')
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d")
//определить метод io
const socket = io()

canvas.height = window.innerHeight-150;
canvas.width = window.innerWidth;
let bool = false
button.addEventListener('click',()=>{
    socket.emit("start_firgure",true)
})

socket.on("printfigural",(jsonss,callback) =>{
    ctx.clearRect(0,0,canvas.height,canvas.width)
    for (const jsons of jsonss) {
       // console.log(jsons)
        view(jsons)
    }
    callback(true)
})

function view(jsons){
        ctx.lineWidth = 3
        ctx.strokeStyle = "red"
        ctx.beginPath()
        ctx.strokeRect(jsons.x,jsons.y,jsons.width,jsons.height)
        ctx.closePath() 
}

const reloadUsers = (data) =>{
    for (let i = 0; i < data.length; i++) {
        const div = document.getElementById("main")
        const hello = document.createElement("div")
        hello.innerText = `id игрока: ${data[i].id} игрок: ${data[i].count}`
        div.appendChild(hello)
        
    }
}

socket.emit("new player")

socket.on("state",(data)=>{
    reloadUsers(data)
})
