import { ToolsDraw } from "./tools.js"
import { draw_point_linear } from "./function_draw.js"
import {among_us_origin,among_us,ant_base_paht} from "../draw_cansvas/type_ant.js"

import { COLOR_CURENT, SIZE_LINE } from "./options_draw.js"
let draw_map = document.getElementById('draw_map')
let button_tools_draw = document.getElementsByClassName("image-button")
let draw_instruments = document.getElementById("draw_instruments")
let context = draw_map.getContext('2d');
console.dir(draw_instruments);

// let Tools_draw = new ToolsDraw(context)
// Tools_draw.drawPoint(20, 30, 'A', 'red', 1);

let choice = null
let is_drawing = false
let prevMouseX, prevMouseY, snapshot;

function drawRect(event) {
    context.strokeRect(event.offsetX, event.offsetY, prevMouseX - event.offsetX, prevMouseY - event.offsetY);
}
function fullClear(event) {
    context.clearRect(0, 0, draw_map.width, draw_map.height);
}

function start(event, draw_color, draw_width) {
    is_drawing = true
    prevMouseX = event.offsetX
    prevMouseY = event.offsetY
    context.beginPath()
    context.lineWidth = draw_width
    context.strokeStyle = draw_color
    context.fillStyle = draw_color;
    console.log(SIZE_LINE);

    switch (choice) {
        case "RAbota_ant":
            context.translate(prevMouseX, prevMouseY);
            context.rotate(180)
            // ctx.scale(5,5)
            context.fill(ant_base_paht)
            // ctx.lineWidth = 0.1
            // ctx.stroke(type)
            context.resetTransform();
            break;
        case "mama_ant":
            context.translate(prevMouseX, prevMouseY);
            context.rotate(0)
            context.scale(10,10)
            // context.fill(among_us)
            context.lineWidth = 0.1
            context.stroke(among_us)
            // ctx.stroke(type)
            context.resetTransform();
            break;
        case "soldat_ant":
            context.translate(prevMouseX, prevMouseY);
            context.rotate(180)
            // ctx.scale(5,5)
            context.fill(among_us_origin)
            // ctx.lineWidth = 0.1
            // ctx.stroke(type)
            context.resetTransform();
            break;
        case "draw":
            context.fillRect(prevMouseX - Math.round(draw_width / 2), prevMouseY - Math.round(draw_width / 2), draw_width, draw_width);
            break;
        case "full_clear":
            fullClear(event)
            break;

        default:
            break;
    }
    snapshot = context.getImageData(0, 0, draw_map.width, draw_map.height)
    console.log("d");
}
function draw(event, choice) {
    if (!is_drawing) return
    context.putImageData(snapshot, 0, 0)
    switch (choice) {
        case "draw":
            context.lineTo(event.offsetX, event.offsetY)
            context.stroke()
            break;
        case "clear":
            context.strokeStyle = "#fff"
            context.lineTo(event.offsetX, event.offsetY)
            context.stroke()
            break;
        case "figure":
            drawRect(event)
            break;
        case "full_clear":
            fullClear(event)
            break;
        default:
            break;
    }
    console.log("obj");
    console.log(event.offsetX);
    console.log(event.offsetY);
}
function stop(event) {
    if (is_drawing) {
        context.stroke()
        context.closePath()
        is_drawing = false
    }

}

draw_map.addEventListener("mousedown", (event) => start(event, COLOR_CURENT, SIZE_LINE), false)
draw_map.addEventListener("mousemove", (event) => draw(event, choice), false)
draw_map.addEventListener("mouseup", stop, false)
draw_map.addEventListener("mouseout", stop, false)

draw_instruments.addEventListener("click", (event) => {
    choice = event.target.closest("button").value

    if (choice === "full_clear") {
        fullClear(event)
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



