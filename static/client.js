const button = document.getElementById('#start')
const canvas = document.getElementById('#map')
const ctx = canvas.getContext("2d")

canvas.height = 1000
canvas.width = 1000


// or add a minified version to your index.html file/
// https://github.com/geckosio/geckos.io/tree/master/bundles
const channel = geckos({ port: 3000 })    // default port is 9208

button.addEventListener('click',(e)=>{
  e.preventDefault()
  channel.emit("start",true)
})

function view(jsons){
  ctx.lineWidth = 3
  ctx.strokeStyle = "red"
  ctx.beginPath()
  ctx.strokeRect(jsons.x,jsons.y,jsons.width,jsons.height)
  ctx.closePath() 
}

console.log(`HIE`)
channel.onConnect(error => {
  if (error) {
    console.error(error.message)
    return
  }
  channel.on("get_ant_data",json =>{
    console.log(json)
    var ant_data = json
    ctx.clearRect(0,0,canvas.height,canvas.width)
    view(ant_data)
    //channel.emit("start",true)
    
  })

  channel.on('chat message', data => {
    console.log(`You got the message ${data}`)
  })

  channel.emit('chat message', 'a short message sent to the server')
})

