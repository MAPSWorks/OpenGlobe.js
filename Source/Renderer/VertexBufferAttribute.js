/**
 * Created by Administrator on 2014/4/10.
 */

define([
    'Core/defineProperties',
    'Core/Vector3D'
],function(
    defineProperties,
    Vector3D
    ){
    'use strict';

    var VertexBufferAttribute = function(){
        this._location = null;
        this._buffer = null;
        this._type = null;
    };


    defineProperties(VertexBufferAttribute.prototype,{
        Location : {
            get : function(){
                return this._location;
            },
            set : function(x){
                this._location = x;
            }
        },

        Buffer : {
            get : function(){
                return this._location;
            },
            set : function(x){
                this._location = x;
            }
        },

        Type : {
            get : function(){
                return this._type;
            },
            set : function(x){
                this._type = x;
            }
        }
    });

    return VertexBufferAttribute;
});