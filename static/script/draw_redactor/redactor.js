import { ToolsDraw } from "./tools.js"
import { draw_point_linear } from "./function_draw.js"
let draw_map = document.getElementById('draw_map')
let button_tools_draw = document.getElementsByClassName("image-button")
let draw_instruments = document.getElementById("draw_instruments")
let context = draw_map.getContext('2d');
console.dir(draw_instruments);

let Tools_draw = new ToolsDraw(context)
Tools_draw.drawPoint(20, 30, 'A', 'red', 1);

let choice = null
let is_drawing = false
let draw_width = 5
let draw_color = "red"




function start(event,draw_color,draw_width){
    is_drawing = true
    context.beginPath()
    context.strokeStyle = draw_color
    context.lineWidth = draw_width
    context.lineTo(event.offsetX,event.offsetY)
    context.stroke()
    console.log("d");
    // context.moveTo(event.clientX + delta_x,event.clientY + delta_y)
    // context.lineTo(event.clientX + delta_x,event.clientY + delta_y)
}
function draw(event,color = draw_color,size = draw_width,choice){
    if(!is_drawing) return
    // context.lineTo(event.clientX + delta_x,event.clientY + delta_y)
    switch (choice) {
        case "draw":
            context.lineTo(event.offsetX,event.offsetY)
            context.stroke()
            break;
        case "clear":
            context.strokeStyle = "#fff"
            context.lineTo(event.offsetX,event.offsetY)
            context.stroke()
            break;
        default:
            break;
    }
    // context.lineCap = "round"
    // context.lineJoin = "round"
    console.log("obj");
    console.log(event.offsetX);
    console.log(event.offsetY);
}
function stop(event){
    // if(is_drawing){
    //     context.stroke()
    //     context.closePath()
    //     is_drawing = false
    // }
        is_drawing = false
    

}

draw_map.addEventListener("mousedown",(event)=>start(event,draw_color,draw_width),false)
draw_map.addEventListener("mousemove",(event)=>draw(event,draw_color,draw_width,choice),false)
draw_map.addEventListener("mouseup",stop,false)
draw_map.addEventListener("mouseout",stop,false)

draw_instruments.addEventListener("click", (event) => {
    choice = event.target.closest("button").value
    console.log(choice);
})



