class ToolsDraw{
    context
    delta_x
    delta_y
    constructor(context,delta_x,delta_y){
        this.context = context
        this.delta_x = delta_x
        this.delta_y = delta_y
    }
    print(){
        console.log(this.context);
    }

    drawPoint(x, y, label="", color, size){
        if (color == null) {
        	color = '#000';
        }
        if (size == null) {
            size = 5;
        }
      	// to increase smoothing for numbers with decimal part
      	let pointX = Math.round(x);
        let pointY = Math.round(y);
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI);
        this.context.fill();
        // this.context.moveTo(pointX, pointY)
        // this.context.lineTo(pointX,pointY)
        // this.context.strokeStyle = color
        // this.context.lineWidth = size
        // this.context.lineCap = "round"
        // this.context.lineJoin = "round"
        // this.context.stroke()
        // this.context.closePath()
      	if (label) {
            let textX = pointX;
            let textY = Math.round(pointY - size - 3);
              this.context.font = 'Italic 14px Arial';
              this.context.fillStyle = color;
              this.context.textAlign = 'center';
              this.context.fillText(label, textX, textY);
        }
        this.context.fillStyle = null
    }
}


export{
    ToolsDraw
}
