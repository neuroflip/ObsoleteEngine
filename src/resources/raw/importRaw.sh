#!/usr/bin/env bash

lines=$(awk 'END{print NR}' Cube.raw);

echo "define([\"Camera\", \"Util\", \"Triangle\", \"Point3D\", \"Point2D\"], function(Camera, Util, Triangle, Point3D, Point2D) {" > ../js/$1.js
echo "var object = {" >> ../js/$1.js
echo "	triangles: Util.createArray($lines)," >> ../js/$1.js
echo "	projection: Util.createArray($lines)" >> ../js/$1.js
echo "}, zOff = Camera.zOff;" >> ../js/$1.js

awk -f ./rawImport.awk $1.raw >> ../js/$1.js

echo "return object; });" >> ../js/$1.js
