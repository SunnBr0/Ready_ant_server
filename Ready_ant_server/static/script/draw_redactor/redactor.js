import { ToolsDraw } from "./tools.js"
import { draw_point_linear } from "./function_draw.js"

import { COLOR_CURENT, SIZE_LINE } from "./options_draw.js"
let draw_map = document.getElementById('draw_map')
let button_tools_draw = document.getElementsByClassName("image-button")
let draw_instruments = document.getElementById("draw_instruments")
let context = draw_map.getContext('2d');
console.dir(draw_instruments);

let Tools_draw = new ToolsDraw(context)

let choice = null
draw_map.addEventListener("mousedown", (event) => Tools_draw.start(event,COLOR_CURENT,SIZE_LINE), false)
draw_map.addEventListener("mousemove", (event) => Tools_draw.draw(event, choice), false)
draw_map.addEventListener("mouseup", (event) =>Tools_draw.stop(event), false)
draw_map.addEventListener("mouseout", (event) =>Tools_draw.stop(event), false)

draw_instruments.addEventListener("click", (event) => {
    choice = event.target.closest("button").value
    Tools_draw.setChoice(choice)
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

    console.log(choice);
})



