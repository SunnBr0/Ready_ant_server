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

function view(jsons,x,y,color){
  ctx.lineWidth = 3
  ctx.strokeStyle = color
  ctx.beginPath()
 ctx.strokeRect(x,y,jsons.width,jsons.height)

  ctx.closePath() 
}

console.log(`HIE`)
channel.onConnect(error => {
  if (error) {
    console.error(error.message)
    return
  }
  channel.on("get_ant_data",json =>{
    var ant_data = JSON.parse(json)
    console.log(ant_data)
    ctx.clearRect(0,0,canvas.height,canvas.width)
    for(let i =0;i<ant_data.coordinates.length;i++){
      view(ant_data,ant_data.coordinates[i][0],ant_data.coordinates[i][1],"red")
    }
  })

  channel.on('chat message', data => {
    console.log(`You got the message ${data}`)
  })

  channel.emit('chat message', 'a short message sent to the server')
})

