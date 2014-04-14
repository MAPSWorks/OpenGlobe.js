/**
 * Created by Administrator on 2014/4/12.
 */
define(['Renderer/Uniform/Uniform'],function(Uniform){
    'use strict';

    var UniformFloatMatrix44 = function(name, type, location){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.Value = null;
    };

    UniformFloatMatrix44.prototype.Set = function(gl){
        gl.uniformMatrix4fv(this.Location,this.Value);
    };

    return UniformFloatMatrix44;
});