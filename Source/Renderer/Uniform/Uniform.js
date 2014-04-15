/**
 * Created by luosong on 2014/4/11.
 */
define(['Core/defineProperties'],function(defineProperties){
    'use strict';

    var Uniform = function(name, type, location,shaderProgram){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.ShaderProgram = shaderProgram;
        this.ShaderProgram.NotifyDirty(this);
        this._dirty = true;

        this._value = null;
    };

    defineProperties(Uniform.prototype,{
        Value : {
            get : function(){
                return this._value;
            },
            set : function(x){
                if(!this._dirty && (this._value !== x)){
                    this._dirty = true;
                    this.ShaderProgram.NotifyDirty(this);
                }
                this._value = x;
            }
        }
    });

    Uniform.prototype.Set = function(gl){
        throw new Error('Uniform no defined.');
    };

    Uniform.prototype.Clean = function(gl){
        throw new Error('Uniform no defined.');
    };

    return Uniform;
});