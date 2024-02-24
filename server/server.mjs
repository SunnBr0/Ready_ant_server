import express from 'express'
import geckos from '@geckos.io/server'
import {full_path, dir_path_folder_test} from './path_name_dir.mjs'
import {read_json_url_path,write_for_cash} from './read_json.mjs'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = geckos()
app.use(express.static(full_path("/static")));

io.addServer(server)
io.listen(3000) 

io.onConnection(channel => {

    setInterval(()=>{
      // read_json_url_path("/ant_basic/ant_rs.json")
      read_json_url_path("/ant_basic/ant_rs.json")
      .then((json_ant)=>{
        io.room(channel.roomId).emit('chat message', json_ant)
      })
    },50)

    channel.on('cash_html',(data) =>{
      write_for_cash("/ant_basic/text.txt",data)
        .then(data => console.log(data))
    })
    channel.onDisconnect((event) => {
      console.log(`${channel.id} got disconnected`)
    })

  })


app.get("/",(req,res)=>{
    res.sendFile(full_path("/static/html/index.html"))
})
app.get("/red",(req,res)=>{
  res.sendFile(full_path("/static/html/redactor.html"))
})
server.listen(8080,()=>{
    console.log("Server start....")
})
