/**
 * Created by luosong on 2014/4/28.
 */
define([
    'Core/defineProperties',
    'Core/Vector2D'
],function(
    defineProperties,
    Vector2D
    ){
   'use strict';

    var RectangleD = function(lowerLeft, upperRight){
        this._lowerLeft = lowerLeft;
        this._upperRight = upperRight;
    };

    defineProperties(RectangleD.prototype,{
        LowerLeft : {
            get : function(){
                return this._lowerLeft;
            }
        },
        UpperRight : {
            get : function(){
                return this._upperRight;
            }
        }
    });

    RectangleD.prototype.Equals = function(other){
        return (this._lowerLeft.Equals(other._lowerLeft)) &&
            (this._upperRight.Equals(other._upperRight));
    };


    return RectangleD;
});