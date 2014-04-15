/**
 * Created by Administrator on 2014/4/12.
 */
define(['Core/defineProperties','Renderer/Uniform/Uniform'],function(defineProperties,Uniform){
    'use strict';

    var UniformFloatMatrix44 = function(name, type, location,shaderProgram){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.ShaderProgram = shaderProgram;
        this.ShaderProgram.NotifyDirty(this);
        this._dirty = true;

        this._value = null;
    };

    defineProperties(UniformFloatMatrix44.prototype,{
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

    UniformFloatMatrix44.prototype.Set = function(gl){
        gl.uniformMatrix4fv(this.Location,this.Value);
        this._dirty = false;
    };

    UniformFloatMatrix44.prototype.Clean = function(gl){
        gl.uniformMatrix4fv(this.Location,false,this.Value);
        this._dirty = false;
    };

    return UniformFloatMatrix44;
});