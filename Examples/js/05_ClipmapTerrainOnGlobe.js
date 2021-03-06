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
        'Renderer/ClearBuffers',
        'Renderer/ClearState',
        'Renderer/Device',
        'Renderer/Mesh',
        'Renderer/VertexAttribute',
        'Renderer/Indices',
        'Renderer/DrawState',
        'Scene/Globes/RayCasted/RayCastedGlobe',
        'Scene/Cameras/CameraLookAtPoint',
        'Scene/Terrain/WorldWindTerrainSource',
        'Scene/Terrain/EsriRestImagery',
        'Scene/Terrain/GlobeClipmapTerrain'
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
            ClearBuffers,
            ClearState,
            Device,
            Mesh,
            VertexAttribute,
            Indices,
            DrawState,
            RayCastedGlobe,
            CameraLookAtPoint,
            WorldWindTerrainSoure,
            EsriRestImagery,
            ClobeClipmapTerrain
            )
    {
        'use strict';

        var ClipmapTerrainOnGlobe = function(){
            this._device = new Device("canvas");
            this._window = this._device.CreateWindow(680,680,'tttt');

            this._ellipsoid = Ellipsoid.Wgs84;

            var terrainSource = new WorldWindTerrainSoure();
            var imagery = new EsriRestImagery();

            this._clipmap = new ClobeClipmapTerrain(
                this._window.Contex,
                terrainSource,
                imagery,
                this._ellipsoid,
                511
            );
            this._clipmap.HeightExaggeration = 1.0;

            this._sceneState = new SceneState();
            this._sceneState.DiffuseIntensity = 0.90;
            this._sceneState.SpecularIntensity = 0.05;
            this._sceneState.AmbientIntensity = 0.05;
            this._sceneState.Camera.FieldOfViewX = Math.PI / 3.0;

            this._clearState = new ClearState();
            this._clearState.Color = Color.White();

            this._sceneState.Camera.PerspectiveNearPlaneDistance = 0.000001 * this._ellipsoid.MaximumRadius;
            this._sceneState.Camera.PerspectiveFarPlaneDistance = 10.0 * this._ellipsoid.MaximumRadius;
            this._sceneState.SunPosition = new Vector3D(200000, 300000, 200000).Multiply(this._ellipsoid.MaximumRadius);

            this._lookCamera = new CameraLookAtPoint(this._sceneState.Camera, this._window, this._ellipsoid);
            this._lookCamera.Range = 1.5 * this._ellipsoid.MaximumRadius;


            this._globe = new RayCastedGlobe(this._device,this._window.Context);
            this._globe.Shape = this._ellipsoid;

            this._flag = false;
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

            this._clearDepth = new ClearState();
            this._clearDepth.Buffers = ClearBuffers.DepthBuffer | ClearBuffers.StencilBuffer;

            this._window.RenderFrameHandler = (function(that){
                var clipmapTerrainOnGlobe = that;
                return function(){
                    clipmapTerrainOnGlobe.OnRenderFrame();
                };
            })(this);

        };

        ClipmapTerrainOnGlobe.prototype.OnRenderFrame = function(){
            var context = this._window.Context;

            context.Clear(this._clearState);

            if(this._flag){
                this._globe.Render(context,this._sceneState);
            }

            //console.log(this._name);
        };


        ClipmapTerrainOnGlobe.prototype.Run = function(updateRate){
            this._window.Run(updateRate);
        };




        var example = new ClipmapTerrainOnGlobe();

        example.Run(60);




        console.log('ok.');
    });