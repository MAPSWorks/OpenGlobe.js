/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/defineProperties'],function(defineProperties){
    "use strict";

    var DepthRange = function(){
        this._near = 0.0;
        this._far = 1.0;
    };

    defineProperties(StencilTest.prototype,{
        Near : {
            get : function(){
                return this._near;
            },
            set : function(x){
                this._near = x;
            }
        },

        Far : {
            get : function(){
                return this._far;
            },
            set : function(x){
                this._far = x;
            }
        }
    });

    return DepthRange;
});