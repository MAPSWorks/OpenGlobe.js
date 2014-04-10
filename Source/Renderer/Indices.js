/**
 * Created by luosong on 2014/4/9.
 */
define([
    'Core/defineProperties'
],function(
    defineProperties
    ){
    'use strict';

    var Indices = function(){
        this._values = [];
    };


    defineProperties(Indices.prototype,{
        Values : {
            get : function(){
                return this._values;
            },
            set : function(x){
                this._values = x;
            }
        }
    });


    Indices.prototype.AddTriangle = function(i0, i1, i2){
        this._values.push(i0);
        this._values.push(i1);
        this._values.push(i2);
    };


    return Indices;
});