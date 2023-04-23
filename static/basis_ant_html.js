let model_ant_copy = document.getElementById("model_ant")
let bg_ant_place_copy = document.getElementById("bg_ant_place")
let new_ant ;
console.log(new_ant);

const center_x_ant = (11.5*1000)/5
const center_y_ant = (12.5*1000)/5
let position_x = 0;
let position_y = 0;
let angle_ant = 0
let create_initial_ant = true

function create_ant_with_json(json){
    
    for(let i = 0;i<json["coordinates"].length;i++){
        if(create_initial_ant){
            new_ant = model_ant_copy.cloneNode(true)
            new_ant.setAttribute('id',`ant${i}`) 
        }else{
            new_ant = document.getElementById(`ant${i}`);
        }
        position_x = json["coordinates"][i]["x"]
        position_y = json["coordinates"][i]["y"]
        angle_ant = json["coordinates"][i]["angle"]
        new_ant.setAttribute("transform",`translate(${position_x},${position_y}) scale(0.005,0.005) rotate(${angle_ant} ${center_x_ant} ${center_y_ant})`)
        bg_ant_place_copy.append(new_ant)
    }
    create_initial_ant = false
}
export{
    create_ant_with_json

}