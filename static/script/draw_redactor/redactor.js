import {ToolsDraw} from "./tools.js"

let draw_map = document.getElementById('draw_map')
let button_tools_draw = document.getElementsByClassName("image-button")
let draw_instruments = document.getElementById("draw_instruments")
let context = draw_map.getContext('2d');
console.dir(draw_instruments);
let Tools_draw = new ToolsDraw(context)

let delta_x =-context.canvas.offsetLeft
let delta_y =-context.canvas.offsetTop
let choice
Tools_draw.drawPoint(20, 30, 'A', 'red', 1);
// draw_map.addEventListener('mousedown',Tools_draw.drawPoint)
draw_map.addEventListener('mousemove',(event)=>{
    let x = event.pageX
    let y = event.pageY
    console.log(event.type);
    console.log(`event.pageX: ${event.pageX}`);
    console.log(`event.pageY: ${event.pageY}`);
    // console.log(`event.clientX: ${event.clientX}`);
    // console.log(`event.clientY: ${event.clientY}`);
    console.log(event.buttons);
    if(event.buttons == 1){
        Tools_draw.drawPoint(x+delta_x, y+delta_y, '', 'red', 5);
        // Tools_draw.drawPoint(event.pageX, event.pageY, 'A', 'red', 1);
    }
})
draw_map.addEventListener('click',(event)=>{
    let x = event.pageX
    let y = event.pageY
    console.log(event.type);
    console.log(`event.pageX: ${event.pageX}`);
    console.log(`event.pageY: ${event.pageY}`);
    // console.log(`event.clientX: ${event.clientX}`);
    // console.log(`event.clientY: ${event.clientY}`);
    console.log(event.buttons);
    Tools_draw.drawPoint(x+delta_x, y+delta_y, '', 'red', 5);
})

draw_instruments.addEventListener("click",(event)=>{
    choice = event.target.closest("button").value
})

console.log("Dsad");
