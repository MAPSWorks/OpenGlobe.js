/**
 * Created by luosong on 2014/4/18.
 */

require.config({
    paths:{
        jquery : './thirdparty/jquery-1.11.0'
    },

    baseUrl:'../Source'
});

require(
    [
        'jquery',
        'Core/Vector2D',
        'Core/Vector3D',
        'Core/Geodetic2D',
        'Core/Geodetic3D',
        'Core/Ellipsoid',
        'Core/PrimitiveType',
        'Renderer/Camera',
        'Renderer/Color',
        'Renderer/BufferHint',
        'Renderer/RenderState',
        'Renderer/SceneState',
        'Renderer/ClearState',
        'Renderer/Device',
        'Renderer/Mesh',
        'Renderer/VertexAttribute',
        'Renderer/Indices',
        'Renderer/DrawState',
        'Scene/Globes/RayCasted/RayCastedGlobe'
    ],
    function
        (
            $,
            Vector2D,
            Vector3D,
            Geodetic2D,
            Geodetic3D,
            Ellipsoid,
            PrimitiveType,
            Camera,
            Color,
            BufferHint,
            RenderState,
            SceneState,
            ClearState,
            Device,
            Mesh,
            VertexAttribute,
            Indices,
            DrawState,
            RayCastedGlobe
            )
    {
        var GlobeRayCasting = function(){
            this._flag = false;
            var globeShape = Ellipsoid.ScaledWgs84;

            this._device = new Device("canvas");
            this._window = this._device.CreateWindow(680,680,'tttt');

            this._sceneState = new SceneState();
            this._sceneState.Camera.Eye = new Vector3D(0,-8.0,0);
            //this._sceneState.Camera.Up = Vector3D.UnitZ();
            //this._sceneState.SunPosition = new Vector3D(5.0,2,2.0);

            this._clearState = new ClearState();
            this._clearState.Color = Color.FromRgba(0.5,0.5,0.5,1.0);

            this._window.RenderFrameHandler = (function(that){
                var globeRayCasting = that;
                return function(){
                    globeRayCasting.OnRenderFrame();
                };
            })(this);

            //load image
            this._texture = null;
            var image = new Image();
            var that = this;
            image.onload = function(){
                that._texture = that._device.CreateTexture2D(image);
                that._globe.Texture = that._texture;
                that._window.Context.TextureUnits.GetTextureUnitByIndex(0).Texture = that._texture;
                that._flag = true;
            };
            image.src = 'data/Imagery/NASA/world_topo_bathy_200411_3x5400x2700.jpg';

            this._globe = new RayCastedGlobe(this._device,this._window.Context);
            this._globe.Shape = globeShape;

            this._sceneState.Camera.zoomToTarget(globeShape.MaximumRadius * 1.2);
        };

        GlobeRayCasting.prototype.OnRenderFrame = function(){
            var context = this._window.Context;

            context.Clear(this._clearState);

            if(this._flag){
                this._globe.Render(context,this._sceneState);
            }

            //console.log(this._name);
        };


        GlobeRayCasting.prototype.Run = function(updateRate){
            this._window.Run(updateRate);
        };




        var example = new GlobeRayCasting();

        example.Run(60);




        console.log('ok.');
    });