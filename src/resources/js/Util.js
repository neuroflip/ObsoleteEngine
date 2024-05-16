import Point2D from "./Point2D";
import Point3D from "./Point3D";

const PI=3.1415926535897932384626433;
let Util = {
		CANVASW: 375,
		CANVASH: 375,
		XROTATE_INITIAL: 198,
		YROTATE_INITIAL: 45,
		CLEAR_COLOR: "#000",

	 	createArray(length) {
		    var arr = new Array(length || 0),
		        i = length;

		    if (arguments.length > 1) {
		        var args = Array.prototype.slice.call(arguments, 1);
		        while (i--) arr[length - 1 - i] = this.createArray.apply(this, args);
		    }

		    return arr;
		},
	    scaledDimensions(w, h) {
	        var width, height;

	        if (window.innerWidth > window.innerHeight) {
	            width = window.innerHeight;
	            height = window.innerHeight;
	        } else {
	            width = window.innerWidth;
	            height = window.innerWidth;
	        }

	        return {
	            "width": width,
	            "height": height
	        };
	    },
	    g2r(g) { 
	    	return g*(PI/180); 
	    },
		r2g(r) {
			return r*(180/PI); 
		},
		translate(point, object) {	
			for(let j=0; j<object.triangles.length; j++) {
				object.triangles[j].p1 = this.translatePoint(object.triangles[j].p1, point);
				object.triangles[j].p2 = this.translatePoint(object.triangles[j].p2, point);
				object.triangles[j].p3 = this.translatePoint(object.triangles[j].p3, point);
			}
		},
		translatePoint(p1, p2) {
			const x = p1.x + p2.x;
			const y = p1.y + p2.y;
			const z = p1.z + p2.z;
	
			return new Point3D(x,y,z);
		},
		zrotatePoint(point, q) {
			let tx, ty, temp;
		
			tx = point.x;
			ty = point.y;
			temp = tx * Math.cos(q) - ty * Math.sin(q);
			ty = tx * Math.sin(q) + ty * Math.cos(q);
			tx = temp;
			
			return new Point3D(tx, ty, point.z);
		},
		zrotate(q, object) {
			for(let j=0; j<object.triangles.length; j++) {
				object.triangles[j].p1 = this.zrotatePoint(object.triangles[j].p1, q);
				object.triangles[j].p2 = this.zrotatePoint(object.triangles[j].p2, q);
				object.triangles[j].p3 = this.zrotatePoint(object.triangles[j].p3, q);
			}
		},
		yrotatePoint(point, q) {
			let tx, tz, temp;
		
			tx = point.x;
			tz = point.z;
			temp = tz * Math.cos(q) - tx * Math.sin(q);
			tx = tz * Math.sin(q) + tx * Math.cos(q);
			tz = temp;
			
			return new Point3D(tx, point.y, tz);
		},
		yrotate(q, object) {
			for(let j=0; j<object.triangles.length; j++) {
				object.triangles[j].p1 = this.yrotatePoint(object.triangles[j].p1, q);
				object.triangles[j].p2 = this.yrotatePoint(object.triangles[j].p2, q);
				object.triangles[j].p3 = this.yrotatePoint(object.triangles[j].p3, q);
			}
		},
		xrotatePoint(point, q) {
			let tz, ty, temp;
		
			ty = point.y;
			tz = point.z;
			temp = ty * Math.cos(q) - tz * Math.sin(q);
			tz = ty * Math.sin(q) + tz * Math.cos(q);
			ty = temp;
				
			return new Point3D(point.x, ty, tz);
		},
		xrotate(q, object) {
			for(let j=0; j<object.triangles.length; j++) {
				object.triangles[j].p1 = this.xrotatePoint(object.triangles[j].p1, q);
				object.triangles[j].p2 = this.xrotatePoint(object.triangles[j].p2, q);
				object.triangles[j].p3 = this.xrotatePoint(object.triangles[j].p3, q);
			}
		},
		scale(s, object) {
			for(let j=0; j<object.triangles.length; j++) {
				object.triangles[j].p1 = this.scalePoint(object.triangles[j].p1, s);
				object.triangles[j].p2 = this.scalePoint(object.triangles[j].p2, s);
				object.triangles[j].p3 = this.scalePoint(object.triangles[j].p3, s);
			}
		},
		scalePoint(point, s) {
			return new Point3D(point.x * s, point.y * s, point.z * s);
		},
		calculate2DProjectionPoint: function(point3d, scaleFactor, width, height) {
			let point2d = new Point2D(0,0);

			point2d.x = Math.floor((point3d.x * scaleFactor / point3d.z * scaleFactor) + (width / 2));
			point2d.y = Math.floor((point3d.y * scaleFactor / point3d.z * scaleFactor) + (height / 2));
			
			return point2d;
		},
		drawLine: function(canvasCtx, x0, y0, x1, y1, color) {
			x0=Math.floor(x0);
			x1=Math.floor(x1);
			y0=Math.floor(y0);
			y1=Math.floor(y1);
			canvasCtx.strokeStyle = color;
			canvasCtx.lineCap = 'square';
			canvasCtx.beginPath();
			canvasCtx.moveTo(x0, y0);
			canvasCtx.lineTo(x1, y1);
			canvasCtx.closePath();
			canvasCtx.stroke();
			canvasCtx.shadowBlur = 0;
			canvasCtx.shadowColor = color;
		}
	};

	export default Util;