import { drawAnt } from "../script/draw_cansvas/draw.js"
// import {choice,saveDataMap,flagSaveDataMap} from "../script/draw_redactor/redactor.js"
const channel = geckos({ port: 3000 })
channel.onConnect(error => {
  if (error) {
    return error.message
  }
  // channel.emit("saveMap",saveDataMap)
  channel.on('chat message', data => {

    try {
      //присылается сразу json и его распарсиваем
      requestAnimationFrame(drawAnt(data))
      
      // if(flagSaveDataMap){
        
      // }
      // drawAnt(data)
      console.log("dasd");
    } catch {
    }
  })
})

channel.onDisconnect(err => {
  console.log("Stop_Erver");
})
