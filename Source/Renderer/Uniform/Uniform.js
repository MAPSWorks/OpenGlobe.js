/**
 * Created by luosong on 2014/4/11.
 */
define([],function(){
    'use strict';

    var Uniform = function(name, type, location){
        this.Name = name;
        this.Size = null;
        this.Type = type;
        this.Location = location;
        this.Value = null;
    };



    return Uniform;
});