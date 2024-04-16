import { drawAnt } from "../script/draw_cansvas/draw.js"

const channel = geckos({ port: 3000 })


channel.onConnect(error => {
  if (error) {
    return error.message
  }
  channel.on('chat message', data => {

    try {
      //присылается сразу json и его распарсиваем
      drawAnt(data)
      console.log("dasd");
    } catch {
    }
  })

})

channel.onDisconnect(err => {
  console.log("Stop_Erver");
})
