let layer_instruments = document.getElementById("layer_instruments")
let layer_list = document.getElementById("layer_list")
let choice = null


function layer(number){
    return `<li>
    <div class="layer_container_item">
      <button class="image-button" value="visible">
        <img src="../img/img_redactor/border-outer.png" alt="Иконка" width="20" height="20">
      </button>
      <span class="text_layer">Слой ${number}</span>
    </div>
    </li>`
}

console.log(layer_list);

layer_instruments.addEventListener("click",(event)=>{
    choice = event.target.closest("button").value

    if(choice === "add_layer"){
        layer_list.insertAdjacentHTML("afterbegin",layer(layer_list.children.length))
    }
    if(choice === "full_clear"){
        layer_list.children[0].remove()
    }
    console.dir(layer_list.children.length);

})
