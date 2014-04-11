/**
 * Created by luosong on 2014/4/11.
 */
define(['Renderer/Uniform/DrawAutomaticUniform'],function(DrawAutomaticUniform){
    'use strict';

    var DrawAutomaticUniformFactory = {};

    var SunPositionFactory = function(){
        this.Name = 'og_sunPosition';
    };

    SunPositionFactory.prototype.Create = function(uniform){
        var SunPosition = DrawAutomaticUniform['SunPosition'];
        return new SunPosition(uniform);
    };

    DrawAutomaticUniformFactory['SunPositionFactory'] = SunPositionFactory;
    return DrawAutomaticUniformFactory;
});