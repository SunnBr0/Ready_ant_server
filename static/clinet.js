
const button = document.querySelector('#start')
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d")
//определить метод io
const socket = io()

canvas.height = window.innerHeight-250;
canvas.width = window.innerWidth;

const reloadUsers = (data) =>{
    for (let i = 0; i < data.length; i++) {
        const div = document.getElementById("main")
        const hello = document.createElement("div")
        hello.innerText = `id игрока: ${data[i].id} игрок: ${data[i].count}`
        div.appendChild(hello)
        
    }
}
/*
// принимает данные 
socket.on("new",(data)=>{
    console.log(data)
    socket.emit("hello server",`Игрок с id: ${data} подключение`)
})
*/
// function view(x,y,h,w,hc,wc){
//     ctx.beginPath()
//     ctx.clearRect(0,0,hc,wc)
//     ctx.strokeRect(x,y,h,w)
//     ctx.closePath()
// }
socket.on("new figural",(jsons)=>{
    console.log(jsons)
    ctx.lineWidth = 3
    ctx.strokeStyle = "red"
    //view(jsons.x,jsons.y,jsons.width,jsons.height,canvas.height,canvas.width)
    ctx.beginPath()
    ctx.clearRect(0,0,canvas.height,canvas.width)
    ctx.strokeRect(jsons.x,jsons.y,jsons.width,jsons.height)
    ctx.closePath()
    socket.emit("signal",true)
})
//отправить на сервер
socket.emit("new player")

socket.on("state",(data)=>{
    reloadUsers(data)
})
