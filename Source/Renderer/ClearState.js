/**
 * Created by luosong on 2014/3/31.
 */
define([
    'Core/defineProperties',
    'Renderer/ScissorTest',
    'Renderer/ColorMask',
    'Renderer/ClearBuffers',
    'Renderer/Color'
],function(
    defineProperties,
    ScissorTest,
    ColorMask,
    ClearBuffers,
    Color
    )
{
    'use strict';


    var ClearState = function(){
        this._scissorTest = new ScissorTest();
        this._colorMask = new ColorMask(true,true,true,true);
        this._depthMask = true;
        this._frontStencilMask = ~0;
        this._backStencilMask =  ~0;

        this._buffers = ClearBuffers.All;
        this._color = Color.White();
        this._depth = 1;
        this._stencil = 0;
    };


    defineProperties(ClearState.prototype,{
        ScissorTest : {
            get : function(){
                return this._scissorTest;
            },
            set : function(x){
                this._scissorTest = x;
            }
        },

        ColorMask : {
            get : function(){
                return this._colorMask;
            },
            set : function(x){
                this._colorMask = x;
            }
        },

        DepthMask : {
            get : function(){
                return this._depthMask;
            },
            set : function(x){
                this._depthMask = x;
            }
        },

        FrontStencilMask : {
            get : function(){
                return this._frontStencilMask;
            },
            set : function(x){
                this._frontStencilMask = x;
            }
        },

        BackStencilMask : {
            get : function(){
                return this._backStencilMask;
            },
            set : function(x){
                this._backStencilMask = x;
            }
        },

        Buffers : {
            get : function(){
                return this._buffers;
            },
            set : function(x){
                this._buffers = x;
            }
        },

        Color : {
            get : function(){
                return this._color;
            },
            set : function(x){
                this._color = x;
            }
        },

        Depth : {
            get : function(){
                return this._depth;
            },
            set : function(x){
                this._depth = x;
            }
        },

        Stencil : {
            get : function(){
                return this._stencil;
            },
            set : function(x){
                this._stencil = x;
            }
        }
    });


    return ClearState;
});