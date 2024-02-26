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

let is_drawing = false
let draw_width = "2"
let draw_color = "black"




function start(event){
    is_drawing = true
    context.beginPath()
    context.moveTo(event.clientX + delta_x,event.clientY + delta_y)
}
function draw(event,color = draw_color,size = draw_width){
    if(is_drawing){
        context.lineTo(event.clientX + delta_x,event.clientY + delta_y)
        context.strokeStyle = color
        context.lineWidth = size
        context.lineCap = "round"
        context.lineJoin = "round"
        context.stroke()
    }

}
function stop(event){
    if(is_drawing){
        context.stroke()
        context.closePath()
        is_drawing = false
    }
    

}
draw_instruments.addEventListener("click", (event) => {
    choice = event.target.closest("button").value
    switch (choice) {
        case "clear":
            console.log(draw_map.dispatchEvent(event));
            draw_map.addEventListener("mousedown",start,false)
            draw_map.addEventListener("mousemove",(event)=>draw(event,"red",2),false)
            draw_map.addEventListener("mouseup",stop,false)
            draw_map.addEventListener("mouseout",stop,false)
            console.log("fdd");
            break;
        case "draw":
            console.log(draw_map.dispatchEvent(event));

            // draw_map.addEventListener('click', (event) => draw_point_linear(event, 0))
            // draw_map.addEventListener('mousemove', (event) => draw_point_linear(event, 1))
            draw_map.addEventListener("mousedown",start,false)
            draw_map.addEventListener("mousemove",(event)=>draw(event),false)
            draw_map.addEventListener("mouseup",stop,false)
            draw_map.addEventListener("mouseout",stop,false)
            console.log("f");
            break;
        default:
            break;
    }
})



