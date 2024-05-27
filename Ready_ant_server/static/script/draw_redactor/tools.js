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
    COLOR_CURENT = "#000000"
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
    startX
    startY
    offsetX = 0
    offsetY = 0
    scale = 1
    mainChoiceFigure = null
    mainSizeFigure = 0
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
        return { "CoordsHex": this.arrayCoord, "RadiusOrLine": this.sizeFigure, "Type": this.typeFigure, "MapWidth": this.width, "MapHeight": this.height }
    }


    drawBoardTriangle(width, height, color) {
        const sqrt3 = Math.sqrt(3);

        this.context.strokeStyle = color;
        this.context.lineWidth = 1;
        // console.log("width", width);
        // console.log("height", height);
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
        if ((fillFlag) && (!this.arrayCoord.some(subArray => subArray[0] === centerX && subArray[1] === centerY)) && (this.choice != "clear")) {
            this.arrayCoord.push([centerX, centerY]);
        }
        if (this.choice == "clear") {
            for (let i = 0; i < this.arrayCoord.length; i++) {
                if (this.arrayCoord[i][0] == centerX && this.arrayCoord[i][1] == centerY) {
                    this.arrayCoord.splice(i, 1)
                }
            }
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

    drawBoardKvadClient(width, height, color,flagMap){
        console.log("object");
        if(flagMap){
            // this.fullClear()
            this.drawBoardKvad(width,height,color)

            for (let item = 0; item < this.arrayCoord.length; item++) {
                this.context.beginPath();
                this.context.fillStyle = this.COLOR_CURENT || "black"
                this.context.strokeStyle = this.COLOR_CURENT || "#000000"
                this.drawKvad(true, this.arrayCoord[item][0], this.arrayCoord[item][1])
                this.context.closePath();
            }
        }else{
            // this.fullClear()
            for (let item = 0; item < this.arrayCoord.length; item++) {
                this.context.beginPath();
                this.context.fillStyle = this.COLOR_CURENT || "black"
                this.context.strokeStyle = this.COLOR_CURENT || "#000000"
                this.drawKvad(true, this.arrayCoord[item][0], this.arrayCoord[item][1])
                this.context.closePath();
            }
        }
    }

    drawBoardKvad(width, height, color) {
        let sizeKvad = Number(this.sizeFigure)
        this.context.strokeStyle = color
        this.context.lineWidth = 1;
        // console.log(sizeKvad);
        for (let x = 0; x <= width; x += sizeKvad) {
            for (let y = 0; y <= height; y += sizeKvad) {
                if (this.choice === "zoom" ) {
                    this.context.beginPath()
                    this.drawKvad(false, x, y);
                    this.context.closePath()
                } else {
                    this.drawKvad(false, x, y);
                }
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
        if ((fillFlag) && (!this.arrayCoord.some(subArray => subArray[0] === centerX && subArray[1] === centerY)) && (this.choice != "clear")) {
            this.arrayCoord.push([centerX, centerY]);
        }
        if (this.choice == "clear") {
            for (let i = 0; i < this.arrayCoord.length; i++) {
                if (this.arrayCoord[i][0] == centerX && this.arrayCoord[i][1] == centerY) {
                    this.arrayCoord.splice(i, 1)
                }
            }
        }
        this.typeFigure = "kvad"


        this.context.lineWidth = 1;
        this.context.moveTo(coordX, coordY);
        this.context.lineTo(coordX + sizeKvad, coordY); // линия вправо
        this.context.lineTo(coordX + sizeKvad, coordY + sizeKvad); // линия вниз
        this.context.lineTo(coordX, coordY + sizeKvad); // линия влево
        if (this.choice === "zoom") {
            this.context.closePath()
        } 

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
        let closestX = Math.floor(mouseX / ((2 * r) * k));
        let closestY = Math.floor((mouseY - ((rSmall) * (closestX % 2))) / (2 * rSmall));


        if (coordsX == null || coordsY == null) {
            y = closestY * (2 * rSmall) + ((rSmall) * (closestX % 2)) + r
            x = closestX * ((2 * r) * k) + r
        } else {
            // this.context.beginPath();
            closestX = Math.floor(coordsX / ((2 * r) * k));
            closestY = Math.floor((coordsY - ((rSmall) * (closestX % 2))) / (2 * rSmall));
            y = closestY * (2 * rSmall) + ((rSmall) * (closestX % 2)) + r
            x = closestX * ((2 * r) * k) + r
        }
        if (this.typeFigure == "kvad" || this.typeFigure == "triangle") {
            this.arrayCoord = []
        }
        if ((!this.arrayCoord.some(subArray => subArray[0] === [x, y][0] && subArray[1] === [x, y][1]) && (this.choice != "clear"))) {
            this.arrayCoord.push([x, y]);
        }
        if (this.choice == "clear") {
            for (let i = 0; i < this.arrayCoord.length; i++) {
                if (this.arrayCoord[i][0] == x && this.arrayCoord[i][1] == y) {
                    this.arrayCoord.splice(i, 1)
                }
            }
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
        // this.startX = event.clientX - this.offsetX;
        // this.startY = event.clientY - this.offsetY;
        this.is_drawing = true
        this.prevMouseX = event.offsetX
        this.prevMouseY = event.offsetY
        this.context.beginPath()
        this.context.lineWidth = this.SIZE_LINE
        this.context.strokeStyle = this.COLOR_CURENT
        this.context.fillStyle = this.COLOR_CURENT;
        // console.log(this.SIZE_LINE);
        // console.log("DASDADSASD");
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
                if (this.mainChoiceFigure != "full_color" || this.mainSizeFigure != this.SIZE_LINE) {
                    this.fullClear(event)
                }
                this.context.fillStyle = this.COLOR_CURENT || "black"
                this.context.strokeStyle = this.COLOR_CURENT || "#000000"
                this.mainChoiceFigure = this.choice
                this.sizeFigure = this.SIZE_LINE
                this.mainSizeFigure = this.SIZE_LINE
                this.drawHexagon(true)
                break;
            case "kvad":
                console.log(this.mainSizeFigure);
                console.log(this.SIZE_LINE);

                if (this.mainChoiceFigure != "kvad" || this.mainSizeFigure != this.SIZE_LINE) {
                    this.fullClear(event)
                }
                this.context.fillStyle = this.COLOR_CURENT || "#000000"
                this.context.strokeStyle = this.COLOR_CURENT || "#000000"
                console.log(this.COLOR_CURENT);
                this.mainChoiceFigure = this.choice
                this.sizeFigure = this.SIZE_LINE
                this.mainSizeFigure = this.SIZE_LINE
                this.drawKvad(true, this.prevMouseX, this.prevMouseY)
                break;
            case "triangle":
                if (this.mainChoiceFigure != "triangle" || this.mainSizeFigure != this.SIZE_LINE) {
                    this.fullClear(event)
                }
                this.context.fillStyle = this.COLOR_CURENT || "#000000"
                this.context.strokeStyle = this.COLOR_CURENT || "#000000"
                this.mainChoiceFigure = this.choice
                this.sizeFigure = this.SIZE_LINE
                this.mainSizeFigure = this.SIZE_LINE
                this.drawTriangle(true, this.prevMouseX, this.prevMouseY)
                break;
            case "zoom":
                this.startX = event.clientX - this.offsetX;
                this.startY = event.clientY - this.offsetY;
                // console.log(this.offsetX);
                break;
            case "full_clear":
                this.fullClear(event)
                break;
            case "clear":
                if (this.mainChoiceFigure == "kvad") {
                    this.context.strokeStyle = "#FFFFFF"
                    this.context.fillStyle = "#FFFFFF"
                    this.drawKvad(true, this.prevMouseX, this.prevMouseY)
                }
                if (this.mainChoiceFigure == "full_color") {
                    this.context.strokeStyle = "#FFFFFF"
                    this.context.fillStyle = "#FFFFFF"
                    this.drawHexagon(true)
                }
                if (this.mainChoiceFigure == "triangle") {
                    this.context.strokeStyle = "#FFFFFF"
                    this.context.fillStyle = "#FFFFFF"
                    this.drawTriangle(true, this.prevMouseX, this.prevMouseY)
                }
                this.context.fillStyle = this.COLOR_CURENT
                this.context.strokeStyle = this.COLOR_CURENT
                // this.context.strokeStyle = "#fff"
                // this.context.lineTo(event.offsetX, event.offsetY)
                // this.context.stroke()
                break;
            default:
                break;
        }

        this.snapshot = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height)
        // console.log("d");
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
                if (this.mainChoiceFigure == "kvad") {
                    this.context.strokeStyle = "#FFFFFF"
                    this.context.fillStyle = "#FFFFFF"
                    this.drawKvad(true, this.prevMouseX, this.prevMouseY)
                }
                if (this.mainChoiceFigure == "full_color") {
                    this.context.strokeStyle = "#FFFFFF"
                    this.context.fillStyle = "#FFFFFF"
                    this.drawHexagon(true)
                }
                if (this.mainChoiceFigure == "triangle") {
                    this.context.strokeStyle = "#FFFFFF"
                    this.context.fillStyle = "#FFFFFF"
                    this.drawTriangle(true, this.prevMouseX, this.prevMouseY)
                }
                // this.context.strokeStyle = "#fff"
                // this.context.lineTo(event.offsetX, event.offsetY)
                // this.context.stroke()
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
            case "zoom":
                this.offsetX = event.clientX - this.startX;
                this.offsetY = event.clientY - this.startY;
                // console.log(this.startX);
                // Ограничение перетаскивания по горизонтали
                // let maxOffsetX = 100;
                // let minOffsetX = -(this.width * this.scale - this.width);
                // this.offsetX = Math.max(Math.min(this.offsetX, maxOffsetX), minOffsetX);

                // // // Ограничение перетаскивания по вертикали
                // let maxOffsetY = 100;
                // let minOffsetY = -(this.height * this.scale - this.height);
                // this.offsetY = Math.max(Math.min(this.offsetY, maxOffsetY), minOffsetY);
                this.context.lineWidth = 1;

                this.context.clearRect(0, 0, this.width, this.height);
                this.context.save();
                this.context.translate(this.offsetX, this.offsetY);
                this.context.scale(this.scale, this.scale);

                // Example: Draw a grid
                // const size = Number(this.sizeFigure);
                // for (let x = 0; x < 2000; x += size) {
                //     for (let y = 0; y < 2000; y += size) {
                //         this.context.beginPath();
                //         this.context.fillStyle = this.COLOR_CURENT || "black"
                //         this.context.strokeStyle = this.COLOR_CURENT || "#000000"
                //         this.drawKvad(false, x, y);
                //         this.context.closePath();
                //         // this.arrayCoord
                //         // console.log(this.arrayCoord);
                //     }
                // }
                this.drawBoardKvad(2000, 2000, "gray")
                // this.drawKvad(true, 150, 150);
                this.context.beginPath();

                for (let item = 0; item < this.arrayCoord.length; item++) {
                    // console.log(this.arrayCoord[item]);
                    // console.log(this.arrayCoord);
                    // this.context.beginPath();

                    this.context.fillStyle = this.COLOR_CURENT || "black"
                    this.context.strokeStyle = this.COLOR_CURENT || "#000000"
                    if (this.mainChoiceFigure == "kvad") {
                        this.drawKvad(true, this.arrayCoord[item][0], this.arrayCoord[item][1])
                    }
                    if (this.mainChoiceFigure == "full_color") {
                        this.drawHexagon(true, this.arrayCoord[item][0], this.arrayCoord[item][1])
                    }
                    if (this.mainChoiceFigure == "triangle") {
                        this.drawTriangle(true, this.arrayCoord[item][0], this.arrayCoord[item][1])
                    }
                    // this.drawHexagon(true,this.arrayCoord[item][0], this.arrayCoord[item][1])
                    // this.drawTriangle(true, this.arrayCoord[item][0], this.arrayCoord[item][1])
                    // this.drawKvad(true, this.arrayCoord[item][0], this.arrayCoord[item][1]);
                    // this.context.closePath();
                }
                this.context.closePath();
                this.context.restore();
                break;
            case "full_clear":
                this.fullClear(event)
                break;
            default:
                break;
        }
    }

    stop(event) {
        // console.log("######");
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