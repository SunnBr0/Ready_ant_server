import { among_us_origin, among_us, ant_base_paht } from "../draw_cansvas/type_ant.js"


class ToolsDraw {

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
    infoCenterHex
    arrayCoord
    radiusHex
    width
    height
    sizeSquare
    sizeTriangle
    typeFigure
    sizeFigure
    constructor(context, choice, width, height) {
        this.context = context
        this.choice = choice

        this.infoCenterHex = new Set()
        this.arrayCoord = new Array()
        this.width = width
        this.height = height
    }

    setChoice(choice) {
        this.choice = choice
    }
    setSizeLine(sizeLine) {
        this.SIZE_LINE = sizeLine
        this.sizeFigure = this.SIZE_LINE
        // this.sizeSquare = this.SIZE_LINE
        // this.sizeTriangle = this.SIZE_LINE
    }
    setColorCurent(colorCurent) {
        this.COLOR_CURENT = colorCurent
    }
    getInfoCenterHex() {
        return { "CoordsHex": this.arrayCoord, "RadiusOrLine": this.sizeFigure, "Type": this.typeFigure ,"MapWidth":this.width,"MapHeight":this.height}
    }
    

    drawBoardTriangle(width, height, color) {
        const sqrt3 = Math.sqrt(3);

        this.context.strokeStyle = color;
        this.context.lineWidth = 1;
        console.log("width", width);
        console.log("height", height);
        let sizeFigure = Number(this.sizeFigure)

        for (let y = 0; y <= height; y += sizeFigure * sqrt3 / 2) {
            for (let x = 0; x <= width; x += sizeFigure / 2) {
                this.drawTriangle(false, x, y);
            }
        }
    }

    drawTriangle(fill, x, y) {
        const sqrt3 = Math.sqrt(3);
        let fillFlag = false || fill
        const row = Math.floor((2 * y) / (this.sizeFigure * sqrt3));
        const xOffset = (row % 2 === 0) ? 0 : this.sizeFigure / 2;
        const col = Math.floor((2 * (x - xOffset) + this.sizeFigure / 2) / this.sizeFigure);
        const coordX = (col / 2) * this.sizeFigure + xOffset;
        const coordY = row * (this.sizeFigure * sqrt3 / 2);

        this.context.lineWidth = 1;


        let centerX, centerY;
        if (col % 2 === 0) { // Вверх
            centerX = coordX;
            centerY = coordY + this.sizeFigure * sqrt3 / 3;
        } else { // Вниз
            centerX = coordX;
            centerY = coordY + this.sizeFigure * sqrt3 / 6;
        }
        if (this.typeFigure == "hexagon" || this.typeFigure == "kvad") {
            this.arrayCoord = []
        }
        // Если флаг заполнения установлен и координаты центра еще не в массиве
        if (fillFlag && !this.arrayCoord.some(subArray => subArray[0] === centerX && subArray[1] === centerY)) {
            this.arrayCoord.push([centerX, centerY]);
        }
        this.typeFigure = "triangle"


        if (col % 2 === 0) {
            this.context.moveTo(coordX, coordY);
            this.context.lineTo(coordX + this.sizeFigure / 2, coordY + this.sizeFigure * sqrt3 / 2);
            this.context.lineTo(coordX - this.sizeFigure / 2, coordY + this.sizeFigure * sqrt3 / 2);
            if (fillFlag) this.context.fill();
            else this.context.stroke();
        } else {
            this.context.moveTo(coordX, coordY + this.sizeFigure * sqrt3 / 2);
            this.context.lineTo(coordX + this.sizeFigure / 2, coordY);
            this.context.lineTo(coordX - this.sizeFigure / 2, coordY);
            if (fillFlag) this.context.fill();
            else this.context.stroke();
        }
    }

    drawBoardKvad(width, height, color) {
        let sizeKvad = Number(this.sizeFigure)
        this.context.strokeStyle = color
        this.context.lineWidth = 1;
        // console.log(sizeKvad);
        for (let x = 0; x <= width; x += sizeKvad) {
            for (let y = 0; y <= height; y += sizeKvad) {
                this.drawKvad(false, x, y);
            }
        }
    }
    drawKvad(fill, x, y) {

        let fillFlag = false || fill
        let sizeKvad = Number(this.sizeFigure)
        let coordX = Math.floor(x / sizeKvad) * sizeKvad;
        let coordY = Math.floor(y / sizeKvad) * sizeKvad;
        let centerX = coordX + sizeKvad / 2;
        let centerY = coordY + sizeKvad / 2;


        if (this.typeFigure == "hexagon" || this.typeFigure == "triangle") {
            this.arrayCoord = []
        }
        // Если флаг заполнения установлен и координаты центра еще не в массиве
        if (fillFlag && !this.arrayCoord.some(subArray => subArray[0] === centerX && subArray[1] === centerY)) {
            this.arrayCoord.push([centerX, centerY]);
        }
        this.typeFigure = "kvad"


        this.context.lineWidth = 1;
        this.context.moveTo(coordX, coordY);
        this.context.lineTo(coordX + sizeKvad, coordY); // линия вправо
        this.context.lineTo(coordX + sizeKvad, coordY + sizeKvad); // линия вниз
        this.context.lineTo(coordX, coordY + sizeKvad); // линия влево
        if (fillFlag) this.context.fill();
        else this.context.stroke();
    }
    drawBoardHex(width, height, color) {
        this.arrayCoord = []
        this.context.strokeStyle = color
        const r = this.sizeFigure / 2;
        for (let y = r; y + r * Math.sqrt(3) < height; y += r * Math.sqrt(3)) {
            for (let x = r, j = 0; x + r * (3 / 2) < width; x += r * (3 / 2), j++) {
                this.drawHexagonPol(x, y + (j % 2) * r * (Math.sqrt(3) / 2), r);
            }
        }
    }
    drawHexagonPol(x, y, r) {
        const a = Math.PI / 3;
        // this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.moveTo(x + r, y);
        for (let i = 0; i < 6; i++) {
            this.context.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
        }
        this.context.closePath();
        this.context.stroke();
    }
    drawHexagon(fill, coordsX = null, coordsY = null) {
        let fillFlag = fill || false;
        let x, y
        const a = Math.PI / 3;
        const r = this.sizeFigure / 2;
        const k = 3 / 4
        const rSmall = (Math.sqrt(3) / 2) * r
        const mouseX = this.prevMouseX;
        const mouseY = this.prevMouseY;
        const closestX = Math.floor(mouseX / ((2 * r) * k));
        const closestY = Math.floor((mouseY - ((rSmall) * (closestX % 2))) / (2 * rSmall));


        if (coordsX == null || coordsY == null) {
            y = closestY * (2 * rSmall) + ((rSmall) * (closestX % 2)) + r
            x = closestX * ((2 * r) * k) + r
        } else {
            this.context.beginPath();
            y = closestY * (2 * rSmall) + ((rSmall) * (closestX % 2)) + r
            x = closestX * ((2 * r) * k) + r
        }
        if (this.typeFigure == "kvad" || this.typeFigure == "triangle") {
            this.arrayCoord = []
        }
        if (!this.arrayCoord.some(subArray => subArray[0] === [x, y][0] && subArray[1] === [x, y][1])) {
            this.arrayCoord.push([x, y]);
        }
        this.typeFigure = "hexagon"


        this.drawHexagonPol(x, y, r)


        if (fillFlag) this.context.fill();
        else this.context.stroke();
    }
    drawRect(event) {
        this.context.lineJoin = ""
        this.context.strokeRect(event.offsetX, event.offsetY, this.prevMouseX - event.offsetX, this.prevMouseY - event.offsetY);
    }
    fullClear() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.arrayCoord = []
        this.typeFigure = null
    }

    start(event, COLOR_CURENT, SIZE_LINE) {
        this.COLOR_CURENT = COLOR_CURENT
        this.SIZE_LINE = SIZE_LINE

        this.is_drawing = true
        this.prevMouseX = event.offsetX
        this.prevMouseY = event.offsetY
        this.context.beginPath()
        this.context.lineWidth = this.SIZE_LINE
        this.context.strokeStyle = this.COLOR_CURENT
        this.context.fillStyle = this.COLOR_CURENT;
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
                this.context.scale(10, 10)
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
                this.context.moveTo(this.prevMouseX, this.prevMouseY);
                this.context.lineTo(this.prevMouseX + 0.01, this.prevMouseY + 0.01);
                this.context.stroke();
                break;
            case "full_color":
                this.sizeFigure = this.SIZE_LINE
                this.drawHexagon(true)
                break;
            case "kvad":
                this.sizeFigure = this.SIZE_LINE
                this.drawKvad(true, this.prevMouseX, this.prevMouseY)
                break;
            case "triangle":
                this.sizeFigure = this.SIZE_LINE
                this.drawTriangle(true, this.prevMouseX, this.prevMouseY)
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
        this.prevMouseX = event.offsetX
        this.prevMouseY = event.offsetY
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
            case "full_color":
                this.sizeFigure = this.SIZE_LINE
                this.drawHexagon(true)
                break;
            case "kvad":
                this.sizeFigure = this.SIZE_LINE
                this.drawKvad(true, this.prevMouseX, this.prevMouseY)
                break;
            case "triangle":
                this.sizeFigure = this.SIZE_LINE
                this.drawTriangle(true, this.prevMouseX, this.prevMouseY)
                break;
            case "full_clear":
                this.fullClear(event)
                break;
            default:
                break;
        }
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

export {
    ToolsDraw
}