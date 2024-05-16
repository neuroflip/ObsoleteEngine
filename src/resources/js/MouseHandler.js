const SENSI = 40;

export default class MouseHandler {
    constructor() {
        this.xAngle = 0;
        this.yAngle = 0;
        this.lastScreenX = 0;
        this.lastScreenY = 0;
        this.isMovingMouse = false;

        prepareUserInteraction.call(this);
    }
};
    
function prepareUserInteraction() {
    window.document.body.addEventListener('mousedown', mouseDownHandler.bind(this));
    window.document.body.addEventListener('mousemove', mouseMoveHandler.bind(this));
    window.document.body.addEventListener('mouseup', mouseUpHandler.bind(this));
    window.document.body.addEventListener('touchstart', mouseDownHandler.bind(this));
    window.document.body.addEventListener('touchmove', mouseMoveHandler.bind(this));
    window.document.body.addEventListener('touchend', mouseUpHandler.bind(this));
};

function mouseDownHandler(e) {
    const screenX = e.touches ? e.touches[0].screenX : e.screenX,
        screenY = e.touches ? e.touches[0].screenY : e.screenY;

    this.xAngle = 0;
    this.yAngle = 0;
    this.lastScreenX = screenX;
    this.lastScreenY = screenY;
    this.isMovingMouse = true;
    }
    
function mouseMoveHandler(e) {
    if (this.isMovingMouse === true) {
        const screenX = e.touches ? e.touches[0].screenX : e.screenX,
            screenY = e.touches ? e.touches[0].screenY : e.screenY;

        this.xAngle = (this.lastScreenX - screenX);
        this.yAngle = (this.lastScreenY - screenY);
    }
}

function mouseUpHandler(e) {
    this.isMovingMouse = false;
}