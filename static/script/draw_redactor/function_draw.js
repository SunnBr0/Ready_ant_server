import {ToolsDraw} from "./tools.js"

let context = draw_map.getContext('2d');
let delta_x =-context.canvas.offsetLeft
let delta_y =-context.canvas.offsetTop
let Tools_draw = new ToolsDraw(context,delta_x,delta_y)

function draw_point_linear(event,type_click) {
    let x = event.pageX
    let y = event.pageY
    if (event.buttons == type_click) {
        Tools_draw.drawPoint(x +Tools_draw.delta_x, y +Tools_draw.delta_y, '', 'red', 5);
    }
    
}



export{
    draw_point_linear
}