class Player {
    constructor (){
        this.x = undefined;
        this.y = undefined;
        this.prevX = undefined;
        this.prevY = undefined;
        this.dx = undefined;
        this.dy = undefined;
    }

    draw (){
        context.beginPath();
        context.arc(this.x, this.y, w*0.05, 0, 2*Math.PI);
        context.fillStyle = "blue";
        context.fill();
        context.stroke();
    }

    update(){
        this.dx = this.x - this.prevX;
        this.dy = this.y - this.prevY;
        this.prevX = this.x;
        this.prevY = this.y;
        this.x = Math.max(Math.min(this.x, w - w*0.05), w*0.05);
        this.y = Math.max(Math.min(this.y, h - w * 0.05), w*0.05);       
    }
}