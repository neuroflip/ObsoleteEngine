import getAnimation from "./Animation.js";
import Camera from "./Camera.js";
import MouseHandler from "./MouseHandler.js";
import Util from "./Util.js";
import Point3D from "./Point3D.js";
import Sprite from "./Sprite.js";
import logoImage from "../img/logo.png";

import "../css/main.scss";
import Light from "./Light.js";

export default class Engine {
	constructor(canvas) {
		this.requestAnimationFrameID = null;
		this.mouseHandler = null;
		this.animation = null;
		this.currentObject = 0;
		this.xAngle = 0;
		this.yAngle = 0;
		this.lastScreenX = 0;
		this.lastScreenY = 0;
		this.isMovingMouse = false;
		this.canvas = canvas;
		this.canvasCtx = this.canvas.getContext('2d');
		this.canvas.width = Util.CANVASW;
		this.canvas.height = Util.CANVASH;
		this.canvasCtx.lineWidth = 0.3;
		this.camera = null;
		this.light = null;
		this.sprite = new Sprite(this.canvas,logoImage);
	}

	init() {
		this.mouseHandler = new MouseHandler();
		initScene.call(this);
		window.setInterval(nextObject.bind(this), 30);

		this.canvas.oncontextmenu = ignoreFunction;
		this.reScaleViewport();
		this.renderScene();
	}

	reScaleViewport(d) {
		var dimensions = Util.scaledDimensions(window.innerWidth, window.innerHeight);

		window.document.getElementById(this.canvas.id).style.height = dimensions.height + "px";
		window.document.getElementById(this.canvas.id).style.width = dimensions.width + "px";
	}

	renderScene() {
		clearCtx.call(this);
		this.light.rotateLight(1);

		if(this.mouseHandler.isMovingMouse) {
			for(let i=0; i<this.animation.length; i++) {
				this.camera.translateInverseToCamera(this.animation[i]);
				Util.yrotate(Util.g2r(-this.mouseHandler.xAngle), this.animation[i]);
				Util.xrotate(Util.g2r(this.mouseHandler.yAngle), this.animation[i]);	
				this.camera.translateToCamera(this.animation[i]);	
			}
		}

		render.call(this, this.animation[this.currentObject]);
		this.sprite.render(0,0);
		renderText.call(this, '');
		this.requestAnimationFrameID = window.requestAnimationFrame(this.renderScene.bind(this), this.canvas);
	}
}

function ignoreFunction(event) {
	event.preventDefault();
	event.stopPropagation();
	event.stopImmediatePropagation();

	return false;
}

function nextObject(e) {
	!this.isMovingMouse && 
	(this.currentObject == (this.animation.length-1) ? this.currentObject = 0 : this.currentObject++);
}

function initScene() {
	this.camera = new Camera();
	this.light = new Light(new Point3D(0,0,0), 
						   new Point3D("F","0","0"));

	this.animation = getAnimation();
	for(let i=0; i<this.animation.length; i++) {
		Util.xrotate(Util.g2r(Util.XROTATE_INITIAL), this.animation[i]);	
		Util.yrotate(Util.g2r(Util.YROTATE_INITIAL), this.animation[i]);
		Util.translate(new Point3D(1, this.camera.yOff, this.camera.zOff), this.animation[i]);
	}
	
	this.light.position = Util.xrotatePoint(this.light.position, Util.g2r(Util.XROTATE_INITIAL));
	this.light.position = Util.zrotatePoint(this.light.position, Util.g2r(Util.YROTATE_INITIAL));

	this.light.position = Util.translatePoint(this.light.position, 
		new Point3D(0, this.camera.yOff+5, this.camera.zOff));
}

function clearCtx() {
	this.canvasCtx.fillStyle = Util.CLEAR_COLOR;
	this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

function calculate2DProjectionPoint(triangles, projection, i) {
	projection[i].p1 = Util.calculate2DProjectionPoint(triangles[i].p1, this.camera.scaleFactor, this.canvas.width, this.canvas.height);
	projection[i].p2 = Util.calculate2DProjectionPoint(triangles[i].p2, this.camera.scaleFactor, this.canvas.width, this.canvas.height);
	projection[i].p3 = Util.calculate2DProjectionPoint(triangles[i].p3, this.camera.scaleFactor, this.canvas.width, this.canvas.height);
}

function getColorFromDistanceTriangleLight(point) {
	const distance = Math.abs(this.light.getLightDistance(point));
	
	return (16 - Math.max(Math.min(Math.ceil(16 * distance / 14), 16), 0)).toString(16);
}

function renderText(text) {
	this.canvasCtx.font = '12px Topaza1200';
	this.canvasCtx.fillStyle = "#FFF";
	this.canvasCtx.fillText('OBSOLETE Wireframe 3d Engine', 100, 15);
	this.canvasCtx.fillText('Animation Engine Demo', 100, 30);
	this.canvasCtx.fillText('Click and drag to rotate...', 100, 45);
}

function render(object) {
	let color;

	this.canvasCtx.beginPath();
	for(var i=0; i<object.triangles.length-1; i++) {
		calculate2DProjectionPoint.call(this, object.triangles, object.projection, i);
		color = getColorFromDistanceTriangleLight.call(this, object.triangles[i].p1);

		if(object.projection[i].p1.x>=0 && 
			object.projection[i].p1.y>=0 && 
			object.projection[i].p2.x>=0 &&
			object.projection[i].p2.y>=0 &&
			object.projection[i].p3.x>=0 &&
			object.projection[i].p3.y>=0 &&
			object.projection[i].p1.x<=Util.CANVASW && 
			object.projection[i].p1.y<=Util.CANVASH && 
			object.projection[i].p2.x<=Util.CANVASW &&
			object.projection[i].p2.y<=Util.CANVASH &&
			object.projection[i].p3.x<=Util.CANVASW &&
			object.projection[i].p3.y<=Util.CANVASH) {
				Util.drawLine(this.canvasCtx, 
					object.projection[i].p1.x,
					object.projection[i].p1.y,
					object.projection[i].p2.x,
					object.projection[i].p2.y,
					`#${color}${color}${color}`);
				Util.drawLine(this.canvasCtx, 
					object.projection[i].p2.x,
					object.projection[i].p2.y,
					object.projection[i].p3.x,
					object.projection[i].p3.y,
					`#${color}${color}${color}`);
				Util.drawLine(this.canvasCtx, 
					object.projection[i].p3.x,
					object.projection[i].p3.y,
					object.projection[i].p1.x,
					object.projection[i].p1.y,
					`#${color}${color}${color}`);
		}
	}
	this.canvasCtx.stroke();
}

function drawTriangle(triangle, color) {
	this.canvasCtx.beginPath();
	this.canvasCtx.moveTo(triangle.p1.x, triangle.p1.y);
	this.canvasCtx.lineTo(triangle.p2.x, triangle.p2.y);
	this.canvasCtx.lineTo(triangle.p3.x, triangle.p3.y);
	this.canvasCtx.closePath();
		
	this.canvasCtx.strokeStyle = '#000';
	this.canvasCtx.stroke();
	this.canvasCtx.fillStyle = color;
	this.canvasCtx.fill();
}

function getObjectCenterPoint(object) {
	let minX, minY, minZ, maxX, maxY, maxZ;

	({minX, minY, minZ, maxX, maxY, maxZ} = getRangeDimensionsFromObject(object));

	object.centerPoint = new Point3D(minX + (maxX-minX)/2, 
		minY + (maxY-minY)/2, 
		minZ + (maxZ-minZ)/2);
}

function getRangeDimensionsFromObject(object) {
	let minX = 10000, minY = 10000, minZ = 10000;
	let maxX = -10000, maxY = -10000, maxZ = -10000, triangle;

	for (let i=0; i<object.triangles.length; i++) {
		triangle = object.triangles[i];
		minX = (minX > triangle.p1.x) ? triangle.p1.x : minX;
		minX = (minX > triangle.p2.x) ? triangle.p2.x : minX;
		minX = (minX > triangle.p3.x) ? triangle.p3.x : minX;

		minY = (minY > triangle.p1.y) ? triangle.p1.y : minY;
		minY = (minY > triangle.p2.y) ? triangle.p2.y : minY;
		minY = (minY > triangle.p3.y) ? triangle.p3.y : minY;

		minZ = (minZ > triangle.p1.z) ? triangle.p1.z : minZ;
		minZ = (minZ > triangle.p2.z) ? triangle.p2.z : minZ;
		minZ = (minZ > triangle.p3.z) ? triangle.p3.z : minZ;

		maxX = ( maxX < triangle.p1.x) ? triangle.p1.x :  maxX;
		maxX = ( maxX < triangle.p2.x) ? triangle.p2.x :  maxX;
		maxX = (maxX < triangle.p3.x) ? triangle.p3.x : maxX;

		maxY = (maxY < triangle.p1.y) ? triangle.p1.y : maxY;
		maxY = (maxY < triangle.p2.y) ? triangle.p2.y : maxY;
		maxY = (maxY < triangle.p3.y) ? triangle.p3.y : maxY;

		maxZ = (maxZ < triangle.p1.z) ? triangle.p1.z : maxZ;
		maxZ = (maxZ < triangle.p2.z) ? triangle.p2.z : maxZ;
		maxZ = (maxZ < triangle.p3.z) ? triangle.p3.z : maxZ;
	}

	return {minX, minY, minZ, maxX, maxY, maxZ};
}