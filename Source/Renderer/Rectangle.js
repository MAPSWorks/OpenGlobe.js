/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/defineProperties'],function(defineProperties){
    var Rectangle = function(x, y, width, height){
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    };

    defineProperties(Rectangle.prototype,{
        X : {
            get : function(){
                return this._x;
            },
            set : function(x){
                this._x = x;
            }
        },

        Y : {
            get : function(){
                return this._y;
            },
            set : function(y){
                this._y = y;
            }
        },

        Width : {
            get : function(){
                return this._width;
            },
            set : function(x){
                this._width = x;
            }
        },

        Height : {
            get : function(){
                return this._height;
            },
            set : function(x){
                this._height = x;
            }
        },

        Left : {
            get : function(){
                return this._x;
            }
        },

        Top:{
            get : function(){
                return this._y;
            }
        },

        Bottom : {
            get : function(){
                return this._y + this._height;
            }
        },

        Right : {
            get : function(){
                return this._x + this._width;
            }
        }
    });

    return Rectangle;
});