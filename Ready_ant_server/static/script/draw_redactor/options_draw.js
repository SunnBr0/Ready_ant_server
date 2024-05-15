let size_line_draw = document.getElementById("size_line")
let color_line = document.getElementById("color_line")
let choice_color = document.getElementById("choice_color")
let SIZE_LINE = size_line_draw.value ;
let COLOR_CURENT;
// let item_color = document.getElementsByClassName("color_item")
// let bgColor = window.getComputedStyle(document.getElementsByClassName('color_item')[0]).getPropertyValue('background-color');
// let choice_color = window.getComputedStyle(document.getElementById('color_line')).getPropertyValue('background-color');
size_line_draw.addEventListener("change",(e)=>{
    // console.log(size_line_draw.value);
    SIZE_LINE= size_line_draw.value
})
color_line.addEventListener("change",(e)=>{
    // console.log(color_line.value);
    COLOR_CURENT = color_line.value
})
choice_color.addEventListener("click",(e)=>{
    let color = window.getComputedStyle(e.target.closest("li")).getPropertyValue('background-color');
    // console.log(color);
    COLOR_CURENT = color
})

console.log(choice_color);
// console.dir(choice_color.children[0].style.backgroundColor);
// choice_color.children[0].style.backgroundColor = "blue"
// console.dir(choice_color.children[0].style.backgroundColor);
export{
    SIZE_LINE,
    COLOR_CURENT
}