/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration',
    'Core/defineProperties',
    'Renderer/StencilOperation',
    'Renderer/StencilTestFunction'
],function(Enumeration,
           defineProperties,
           StencilOperation,
           StencilTestFunction)
{
    "use strict";

    var StencilTestFace = function(){
        this._stencilFailOperation = StencilOperation.Keep;
        this._depthFailStencilPassOperation = StencilOperation.Keep;
        this._depthPassStencilPassOperation = StencilOperation.Keep;
        this._function = StencilTestFunction.Always;
        this._referenceValue = 0;
        this._mask = ~0;
    };

    defineProperties(StencilTestFace.prototype,{
        StencilFailOperation : {
            get : function(){
                return this._stencilFailOperation;
            },
            set : function(x){
                this._stencilFailOperation = x;
            }
        },

        DepthFailStencilPassOperation : {
            get : function(){
                return this._depthFailStencilPassOperation;
            },
            set : function(x){
                this._depthFailStencilPassOperation = x;
            }
        },

        DepthPassStencilPassOperation : {
            get : function(){
                return this._depthPassStencilPassOperation;
            },
            set : function(x){
                this._depthPassStencilPassOperation = x;
            }
        },

        Function : {
            get : function(){
                return this._function;
            },
            set : function(x){
                this._function = x;
            }
        },

        ReferenceValue : {
            get : function(){
                return this._referenceValue;
            },
            set : function(x){
                this._referenceValue = x;
            }
        },

        Mask : {
            get : function(){
                return this._mask;
            },
            set : function(x){
                this._mask = x;
            }
        }
    });



});