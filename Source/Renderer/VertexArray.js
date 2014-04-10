/**
 * Created by luosong on 2014/4/9.
 */
define([
    'Core/defineProperties',
    'Renderer/VertexBufferAttribute'
],function(
    defineProperties
    ){
   'use strict';

    var VertexArray = function(){
        this._attributes = [];      //VertexBufferAttribute
        this._indexBuffer = null;
    };

    defineProperties(VertexArray.prototype,{
        Attributes : {
            get : function(){
                return this._attributes;
            },
            set : function(x){
                this._attributes = x;
            }
        },

        IndexBuffer : {
            get : function(){
                return this._indexBuffer;
            },
            set : function(x){
                this._indexBuffer = x;
            }
        }
    });

    return VertexArray;
});