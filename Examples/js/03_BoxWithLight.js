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
        'Renderer/DrawState'
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
            this._sceneState.Camera.Eye = new Vector3D(8.0,8.0,8.0);
            this._sceneState.Camera.Up = Vector3D.UnitY();
            this._sceneState.SunPosition = new Vector3D(5.0,2,2.0);

            this._clearState = new ClearState();
            this._clearState.Color = Color.FromRgba(0.5,0.5,0.5,1.0);


            this._window.RenderFrameHandler = (function(that){
                var triangle = that;
                return function(){
                    triangle.OnRenderFrame();
                };
            })(this);

            /////////////////////////////////////////////////

            var mesh = new Mesh();

            var positionAttribute = new VertexAttribute('aVertexPosition');
            var normalAttribute = new VertexAttribute('aNormal');
            mesh.Attributes['aVertexPosition'] = positionAttribute;
            mesh.Attributes['aNormal'] = normalAttribute;

            var indices = new Indices();
            mesh.Indices = indices;

            var positions = positionAttribute.Values;
            positions.push(new Vector3D(-1.0, -1.0,  1.0));
            positions.push(new Vector3D(1.0, -1.0,  1.0));
            positions.push(new Vector3D(1.0,  1.0,  1.0));
            positions.push(new Vector3D(-1.0,  1.0,  1.0));

            positions.push(new Vector3D(-1.0, -1.0, -1.0));
            positions.push(new Vector3D(-1.0,  1.0, -1.0));
            positions.push(new Vector3D(1.0,  1.0, -1.0));
            positions.push(new Vector3D(1.0, -1.0, -1.0));

            positions.push(new Vector3D(-1.0,  1.0, -1.0));
            positions.push(new Vector3D(-1.0,  1.0,  1.0));
            positions.push(new Vector3D(1.0,  1.0,  1.0));
            positions.push(new Vector3D(1.0,  1.0, -1.0));

            positions.push(new Vector3D(-1.0, -1.0, -1.0));
            positions.push(new Vector3D(1.0, -1.0, -1.0));
            positions.push(new Vector3D(1.0, -1.0,  1.0));
            positions.push(new Vector3D(-1.0, -1.0,  1.0));

            positions.push(new Vector3D(1.0, -1.0, -1.0));
            positions.push(new Vector3D(1.0,  1.0, -1.0));
            positions.push(new Vector3D(1.0,  1.0,  1.0));
            positions.push(new Vector3D(1.0, -1.0,  1.0));

            positions.push(new Vector3D(-1.0, -1.0, -1.0));
            positions.push(new Vector3D(-1.0, -1.0,  1.0));
            positions.push(new Vector3D(-1.0,  1.0,  1.0));
            positions.push(new Vector3D(-1.0,  1.0, -1.0));

            var normals = normalAttribute.Values;
            normals.push(new Vector3D(0.0,  0.0,  1.0));
            normals.push(new Vector3D(0.0,  0.0,  1.0));
            normals.push(new Vector3D(0.0,  0.0,  1.0));
            normals.push(new Vector3D(0.0,  0.0,  1.0));

            normals.push(new Vector3D(0.0,  0.0, -1.0));
            normals.push(new Vector3D(0.0,  0.0, -1.0));
            normals.push(new Vector3D(0.0,  0.0, -1.0));
            normals.push(new Vector3D(0.0,  0.0, -1.0));

            normals.push(new Vector3D(0.0,  1.0,  0.0));
            normals.push(new Vector3D(0.0,  1.0,  0.0));
            normals.push(new Vector3D(0.0,  1.0,  0.0));
            normals.push(new Vector3D(0.0,  1.0,  0.0));

            normals.push(new Vector3D(0.0, -1.0,  0.0));
            normals.push(new Vector3D(0.0, -1.0,  0.0));
            normals.push(new Vector3D(0.0, -1.0,  0.0));
            normals.push(new Vector3D(0.0, -1.0,  0.0));

            normals.push(new Vector3D(1.0,  0.0,  0.0));
            normals.push(new Vector3D(1.0,  0.0,  0.0));
            normals.push(new Vector3D(1.0,  0.0,  0.0));
            normals.push(new Vector3D(1.0,  0.0,  0.0));

            normals.push(new Vector3D(-1.0,  0.0,  0.0));
            normals.push(new Vector3D(-1.0,  0.0,  0.0));
            normals.push(new Vector3D(-1.0,  0.0,  0.0));
            normals.push(new Vector3D(-1.0,  0.0,  0.0));



            //
            // 6 faces, 2 triangles each
            //
            indices.AddTriangle(0,  1,  2);    // front
            indices.AddTriangle(0,  2,  3);
            indices.AddTriangle(4,  5,  6);    // back
            indices.AddTriangle(4,  6,  7);
            indices.AddTriangle(8,  9,  10);    // top
            indices.AddTriangle(8,  10, 11);
            indices.AddTriangle(12, 13, 14);    // bottom
            indices.AddTriangle(12, 14, 15);
            indices.AddTriangle(16, 17, 18);    // right
            indices.AddTriangle(16, 18, 19);
            indices.AddTriangle(20, 21, 22);    // left
            indices.AddTriangle(20, 22, 23);


            var va = this._window.Context.CreateVertexArray(mesh,shaderProgram.VertexAttributes,BufferHint.StaticDraw);

            /////////////////////////////////////////////////////

            var renderState = new RenderState();
            renderState.FacetCulling.Enabled = false;
            renderState.DepthTest.Enabled = true;

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