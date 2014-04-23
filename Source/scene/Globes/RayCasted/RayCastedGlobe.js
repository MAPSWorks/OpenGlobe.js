/**
 * Created by luosong on 2014/4/18.
 */
define([
    'Core/defineProperties',
    'Core/Vector3D',
    'Core/Geodetic2D',
    'Core/Geodetic3D',
    'Core/Ellipsoid',
    'Core/PrimitiveType',
    'Core/WindingOrder',
    'Renderer/CullFace',
    'Renderer/BufferHint',
    'Renderer/RenderState',
    'Renderer/ShaderProgram',
    'Renderer/ClearState',
    'Renderer/Device',
    'Renderer/Context',
    'Renderer/DrawState',
    'Renderer/Mesh',
    'Renderer/VertexAttribute',
    'Renderer/Indices'
],function(
    defineProperties,
    Vector3D,
    Geodetic2D,
    Geodetic3D,
    Ellipsoid,
    PrimitiveType,
    WindingOrder,
    CullFace,
    BufferHint,
    RenderState,
    ShaderProgram,
    ClearState,
    Device,
    Context,
    DrawState,
    Mesh,
    VertexAttribute,
    Indices
    ){
    'use strict';

    var RayCastedGlobe = function(device,context){
        this._device = device;
        this._context = context;

        this._renderState = new RenderState();
        this._renderState.FacetCulling.Face = CullFace.Front;

        var vs = '';
        var fs = '';
        var sp = device.CreateProgramFromID("shader-vs","shader-fs");

        this._cameraEyeSquared = sp.getUniformByName('u_cameraEyeSquared');
        this._useAverageDepth = sp.getUniformByName('u_useAverageDepth');

        this._drawState = new DrawState(this._renderState,sp,null);
        this._primitiveType = PrimitiveType.Triangles;

        this._shape = Ellipsoid.ScaledWgs84;
        this.Shade = true;
        this.ShowGlobe = true;

        this._texture = null;

        this._dirty = false;
        this._va = null;
    };

    RayCastedGlobe.prototype.Clean = function(context){
        if(this._dirty){
            if(this._va != null){
                this._va = null;
                this._drawState.VertexArray = null;
            }

            var mesh = new Mesh();
            mesh.PrimitiveType = PrimitiveType.Triangles;
            mesh.FrontFaceWindingOrder = WindingOrder.Counterclockwise;
            var positionAttribute = new VertexAttribute('position');
            mesh.Attributes['position'] = positionAttribute;

            var indices = new Indices();
            mesh.Indices = indices;

            var positions = positionAttribute.Values;
            var corner = new Vector3D(2,2,2);
            positions.push(new Vector3D(-corner.X, -corner.Y, -corner.Z ));
            positions.push(new Vector3D(corner.X, -corner.Y, -corner.Z  ));
            positions.push(new Vector3D(corner.X, corner.Y, -corner.Z   ));
            positions.push(new Vector3D(-corner.X, corner.Y, -corner.Z  ));
            positions.push(new Vector3D(-corner.X, -corner.Y, corner.Z  ));
            positions.push(new Vector3D(corner.X, -corner.Y, corner.Z   ));
            positions.push(new Vector3D(corner.X, corner.Y, corner.Z    ));
            positions.push(new Vector3D(-corner.X, corner.Y, corner.Z   ));

            //
            // 6 faces, 2 triangles each
            //
            indices.AddTriangle(4, 5, 6);    // Top: plane z = corner.Z
            indices.AddTriangle(4, 6, 7);
            indices.AddTriangle(1, 0, 3);    // Bottom: plane z = -corner.Z
            indices.AddTriangle(1, 3, 2);
            indices.AddTriangle(1, 6, 5);    // Side: plane x = corner.X
            indices.AddTriangle(1, 2, 6);
            indices.AddTriangle(2, 3, 7);    // Side: plane y = corner.Y
            indices.AddTriangle(2, 7, 6);
            indices.AddTriangle(3, 0, 4);    // Side: plane x = -corner.X
            indices.AddTriangle(3, 4, 7);
            indices.AddTriangle(0, 1, 5);    // Side: plane y = -corner.Y
            indices.AddTriangle(0, 5, 4);

            this._va = this._context.CreateVertexArray(mesh,
                this._drawState.ShaderProgram.VertexAttributes,
                BufferHint.StaticDraw);
            this._drawState.VertexArray = this._va;

            this._primitiveType = mesh.PrimitiveType;
            this._renderState.FacetCulling.FrontFaceWindingOrder = mesh.FrontFaceWindingOrder;

            this._drawState.ShaderProgram.getUniformByName('u_globeOneOverRadiiSquared').Value =
                this.Shape.OneOverRadiiSquared.ToArray();

            this._dirty = false;
        }
    };

    RayCastedGlobe.prototype.Render = function(context,sceneState){
        this.Clean(context);

        if(this.ShowGlobe){
            var eye = sceneState.Camera.Eye;
            var cameraEyeSquared = eye.MultiplyComponents(eye);

            if(this.Shade){
                context.TextureUnits.GetTextureUnitByIndex(0).Texure = this.Texure;

                this._cameraEyeSquared.Value = cameraEyeSquared.ToArray();

                context.Draw(this._primitiveType,this._drawState,sceneState);
            }
        }
    };

    defineProperties(RayCastedGlobe.prototype,{
        UseAverageDepth : {
            get : function(){
                return this._useAverageDepth.Value;
            },
            set : function(x){
                this._useAverageDepth.Value = x;
            }
        },

        Shape : {
            get : function(){
                return this._shape;
            },
            set : function(x){
                this._dirty = true;
                this._shape = x;
            }
        },

        Texture : {
            get : function(){
                return this._texture;
            },
            set : function(x){
                this._texture = x;
            }
        }
    });

    return RayCastedGlobe;
});