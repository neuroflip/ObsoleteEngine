import Util from "./Util"

export default class Light {
    constructor(position, color) {
        this.position = position;
        this.color =color;
    }

    rotateLight(angle) {
        this.position = Util.zrotatePoint(this.position, Util.g2r(angle));
    }

    translateLight(point) {
        this.position = Util.translatePoint(this.position, point);
    }

    getLight2DProjection(scaleFactor, width, height) {        
         return Util.calculate2DProjectionPoint(this.position, scaleFactor, width, height);
    }

    renderLight(canvas, scaleFactor, width, height) {
        const position2d = this.getLight2DProjection(scaleFactor/2, width, height);

        Util.drawLine(canvas, 
			position2d.x,
			position2d.y,
			position2d.x+4,
			position2d.y+4,
			`#${this.color.x}${this.color.y}${this.color.z}`);

        Util.drawLine(canvas, 
            position2d.x,
            position2d.y+4,
            position2d.x+4,
            position2d.y+4,
            `#${this.color.x}${this.color.y}${this.color.z}`);
        }

    getLightDistance(p1) {
        const p2 = this.position;
    
        return Math.sqrt( (p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y)^2 + (p2.z-p1.z)*(p2.z-p1.z) );
    }
};