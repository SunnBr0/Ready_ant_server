import{drawAnt} from "./draw_cansvas/draw.js"
// default port is 9208
const onWorkerReady = () => {
  console.log('SW is ready');
}
navigator.serviceWorker.register('sw.js');
navigator.serviceWorker.ready.then(onWorkerReady);

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
