import Point3D from "./Point3D";
import Util from "./Util";

export default class Camera {
	constructor() {
		this.yOff = 1;
		this.zOff = 10;
		this.scaleFactor = 20;
	}

	translateToCamera(object) {
		const point = new Point3D(0, this.yOff, this.zOff);

		Util.translate(point, object);
	}

	translateInverseToCamera(object) {
		const point = new Point3D(0, -this.yOff, -this.zOff);

		Util.translate(point, object);
	}
};