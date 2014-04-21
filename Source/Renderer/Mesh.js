/**
 * Created by luosong on 2014/4/9.
 */
define([
    'Core/defineProperties',
    'Core/WindingOrder',
    'Core/PrimitiveType',
    'Renderer/VertexAttribute',
    'Renderer/Indices'
],function(
    defineProperties,
    WindingOrder,
    PrimitiveType,
    VertexAttribute,
    Indices
    )
{
    'use strict';

    var Mesh = function(){
        this._attributes = {};      //VertexAttributes
        this._indices = null;       //Indices
        this._primitiveType = PrimitiveType.Triangles;
        this._frontFaceWindingOrder = WindingOrder.Counterclockwise;
    };

    defineProperties(Mesh.prototype,{
        Attributes : {
            get : function(){
                return this._attributes;
            },
            set : function(x){
                this._attributes = x;
            }
        },

        Indices : {
            get : function(){
                return this._indices;
            },
            set : function(x){
                this._indices = x;
            }
        },

        PrimitiveType : {
            get : function(){
                return this._primitiveType;
            },
            set : function(x){
                this._primitiveType = x;
            }
        },

        FrontFaceWindingOrder : {
            get : function(){
                return this._frontFaceWindingOrder;
            },
            set : function(x){
                this._frontFaceWindingOrder = x;
            }
        }
    });


    return Mesh;
});