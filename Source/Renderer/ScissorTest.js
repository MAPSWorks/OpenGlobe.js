/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/defineProperties','Renderer/Rectangle'],function(defineProperties,Rectangle){
    'use strict';

    var ScissorTest = function(){
        this._enabled = false;
        this._rectangle = new Rectangle(0,0,0,0);
    };

    defineProperties(ScissorTest.prototype,{
        Enabled : {
            get : function(){
                return this._enabled;
            },
            set : function(x){
                this._enabled = x;
            }
        },

        Rectangle : {
            get : function(){
                return this._rectangle;
            },
            set : function(x){
                this._rectangle = x;
            }
        }
    });

    return ScissorTest;

});