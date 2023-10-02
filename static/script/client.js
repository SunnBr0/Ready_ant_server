// import{drawAnt} from "./draw_cansvas/draw.js"
import{drawAnt} from "../draw_cansvas/draw.js"

const channel = geckos({ port: 3000 }) 


channel.onConnect(error => {
  if (error) {
    return error.message
  }
 channel.on('chat message', data => {
    try{
      drawAnt(JSON.parse(data))
    }catch{
    }
  })
  
})

channel.onDisconnect(err=>{
  console.log("Stop_Erver");
})
