/**
 * Created by Administrator on 2014/4/26.
 */
define(['Core/defineProperties','Core/Vector3D'],function(defineProperties,Vector3D){
    'use strict';

    var Matrix3D = function(
        column0row0,  column1row0,  column2row0,
        column0row1,  column1row1,  column2row1,
        column0row2,  column1row2,  column2row2
        ){
        if(column1row0 == undefined || column0row1 == undefined){
            this._values = [
                column0row0, column0row0, column0row0,
                column0row0, column0row0, column0row0,
                column0row0, column0row0, column0row0
            ];
        }else{
            this._values = [
                column0row0, column0row1, column0row2,
                column1row0, column1row1, column1row2,
                column2row0, column2row1, column2row2
            ];
        }
    };

    defineProperties(Matrix3D.prototype,{
        NumberOfComponents : {
            get : function(){
                return 9;
            }
        },

        Column0Row0 : { get : function(){return this._values[0];} },
        Column0Row1 : { get : function(){return this._values[1];} },
        Column0Row2 : { get : function(){return this._values[2];} },

        Column1Row0 : { get : function(){return this._values[3];} },
        Column1Row1 : { get : function(){return this._values[4];} },
        Column1Row2 : { get : function(){return this._values[5];} },

        Column2Row0 : { get : function(){return this._values[6];} },
        Column2Row1 : { get : function(){return this._values[7];} },
        Column2Row2 : { get : function(){return this._values[8];} },


        ReadOnlyColumnMajorValues : {
            get : function(){
                return this._values;
            }
        }

    });


    Matrix3D.prototype.Transpose = function(){
        return new Matrix3D(
            this.Column0Row0, this.Column0Row1, this.Column0Row2,
            this.Column1Row0, this.Column1Row1, this.Column1Row2,
            this.Column2Row0, this.Column2Row1, this.Column2Row2);
    };

    Matrix3D.MultiplyMatrix3DAndVector3D = function(matrix, vector){
        var values = matrix.ReadOnlyColumnMajorValues;

        var x =
            values[0] * vector.X +
            values[3] * vector.Y +
            values[6] * vector.Z;
        var y =
            values[1] * vector.X +
            values[4] * vector.Y +
            values[7] * vector.Z;
        var z =
            values[2] * vector.X +
            values[5] * vector.Y +
            values[8] * vector.Z;

        return new Vector3D(x, y, z);
    };

    Matrix3D.prototype.Equals = function(other){
        for(var i = 0; i < this._values.length; i++){
            if(this._values[i] != other._values[i]){
                return false;
            }
        }
        return true;
    };

    Matrix3D.Identity = new Matrix3D(
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0
    );

    return Matrix3D;
});