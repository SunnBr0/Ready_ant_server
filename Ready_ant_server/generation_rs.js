import net from 'net'
import fs from 'fs'
import{full_path,dir_path_folder_test} from "./server/path_name_dir.mjs"
// // console.log(client.readyState);
// let onServerDataAnt = false

// function connectRustDataOnServerJs(onServerDataAnt){
//     let obj ={}
//     setInterval(()=>{
//     let client = net.connect({ port: 6142,family:4 });
//         client.on('data', function (data) {
//             if(!onServerDataAnt){
//                 fs.writeFile(full_path("/ant_basic/ant_rs.json"),data,(err)=>{})
//                 console.log("work set json on file");
//             }else{
//                 obj =JSON.parse(data.toString())
//                 console.log("work connect to js server");

//             }
    
//         });
//         client.on('connect', function () {
//             console.log('Connected with Rust ');
//         });
//         client.on('error', function (err) {
//             console.error("RUST engine data has been cut off");
//         });
//         client.on('close', function() {
//             console.log('Connection closed with Rust');
//         });
//     },1000)
// }

// connectRustDataOnServerJs(onServerDataAnt)

function straightRustDataOnJs(io,channel, onServerDataAnt) {
let clientRust = net.connect({ port: 6142, family: 4 });

    let obj = {}
    clientRust.on('data', function (data) {
      if (!onServerDataAnt) {
        // console.log("work set json on file");
        fs.writeFile(full_path("/ant_basic/ant_rs.json"), data, (err) => { })
      } else {
        try {
          obj = JSON.parse(data.toString())
            // console.log("work connect to js server json process on Server");
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