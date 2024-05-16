export default class Sprite {
    constructor(canvas, imagePath) {
        this.canvas = canvas;
        this.canvasCtx = this.canvas.getContext('2d');
        this.image = new Image();
        this.image.onload = function() {
            this.render();
        }.bind(this);
        this.image.src = imagePath;
    }

    render(x=0, y=0) {
        this.canvasCtx.drawImage(this.image,x,y);
    }
}