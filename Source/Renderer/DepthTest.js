/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/defineProperties','Renderer/DepthTestFunction'],function(defineProperties,DepthTestFunction){
    "use strict";

    var DepthTest = function(){
        this._enabled = true;
        this._function = DepthTestFunction.Less;
    };

    defineProperties(DepthTest.prototype,{
        Enabled : {
            get : function(){
                return this._enabled;
            },
            set : function(x){
                this._enabled = x;
            }
        },

        Function : {
            get : function(){
                return this._function;
            },
            set : function(x){
                this._function = x;
            }
        }
    });

    return DepthTest;
});