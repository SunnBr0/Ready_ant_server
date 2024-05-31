import { ToolsDraw } from "./tools.js"
import { COLOR_CURENT, SIZE_LINE } from "./options_draw.js"
import{canvasRedactor}from"./layer_redactor.js"
let list_layer_map = document.getElementsByClassName("list_layer_map")
let draw_map = document.getElementById('draw_map')
let button_tools_draw = document.getElementsByClassName("image-button")
let draw_instruments = document.getElementById("draw_instruments")
let layer_list = document.getElementById("layer_list")
let redactor_map_main = document.getElementById("redactor_map_main")
let map = document.getElementById("map")
// URL сервера, на который отправляется запрос
const url = 'http://localhost:8081/red';


let hexMapFlag = false;
let kvadMapFlag = false;
let triangleMapFlag = false
let saveDataMap = null
let flagSaveDataMap = false
console.dir(list_layer_map[0]);
let layer = draw_map

let mapWidth = draw_map.width+500
let mapHeight = draw_map.height+500

let context = layer.getContext('2d');
var Tools_draw = new ToolsDraw(context, null,mapWidth, mapHeight)
let boardWidth = list_layer_map[0].width// ширина "доски" по вертикали
let boardHeight = list_layer_map[0].height // высота "доски" по вертикали
// Tools_draw.drawBoard(boardWidth, boardHeight)
console.log(SIZE_LINE);
Tools_draw.setSizeLine(SIZE_LINE)
console.dir(list_layer_map);
console.log("list_layer_map.length:", list_layer_map.length);
console.dir(draw_instruments);
console.log("$$$$ ", redactor_map_main);
let choice = null







redactor_map_main.addEventListener("click", (event) => {
    let mainCurrent = event.target
    console.log("####  ", mainCurrent);
    try {
        choice = mainCurrent.closest("button").value

    } catch (e) {

    }
    if (choice == "save") {
        saveDataMap = Tools_draw.getInfoCenterHex()
        flagSaveDataMap = true
        console.log(saveDataMap)
        console.log("object");
        // Настройки запроса
        // let data = {
        //     name: 'John',
        //     age: 30
        // };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saveDataMap)
        };
        // Отправка запроса
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Server response:', data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });

    }
    flagSaveDataMap = false
    Tools_draw.setChoice(choice)
    console.log("####  ", choice);

    if (choice === "full_clear") {
        Tools_draw.fullClear(event)
        // BackPhone.fullClear(event)
        //условие переписать учитывая value кнопок)
    } else if (choice === "type_ant" || choice === "RAbota_ant" || choice === "mama_ant" || choice === "soldat_ant") {
        let type_ant = document.getElementsByClassName("type_item_tools")
        if (type_ant[0].style.display == "inline-block") {
            type_ant[0].style.display = "none"
        } else {
            type_ant[0].style.display = "inline-block"
        }
    }

    // if(choice === "hex_map"){
    //     hexMapFlag=!hexMapFlag
    //     if(hexMapFlag){
    //         map.insertAdjacentHTML("beforeend", canvasRedactor(-list_layer_map.length,boardWidth,boardHeight))
    //         let layer = list_layer_map[1]
    //         let context = layer.getContext('2d');
    //         let BackPhone = new ToolsDraw(context, null, draw_map.width, draw_map.height)
    //         BackPhone.setColorCurent(COLOR_CURENT)
    //         BackPhone.setSizeLine(SIZE_LINE)
    //         BackPhone.drawBoardHex(boardWidth, boardHeight,"gray")
    //     }else{
    //         map.children[1].remove()
    //     }
    //     choice = null
    // }

    if(choice === "kvad_map"){
        kvadMapFlag=!kvadMapFlag
        // Tools_draw.setSizeLine(SIZE_LINE)
        Tools_draw.setSizeLine(SIZE_LINE)

        // Tools_draw.drawBoardKvadClient(mapWidth,mapHeight,"gray",kvadMapFlag)
        if(kvadMapFlag){
            // map.insertAdjacentHTML("beforeend", canvasRedactor(-list_layer_map.length,boardWidth,boardHeight))
            // let layer = list_layer_map[1]
            // let context = layer.getContext('2d');
            // let BackPhone = new ToolsDraw(context, null, draw_map.width, draw_map.height)
            // BackPhone.setColorCurent(COLOR_CURENT)
            // BackPhone.setSizeLine(SIZE_LINE)
            // BackPhone.drawBoardKvad(boardWidth, boardHeight,"gray")
            Tools_draw.bordClear(event)
            Tools_draw.drawBoardKvadClient(mapWidth,mapHeight,"gray",kvadMapFlag)
        }else{
            Tools_draw.drawBoardKvadClient(mapWidth,mapHeight,"gray",kvadMapFlag)

            // Tools_draw.bordClear(event)
            // // map.children[1].remove()
            // Tools_draw.setSizeLine(SIZE_LINE)
            // Tools_draw.drawBoardKvadClient(mapWidth,mapHeight,"gray",kvadMapFlag)
        }
        choice = null
    }

    //     /*
    //     kvadMapFlag=!kvadMapFlag
    //     if(kvadMapFlag){
    //         map.insertAdjacentHTML("afterbegin", canvasRedactor(list_layer_map.length,boardWidth,boardHeight))
    //         let layer = list_layer_map[0]
    //         let context = layer.getContext('2d');
    //         let BackPhone = new ToolsDraw(context, null, draw_map.width, draw_map.height)
    //         BackPhone.setColorCurent(COLOR_CURENT)
    //         BackPhone.setSizeLine(SIZE_LINE)
    //         BackPhone.drawBoardKvad(boardWidth, boardHeight,"gray")
    //     }else{
    //         map.children[0].remove()
    //     }
    //     choice = null */
    // if(choice === "triangle_map"){
    //     triangleMapFlag=!triangleMapFlag
    //     if(triangleMapFlag){
    //         map.insertAdjacentHTML("beforeend", canvasRedactor(-list_layer_map.length,boardWidth,boardHeight))
    //         let layer = list_layer_map[1]
    //         let context = layer.getContext('2d');
    //         let BackPhone = new ToolsDraw(context, null, draw_map.width, draw_map.height)
    //         BackPhone.setColorCurent(COLOR_CURENT)
    //         BackPhone.setSizeLine(SIZE_LINE)
    //         BackPhone.drawBoardTriangle(boardWidth, boardHeight,"gray")
    //     }else{
    //         map.children[1].remove()
    //     }
    //     choice = null
    // }


})
map.addEventListener("mousedown", (event) => Tools_draw.start(event, COLOR_CURENT, SIZE_LINE), false)
map.addEventListener("mousemove", (event) => Tools_draw.draw(event), false)
map.addEventListener("mouseup", (event) => Tools_draw.stop(event), false)
map.addEventListener("mouseout", (event) => Tools_draw.stop(event), false)


export {
    choice,
    saveDataMap,
    flagSaveDataMap
}