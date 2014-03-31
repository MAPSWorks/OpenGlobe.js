/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/defineProperties'],function(defineProperties){
    'use strict';

    var ColorMask = function(r, g, b, a){
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    };
    defineProperties(Color.prototype,{
        Red : {
            get : function(){
                return this._r;
            },
            set : function(x){
                this._r = x;
            }
        },

        Green : {
            get : function(){
                return this._g;
            },
            set : function(x){
                this._g = x;
            }
        },

        Blue : {
            get : function(){
                return this._b;
            },
            set : function(x){
                this._b = x;
            }
        },

        Alpha : {
            get : function(){
                return this._a;
            },
            set : function(x){
                this._a = x;
            }
        }
    });

    return ColorMask;
});