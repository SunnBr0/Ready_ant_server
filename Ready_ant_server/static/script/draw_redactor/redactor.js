import { ToolsDraw } from "./tools.js"
import { draw_point_linear } from "./function_draw.js"
import { COLOR_CURENT, SIZE_LINE } from "./options_draw.js"
let draw_map = document.getElementById('draw_map')
let button_tools_draw = document.getElementsByClassName("image-button")
let draw_instruments = document.getElementById("draw_instruments")
let context = draw_map.getContext('2d');
console.dir(draw_instruments);

// let Tools_draw = new ToolsDraw(context)
// Tools_draw.drawPoint(20, 30, 'A', 'red', 1);

let choice = null
let is_drawing = false
let prevMouseX, prevMouseY, snapshot;

function drawRect(event) {
    context.strokeRect(event.offsetX, event.offsetY, prevMouseX - event.offsetX, prevMouseY - event.offsetY);
}
function fullClear(event) {
    context.clearRect(0, 0, draw_map.width, draw_map.height);
}

function start(event, draw_color, draw_width) {
    is_drawing = true
    prevMouseX = event.offsetX
    prevMouseY = event.offsetY
    context.beginPath()
    context.lineWidth = draw_width
    context.strokeStyle = draw_color
    context.fillStyle = draw_color;
    console.log(SIZE_LINE);

    switch (choice) {
        case "draw":
            context.fillRect(event.offsetX - Math.round(draw_width / 2), event.offsetY - Math.round(draw_width / 2), draw_width, draw_width);
            break;
        case "full_clear":
            fullClear(event)
            break;
        
        default:
            break;
    }
    snapshot = context.getImageData(0, 0, draw_map.width, draw_map.height)
    console.log("d");
}
function draw(event, choice) {
    if (!is_drawing) return
    context.putImageData(snapshot, 0, 0)
    switch (choice) {
        case "draw":
            context.lineTo(event.offsetX, event.offsetY)
            context.stroke()
            break;
        case "clear":
            context.strokeStyle = "#fff"
            context.lineTo(event.offsetX, event.offsetY)
            context.stroke()
            break;
        case "figure":
            drawRect(event)
            break;
        case "full_clear":
            fullClear(event)
            break;
        default:
            break;
    }
    console.log("obj");
    console.log(event.offsetX);
    console.log(event.offsetY);
}
function stop(event) {
    if (is_drawing) {
        context.stroke()
        context.closePath()
        is_drawing = false
    }

}



draw_map.addEventListener("mousedown", (event) => start(event, COLOR_CURENT, SIZE_LINE), false)
draw_map.addEventListener("mousemove", (event) => draw(event, choice), false)
draw_map.addEventListener("mouseup", stop, false)
draw_map.addEventListener("mouseout", stop, false)

draw_instruments.addEventListener("click", (event) => {
    choice = event.target.closest("button").value

    if(choice === "full_clear"){
        fullClear(event)
    //условие переписать учитывая value кнопок)
    }else if(choice === "type_ant" ||choice === "RAbota_ant"||choice === "mama_ant"||choice === "soldat_ant"){
        let type_ant = document.getElementsByClassName("type_item_tools")
        if(type_ant[0].style.display == "inline-block"){
            type_ant[0].style.display = "none"
        }else{
            type_ant[0].style.display = "inline-block"
        }
    }

    // switch (choice) {
    //     case "full_clear":
    //         fullClear(event)
    //     break;
    //     // <!-- <div>
    //     //   <button class="image-button" value="type_ant">
    //     //     <img src="../img/logo.webp" alt="Иконка" width="20" height="20">
    //     //   </button>
    //     //   <div class="type_item_tools">
    //     //     <button class="image-button" value="type_ant">
    //     //       <img src="../img/logo.webp" alt="Иконка" width="20" height="20">
    //     //     </button>
    //     //     <button class="image-button" value="type_ant">
    //     //       <img src="../img/logo.webp" alt="Иконка" width="20" height="20">
    //     //     </button>
    //     //     <button class="image-button" value="type_ant">
    //     //       <img src="../img/logo.webp" alt="Иконка" width="20" height="20">
    //     //     </button>
    //     //   </div>
    //     // </div> -->
    //     case ("type_ant" ||"RAbota_ant"):
    //         console.log(event.target);
    //         let type_ant = document.getElementsByClassName("type_item_tools")
    //         type_ant[0].style.display = "none"
    //             // let current = document.getElementsByClassName("image-button")
    //             // console.log(current[0].value);
    //             // console.log(choice);
    //             // console.log("d");
    //             // let div = document.createElement("div");
    //             // div.className = "type_item_tools"
    //             // let button = document.createElement("button");
    //             // let img = document.createElement("img");
    //             // img.src ="../img/logo.webp"
    //             // img.alt ="Иконка"
    //             // img.width ="20"
    //             // img.height ="20"
    //             // button.append(img);
    //             // button.className  = "image-button";
    //             // button.value  = "image-button";

    //             // let button1= document.createElement("button");
    //             // let img1 = document.createElement("img");
    //             // img1.src ="../img/logo.webp"
    //             // img1.alt ="Иконка"
    //             // img1.width ="20"
    //             // img1.height ="20"
    //             // button1.append(img1);
    //             // button1.className  = "image-button";
    //             // button1.value  = "image-button";

    //             // let button2 = document.createElement("button");
    //             // let img2 = document.createElement("img");
    //             // img2.src ="../img/logo.webp"
    //             // img2.alt ="Иконка"
    //             // img2.width ="20"
    //             // img2.height ="20"
    //             // button2.append(img2);
    //             // button2.className  = "image-button";
    //             // button2.value  = "image-button";
    //             // // div.style.color = "white";
    //             // // div.innerHTML = "Hello";
    //             // div.append(button);
    //             // div.append(button1);
    //             // div.append(button2);
    //             // // document.getElementById("draw_instruments").append(div);
    //             // current[2].after(div);
    //         break
    //     default:
    //         break;
    // }
    console.log(choice);
})



