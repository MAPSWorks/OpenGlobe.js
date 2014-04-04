/**
 * Created by luosong on 2014/3/31.
 */
define([
    'Core/defineProperties',
    'Renderer/SourceBlendingFactor',
    'Renderer/DestinationBlendingFactor',
    'Renderer/BlendEquation',
    'Renderer/Color'
],function(defineProperties,
           SourceBlendingFactor,
           DestinationBlendingFactor,
           BlendEquation,
           Color)
{
    "use strict";

    var Blending = function(){
        this._enabled = false;
        this._sourceRGBFactor = SourceBlendingFactor.One;
        this._sourceAlphaFactor = SourceBlendingFactor.one;
        this._destinationRGBFactor = DestinationBlendingFactor.Zero;
        this._destinationAlphaFactor = DestinationBlendingFactor.Zero;
        this._RGBEquation = BlendEquation.Add;
        this._alphaEquation = BlendEquation.Add;
        this._color = Color.FromArgb(0,0,0,0);

    };

    defineProperties(Blending.prototype,{
        Enabled : {
            get : function(){
                return this._enabled;
            },
            set : function(x){
                this._enabled = x;
            }
        },

        SourceRGBFactor : {
            get : function(){
                return this._sourceRGBFactor;
            },
            set : function(x){
                this._sourceRGBFactor = x;
            }
        },

        SourceAlphaFactor : {
            get : function(){
                return this._sourceAlphaFactor;
            },
            set : function(x){
                this._sourceAlphaFactor = x;
            }
        },

        DestinationRGBFactor : {
            get : function(){
                return this._destinationRGBFactor;
            },
            set : function(x){
                this._destinationRGBFactor = x;
            }
        },

        DestinationAlphaFactor : {
            get : function(){
                return this._destinationAlphaFactor;
            },
            set : function(x){
                this._destinationAlphaFactor = x;
            }
        },

        RGBEquation : {
            get : function(){
                return this._RGBEquation;
            },
            set : function(x){
                this._RGBEquation = x;
            }
        },

        AlphaEquation : {
            get : function(){
                return this._alphaEquation;
            },
            set : function(x){
                this._alphaEquation = x;
            }
        },

        Color : {
            get : function(){
                return this._color;
            },
            set : function(x){
                this._color = x;
            }
        }
    });


    return Blending;
});