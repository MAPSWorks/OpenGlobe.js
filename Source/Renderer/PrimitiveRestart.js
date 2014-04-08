/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/defineProperties'],function(defineProperties){
    "use strict";

    var PrimitiveRestart = function(){
       this._enabled = false;
       this._index = 0;
    };

    defineProperties(PrimitiveRestart.prototype,{
        Enabled : {
            get : function(){
                return this._enabled;
            },
            set : function(x){
                this._enabled = x;
            }
        },

        Index : {
            get : function(){
                return this._index;
            },
            set : function(x){
                this._index = x;
            }
        }
    });


    return PrimitiveRestart;

});