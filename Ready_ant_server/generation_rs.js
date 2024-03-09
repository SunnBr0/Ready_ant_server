import net from 'net'
import fs from 'fs'
import{full_path,dir_path_folder_test} from "./server/path_name_dir.mjs"
// console.log(client.readyState);
setInterval(()=>{
let client = net.connect({ port: 6142,family:4 });
    client.on('data', function (data) {
        fs.writeFile(full_path("/ant_basic/ant_rs.json"),data,(err)=>{})
        // console.log(data.toString());
    });
    client.on('connect', function () {
        console.log('Connected with Rust ');
    });
    client.on('error', function (err) {
        console.error("RUST engine data has been cut off");
    });
    client.on('close', function() {
        console.log('Connection closed with Rust');
    });
},1000)
