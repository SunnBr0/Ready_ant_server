let md_ant_copy = document.getElementById("model_ant")
let angle = 0
let dx = 50
let dy = 50
let value_change_x,value_change_y,value_change_z = 0
let ant_x,ant_y = 0
let delta_speed = 5;


const output_x = document.getElementById('output_x')
const input_x = document.getElementById('input_x')



document.addEventListener("keydown",(e)=>{
    if(angle>=360 || angle<=-360){
        angle = 0
    }

    switch (e.key) {
        
        case 'w':
            dx += delta_speed*Math.cos(angle*(Math.PI/180)+(Math.PI/2))
            dy += delta_speed*Math.sin(angle*(Math.PI/180)+(Math.PI/2))

            md_ant_copy.setAttribute("transform",`translate(${dx},${dy}) scale(0.005,0.005) rotate(${angle} ${(11.5*1000)/5} ${(12.5*1000)/5})`)
            break;
        case 'a':
            angle-=10
            md_ant_copy.setAttribute("transform",`translate(${dx},${dy}) scale(0.005,0.005) rotate(${angle} ${(11.5*1000)/5} ${(12.5*1000)/5})`)
            break;
        case 's':
            dx -= delta_speed*Math.cos(angle*(Math.PI/180)+(Math.PI/2))
            dy -= delta_speed*Math.sin(angle*(Math.PI/180)+(Math.PI/2))
            md_ant_copy.setAttribute("transform",`translate(${dx},${dy}) scale(0.005,0.005) rotate(${angle} ${(11.5*1000)/5} ${(12.5*1000)/5})`)
            break;
        case 'd':
            angle+=10
            md_ant_copy.setAttribute("transform",`translate(${dx},${dy}) scale(0.005,0.005) rotate(${angle} ${(11.5*1000)/5} ${(12.5*1000)/5})`)
            break;
        default:
            break;
    }
})
const change_x = (event) => {
	const { value, min, max, step, parentElement: parent } = event.target
	const decimals = step && step.includes('.') ? step.split('.')[1] : 1
	const percent = `${((value - min)/(max - min) * 100).toFixed(decimals)}%`
	parent.style.setProperty('--p', percent)
    angle = value
    md_ant_copy.setAttribute("transform",`translate(${dx},${dy}) scale(0.005,0.005) rotate(${angle} ${(11.5*1000)/5} ${(12.5*1000)/5})`)
	output_x.value = `value: ${value} (${percent})`
}
