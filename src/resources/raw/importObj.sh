#!/usr/bin/env bash

echo "import Triangle from \"./Triangle.js\";" > ../js/$1.js
echo "import Point2D from \"./Point2D.js\";" >>../js/$1.js
echo "import Point3D from \"./Point3D.js\";" >> ../js/$1.js
echo "import Util from \"./Util.js\";" >> ../js/$1.js

echo "
var $1 = {" >> ../js/$1.js
echo "  triangles: new Array()," >> ../js/$1.js
echo "  points: new Array()," >> ../js/$1.js
echo "  faces: new Array()," >> ../js/$1.js
echo "  projection: new Array()," >> ../js/$1.js
echo "  centerPoint: new Point3D(0,0,0)" >> ../js/$1.js
echo "};" >> ../js/$1.js

awk -f ./objImport.awk filename=$1 $1.obj >> ../js/$1.js

echo "
function generateTriangles() {
  for (let i=0; i<$1.faces.length; i++) {
    const face = $1.faces[i];

    $1.triangles.push(new Triangle(
      $1.points[face.p1-1],
      $1.points[face.p2-1],
      $1.points[face.p3-1]));
    $1.projection.push(new Triangle(new Point2D(0,0), new Point2D(0,0), new Point2D(0,0)));
  }
}

generateTriangles();" >> ../js/$1.js

echo "export default $1;" >> ../js/$1.js
