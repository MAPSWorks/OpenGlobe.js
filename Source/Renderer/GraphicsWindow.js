/**
 * Created by luosong on 2014/3/27.
 */
define([
    'Core/defineProperties',
    'Renderer/Context'
],function(
    defineProperties,
    Context
    ){
    'use strict';

    var GraphicsWindow = function(gl, width, height, title){

        this.ResizeHandler = null;
        this.UpdateFrameHandler = null;

        this.PreRenderFrameHandler = null;
        this.RenderFrameHandler = null;
        this.PostRenderFrameHandler = null;

        this._context = new Context(gl, width, height);
        this._width = width;
        this._height = height;
        this._title = title;

        this.Mouse = null;
        this.Keyboard = null;

    }

    defineProperties(GraphicsWindow.prototype,{
        Context:{
            get : function(){
                return this._context;
            }
        },

        Width:{
            get : function(){
                return this._width;
            }
        },

        Height:{
            get : function(){
                return this._height;
            }
        },

        Title:{
            get : function(){
                return this._title;
            }
        }

    });


    GraphicsWindow.prototype.Run = function(updateRate){
        var that = this;

        setTimeout(function(){
            that.Run(updateRate);
        },1000/updateRate);

        this.OnUpdateFrame();
        this.OnPreRenderFrame();
        this.OnRenderFrame();
        this.OnPostRenderFrame();
    };

    GraphicsWindow.prototype.requestAnimFrame = window.requestAnimFrame;

    GraphicsWindow.prototype.OnResize = function(){

        if(this.ResizeHandler !== null){
            this.ResizeHandler();
        }
    }

    GraphicsWindow.prototype.OnUpdateFrame = function(){
        //console.log('Update Frame');
        if(this.UpdateFrameHandler !== null){
            this.UpdateFrameHandler();
        }
    }

    GraphicsWindow.prototype.OnPreRenderFrame = function(){
        //console.log('Pre  Render');
        if(this.PreRenderFrameHandler !== null){
            this.PreRenderFrameHandler();
        }
    }

    GraphicsWindow.prototype.OnRenderFrame = function(){
        if(this.RenderFrameHandler !== null){
            this.RenderFrameHandler();
        }
    }

    GraphicsWindow.prototype.OnPostRenderFrame = function(){
        //console.log('Post Render');
        if(this.PostRenderFrameHandler !== null){
            this.PostRenderFrameHandler();
        }
    }


    return GraphicsWindow;
});