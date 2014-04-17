/**
 * Created by luosong on 2014/4/17.
 */
define(['Core/defineProperties'],function(defineProperties){
    'use strict';

    var TextureUniform = function(textureUnit){
        this._textureUnit = textureUnit;
        this._name = 'og_texture' + this._textureUnit;
    };

    defineProperties(TextureUniform.prototype,{
        Name : {
            get : function(){
                return this._name;
            }
        }
    });


    TextureUniform.prototype.Set = function(uniform){
        uniform.Value = this._textureUnit;
    };

    return TextureUniform;
});