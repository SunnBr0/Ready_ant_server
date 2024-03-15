import {drawFullCadrAnotherImage} from "./setting_canvas.js"
import {clearCanvas} from "./setting_canvas.js"
import {among_us_origin,among_us,ant_base_paht} from "./type_ant.js"
import {drawPoint} from "./setting_canvas.js"
function drawAnt(json){
    clearCanvas()
    // drawFullCadrAnt(json)
    // drawFullCadrMem(json)
    drawFullCadrAnotherImage(json,ant_base_paht)
    // drawPoint({"coordinates":[{"x":345.07487420245667,"y":337.67091513875164,"angle":223.50000000000034}],"height":20,"width":70,"color":"red"})
    // drawFullCadrMem(json dad) 
    
}

export {
    drawAnt
}