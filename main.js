require.config({
	paths:{
		jquery : './thirdparty/jquery-1.11.0'
	},

	baseUrl:'Source'
});

require(
[
    'jquery',
    'Core/Geodetic2D',
    'Core/Geodetic3D',
    'Core/Ellipsoid'
],
function
(
    $,
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


    console.log(geodetic2d.Longitude,geodetic2d.Latitude);
    console.log(geodetic3d.getLongitude(),geodetic3d.getLatitude(),geodetic3d.getHeight());
    console.log(geodetic3d.Longitude);
    console.log(ellipsoid.getRadii()[0],ellipsoid.getRadii()[1],ellipsoid.getRadii()[2]);
    console.log(ellipsoid.getMaximumRadius(),ellipsoid.getMinimumRadius());

    console.log('ok.');
});