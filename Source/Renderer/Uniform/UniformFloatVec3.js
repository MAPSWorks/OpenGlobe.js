/**
 * Created by luosong on 2014/4/11.
 */
define(['Renderer/Uniform/Uniform'],function(Uniform){
    'use strict';

    var UniformFloatVec3 = function(name, type, location){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.Value = null;
    };

    UniformFloatVec3.prototype = new Uniform();
    UniformFloatVec3.prototype.constructor = UniformFloatVec3;


    return UniformFloatVec3;
});