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
    'Core/Ellipsoid',
    'Renderer/RenderState',
    'Renderer/Device'
],
function
(
    $,
    Vector3D,
    Geodetic2D,
    Geodetic3D,
    Ellipsoid,
    RenderState,
    Device
)
{
    var device = new Device("canvas");
    var window = device.CreateWindow(800,900,'tttt');
    var shaderProgram = device.CreateProgramFromID("shader-vs","shader-fs");

    window.Run(60);


    

    console.log('ok.');
});