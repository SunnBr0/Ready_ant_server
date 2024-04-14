import {full_path} from "./path_name_dir.mjs"
import * as fs from "node:fs"


function read_json_url_path(path){
  const read_json = new Promise((resolve,reject)=>{
    fs.readFile(full_path(path), { encoding: "utf-8" },
      (err, result) => {
        if (err) {
          reject(err)
        }
          resolve(result)
      }
    )
  })
  return read_json
}


function write_for_cash(path,data){
  const read_json = new Promise((resolve,reject)=>{
    fs.writeFile(full_path(path), data,{ encoding: "utf-8" },
      (err, result) => {
        if (err) {
          reject(err)
        }
          resolve(result)
      }
    )
  })
  return read_json
}



export {
  read_json_url_path,
  write_for_cash
}