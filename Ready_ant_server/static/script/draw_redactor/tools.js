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
    arrayCoordHex
    radiusHex
    width 
    height

    constructor(context, choice,width,height) {
        this.context = context
        this.choice = choice

        this.infoCenterHex = new Set()
        this.arrayCoordHex = new Array()
        this.width =width
        this.height = height
        //25-65
        // this.radiusHex = 65
    }

    setChoice(choice) {
        this.choice = choice
    }
    setSizeLine(sizeLine) {
        this.SIZE_LINE = sizeLine
        this.radiusHex = this.SIZE_LINE
    }
    setColorCurent(colorCurent) {
        this.COLOR_CURENT = colorCurent
    }
    getInfoCenterHex(){
        return {"CoordsHex":this.arrayCoordHex,"RadiusOrLine":this.radiusHex}
    }
    drawBoard(width, height,color) {
        // let hexagonAngle = Math.PI / 6 // 30 градусов в радианах
        // let sideLength = 32 // длина стороны, в пикселях
        // let hexHeight = Math.sin(hexagonAngle) * sideLength;
        // let hexRadius = Math.cos(hexagonAngle) * sideLength;
        // let hexRectangleWidth = 2 * hexRadius;
        // for (let i = 0; i < width; i++) {
        //     for (let j = 0; j < height; j++) {
        //         this.drawHexagon(false, i * hexRectangleWidth + ((j % 2) * hexRadius),
        //             j * (sideLength + hexHeight), false);
        //     }
        // }
        // for (let i = 0; i < width; i++) {
        //     for (let j = 0; j < height; j++) {
        //         this.drawHexagon(false, i, j);
        //     }
        // }
        // this.context.clearRect(0, 0, this.width, this.height);
        this.arrayCoordHex = []
        this.context.beginPath()
        this.context.strokeStyle = color
        const r = this.radiusHex/2;
        for (let y = r; y + r * Math.sqrt(3) < height; y += r * Math.sqrt(3)) {
            for (let x = r, j = 0; x + r * (3 / 2) < width; x += r * (3 / 2), j++) {
                this.drawHexagonPol(x, y + (j % 2) * r * (Math.sqrt(3) / 2), r);
                // console.log("X: ",x);
                // console.log("Y: ",y + (j % 2) * r * (Math.sqrt(3) / 2));
            }
        }
        this.context.closePath();

        // for (let y = r; y + r * (Math.sqrt(3) / 2) < height; y += r * (Math.sqrt(3) / 2)) {
        //     for (let x = r, j = 0; x + r * (1 + 1 / 2) < width; x += r * (1 + 1 / 2), y += (-1) ** j++ * r * (Math.sqrt(3) / 2)) {
        //         this.drawHexagonPol(x, y,r);
        //         // console.log("X: ",x);
        //         // console.log("Y: ",y);

        //     }
        // }
    }
    drawHexagonPol(x, y,r) {
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
        const r = this.radiusHex/2;
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

        if (!this.arrayCoordHex.some(subArray => subArray[0] === [x,y][0] && subArray[1] === [x,y][1])) {
            this.arrayCoordHex.push([x,y]);
        }

        this.drawHexagonPol(x, y,r)
        // let x, y
        // let fillFlag = fill || false;
        // let hexagonAngle = Math.PI / 6 // 30 градусов в радианах
        // let sideLength = 32 // длина стороны, в пикселях
        // let hexHeight = Math.sin(hexagonAngle ) * sideLength;
        // let hexRadius = Math.cos(hexagonAngle) * sideLength;
        // let hexRectangleHeight = sideLength + 2 * hexHeight;
        // let hexRectangleWidth = 2 * hexRadius;
        // let hexY = Math.floor(this.prevMouseY / (hexHeight + sideLength));
        // let hexX = Math.floor((this.prevMouseX - (hexY % 2) * hexRadius) / hexRectangleWidth);

        // if (coordsX == null || coordsY == null) {

        //     x = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
        //     y = hexY * (hexHeight + sideLength);
        // } else {
        //     this.context.beginPath();
        //     x = coordsX * hexRectangleWidth + ((coordsY % 2) * hexRadius);
        //     y = coordsY * (hexHeight + sideLength);
        // }



        // this.context.lineWidth = 2;
        // this.context.moveTo(x + hexRadius, y);
        // this.context.lineTo(x + hexRectangleWidth, y + hexHeight);
        // this.context.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        // this.context.lineTo(x + hexRadius, y + hexRectangleHeight);
        // this.context.lineTo(x, y + sideLength + hexHeight);
        // this.context.lineTo(x, y + hexHeight);
        // // this.context.fill();
        // this.context.closePath();

        // this.context.save();
        if (fillFlag) this.context.fill();
        else this.context.stroke();



        // let hexagonAngle = Math.PI / 6; // 30 градусов в радианах
        // let sideLength = 32; // длина стороны, в пикселях
        // let hexHeight = Math.sin(hexagonAngle) * sideLength;
        // let hexRadius = Math.cos(hexagonAngle) * sideLength;
        // let hexRectangleHeight = sideLength + 2 * hexHeight;
        // let hexRectangleWidth = 2 * hexRadius;
        // let hexY = Math.floor(this.prevMouseY / (hexHeight + sideLength));
        // let hexX = Math.floor((this.prevMouseX - (hexY % 2) * hexRadius) / hexRectangleWidth);
        // let x = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
        // let y = hexY * (hexHeight + sideLength);

        // // Поворот на 180 градусов
        // let rotationAngle = Math.PI/2;

        // this.context.translate(x + hexRectangleWidth / 2, y + hexRectangleHeight / 2);
        // this.context.rotate(rotationAngle);
        // this.context.translate(-(x + hexRectangleWidth / 2), -(y + hexRectangleHeight / 2));

        // this.context.moveTo(x + hexRadius, y + hexRectangleHeight);
        // this.context.lineTo(x + hexRectangleWidth, y + hexRectangleHeight - hexHeight);
        // this.context.lineTo(x + hexRectangleWidth, y + hexRectangleHeight - hexHeight - sideLength);
        // this.context.lineTo(x + hexRadius, y);
        // this.context.lineTo(x, y + sideLength - hexHeight);
        // this.context.lineTo(x, y + hexRectangleHeight - hexHeight);
        // this.context.fill();

        //     console.log("##############################################");
        //     let hexagonAngle = Math.PI / 6 // 30 градусов в радианах
        //     let sideLength = 32 // длина стороны, в пикселях
        //     // boardWidth = 100, // ширина "доски" по вертикали
        //     // boardHeight = 100, // высота "доски" по вертикали

        //     let hexHeight = Math.sin(hexagonAngle) * sideLength;
        //     let hexRadius = Math.cos(hexagonAngle) * sideLength;
        //     let hexRectangleHeight = sideLength + 2 * hexHeight;
        //     let hexRectangleWidth = 2 * hexRadius;
        //     let hexY = Math.floor(this.prevMouseY / (hexHeight + sideLength));
        //     let hexX = Math.floor((this.prevMouseX - (hexY % 2) * hexRadius) / hexRectangleWidth);
        //     let x = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
        //     let y = hexY * (hexHeight + sideLength);
        //     // console.log("hexX: ", hexX);
        //     // console.log("hexY: ", hexY);
        //     // console.log("screenX: ", screenX);
        //     // console.log("screenY: ", screenY);
        //     // console.log("eventInfo.offsetX ", this.prevMouseX);
        //     // console.log("eventInfo.offsetY ", this.prevMouseY);
        //     // let centerX = x + hexRectangleWidth / 2;
        //     // let centerY = y + hexRectangleHeight / 2;
        //     // console.log("CenterX: ", Math.round(centerX), "CenterY:", centerY);
        //     // var fill = fill || false;
        //     this.context.moveTo(x + hexRadius, y);
        //     this.context.lineTo(x + hexRectangleWidth, y + hexHeight);
        //     this.context.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        //     this.context.lineTo(x + hexRadius, y + hexRectangleHeight);
        //     this.context.lineTo(x, y + sideLength + hexHeight);
        //     this.context.lineTo(x, y + hexHeight);
        //     this.context.fill();
        // if (fill) this.context.fill();
        // else this.context.stroke();
    }
    drawRect(event) {
        this.context.lineJoin = ""
        this.context.strokeRect(event.offsetX, event.offsetY, this.prevMouseX - event.offsetX, this.prevMouseY - event.offsetY);
    }
    fullClear() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.arrayCoordHex = []
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
                // this.context.fillRect(this.prevMouseX - Math.round(this.SIZE_LINE / 2), this.prevMouseY - Math.round(this.SIZE_LINE / 2), this.SIZE_LINE, this.SIZE_LINE);
                // this.context.fillRect(this.prevMouseX - Math.round(this.SIZE_LINE / 2), this.prevMouseY - Math.round(this.SIZE_LINE / 2), this.SIZE_LINE, this.SIZE_LINE);
                this.context.moveTo(this.prevMouseX, this.prevMouseY);
                this.context.lineTo(this.prevMouseX + 0.01, this.prevMouseY + 0.01);
                this.context.stroke();
                // this.context.arc(this.prevMouseX, this.prevMouseY , this.SIZE_LINE, 0, 2 * Math.PI, true);
                break;
            case "full_color":
                this.radiusHex = this.SIZE_LINE
                this.drawHexagon(true)
                // let hexagonAngle = Math.PI / 6 // 30 градусов в радианах
                // let sideLength = 32 // длина стороны, в пикселях
                // let hexHeight = Math.sin(hexagonAngle) * sideLength;
                // let hexRadius = Math.cos(hexagonAngle) * sideLength;
                // let hexRectangleHeight = sideLength + 2 * hexHeight;
                // let hexRectangleWidth = 2 * hexRadius;
                // let hexY = Math.floor(this.prevMouseY / (hexHeight + sideLength));
                // let hexX = Math.floor((this.prevMouseX - (hexY % 2) * hexRadius) / hexRectangleWidth);
                // let x = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
                // let y = hexY * (hexHeight + sideLength);
                // this.context.moveTo(x + hexRadius, y);
                // this.context.lineTo(x + hexRectangleWidth, y + hexHeight);
                // this.context.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
                // this.context.lineTo(x + hexRadius, y + hexRectangleHeight);
                // this.context.lineTo(x, y + sideLength + hexHeight);
                // this.context.lineTo(x, y + hexHeight);
                // this.context.fill();
                // this.context.closePath();

                // this.drawHexagon(true);
                // var hexHeight,
                //     hexRadius,
                //     hexRectangleHeight,
                //     hexRectangleWidth,
                //     hexagonAngle = Math.PI / 6, // 30 градусов в радианах
                //     sideLength = 32, // длина стороны, в пикселях
                //     boardWidth = 100, // ширина "доски" по вертикали
                //     boardHeight = 100, // высота "доски" по вертикали

                //     hexHeight = Math.sin(hexagonAngle) * sideLength;
                // hexRadius = Math.cos(hexagonAngle) * sideLength;
                // hexRectangleHeight = sideLength + 2 * hexHeight;
                // hexRectangleWidth = 2 * hexRadius;
                // this.context.fillStyle = "green";
                // this.drawHexagon(this.context, screenX, screenY, true);
                // var centerX = screenX + hexRectangleWidth / 2;
                // var centerY = screenY + hexRectangleHeight / 2;
                // console.log("CenterX: ", Math.round(centerX), "CenterY:", centerY);


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
                // let hexagonAngle = Math.PI / 6 // 30 градусов в радианах
                // let sideLength = 32 // длина стороны, в пикселях
                // let hexHeight = Math.sin(hexagonAngle) * sideLength;
                // let hexRadius = Math.cos(hexagonAngle) * sideLength;
                // let hexRectangleHeight = sideLength + 2 * hexHeight;
                // let hexRectangleWidth = 2 * hexRadius;
                // let hexY = Math.floor(event.offsetY / (hexHeight + sideLength));
                // let hexX = Math.floor((event.offsetX - (hexY % 2) * hexRadius) / hexRectangleWidth);
                // let x = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
                // let y = hexY * (hexHeight + sideLength);
                // this.context.moveTo(x + hexRadius, y);
                // this.context.lineTo(x + hexRectangleWidth, y + hexHeight);
                // this.context.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
                // this.context.lineTo(x + hexRadius, y + hexRectangleHeight);
                // this.context.lineTo(x, y + sideLength + hexHeight);
                // this.context.lineTo(x, y + hexHeight);
                // this.context.fill();
                this.radiusHex = this.SIZE_LINE
                this.drawHexagon(true)
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

export {
    ToolsDraw
}