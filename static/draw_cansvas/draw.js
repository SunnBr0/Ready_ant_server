import {drawFullCadrAnt} from "./setting_canvas.js"
import {clearCanvas} from "./setting_canvas.js"
import {drawFullCadrMem} from "./setting_canvas.js"
function drawAnt(json){
    clearCanvas()
    drawFullCadrAnt(json)
    // drawFullCadrMem(json)
}

export {
    drawAnt
}