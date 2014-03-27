/**
 * Created by luosong on 2014/3/27.
 */
define(function(){

    var GraphicsWindow = function(){

        this.ResizeHandler = null;
        this.UpdateFrameHandler = null;

        this.PreRenderFrameHandler = null;
        this.RenderFrameHandler = null;
        this.PostRenderFrameHandler = null;

        this.Contex = null;
        this.Width = null;
        this.Height = null;
        this.Mouse = null;
        this.Keyboard = null;

    }

    GraphicsWindow.prototype.OnResize = function(){
        if(this.ResizeHandler !== null){
            this.ResizeHandler();
        }
    }

    GraphicsWindow.prototype.OnUpdateFrame = function(){
        if(this.UpdateFrameHandler !== null){
            this.UpdateFrameHandler();
        }
    }

    GraphicsWindow.prototype.OnPreRenderFrame = function(){
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
        if(this.PostRenderFrameHandler !== null){
            this.PostRenderFrameHandler();
        }
    }


    return GraphicsWindow;
});