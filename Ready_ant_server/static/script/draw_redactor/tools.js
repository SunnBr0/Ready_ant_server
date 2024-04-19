import {among_us_origin,among_us,ant_base_paht} from "../draw_cansvas/type_ant.js"


class ToolsDraw{

    context
    event
    is_drawing = false
    snapshot
    prevMouseX
    prevMouseY
    SIZE_LINE
    choice
    COLOR_CURENT
    ant_base_paht
    constructor(context){
        this.context = context
    }

    setChoice(choice){
        this.choice = choice
    }
    setSizeLine(sizeLine){
        this.SIZE_LINE = sizeLine
    }
    setColorCurent(colorCurent){
        this.COLOR_CURENT = colorCurent
    }

    drawRect(event) {
        this.context.lineJoin = ""
         this.context.strokeRect(event.offsetX, event.offsetY, this.prevMouseX - event.offsetX, this.prevMouseY - event.offsetY);
    }
    fullClear() {
        this.context.clearRect(0, 0, draw_map.width, draw_map.height);
    }
    
    start(event,COLOR_CURENT,SIZE_LINE) {
        this.COLOR_CURENT = COLOR_CURENT
        this.SIZE_LINE = SIZE_LINE
        this.is_drawing = true
        this.prevMouseX = event.offsetX
        this.prevMouseY = event.offsetY
        this.context.beginPath()
        this.context.lineWidth = this.SIZE_LINE
        this.context.strokeStyle = this.COLOR_CURENT
        this.context.fillStyle = this.COLOR_CURENT;
        // this.context.lineCap = "round"
        // this.context.lineJoin = "bevel"
        console.log(this.SIZE_LINE);
        console.log("DASDADSASD");
        switch (this.choice) {
            case "RAbota_ant":
                this.context.translate(this.prevMouseX, this.prevMouseY);
                this.context.rotate(180)
                this.context.fill(ant_base_paht)
                this.context.resetTransform();
                break;
            case "mama_ant":
                this.context.translate(this.prevMouseX, this.prevMouseY);
                this.context.rotate(0)
                this.context.scale(10,10)
                this.context.lineWidth = 0.1
                this.context.stroke(among_us)
                this.context.resetTransform();
                break;
            case "soldat_ant":
                this.context.translate(this.prevMouseX, this.prevMouseY);
                this.context.rotate(180)
                this.context.fill(among_us_origin)
                this.context.resetTransform();
                break;
            case "draw":
                this.context.lineCap = "round"
                this.context.lineJoin = "round"
                // this.context.fillRect(this.prevMouseX - Math.round(this.SIZE_LINE / 2), this.prevMouseY - Math.round(this.SIZE_LINE / 2), this.SIZE_LINE, this.SIZE_LINE);
                // this.context.fillRect(this.prevMouseX - Math.round(this.SIZE_LINE / 2), this.prevMouseY - Math.round(this.SIZE_LINE / 2), this.SIZE_LINE, this.SIZE_LINE);
                this.context.moveTo(this.prevMouseX, this.prevMouseY);
                this.context.lineTo(this.prevMouseX+0.01, this.prevMouseY+0.01);
                this.context.stroke();
                // this.context.arc(this.prevMouseX, this.prevMouseY , this.SIZE_LINE, 0, 2 * Math.PI, true);
                break;
            case "full_clear":
                this.fullClear(event)
                break;
    
            default:
                break;
        }

        this.snapshot = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height)
        console.log("d");
    }
    draw(event) {
        if (!this.is_drawing) return
        this.context.putImageData(this.snapshot, 0, 0)
        switch (this.choice) {
            case "draw":
                this.context.lineCap = "round"
                this.context.lineJoin = "round"
                this.context.lineTo(event.offsetX, event.offsetY)
                this.context.stroke()
                break;
            case "clear":
                this.context.strokeStyle = "#fff"
                this.context.lineTo(event.offsetX, event.offsetY)
                this.context.stroke()
                break;
            case "figure":
                this.drawRect(event)
                break;
            case "full_clear":
                this.fullClear(event)
                break;
            default:
                break;
        }
        console.log("obj");
        console.log(event.offsetX);
        console.log(event.offsetY);
    }

    stop(event) {
        console.log("######");
        if (this.is_drawing) {
            this.context.stroke()
            this.context.closePath()
            this.is_drawing = false
        }
    
    }
    
}

export{
    ToolsDraw
}