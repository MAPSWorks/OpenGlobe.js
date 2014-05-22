/**
 * Created by luosong on 2014/4/28.
 */
define([
    'Core/defineProperties',
    'Core/Vector2D',
    'Core/Vector3D',
    'Core/Geodetic2D',
    'Core/Geodetic3D',
    'Core/Ellipsoid',
    'Core/PrimitiveType',
    'Core/WindingOrder',
    'Renderer/Camera',
    'Renderer/Color',
    'Renderer/BufferHint',
    'Renderer/RenderState',
    'Renderer/SceneState',
    'Renderer/ClearState',
    'Renderer/ClearBuffers',
    'Renderer/Device',
    'Renderer/Mesh',
    'Renderer/VertexAttribute',
    'Renderer/Indices',
    'Renderer/DrawState',
    'Scene/Globes/RayCasted/RayCastedGlobe',
    'Scene/Cameras/CameraLookAtPoint'
],function(
    defineProperties,
    Vector2D,
    Vector3D,
    Geodetic2D,
    Geodetic3D,
    Ellipsoid,
    PrimitiveType,
    WindingOrder,
    Camera,
    Color,
    BufferHint,
    RenderState,
    SceneState,
    ClearState,
    ClearBuffers,
    Device,
    Mesh,
    VertexAttribute,
    Indices,
    DrawState,
    RayCastedGlobe,
    CameraLookAtPoint
    ){
    'use strict';

    var TriangleMeshTerrainTile = function(context, tile){

        var device = this._device = new Device("canvas");
        var sp = device.CreateProgram('','');

        this._tileMinimumHeight = tile.MinimumHeight;
        this._tileMaximumHeight = tile._maximumHeight;

        this._heightExaggeration = sp.getUniformByName('u_heightExaggeration');
        this._minimumHeight = sp.getUniformByName('u_minimumHeight');
        this._maximumHeight = sp.getUniformByName('u_maximumHeight');
        this.HeightExaggeration = 1;

        ////////////////////////////////////////////////

        var mesh = new Mesh();
        mesh.PrimitiveType = PrimitiveType.Triangles;
        mesh.FrontFaceWindingOrder = WindingOrder.Counterclockwise;

        var numberOfPosition = tile.Resolution.X * tile.Resolution.Y;

        var positionsAttribute = new VertexAttribute('position');
        var positions = positionsAttribute.Values;
        mesh.Attributes['position'] = positionsAttribute;

        var indices = new Indices();
        mesh.Indices = indices;

        var numberOfPartitionsX = tile.Resolution.X - 1;
        var numberOfPartitionsY = tile.Resolution.Y - 1;
        var numberOfIndices = (numberOfPartitionsX * numberOfPartitionsY) * 6;


        //positions
        var lowerLeft = tile.Extent.LowerLeft;
        var toUpperRight = tileExtent.UpperRight.Subtract(lowerLeft);
        var heightIndex = 0;
        for(var y = 0; y <= numberOfPartitionsY; ++y){
            var deltaY = y / numberOfPartitionsY;
            var currentY = lowerLeft.Y + (deltaY * toUpperRight.Y);

            for(var x = 0; x <= numberOfPartitionsX; ++x){
                var deltaX = x / numberOfPartitionsX;
                var currentX = lowerLeft.X + (deltaX * toUpperRight.X);
                positions.push(new Vector3D(currentX,currentY,tile.Heights[heightIndex++]));
            }
        }

        //Indices

        var rowDelta = numberOfPartitionsX + 1;
        var i = 0;
        for(var y = 0; y < numberOfPartitionsY; ++y){
            for(var x = 0; x < numberOfPartitionsX; ++x){
                indices.AddTriangle(i, i+1, rowDelta + (i + 1));
                indices.AddTriangle(i,rowDelta + (i + 1),rowDelta + i);
                i += 1;
            }
            i += 1;
        }



        this._drawState = new DrawState();
        this._drawState.RenderState.FacetCulling.FrontFaceWindingOrder = mesh.FrontFaceWindingOrder;
        this._drawState.ShaderProgram = sp;
        this._drawState.VertexArray = context.CreateVertexArray(mesh,sp.VertexAttributes,BufferHint.StaticDraw);

        this._primitiveType = mesh.PrimitiveType;

        this._clearColor = new ClearState();
        this._clearColor.Buffers = ClearBuffers.ColorBuffer;
        // Only depth needs to be cleared but include stencil for speed.
        this._clearDepthStencil = new ClearState();
        this._clearDepthStencil.Buffers = ClearBuffers.DepthBuffer | ClearBuffers.StencilBuffer;

        this._terrainFramebuffer = null;

        this._depthTexture = null;
        this._colorTexture = null;


    };


    defineProperties(TriangleMeshTerrainTile.prototype,{
        HeightExaggeration : {
            get : function(){
                return this._heightExaggeration.Value;
            },
            set : function(x){
                if(x <= 0){
                    throw new Error('HeightExaggeration must be greater than zero.');
                }

                if(this._heightExaggeration.Value != x){
                    this._heightExaggeration.Value = value;
                    this._minimumHeight.Value = this._tileMinimumHeight * x;
                    this._maximumHeight.Value = this._tileMaximumHeight * x;


                }
            }
        },

        DepthTexture : {
            get : function(){
                return this._depthTexture;
            }
        }
    });



    TriangleMeshTerrainTile.prototype.Render = function(context,sceneState){
        context.Draw(this._primitiveType,this._drawState,sceneState);
    };



    return TriangleMeshTerrainTile;
});