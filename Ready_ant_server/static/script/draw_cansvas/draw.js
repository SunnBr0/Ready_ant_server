import {drawFullCadrAnotherImage} from "./setting_canvas.js"
import {clearCanvas} from "./setting_canvas.js"
import {among_us_origin,among_us,ant_base_paht} from "./type_ant.js"
import {drawPoint} from "./setting_canvas.js"
function drawAnt(json){
    clearCanvas()
    drawFullCadrAnotherImage(json,ant_base_paht)
}

export {
    drawAnt
}