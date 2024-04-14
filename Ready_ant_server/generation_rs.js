import net from 'net'
import fs from 'fs'
import{full_path,dir_path_folder_test} from "./server/path_name_dir.mjs"

function straightRustDataOnJs(io,channel, onServerDataAnt) {
let clientRust = net.connect({ port: 6142, family: 4 });

    let obj = {}
    clientRust.on('data', function (data) {
      if (!onServerDataAnt) {
        fs.writeFile(full_path("/ant_basic/ant_rs.json"), data, (err) => { })
      } else {
        try {
          obj = JSON.parse(data.toString())
            io.room(channel.roomId).emit('chat message', obj)
        }
        catch { }
      }
  
    });
    clientRust.on('connect', function () {
      console.log('Connected with Rust ');
    });
    clientRust.on('error', function (err) {
      console.error("RUST engine data has been cut off");
    });
    clientRust.on('close', function () {
      console.log('Connection closed with Rust');
    });
  }

  export{
    straightRustDataOnJs
  }