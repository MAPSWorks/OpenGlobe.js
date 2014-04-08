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
    'Renderer/Camera',
    'Renderer/RenderState',
    'Renderer/SceneState',
    'Renderer/ClearState',
    'Renderer/Device'
],
function
(
    $,
    Vector3D,
    Geodetic2D,
    Geodetic3D,
    Ellipsoid,
    Camera,
    RenderState,
    SceneState,
    ClearState,
    Device
)
{
    var Triangle = function(){
        this._name = 'test Trianlge';
        this._device = new Device("canvas");
        this._window = this._device.CreateWindow(680,680,'tttt');
        //this._shaderProgram = this._device.CreateProgramFromID("shader-vs","shader-fs");

        this._sceneState = new SceneState();
        this._clearState = new ClearState();

        this._sceneState.Camera.zoomToTarget(1);


        this._window.RenderFrameHandler = (function(that){
            var triangle = that;
            return function(){
                triangle.OnRenderFrame();
            };
        })(this);
    };

    Triangle.prototype.OnRenderFrame = function(){
        var context = this._window.Context;

        context.Clear(this._clearState);
        console.log(this._name);
    };


    Triangle.prototype.Run = function(updateRate){
        this._window.Run(updateRate);
    };




    var example = new Triangle();

    example.Run(60);


    

    console.log('ok.');
});