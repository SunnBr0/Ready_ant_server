let layer_instruments = document.getElementById("layer_instruments")

let choice = null




layer_instruments.addEventListener("click",(event)=>{
    choice = event.target.closest("button").value
    console.log(choice);

    if(choice === "add_layer"){
        
    }

})

