// import { ToolsDraw } from "./tools.js"
// import { COLOR_CURENT, SIZE_LINE } from "./options_draw.js"

// let layer_instruments = document.getElementById("layer_instruments")
// let layer_list = document.getElementById("layer_list")
// let map = document.getElementById("map")
// let choiceLayer = null
// let list_layer_map = document.getElementsByClassName("list_layer_map")


// function layerBlock(number) {
//   return `<li>
//     <div class="layer_container_item">
//       <button class="image-button" value="visible">
//         <img src="../img/img_redactor/border-outer.png" alt="Иконка" width="20" height="20">
//       </button>
//       <span class="text_layer">Слой ${number}</span>
//     </div>
//     </li>`
// }
function canvasRedactor(number,width,height) {
  return `<canvas class="list_layer_map"  width="${width}" height="${height}" style="z-index: ${number};position: absolute;left: 38px"></canvas>`
}
// {/* <canvas class="list_layer_map" id="draw_map" width="200" height="200" style="z-index: 2;position: absolute;left: 38px"></canvas> */ }
// // console.log(layer_list);

// // layer_instruments.addEventListener("click", (event) => {
// //   choiceLayer = event.target.closest("button").value

// //   if (choiceLayer === "add_layer") {
// //     layer_list.insertAdjacentHTML("afterbegin", layer(layer_list.children.length))
// //     map.insertAdjacentHTML("afterbegin", canvasRedactor(layer_list.children.length))
// //   }
// //   if (choiceLayer === "minus_layer") {
// //     layer_list.children[0].remove()
// //     map.children[0].remove()
// //   }
// //   console.dir(layer_list.children.length);

// // })


// // layer_list.addEventListener("click",(event)=>{
// //   let Tools_draw = new ToolsDraw(list_layer_map[0].getContext('2d'))
// // console.dir(list_layer_map);
// // console.log("CLICL");
// // list_layer_map[0].addEventListener("mousedown", (event) => Tools_draw.start(event,COLOR_CURENT,SIZE_LINE), false)
// // list_layer_map[0].addEventListener("mousemove", (event) => Tools_draw.draw(event), false)
// // list_layer_map[0].addEventListener("mouseup", (event) =>Tools_draw.stop(event), false)
// // list_layer_map[0].addEventListener("mouseout", (event) =>Tools_draw.stop(event), false)
// // })
export{
//   layerBlock,
  canvasRedactor
}