import{ create_ant_with_json} from "./basis_ant_html.js"

const onWorkerReady = () => {
  console.log('SW is ready');
}
navigator.serviceWorker.register('sw.js');
navigator.serviceWorker.ready.then(onWorkerReady);

let svg = document.getElementById("another_ant")
let bg_ant_place = document.getElementById("bg_ant_place")
let model_ant = document.getElementById("model_ant")
console.log(model_ant);
svg.style.background = "gray"
bg_ant_place.setAttribute("height","500.000000pt")
bg_ant_place.setAttribute("width","500.000000pt")
bg_ant_place.style.background = "yellow"
svg.getAttribute("transform")

const channel = geckos({ port: 3000 }) // default port is 9208
channel.onConnect(error => {
  if (error) {
    console.error(error.message)
    return error.message
  }
 channel.on('chat message', data => {
  try{
    let ant_server = JSON.parse(data)
    create_ant_with_json(ant_server)
  }catch{}
  })

})
