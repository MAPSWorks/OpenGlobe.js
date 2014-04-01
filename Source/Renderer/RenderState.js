/**
 * Created by luosong on 2014/3/31.
 */
define([
    'Core/defineProperties',
    'Renderer/PrimitiveRestart',
    'Renderer/FacetCulling',
    'Renderer/ProgramPointSize',
    'Renderer/RasterizationMode',
    'Renderer/ScissorTest',
    'Renderer/StencilTest',
    'Renderer/DepthTest',
    'Renderer/DepthRange',
    'Renderer/Blending',
    'Renderer/ColorMask'
],function(
    defineProperties,
    PrimitiveRestart,
    FacetCulling,
    ProgramPointSize,
    RasterizationMode,
    ScissorTest,
    StencilTest,
    DepthTest,
    DepthRange,
    Blending,
    ColorMask)
{
    "use strict";
    var RenderState = function(){
        this._primitiveRestart = new PrimitiveRestart();

        this._facetCulling = new FacetCulling();

        this._programPointSize = ProgramPointSize.Disabled;

        this._rasterizationMode = RasterizationMode.Fill;

        this._scissorTest = new ScissorTest();

        this._stencilTest = new StencilTest();

        this._depthTest = new DepthTest();

        this._depthRange = new DepthRange();

        this._blending = new Blending();

        this._colorMask = new ColorMask(true,true,true,true);

        this._depthMask = true;
    };

    defineProperties(RenderState.prototype,{
        PrimitiveRestart : {
           get : function(){
               return this._primitiveRestart;
           },
           set : function(x){
               this._primitiveRestart = x;
           }
        },

        FacetCulling : {
            get : function(){
                return this._facetCulling;
            },
            set : function(x){
                this._facetCulling = x;
            }
        },

        ProgramPointSize : {
            get : function(){
                return this._programPointSize;
            },
            set :function(x){
                this._programPointSize = x;
            }
        },

        RasterizationMode : {
            get : function(){
                return this._rasterizationMode;
            },
            set : function(x){
                this._rasterizationMode = x;
            }
        },

        ScissorTest : {
            get : function(){
                return this._scissorTest;
            },
            set : function(x){
                this._scissorTest = x;
            }
        },

        StencilTest : {
            get : function(){
                return this._stencilTest;
            },
            set : function(x){
                this._stencilTest = x;
            }
        },

        DepthTest : {
            get : function(){
                return this._depthTest;
            },
            set : function(x){
                this._depthTest = x;
            }
        },

        DepthRange : {
            get : function(){
                return this._depthRange;
            },
            set : function(x){
                this._depthRange = x;
            }
        },

        Blending : {
            get : function(){
                return this._blending;
            },
            set : function(x){
                this._blending = x;
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
        }


    });

    return RenderState;
});