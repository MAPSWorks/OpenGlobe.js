/**
 * Created by luosong on 2014/4/9.
 */
define([
        'Core/defineProperties',
        'Core/Vector3D'
],function(
    defineProperties,
    Vector3D
    ){
    'use strict';

    //for user
    var VertexAttribute = function(name){
        this._name = name;
        this._values = [];  //Vector3D
    };

    defineProperties(VertexAttribute.prototype,{
        Name : {
            get : function(){
                return this._name;
            },
            set : function(x){
                this._name = name;
            }
        },

        Values : {
            get : function(){
                return this._values;
            },
            set : function(x){
                this._values = x;
            }
        }


    });



    return VertexAttribute;
});