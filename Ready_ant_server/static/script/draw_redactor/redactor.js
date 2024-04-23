import { ToolsDraw } from "./tools.js"
import {layerBlock,canvasRedactor} from "./layer_redactor.js"
import { COLOR_CURENT, SIZE_LINE } from "./options_draw.js"
let list_layer_map = document.getElementsByClassName("list_layer_map")
let draw_map = document.getElementById('draw_map')
let button_tools_draw = document.getElementsByClassName("image-button")
let draw_instruments = document.getElementById("draw_instruments")
let layer_list = document.getElementById("layer_list")
let redactor_map_main = document.getElementById("redactor_map_main")
let map = document.getElementById("map")

console.log("$$$$ ",redactor_map_main);


// let context = draw_map.getContext('2d');
let layer = list_layer_map[0]
let context = layer.getContext('2d');
var Tools_draw = new ToolsDraw(context,null)
console.dir(list_layer_map);
console.dir(draw_instruments);
// Tools_draw.setColorCurent(COLOR_CURENT)
// Tools_draw.setSizeLine(SIZE_LINE)

let choice = null
var choiceDraw = null
var choiceLayer = null
let currentTools = null
// layer.addEventListener("mousedown", (event) => Tools_draw.start(event,COLOR_CURENT,SIZE_LINE), false)
// layer.addEventListener("mousemove", (event) => Tools_draw.draw(event), false)
// layer.addEventListener("mouseup", (event) =>Tools_draw.stop(event), false)
// layer.addEventListener("mouseout", (event) =>Tools_draw.stop(event), false)


// draw_instruments.addEventListener("click", (event) => {
    
    // choice = event.target.closest("button").value
    // console.dir(list_layer_map);
    // Tools_draw.setChoice(choice)
    // if (choice === "full_clear") {
    //     Tools_draw.fullClear(event)
    //     //условие переписать учитывая value кнопок)
    // } else if (choice === "type_ant" || choice === "RAbota_ant" || choice === "mama_ant" || choice === "soldat_ant") {
    //     let type_ant = document.getElementsByClassName("type_item_tools")
    //     if (type_ant[0].style.display == "inline-block") {
    //         type_ant[0].style.display = "none"
    //     } else {
    //         type_ant[0].style.display = "inline-block"
    //     }
    // }

    // console.log(choice);
// })



redactor_map_main.addEventListener("click",(event)=>{
    console.log(event.target);
    layer = list_layer_map[0]

    context = layer.getContext('2d');
    Tools_draw = new ToolsDraw(context)
    let mainCurrent =  event.target
    console.log("####  ",mainCurrent);
    try {
    choice = mainCurrent.closest("button").value
    currentTools = choice
        // if ( mainCurrent.closest("#panel_layer button").value != null) {
        //     choice = mainCurrent.closest("#panel_layer button").value
        // }else if (mainCurrent.closest("#draw_instruments button").value != null) {
        //     choice = mainCurrent.closest("#draw_instruments button").value
            
        // }else{
        //     choice = null
        // }
        // console.log("####  ",choiceLayer);
    } catch (e) {
        
    }
    // console.log("####  ",event.target.className);
    // console.log("####  ",event.target.classList);
    // console.log("####  ",event.target.getAttribute("class"));
    // try {
    //     console.log("####  ",event.target.closest("#draw_instruments button").value);
    //     if(event.target.closest("#draw_instruments button").value != null){
    //         Tools_draw.setChoice(event.target.closest("#draw_instruments button").value != null)
    //     }
    // } catch (error) {
        
    // }
    // console.log("####  ",event.target.closest("#draw_instruments button"));
    // console.log("####  ",event.target.closest("button"));
    // console.dir(list_layer_map);
    // if(event.target.closest("#draw_instruments button").value != null){
    //     Tools_draw.setChoice(choice)
    // }
    Tools_draw.setChoice(choice)
    console.log("####  ",choice);

    if (choice === "full_clear") {
        Tools_draw.fullClear(event)
        //условие переписать учитывая value кнопок)
    } else if (choice === "type_ant" || choice === "RAbota_ant" || choice === "mama_ant" || choice === "soldat_ant") {
        let type_ant = document.getElementsByClassName("type_item_tools")
        if (type_ant[0].style.display == "inline-block") {
            type_ant[0].style.display = "none"
        } else {
            type_ant[0].style.display = "inline-block"
        }
    }
    if(choice === "add_layer"){
        layer_list.insertAdjacentHTML("afterbegin", layerBlock(layer_list.children.length))
        map.insertAdjacentHTML("afterbegin", canvasRedactor(layer_list.children.length))
        // layer = list_layer_map[0]
        // context = layer.getContext('2d');
        layer = list_layer_map[0]
    context = layer.getContext('2d');
        Tools_draw = new ToolsDraw(context,choice)
        choice = null
    }else if(choice === "minus_layer"){
        layer_list.children[0].remove()
      map.children[0].remove()
      layer = list_layer_map[0]
      choice = null
      
    }
    // console.log("####  ",choice);
    console.dir(layer_list.children.length);
    layer.addEventListener("mousedown", (event) => Tools_draw.start(event,COLOR_CURENT,SIZE_LINE), false)
    layer.addEventListener("mousemove", (event) => Tools_draw.draw(event), false)
    layer.addEventListener("mouseup", (event) =>Tools_draw.stop(event), false)
    layer.addEventListener("mouseout", (event) =>Tools_draw.stop(event), false)
    

})

// layer_list.addEventListener("click",(event)=>{
// let Tools_draw1 = new ToolsDraw(list_layer_map[0].getContext('2d'))
// console.dir(list_layer_map);
// Tools_draw1.setChoice(choice)
// console.log("###### ",choice);
// list_layer_map[0].addEventListener("mousedown", (event) => Tools_draw1.start(event,COLOR_CURENT,SIZE_LINE), false)
// list_layer_map[0].addEventListener("mousemove", (event) => Tools_draw1.draw(event), false)
// list_layer_map[0].addEventListener("mouseup", (event) =>Tools_draw1.stop(event), false)
// list_layer_map[0].addEventListener("mouseout", (event) =>Tools_draw1.stop(event), false)
//   })

// function updateLayerUse(){
//     console.dir(list_layer_map);
// Tools_draw.setChoice(choice)
// console.log("###### ",choice);
// list_layer_map[0].addEventListener("mousedown", (event) => Tools_draw.start(event,COLOR_CURENT,SIZE_LINE), false)
// list_layer_map[0].addEventListener("mousemove", (event) => Tools_draw.draw(event), false)
// list_layer_map[0].addEventListener("mouseup", (event) =>Tools_draw.stop(event), false)
// list_layer_map[0].addEventListener("mouseout", (event) =>Tools_draw.stop(event), false)
// }

export {
    choice
}