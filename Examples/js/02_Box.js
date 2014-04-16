/**
 * Created by luosong on 2014/4/15.
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
        'Renderer/DrawState'
    ],
    function
        (
            $,
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
            DrawState
            )
    {
        var Triangle = function(){
            this._name = 'test Trianlge';
            this._device = new Device("canvas");
            this._window = this._device.CreateWindow(680,680,'tttt');
            var shaderProgram = this._device.CreateProgramFromID("shader-vs","shader-fs");
            shaderProgram.getUniformByName('u_color').Value = [0.5,0.5,0.5];

            this._sceneState = new SceneState();
            this._sceneState.Camera.Eye = new Vector3D(-5.0,0.0,0.0);
            this._clearState = new ClearState();
            this._clearState.Color = Color.FromRgba(0.0,0.0,0.0,1.0);


            this._window.RenderFrameHandler = (function(that){
                var triangle = that;
                return function(){
                    triangle.OnRenderFrame();
                };
            })(this);

            /////////////////////////////////////////////////

            var mesh = new Mesh();

            var positionAttribute = new VertexAttribute('aVertexPosition');
            //mesh.Attributes.push(positionAttribute);
            mesh.Attributes['aVertexPosition'] = positionAttribute;

            var indices = new Indices();
            mesh.Indices = indices;

//            var positions = positionAttribute.Values;
//            positions.push(new Vector3D(0,0,0));
//            positions.push(new Vector3D(1,0,0));
//            positions.push(new Vector3D(0,1,0));
//            positions.push(new Vector3D(0,0,0));
//            positions.push(new Vector3D(-1,0,0));
//            positions.push(new Vector3D(0,-1,0));

            var positions = positionAttribute.Values;
            var corner = new Vector3D(0.5,0.5,0.5);
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


            var va = this._window.Context.CreateVertexArray(mesh,shaderProgram.VertexAttributes,BufferHint.StaticDraw);

            /////////////////////////////////////////////////////

            var renderState = new RenderState();
            renderState.FacetCulling.Enabled = false;
            renderState.DepthTest.Enabled = false;

            this._drawState = new DrawState(this._renderState,shaderProgram,va);

            //this._sceneState.Camera.zoomToTarget(1);
        };

        Triangle.prototype.OnRenderFrame = function(){
            var context = this._window.Context;

            context.Clear(this._clearState);


            context.Draw(PrimitiveType.Triangles,this._drawState,this._sceneState);
            console.log(this._name);
        };


        Triangle.prototype.Run = function(updateRate){
            this._window.Run(updateRate);
        };




        var example = new Triangle();

        example.Run(60);




        console.log('ok.');
    });