require.config({
	paths:{
		jquery : './thirdparty/jquery-1.11.0'
	},

	baseUrl:'Source'
});

require(
[
    'jquery',
    'Core/Vector3D',
    'Core/Geodetic2D',
    'Core/Geodetic3D',
    'Core/Ellipsoid'
],
function
(
    $,
    Vector3D,
    Geodetic2D,
    Geodetic3D,
    Ellipsoid
)
{
    var geodetic2d = new Geodetic2D(130,45);
    var geodetic3d = new Geodetic3D(133,55,100);
    var vec3Position = vec3.create();
    var ellipsoid = Ellipsoid.Wgs84;

    var t = ellipsoid.GeodeticSurfaceNormal(vec3Position);

    var v3 = new Vector3D(1,2,3);
    var vv = v3.Normalize();

    console.log(geodetic2d.Longitude,geodetic2d.Latitude);
    console.log(geodetic3d.getLongitude(),geodetic3d.getLatitude(),geodetic3d.getHeight());
    console.log(geodetic3d.Longitude);
    console.log(ellipsoid.Radii[0],ellipsoid.Radii[1],ellipsoid.Radii[2]);
    console.log(ellipsoid.MaximumRadius,ellipsoid.MinimumRadius);

    console.log('ok.');
});