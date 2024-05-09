import { ToolsDraw } from "./tools.js"
import { layerBlock, canvasRedactor } from "./layer_redactor.js"
import { COLOR_CURENT, SIZE_LINE } from "./options_draw.js"
let list_layer_map = document.getElementsByClassName("list_layer_map")
let draw_map = document.getElementById('draw_map')
let button_tools_draw = document.getElementsByClassName("image-button")
let draw_instruments = document.getElementById("draw_instruments")
let layer_list = document.getElementById("layer_list")
let redactor_map_main = document.getElementById("redactor_map_main")
let map = document.getElementById("map")

console.log("$$$$ ", redactor_map_main);


console.dir(list_layer_map[0]);
let layer = draw_map
let context = layer.getContext('2d');
var Tools_draw = new ToolsDraw(context, null)
let boardWidth = 100 // ширина "доски" по вертикали
let boardHeight = 100 // высота "доски" по вертикали
Tools_draw.drawBoard(boardWidth,boardHeight)
    console.dir(list_layer_map);
console.dir(draw_instruments);


let choice = null





redactor_map_main.addEventListener("click", (event) => {

    let mainCurrent = event.target
    console.log("####  ", mainCurrent);
    try {
        choice = mainCurrent.closest("button").value

    } catch (e) {

    }

    Tools_draw.setChoice(choice)
    console.log("####  ", choice);

    if (choice === "full_clear") {
        Tools_draw.fullClear(event)
        //условие переписать учитывая value кнопок)
    } else if (choice === "type_ant" || choice === "RAbota_ant" || choice === "mama_ant" || choice === "soldat_ant") {
        let type_ant = document.getElementsByClassName("type_item_tools")
        if (type_ant[0].style.display == "inline-block") {
            type_ant[0].style.display = "none"
        } else {
            type_ant[0].style.display = "inline-block"
        }
    }



})
map.addEventListener("mousedown", (event) => Tools_draw.start(event, COLOR_CURENT, SIZE_LINE), false)
map.addEventListener("mousemove", (event) => Tools_draw.draw(event), false)
map.addEventListener("mouseup", (event) => Tools_draw.stop(event), false)
map.addEventListener("mouseout", (event) => Tools_draw.stop(event), false)


export {
    choice
}