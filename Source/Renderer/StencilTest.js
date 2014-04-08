/**
 * Created by luosong on 2014/3/31.
 */

define(['Core/defineProperties','Renderer/StencilTestFace'],function(defineProperties,StencilTestFace){
    "use strict";

    var StencilTest = function(){
        this._enabled = false;
        this._frontFace = new StencilTestFace();
        this._backFace = new StencilTestFace();
    };

    defineProperties(StencilTest.prototype,{
        Enabled : {
            get : function(){
                return this._enabled;
            },
            set : function(x){
                this._enabled = x;
            }
        },

        FrontFace : {
            get : function(){
                return this._frontFace;
            },
            set : function(x){
                this._frontFace = x;
            }
        },

        BackFace : {
            get : function(){
                return this._backFace;
            },
            set : function(x){
                this._backFace = x;
            }
        }
    });


    return StencilTest;
});