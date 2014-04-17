/**
 * Created by luosong on 2014/4/17.
 */
define(['Core/defineProperties'],function(defineProperties){
    'use strict';

    var LinkAutomaticUniform = function(){
        this._name = null;
    };

    defineProperties(LinkAutomaticUniform.prototype,{
        Name : {
            get : function(){
                return this._name;
            }
        }
    });

    LinkAutomaticUniform.prototype.Set = function(uniform){

    };

    return LinkAutomaticUniform;
});