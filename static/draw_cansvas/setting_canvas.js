const canvas = document.getElementById('canvas');
canvas.width = 800
canvas.height = 800
const ctx = canvas.getContext('2d');
canvas.style.backgroundColor = "yellow"
document.body.appendChild(canvas);

// let line = new Path2D("M -1 -1 h 2 v 2 h -2 Z")
let among_us = new Path2D(`m0-5c.674.066 1.17.224 1.5.474.284.214.592.566.782.888.304.516.456 1.108.482 1.872l.012.376.062.044c.052.036.098.044.342.056.42.022.814.1 1.104.22.146.062.27.17.332.29.128.252.24.78.294 1.398.062.718.11 2.656.082 3.29-.016.366-.028.456-.07.606-.06.204-.194.48-.338.694-.142.212-.414.48-.564.552-.116.056-.13.058-.39.056-.15-.002-.354-.018-.46-.038l-.19-.032-.052.058c-.08.09-.098.214-.084.596.022.668-.11 1.444-.294 1.734-.052.082-.084.106-.284.202-.266.13-.672.256-1.006.312-.302.05-.334.05-.59-.008-.628-.142-1.132-.492-1.28-.888-.048-.126-.058-.242-.118-1.19-.02-.328-.042-.6-.046-.606-.006-.004-.068-.018-.138-.03-.126-.02-.224-.014-.36.026l-.072.02-.044.322c-.14 1.022-.356 1.632-.608 1.712-.25.078-1.13.102-1.414.036-.4-.09-.666-.348-.872-.848-.198-.476-.302-.986-.486-2.356-.212-1.58-.268-2.594-.172-3.14.04-.23.064-1.078.032-1.15-.012-.028-.072-.114-.132-.19-.142-.18-.276-.452-.332-.68-.124-.504.03-1.14.42-1.73.112-.17.396-.47.69-.73l.158-.14-.034-.054c-.062-.094-.004-.224.226-.51.326-.406.812-.83 1.238-1.08.468-.276.816-.368 1.62-.436.434-.036.674-.036 1.054.002zm-1.088.728c-.814.056-1.24.226-1.648.658-.14.148-.274.388-.274.488l0 .06.124-.012c.636-.064 1.316-.058 1.772.016.352.058.784.152.964.21.512.168.722.494.784 1.222.048.554-.052 1.17-.278 1.718-.31.748-.606 1.08-1.086 1.21-.1.026-.236.038-.58.044-1.01.022-2.29-.138-2.688-.336-.066-.032-.12-.056-.124-.054-.01.012-.11.79-.138 1.074-.084.854.01 1.802.308 3.142.14.636.144.654.14 1.062-.002.312.004.388.036.502.11.372.366.594.732.636.276.032.574.026.654-.016.084-.04.162-.186.258-.48.1-.306.102-.552.01-.786-.028-.066-.046-.078-.214-.146-.378-.148-.68-.372-.774-.57-.026-.056-.042-.106-.036-.112.006-.006.108.004.228.02.542.076.75.094 1.208.104.426.008.53.004.798-.032.34-.046.666-.054.784-.02.042.014.102.05.132.082l.056.058 0 .954 0 .954.056.096c.104.178.412.368.688.424.566.114.92-.004 1.104-.366.1-.198.144-.406.262-1.234.346-2.458.466-4.856.308-6.23-.018-.148-.076-.522-.13-.832-.294-1.688-.558-2.47-.972-2.872-.128-.124-.612-.484-.716-.534-.114-.054-.332-.082-.79-.1-.57-.024-.64-.024-.958-.002zm-1.744 1.918c-.456.102-.872.304-1.268.614-.228.176-.298.258-.378.428-.096.208-.132.356-.146.59-.01.182-.008.21.034.29.152.296.596.574 1.348.838.366.13 1.334.254 1.568.202.324-.072.724-.238.992-.414.198-.13.404-.334.472-.466.03-.06.082-.192.116-.29.18-.524.126-1.086-.13-1.37-.112-.124-.21-.182-.416-.246-.634-.196-1.714-.284-2.192-.176zm6.04 1.794-.13.03.008.684c.012.94-.026 2.422-.108 4.26-.018.404-.028.74-.022.746.006.006.128.012.272.014l.26.002.154-.076c.274-.136.522-.428.614-.722.23-.726.108-3.578-.19-4.49-.108-.334-.214-.442-.466-.478-.12-.018-.216-.01-.392.03z`)
let ant_base_paht = new Path2D(`M -2.8 -11.2 c-0.06,0.04 -0.41,0.33 -0.69,0.65c-0.6,0.61 -0.66,0.72 -0.57,1c0,0.06 0.39,0.65 0.81,1.31s0.77,1.23 0.78,1.26a0.29,0.29 0 0 1 -0.07,0.18a3.73,3.73 0 0 0 -0.45,1.08a9.11,9.11 0 0 0 0,2.15a2.09,2.09 0 0 0 0.94,1.25a0.75,0.75 0 0 1 0.24,0.17a0.69,0.69 0 0 1 -0.11,0.18l-0.11,0.16s-0.73,-0.25 -1.62,-0.57l-1.63,-0.6l-1,-1.48c-0.53,-0.81 -1.02,-1.51 -1.08,-1.56a0.5,0.5 0 0 0 -0.85,0.39c0,0.13 0.15,0.38 1.08,1.77c0.62,0.89 1.15,1.65 1.2,1.69s0.86,0.34 1.79,0.68l1.69,0.6l0,0.18a4.17,4.17 0 0 0 -0.05,0.44l0,0.26l-2.14,0a14.88,14.88 0 0 0 -2.23,0.07c-0.17,0.08 -2.29,3.25 -2.34,3.41a0.44,0.44 0 0 0 0,0.26a0.49,0.49 0 0 0 0.73,0.27a13.77,13.77 0 0 0 1.1,-1.54l1,-1.46l4,0l0.06,0.14a3.39,3.39 0 0 0 0.44,0.85c0.14,0.18 0.19,0.29 0.16,0.31l-1.8,0.43c-1.07,0.24 -1.75,0.41 -1.82,0.45s-0.71,1 -1.47,2.21c-1.48,2.28 -1.46,2.26 -1.3,2.54a0.54,0.54 0 0 0 0.69,0.18a19.72,19.72 0 0 0 1.4,-2.07l1.29,-2l1,-0.23c0.56,-0.13 1,-0.23 1,-0.22a1,1 0 0 1 -0.11,0.27c-0.06,0.14 -0.15,0.4 -0.2,0.57a4.71,4.71 0 0 0 1.37,4a2.13,2.13 0 0 0 3.22,0a4.92,4.92 0 0 0 1.44,-3.17a2.72,2.72 0 0 0 -0.2,-1.37a2.05,2.05 0 0 1 -0.13,-0.31s0.48,0.09 1,0.22l1,0.23l1.28,2a24,24 0 0 0 1.39,2.06a0.53,0.53 0 0 0 0.71,-0.16c0.16,-0.28 0.17,-0.26 -1.31,-2.56c-0.75,-1.18 -1.41,-2.17 -1.47,-2.21a16.09,16.09 0 0 0 -1.74,-0.43l-1.73,-0.42s0,-0.11 0.14,-0.27a4.24,4.24 0 0 0 0.5,-1c0,-0.06 0.16,-0.06 2,-0.06l2,0l1,1.47c0.82,1.23 1,1.49 1.12,1.55a0.51,0.51 0 0 0 0.71,-0.53a38.25,38.25 0 0 0 -2.27,-3.42a14.88,14.88 0 0 0 -2.23,-0.07l-2.14,0l0,-0.28c0,-0.16 0,-0.36 -0.05,-0.44l0,-0.16l1.52,-0.57c0.9,-0.32 1.7,-0.61 1.77,-0.65a10.06,10.06 0 0 0 1.23,-1.72c1,-1.51 1.09,-1.65 1.09,-1.81a0.49,0.49 0 0 0 -0.76,-0.42a14.13,14.13 0 0 0 -1.13,1.59l-1,1.5l-1.6,0.57c-0.88,0.32 -1.61,0.58 -1.62,0.57a1.28,1.28 0 0 1 -0.28,-0.35a1,1 0 0 1 0.25,-0.16a2.19,2.19 0 0 0 1,-1.28a10.74,10.74 0 0 0 0,-2.12a3.15,3.15 0 0 0 -0.41,-1a1,1 0 0 1 -0.12,-0.26s0.28,-0.58 0.73,-1.26l0.81,-1.29a0.47,0.47 0 0 0 0,-0.43a9.12,9.12 0 0 0 -1.36,-1.28a0.48,0.48 0 0 0 -0.5,0.16a0.39,0.39 0 0 0 -0.13,0.34l0,0.23l0.44,0.44l0.43,0.45l-0.59,0.94c-0.33,0.51 -0.61,0.95 -0.63,1s-0.13,0 -0.26,-0.09a3.06,3.06 0 0 0 -2.84,0a1,1 0 0 1 -0.3,0.12s-0.3,-0.46 -0.63,-1l-0.61,-0.94l0.44,-0.45l0.43,-0.47l0,-0.21a0.41,0.41 0 0 0 -0.15,-0.35a0.48,0.48 0 0 0 -0.59,-0.1z`)

ctx.strokeStyle  = "black";
ctx.lineWidth = 1 
ctx.fillStyle = "black";
function anotherFigure(x,y,angle,type){
    let angleInRadians = angle * Math.PI/180    // ctx.translate(x_center,y_center)
    ctx.translate(x, y);
    ctx.rotate(angleInRadians)
    ctx.fill(type)
    ctx.resetTransform();
}
function drawFullCadrAnt(obj_ant){
    let array_coordinates = obj_ant.coordinates
    for(let i = 0;i<array_coordinates.length;i++){
        let x =array_coordinates[i]["x"]
        let y =array_coordinates[i]["y"]
        let angle =array_coordinates[i]["angle"]
        anotherFigure(x,y,angle,ant_base_paht)
    }
}
function drawFullCadrMem(obj_ant){
    let array_coordinates = obj_ant.coordinates
    for(let i = 0;i<array_coordinates.length;i++){
        let x =array_coordinates[i]["x"]
        let y =array_coordinates[i]["y"]
        let angle =array_coordinates[i]["angle"]
        anotherFigure(x,y,angle,among_us)
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
export {
    anotherFigure,
    drawFullCadrAnt,
    clearCanvas,
    drawFullCadrMem
}