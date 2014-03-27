/**
 * Created by luosong on 2014/3/27.
 */
define(['Renderer/GraphicsWindow'],function(GraphicsWindow){

    var GraphicsWindowGL3X = function(width, height, title){

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

    GraphicsWindowGL3X.prototype.OnResize = function(){
        if(this.ResizeHandler !== null){
            this.ResizeHandler();
        }
    }

    GraphicsWindowGL3X.prototype.OnUpdateFrame = function(){
        if(this.UpdateFrameHandler !== null){
            this.UpdateFrameHandler();
        }
    }

    GraphicsWindowGL3X.prototype.OnPreRenderFrame = function(){
        if(this.PreRenderFrameHandler !== null){
            this.PreRenderFrameHandler();
        }
    }

    GraphicsWindowGL3X.prototype.OnRenderFrame = function(){
        if(this.RenderFrameHandler !== null){
            this.RenderFrameHandler();
        }
    }

    GraphicsWindowGL3X.prototype.OnPostRenderFrame = function(){
        if(this.PostRenderFrameHandler !== null){
            this.PostRenderFrameHandler();
        }
    }


    return GraphicsWindowGL3X;
});