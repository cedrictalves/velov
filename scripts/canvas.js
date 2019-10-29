class Canvas {
    constructor(dom, erase, color, lineJoin, lineCap, lineWidth) {
        this.canvas = document.getElementById(dom);
        this.erase = document.getElementById(erase);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = color; //couleur
        this.ctx.lineJoin = lineJoin; //forme
        this.ctx.lineCap = lineCap; //extreminté de la ligne
        this.ctx.lineWidth = lineWidth; //taille de la ligne
        this.penX = 0;
        this.penY = 0;
        this.touchX;
        this.touchY;
        this.down = false;
        this.empty = true;
        this.canvas.addEventListener("mousedown", this.penDown.bind(this));
        this.canvas.addEventListener("mousemove", this.draw.bind(this));
        this.canvas.addEventListener("mouseup", this.noDown.bind(this));
        this.canvas.addEventListener("mouseout", this.noDown.bind(this));

        this.erase.addEventListener("click", this.eraseCanvas.bind(this));

        this.canvas.addEventListener("touchstart", this.touchDown.bind(this));
        this.canvas.addEventListener("touchmove", this.drawMobile.bind(this));
        this.canvas.addEventListener("touchend", this.noDown.bind(this));
    };

    //souris up
    noDown() {
        this.down = false;
    }

    //dessine
    draw(e) {
        if (!this.down) return;
        e.preventDefault();
        this.ctx.beginPath(); //commence la signature
        this.ctx.moveTo(this.penX, this.penY); //deplace le point de commencement 
        this.ctx.lineTo(e.offsetX, e.offsetY); //connecte les points
        this.ctx.stroke(); //dessine le chemin
        this.penX = e.offsetX;
        this.penY = e.offsetY;
        this.empty = false;
    }

    //dessine
    drawMobile(e) {
        if (!this.down) return;
        e.preventDefault();
        var rect = this.canvas.getBoundingClientRect();
        this.ctx.beginPath(); //commence la signature
        this.ctx.moveTo(this.touchX, this.touchY); //deplace le point de commencement 
        this.ctx.lineTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top); //connecte les points
        this.ctx.stroke(); //dessine le chemin
        this.touchX = e.touches[0].clientX - rect.left;
        this.touchY = e.touches[0].clientY - rect.top;
        this.empty = false;
    }

    //souris bas
    penDown(e) {
        this.down = true;
        this.penX = e.offsetX;
        this.penY = e.offsetY;
    }

    //touch bas
    touchDown(e) {
        e.preventDefault();
        var rect = this.canvas.getBoundingClientRect();
        this.down = true;
        this.touchX = e.touches[0].clientX - rect.left;
        this.touchY = e.touches[0].clientY - rect.top;
    }

    //efface le canvas
    eraseCanvas() {
        this.ctx.clearRect(0, 0, 200, 100);
        this.empty = true;
    }

}



