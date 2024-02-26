import { ToolsDraw } from "./tools.js"
import { draw_point_linear } from "./function_draw.js"
let draw_map = document.getElementById('draw_map')
let button_tools_draw = document.getElementsByClassName("image-button")
let draw_instruments = document.getElementById("draw_instruments")
let context = draw_map.getContext('2d');
console.dir(draw_instruments);

let delta_x = -context.canvas.offsetLeft
let delta_y = -context.canvas.offsetTop
let Tools_draw = new ToolsDraw(context, delta_x, delta_y)
let choice = null
Tools_draw.drawPoint(20, 30, 'A', 'red', 1);



draw_instruments.addEventListener("click", (event) => {
    choice = event.target.closest("button").value
    switch (choice) {
        case "clear":

            break;
        case "draw":
            draw_map.addEventListener('click', (event) => draw_point_linear(event, 0))
            draw_map.addEventListener('mousemove', (event) => draw_point_linear(event, 1))
            console.log("f");
            break;
    
        default:
    
            break;
    }
})



