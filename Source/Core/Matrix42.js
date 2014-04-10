/**
 * Created by luosong on 2014/4/8.
 */
/**
 * Created by luosong on 2014/4/8.
 */
define(["Core/defineProperties"],function(defineProperties){
    "use strict";

    var Matrix42 = function(
        column0row0,  column1row0,  column2row0,  column3row0,
        column0row1,  column1row1,  column2row1,  column3row1)
    {

        if(column1row0 == undefined || column0row1 == undefined){
            this._values = [
                column0row0, column0row0, column0row0, column0row0,
                column0row0, column0row0, column0row0, column0row0
            ];
        }else{
            this._values = [
                column0row0, column0row1,
                column1row0, column1row1,
                column2row0, column2row1,
                column3row0, column3row1
            ];
        }
    };

    defineProperties(Matrix42.prototype,{
        NumberOfComponents:{
            get : function(){
                return 8;
            }
        },

        Column0Row0:{
            get : function(){
                return this._values[0];
            }
        },
        Column0Row1:{
            get : function(){
                return this._values[1];
            }
        },


        Column1Row0:{
            get : function(){
                return this._values[2];
            }
        },
        Column1Row1:{
            get : function(){
                return this._values[3];
            }
        },


        Column2Row0:{
            get : function(){
                return this._values[4];
            }
        },
        Column2Row1:{
            get : function(){
                return this._values[5];
            }
        },


        Column3Row0:{
            get : function(){
                return this._values[6];
            }
        },
        Column3Row1:{
            get : function(){
                return this._values[7];
            }
        },


        ReadOnlyColumnMajorValues:{
            get : function(){
                return this._values;
            }
        }


    });

    Matrix42.prototype.Equals = function(other){
        for(var i = 0; i < this._values.length; i++){
            if(this._values[i] != other._values[i]){
                return false;
            }
        }

        return true;
    };

    return Matrix42;
});