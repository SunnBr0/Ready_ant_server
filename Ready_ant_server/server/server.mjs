import express from 'express'
import geckos from '@geckos.io/server'
import { straightRustDataOnJs } from "../generation_rs.js"
import { cercitMove } from "../game_engine.js"
import { full_path, dir_path_folder_test } from './path_name_dir.mjs'
import { read_json_url_path, write_for_cash } from './read_json.mjs'
import http from 'http'


const app = express()
const server = http.createServer(app)
const io = geckos()
// Параметры для данных 
//данные будут сразу идти на отображение в клиент в виде json,а false будет сохранять в папку
let onServerDataAnt = true
//Движок js,а false Движок Rust
let JsEngineOrRustEngine = true

if(process.argv[2] === "-js"){
  JsEngineOrRustEngine = true
}else if(process.argv[2] === "-rust"){
  JsEngineOrRustEngine = false
}
if(process.argv[3] === "-sevrer"){
  onServerDataAnt = true
}else if(process.argv[3] === "-file"){
  onServerDataAnt = false
}
console.log("JsEngineOrRustEngine: ",JsEngineOrRustEngine);
console.log("onServerDataAnt: ",onServerDataAnt);

app.use(express.static(full_path("/static")));

io.addServer(server)
io.listen(3000)
//requestAnimationFrame


function updateTime(channel) {
  // requestAnimationFrame(updateTime)
  read_json_url_path("/ant_basic/ant_rs.json")
    .then((json_ant) => {
      try {
        io.room(channel.roomId).emit('chat message', JSON.parse(json_ant))
      } catch {

      }


      // io.room(channel.roomId).emit('chat message', json_ant)
      // requestAnimationFrame(updateTime)
    })
}



io.onConnection(channel => {
  // requestAnimationFrame(updateTime)
  // updateTime(channel)
  // console.log("ASDADASDASD");
  setInterval(() => {
    // updateTime(channel)

    if (onServerDataAnt) {
      if (JsEngineOrRustEngine) {
        cercitMove(io, channel,onServerDataAnt)
      } else {
        straightRustDataOnJs(io, channel, onServerDataAnt)
      }
    } else {
      updateTime(channel)
      if (JsEngineOrRustEngine) {
        cercitMove(io, channel,onServerDataAnt)
      } else {
        straightRustDataOnJs(io, channel, onServerDataAnt)
      }
    }


  }, 50)

  channel.on('cash_html', (data) => {
    write_for_cash("/ant_basic/text.txt", data)
      .then(data => console.log(data))
  })
  channel.onDisconnect((event) => {
    console.log(`${channel.id} got disconnected`)
  })

})


app.get("/", (req, res) => {
  res.sendFile(full_path("/static/html/index.html"))
})
app.get("/red", (req, res) => {
  res.sendFile(full_path("/static/html/redactor.html"))
})
server.listen(8080, () => {
  console.log("Server start....")
})
