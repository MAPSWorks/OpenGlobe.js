/**
 * Created by luosong on 2014/4/8.
 */
define([
    'Core/defineProperties',
    'Renderer/Color',
    'Renderer/Rectangle',
    'Renderer/ClearBuffers',
    'Renderer/ClearState',
    'Renderer/Device',
    'Renderer/VertexArray',
    'Renderer/VertexBufferAttribute',
    'Renderer/Type',
    'Renderer/RenderState'
],function(
    defineProperties,
    Color,
    Rectangle,
    ClearBuffers,
    ClearState,
    Device,
    VertexArray,
    VertexBufferAttribute,
    Type,
    RenderState
    ){
   'use strict';

    var Context = function(gl, width, height){
        this._gl = gl;

        this._viewport = new Rectangle(0, 0, width, height);


        this._clearColor = Color.FromArgb(1.0,0,0,0 );
        this._clearDepth = 1.0;
        this._clearStencil = 0.0;

        this._boundShaderProgram = null;
        this._renderState = new RenderState();





        this._gl.clearColor(this._clearColor.R,this._clearColor.G,this._clearColor.B,this._clearColor.A);
        this._gl.clearDepth(this._clearDepth);
        this._gl.clearStencil(this._clearStencil);

        this.ForceApplyRenderState(this._renderState);
    };



    defineProperties(Context.prototype,{
        GL : {
           get : function(){
               return this._gl;
           }
        },

        Viewport : {
            get : function(){
                return this._viewport;
            },
            set : function(x){
                this._viewport = x;
            }
        }
    });

    Context.prototype.ForceApplyRenderState = function(renderState){
        //TODO
        this.Enable(this._gl.DEPTH_TEST,renderState.DepthTest.Enabled);
        this._gl.depthFunc(this._gl.LESS);

    };

    Context.prototype.Enable = function(enableCap,enable){
        if(enable){
            this._gl.enable(enableCap);
        }else{
            this._gl.disable(enableCap);
        }
    };

    Context.prototype.CreateMeshBuffers = function(mesh,shaderAttributes,usageHint){
        var meshBuffers = {
            IndexBuffer : null,
            Attributes : []
        };

        if(mesh.Indices !== null){
            var meshIndices = mesh.Indices.Values;

            var indices = [];

            for(var j = 0; j < meshIndices.length; ++j){
                indices[j] = meshIndices[j];
            }

            var indexBuffer = this.CreateIndexBuffer(indices, usageHint);
            meshBuffers.IndexBuffer = indexBuffer;
        }

        for(var i = 0; i < shaderAttributes.length; i++){
            var shaderAttribute = shaderAttributes[i];

            var attribute = mesh.Attributes[shaderAttribute.Name];
            if(attribute === undefined || attribute === null){
                continue;
            }


            //TODO textureCoord not supported
            var name = attribute.Name;
            var values = attribute.Values;  //[Vector3D,Vector3D,...]
            var vertices = [];
            for(var k = 0; k < values.length; k++){
                vertices.push(values[k].X);
                vertices.push(values[k].Y);
                vertices.push(values[k].Z);
            }

            var verticesBuffer = this.CreateVertexBuffer(vertices,usageHint);
            var vba = new VertexBufferAttribute();
            vba.Location = shaderAttribute.Location;
            vba.Buffer = verticesBuffer;
            vba.Type = shaderAttribute.Type;
            meshBuffers.Attributes.push(vba);
        }


        return meshBuffers;
    };

    Context.prototype.CreateIndexBuffer = function(indices, usageHint){
        var gl = this._gl;

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        return {
            Count : indices.length,
            IndexBuffer : indexBuffer
        };

    };

    Context.prototype.CreateVertexBuffer = function(vertices, usageHint){
        var gl = this._gl;

        var verticesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW);

        return verticesBuffer;
    }



    Context.prototype.CreateVertexArray = function(mesh, shaderAttributes,usageHint){
        var meshBuffer = this.CreateMeshBuffers(mesh,shaderAttributes,usageHint);

        var va = new VertexArray();

        va.IndexBuffer = meshBuffer.IndexBuffer;
        for(var i = 0; i < meshBuffer.Attributes.length; i++){
            va.Attributes[i] = meshBuffer.Attributes[i];
        }

        return va;
    };

    Context.prototype.CreateVertexArrayFromMeshBuffer = function(meshBuffers){

    };

    Context.prototype.Clear = function(clearState){

        if(!Color.Equals(this._clearColor,clearState.Color)){
            var r = clearState.Color.R;
            var g = clearState.Color.G;
            var b = clearState.Color.B;
            var a = clearState.Color.A;

            this._gl.clearColor(r,g,b,a);
            this._clearColor = Color.FromArgb(a,r,g,b);
        }

        if(this._clearDepth !== clearState.Depth){
            this._gl.clearDepth(clearState.Depth);
            this._clearDepth = clearState.Depth;
        }

        if(this._clearStencil !== clearState.Stencil){
            this._gl.clearStencil(clearState.Stencil);
            this._clearStencil = clearState.Stencil;
        }

        var buffer = clearState.Buffers;
        if(buffer.valueOf() === ClearBuffers.All.valueOf()){
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT | this._gl.STENCIL_BUFFER_BIT);
        }else if(buffer.valueOf() === ClearBuffers.ColorAndDepthBuffer.valueOf()){
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
        }else if(buffer.valueOf() === ClearBuffers.StencilBuffer.valueOf()){
            this._gl.clear(this._gl.STENCIL_BUFFER_BIT);
        }else if(buffer.valueOf() === ClearBuffers.DepthBuffer.valueOf()){
            this._gl.clear(this._gl.DEPTH_BUFFER_BIT);
        }else if(buffer.valueOf() === clearState.ColorBuffer.valueOf()){
            this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        }



//        this._gl.clearColor(0.0,0.0,0.0,1.0);
//        this._gl.clearDepth(1.0);
//        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

    };


    Context.prototype.Draw = function(primitiveType, drawState, sceneState){

        this.ApplyBeforeDraw(drawState, sceneState);

        //TODO
        var gl = this._gl;
        gl.viewport(0, 0, 680, 680);
        var vertexArray = drawState.VertexArray;
        var indexBuffer = vertexArray.IndexBuffer;

        if(indexBuffer !== null){
            gl.drawElements(gl.TRIANGLES, indexBuffer.Count, gl.UNSIGNED_SHORT, 0);
        }else{
            //gl.drawArrays(gl.TRIANGLES, 0, 3);
        }



    };

    Context.prototype.ApplyBeforeDraw = function(drawState, sceneState){
        this.ApplyRenderState(drawState.RenderState);

        this.ApplyVertexArray(drawState.VertexArray);

        this.ApplyShaderProgram(drawState,sceneState);

        //TODO

    };

    Context.prototype.ApplyRenderState = function(renderState){
        this.ApplyDepthTest(renderState.DepthTest);
    };

    Context.prototype.GetAttributeSize = function(type){
        if(type == Type.FLOAT_VEC3){
            return 3;
        }else if(type == Type.FLOAT_VEC4){
            return 4;
        }else if(type == Type.FLOAT_VEC2){
            return 2;
        }

        return 0;
    };

    Context.prototype.ApplyVertexArray = function(vertexArray){
        var gl = this._gl;

        var attributes = vertexArray.Attributes;
        for(var i = 0; i < attributes.length; i++){

            var attribute = attributes[i];
            var type = attribute.Type;
            var size = this.GetAttributeSize(type);

            gl.bindBuffer(gl.ARRAY_BUFFER,attribute.Buffer);
            gl.vertexAttribPointer      (attribute.Location, size, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray  (attribute.Location);
        }

        var indexBuffer = vertexArray.IndexBuffer;
        if(indexBuffer !== null){
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.IndexBuffer);
        }

    };

    Context.prototype.ApplyShaderProgram = function(drawState, sceneState){
        var gl = this._gl;

        var program = drawState.ShaderProgram._program;

        if(this._boundShaderProgram != program){
            gl.useProgram(program);
            this._boundShaderProgram = program;
        }

        drawState.ShaderProgram.clean(this,drawState,sceneState);


    };

    Context.prototype.ApplyDepthTest = function(depthTest){
        //TODO use TypeConverter to convert depthFunction and use EnableCap to create what kinds of Enable it is
        if(this._renderState.DepthTest.Enabled != depthTest.Enabled){
            this.Enable(this._gl.DEPTH_TEST,depthTest.Enabled);
            this._renderState.DepthTest.Enabled = depthTest.Enabled;
        }
        if(depthTest.Enabled){
            if(this._renderState.DepthTest.Function != depthTest.Function){
                this._gl.depthFunc(this._gl.LESS);
                this._renderState.DepthTest.Function = depthTest.Function;
            }
        }
    };

    return Context;

});