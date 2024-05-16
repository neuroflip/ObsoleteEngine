import Triangle from "../Triangle.js";
import Point2D from "../Point2D.js";
import Point3D from "../Point3D.js";
import Util from "../Util.js";

var stegosaurus__00004 = {
  triangles: new Array(),
  points: new Array(),
  faces: new Array(),
  projection: new Array(),
  centerPoint: new Point3D(0,0,0)
};

function generateTriangles() {
  for (let i=0; i<stegosaurus__00004.faces.length; i++) {
    const face = stegosaurus__00004.faces[i];

    stegosaurus__00004.triangles.push(new Triangle(
      stegosaurus__00004.points[face.p1-1],
      stegosaurus__00004.points[face.p2-1],
      stegosaurus__00004.points[face.p3-1]));
    stegosaurus__00004.projection.push(new Triangle(new Point2D(0,0), new Point2D(0,0), new Point2D(0,0)));
  }
}

generateTriangles();
export default stegosaurus__00004;
