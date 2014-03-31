/**
 * Created by luosong on 2014/3/31.
 */
define([
    'Core/defineProperties',
    'Renderer/RenderState',
    'Renderer/ShaderProgram',
    'Renderer/VertexArray'
],function(
    defineProperties,
    RenderState,
    ShaderProgram,
    VertexArray
    )
{
    'use strict';


    var DrawState = function(renderState,shaderProgram,vertexArray){

        if(renderState == undefined){
            this._renderState = new RenderState();
        }else{
            this._renderState = renderState;
        }

        this._shaderProgram = shaderProgram;
        this._vertexArray = vertexArray;
    };

    defineProperties(DrawState.prototype,{
        RenderState : {
            get : function(){
                return this._renderState;
            },
            set : function(x){
                this._renderState = x;
            }
        },

        ShaderProgram : {
            get : function(){
                return this._shaderProgram;
            },
            set : function(x){
                this._shaderProgram = x;
            }
        },

        VertexArray : {
            get : function(){
                return this._vertexArray;
            },
            set : function(x){
                this._vertexArray = x;
            }
        }
    });


    return DrawState;
});