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
    'Renderer/VertexArray'
],function(
    defineProperties,
    Color,
    Rectangle,
    ClearBuffers,
    ClearState,
    Device,
    VertexArray
    ){
   'use strict';

    var Context = function(gl, width, height){
        this._gl = gl;

        this._viewport = new Rectangle(0, 0, width, height);


        this._clearColor = Color.FromArgb(
            1.0,0,0,0
        );
        this._clearDepth = 1.0;
        this._clearStencil = 0.0;

        this._gl.clearColor(0.0,0.0,0.0,1.0);
        this._gl.clearDepth(1.0);
        this._gl.clearStencil(0.0);

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

//        var meshAttributes = mesh.Attributes;
//        for(var i = 0; i < meshAttributes.length; i++){
//            //TODO
//            //for now, only deal with vertices(Vector3D)
//            var meshAttribute = meshAttributes[i];
//            var name = meshAttribute.Name;
//            var values = meshAttribute.Values;  //[Vector3D,Vector3D,...]
//            var vertices = [];
//            for(var k = 0; k < values.length; k++){
//                vertices.push(values[k].X);
//                vertices.push(values[k].Y);
//                vertices.push(values[k].Z);
//            }
//
//            var verticesBuffer = this.CreateVertexBuffer(vertices,usageHint);
//            meshBuffers.Attributes[i] = verticesBuffer;
//
//        }

        for(var i = 0; i < shaderAttributes.length; i++){
            var shaderAttribute = shaderAttributes[i];

            var attribute = mesh.Attributes[shaderAttribute.Name];
            if(attribute === undefined || attribute === null){
                continue;
            }


            var name = attribute.Name;
            var values = attribute.Values;  //[Vector3D,Vector3D,...]
            var vertices = [];
            for(var k = 0; k < values.length; k++){
                vertices.push(values[k].X);
                vertices.push(values[k].Y);
                vertices.push(values[k].Z);
            }

            var verticesBuffer = this.CreateVertexBuffer(vertices,usageHint);
            meshBuffers.Attributes[shaderAttribute.Location] = verticesBuffer;

        }


        return meshBuffers;
    };

    Context.prototype.CreateIndexBuffer = function(indices, usageHint){
        var gl = this._gl;

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        return indexBuffer;

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

        var vertexArray = drawState.VertexArray;
        var indexBuffer = vertexArray.IndexBuffer;

        if(indexBuffer !== null){
            gl.drawElements(gl.Triangles,3,gl.UNSIGNED_SHORT,0);
        }else{
            //
        }

    };

    Context.prototype.ApplyBeforeDraw = function(drawState, sceneState){
        this.ApplyRenderState(drawState.RenderState);

        this.ApplyVertexArray(drawState.VertexArray);

        this.ApplyShaderProgram(drawState,sceneState);

        //TODO

    };

    Context.prototype.ApplyRenderState = function(renderState){

    };

    Context.prototype.ApplyVertexArray = function(vertexArray){
        var gl = this._gl;

        gl.bindBuffer(gl.ARRAY_BUFFER,vertexArray.Attributes[0]);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

        var indexBuffer = vertexArray.IndexBuffer;
        if(indexBuffer !== null){
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        }

    };

    Context.prototype.ApplyShaderProgram = function(drawState, sceneState){
        var gl = this._gl;
        gl.useProgram(drawState.ShaderProgram._program);
        gl.enableVertexAttribArray(0);

    };

    return Context;

});