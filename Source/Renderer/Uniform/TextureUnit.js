/**
 * Created by luosong on 2014/4/17.
 */
define(['Core/defineProperties','Renderer/Uniform/Texture2D'],function(defineProperties,Texture2D){
    'use strict';


    var TextureUnit = function(index,textureUnits){
        this._textureUnitIndex = index;
        this._textureUnit = TextureUnit.Unit.Texture0 + index;
        this._textureUnits = textureUnits;

        this._texture = null;
        this._dirtyFlags = TextureUnit.DirtyFlags.None;
    };

    defineProperties(TextureUnit.prototype,{
        Texture : {
            get : function(){
                return this._texture;
            },
            set : function(x){
                var texture = x;
                if(this._texture != texture){
                    if(this._dirtyFlags == TextureUnit.DirtyFlags.None){
                        this._textureUnits.NotifyDirty(this);
                    }

                    this._dirtyFlags |= TextureUnit.DirtyFlags.Texture;
                    this._texture = texture;

                    //this._textureUnits.NotifyDirty(this);
                    //this._texture = texture;
                }
            }
        }
    });

    TextureUnit.prototype.CleanLastTextureUnit = function(){

    };

    TextureUnit.prototype.Clean = function(gl){
        if(this._dirtyFlags != TextureUnit.DirtyFlags.None){
            gl.activeTexture(this._textureUnit);

            if((this._dirtyFlags & TextureUnit.DirtyFlags.Texture) == TextureUnit.DirtyFlags.Texture){
                if(this._texture != null){
                    this._texture.Bind(gl);
                }else{
                    Texture2D.UnBind(gl);
                }
            }

        }




        this._dirtyFlags = TextureUnit.DirtyFlags.None;
    };


    TextureUnit.DirtyFlags = {
        None : 0,
        Texture : 1,
        TextureSampler : 2,
        All : (1 | 2)
    };

    TextureUnit.Unit = {
        Texture0 :33984,
        Texture1 :33985,
        Texture2 :33986,
        Texture3 :33987,
        Texture4 :33988,
        Texture5 :33989,
        Texture6 :33990,
        Texture7 :33991,
        Texture8 :33992,
        Texture9 :33993,
        Texture10: 33994,
        Texture11: 33995,
        Texture12: 33996,
        Texture13: 33997,
        Texture14: 33998,
        Texture15: 33999,
        Texture16: 34000,
        Texture17: 34001,
        Texture18: 34002,
        Texture19: 34003,
        Texture20: 34004,
        Texture21: 34005,
        Texture22: 34006,
        Texture23: 34007,
        Texture24: 34008,
        Texture25: 34009,
        Texture26: 34010,
        Texture27: 34011,
        Texture28: 34012,
        Texture29: 34013,
        Texture30: 34014,
        Texture31: 34015
    };

    return TextureUnit;
});