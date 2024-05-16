{
	if ($1 == "v")
	{
		print filename".points.push(new Point3D("$2","$3","$4"));"
	}

	if ($1 == "f")
	{
		print filename".faces.push({ p1: "$2", p2: "$3", p3: "$4" });"
	}

	if ($1 == "s")
	{

	}

	if ($1 == "#")
	{

	}

	if ($1 == "o")
	{

	}

}