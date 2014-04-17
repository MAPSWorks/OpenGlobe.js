/**
 * Created by luosong on 2014/4/17.
 */
define(['Core/defineProperties','Renderer/Uniform/TextureUnit'],function(defineProperties,TextureUnit){
    'use strict';

    var TextureUnits = function(gl){

        this._count = 0;
        this._gl = gl;

        var numberOfTextureUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        this._textureUnits = new Array(numberOfTextureUnits);

        for(var i = 0; i < numberOfTextureUnits; i++){
            var textureUnit = new TextureUnit(i,this);
            this._textureUnits[i] = textureUnit;
        }

        this._dirtyTextureUnits = [];
        this._lastTextureUnit = this._textureUnits[numberOfTextureUnits - 1];
    };

    defineProperties(TextureUnits.prototype,{
        Count : {
            get : function(){
                return this._textureUnits.length;
            }
        }
    });

    TextureUnits.prototype.GetTextureUnitByIndex = function(index){
        return this._textureUnits[index];
    };

    TextureUnits.prototype.Clean = function(){
        if(this._dirtyTextureUnits.length > 0){
            for(var i = 0; i < this._dirtyTextureUnits.length; i++){
                this._dirtyTextureUnits[i].Clean(this._gl);
            }

            this._dirtyTextureUnits = [];
        }
        this._lastTextureUnit.CleanLastTextureUnit();
    };

    TextureUnits.prototype.NotifyDirty = function(value){
        this._dirtyTextureUnits.push(value);
    };



    return TextureUnits;
});