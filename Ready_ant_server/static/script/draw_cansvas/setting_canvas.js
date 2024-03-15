import {among_us_origin,among_us,ant_base_paht} from "./type_ant.js"
const canvas = document.getElementById('canvas');
canvas.width = 1920
canvas.height = 900
const ctx = canvas.getContext('2d');
canvas.style.backgroundColor = "yellow"
document.body.appendChild(canvas);

ctx.strokeStyle  = "black";
ctx.lineWidth = 1 
ctx.fillStyle = "black";
function anotherFigure(x,y,angle_radian,type){
    // let angleInRadians = angle_radian * Math.PI/180    // ctx.translate(x_center,y_center)
    ctx.translate(x, y);
    ctx.rotate(angle_radian)
    // ctx.scale(5,5)
    ctx.fill(type)
    // ctx.lineWidth = 0.1
    // ctx.stroke(type)
    ctx.resetTransform();
}


function drawFullCadrAnotherImage(obj_ant,type){

    let main_obj_ant = obj_ant.Ant
    let angle_ant = main_obj_ant.angle
    for(let i = 0;i<main_obj_ant.pos.length;i++){
        let x = main_obj_ant.pos[i][0]
        let y = main_obj_ant.pos[i][1]
        let angle_radian = angle_ant[i]
        anotherFigure(x,y,angle_radian,type)
    }
}
function drawPoint(obj_ant){
    let array_coordinates = obj_ant.coordinates
    for(let i = 0;i<array_coordinates.length;i++){
        let x =array_coordinates[i]["x"]
        let y =array_coordinates[i]["y"]
        let angle =array_coordinates[i]["angle"]
        anotherFigure(x,y,angle,ant_base_paht)
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
export {
    anotherFigure,
    clearCanvas,
    drawPoint,
    drawFullCadrAnotherImage
}