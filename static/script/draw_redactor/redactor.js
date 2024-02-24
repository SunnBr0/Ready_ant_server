import {ToolsDraw} from "./tools.js"

let draw_map = document.getElementById('draw_map')
let context = draw_map.getContext('2d');
let Tools_draw = new ToolsDraw(context)
Tools_draw.drawPoint(20, 30, 'A', 'red', 1);

// draw_map.addEventListener('mousedown',Tools_draw.drawPoint)
draw_map.addEventListener('mousemove',(event)=>{
    let delta = -10
    console.log(event.type);
    console.log(event.pageX);
    console.log(event.pageY);
    console.log(event.buttons);
    if(event.buttons == 1){
        Tools_draw.drawPoint(event.pageX+delta, event.pageY+delta, '', 'red', 5);
        // Tools_draw.drawPoint(event.pageX, event.pageY, 'A', 'red', 1);
    }
})
console.log("Dsad");
