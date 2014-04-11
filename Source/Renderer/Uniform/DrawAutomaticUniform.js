/**
 * Created by luosong on 2014/4/11.
 */
define(function(){
   'use strict';

    var DrawAutomaticUniform = {};

    var SunPosition = function(uniform){
        this._uniform = uniform;
    };

    SunPosition.prototype.Set = function(gl,drawState,sceneState){
        this._uniform.Value = sceneState.SunPosition;

        gl.uniform3fv(this._uniform.Location,this._uniform.Value.ToArray());

    };


    DrawAutomaticUniform['SunPosition'] = SunPosition;
    return DrawAutomaticUniform;
});