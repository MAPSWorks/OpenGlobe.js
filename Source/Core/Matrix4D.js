/**
 * Created by luosong on 2014/4/8.
 */
define(["Core/defineProperties",'Core/Vector4D'],function(defineProperties,Vector4D){
    "use strict";

    var Matrix4D = function(
         column0row0,  column1row0,  column2row0,  column3row0,
         column0row1,  column1row1,  column2row1,  column3row1,
         column0row2,  column1row2,  column2row2,  column3row2,
         column0row3,  column1row3,  column2row3,  column3row3)
    {

        if(column1row0 == undefined || column0row1 == undefined){
            this._values = [
                column0row0, column0row0, column0row0, column0row0,
                column0row0, column0row0, column0row0, column0row0,
                column0row0, column0row0, column0row0, column0row0,
                column0row0, column0row0, column0row0, column0row0
            ];
        }else{
            this._values = [
                column0row0, column0row1, column0row2, column0row3,
                column1row0, column1row1, column1row2, column1row3,
                column2row0, column2row1, column2row2, column2row3,
                column3row0, column3row1, column3row2, column3row3
            ];
        }
    };

    defineProperties(Matrix4D.prototype,{
        NumberOfComponents:{
            get : function(){
                return 16;
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
        Column0Row2:{
            get : function(){
                return this._values[2];
            }
        },
        Column0Row3:{
            get : function(){
                return this._values[3];
            }
        },


        Column1Row0:{
            get : function(){
                return this._values[4];
            }
        },
        Column1Row1:{
            get : function(){
                return this._values[5];
            }
        },
        Column1Row2:{
            get : function(){
                return this._values[6];
            }
        },
        Column1Row3:{
            get : function(){
                return this._values[7];
            }
        },


        Column2Row0:{
            get : function(){
                return this._values[8];
            }
        },
        Column2Row1:{
            get : function(){
                return this._values[9];
            }
        },
        Column2Row2:{
            get : function(){
                return this._values[10];
            }
        },
        Column2Row3:{
            get : function(){
                return this._values[11];
            }
        },


        Column3Row0:{
            get : function(){
                return this._values[12];
            }
        },
        Column3Row1:{
            get : function(){
                return this._values[13];
            }
        },
        Column3Row2:{
            get : function(){
                return this._values[14];
            }
        },
        Column3Row3:{
            get : function(){
                return this._values[15];
            }
        },


        ReadOnlyColumnMajorValues:{
            get : function(){
                return this._values;
            }
        }


    });

    Matrix4D.prototype.Transpose = function(){
        return new Matrix4D(
            this.Column0Row0, this.Column0Row1, this.Column0Row2, this.Column0Row3,
            this.Column1Row0, this.Column1Row1, this.Column1Row2, this.Column1Row3,
            this.Column2Row0, this.Column2Row1, this.Column2Row2, this.Column2Row3,
            this.Column3Row0, this.Column3Row1, this.Column3Row2, this.Column3Row3
        );
    };

    Matrix4D.prototype.Inverse = function(){
        var matrix = this._values;
        //
        // Ported from:
        //   ftp://download.intel.com/design/PentiumIII/sml/24504301.pdf
        //
        var src0 = matrix[0];
        var src1 = matrix[4];
        var src2 = matrix[8];
        var src3 = matrix[12];
        var src4 = matrix[1];
        var src5 = matrix[5];
        var src6 = matrix[9];
        var src7 = matrix[13];
        var src8 = matrix[2];
        var src9 = matrix[6];
        var src10 = matrix[10];
        var src11 = matrix[14];
        var src12 = matrix[3];
        var src13 = matrix[7];
        var src14 = matrix[11];
        var src15 = matrix[15];

        // calculate pairs for first 8 elements (cofactors)
        var tmp0 = src10 * src15;
        var tmp1 = src11 * src14;
        var tmp2 = src9 * src15;
        var tmp3 = src11 * src13;
        var tmp4 = src9 * src14;
        var tmp5 = src10 * src13;
        var tmp6 = src8 * src15;
        var tmp7 = src11 * src12;
        var tmp8 = src8 * src14;
        var tmp9 = src10 * src12;
        var tmp10 = src8 * src13;
        var tmp11 = src9 * src12;

        // calculate first 8 elements (cofactors)
        var dst0 = (tmp0 * src5 + tmp3 * src6 + tmp4 * src7) - (tmp1 * src5 + tmp2 * src6 + tmp5 * src7);
        var dst1 = (tmp1 * src4 + tmp6 * src6 + tmp9 * src7) - (tmp0 * src4 + tmp7 * src6 + tmp8 * src7);
        var dst2 = (tmp2 * src4 + tmp7 * src5 + tmp10 * src7) - (tmp3 * src4 + tmp6 * src5 + tmp11 * src7);
        var dst3 = (tmp5 * src4 + tmp8 * src5 + tmp11 * src6) - (tmp4 * src4 + tmp9 * src5 + tmp10 * src6);
        var dst4 = (tmp1 * src1 + tmp2 * src2 + tmp5 * src3) - (tmp0 * src1 + tmp3 * src2 + tmp4 * src3);
        var dst5 = (tmp0 * src0 + tmp7 * src2 + tmp8 * src3) - (tmp1 * src0 + tmp6 * src2 + tmp9 * src3);
        var dst6 = (tmp3 * src0 + tmp6 * src1 + tmp11 * src3) - (tmp2 * src0 + tmp7 * src1 + tmp10 * src3);
        var dst7 = (tmp4 * src0 + tmp9 * src1 + tmp10 * src2) - (tmp5 * src0 + tmp8 * src1 + tmp11 * src2);

        // calculate pairs for second 8 elements (cofactors)
        tmp0 = src2 * src7;
        tmp1 = src3 * src6;
        tmp2 = src1 * src7;
        tmp3 = src3 * src5;
        tmp4 = src1 * src6;
        tmp5 = src2 * src5;
        tmp6 = src0 * src7;
        tmp7 = src3 * src4;
        tmp8 = src0 * src6;
        tmp9 = src2 * src4;
        tmp10 = src0 * src5;
        tmp11 = src1 * src4;

        // calculate second 8 elements (cofactors)
        var dst8 = (tmp0 * src13 + tmp3 * src14 + tmp4 * src15) - (tmp1 * src13 + tmp2 * src14 + tmp5 * src15);
        var dst9 = (tmp1 * src12 + tmp6 * src14 + tmp9 * src15) - (tmp0 * src12 + tmp7 * src14 + tmp8 * src15);
        var dst10 = (tmp2 * src12 + tmp7 * src13 + tmp10 * src15) - (tmp3 * src12 + tmp6 * src13 + tmp11 * src15);
        var dst11 = (tmp5 * src12 + tmp8 * src13 + tmp11 * src14) - (tmp4 * src12 + tmp9 * src13 + tmp10 * src14);
        var dst12 = (tmp2 * src10 + tmp5 * src11 + tmp1 * src9) - (tmp4 * src11 + tmp0 * src9 + tmp3 * src10);
        var dst13 = (tmp8 * src11 + tmp0 * src8 + tmp7 * src10) - (tmp6 * src10 + tmp9 * src11 + tmp1 * src8);
        var dst14 = (tmp6 * src9 + tmp11 * src11 + tmp3 * src8) - (tmp10 * src11 + tmp2 * src8 + tmp7 * src9);
        var dst15 = (tmp10 * src10 + tmp4 * src8 + tmp9 * src9) - (tmp8 * src9 + tmp11 * src10 + tmp5 * src8);

        // calculate determinant
        var det = src0 * dst0 + src1 * dst1 + src2 * dst2 + src3 * dst3;

        if (Math.abs(det) < 0.00000000000000000001) {
            throw new RuntimeError('matrix is not invertible because its determinate is zero.');
        }

        // calculate matrix inverse
        det = 1.0 / det;
        return new Matrix4D(
                dst0 * det, dst4 * det, dst8 * det, dst12 * det,
                dst1 * det, dst5 * det, dst9 * det, dst13 * det,
                dst2 * det, dst6 * det, dst10 * det, dst14 * det,
                dst3 * det, dst7 * det, dst11 * det, dst15 * det);

    };


    Matrix4D.CreatePerspectiveFieldOfView = function(fovy, aspect, zNear, zFar){
        if(fovy <= 0.0 || fovy > Math.PI){
            throw new Error('fovy must be in [0, PI].');
        }

        if(aspect <= 0.0){
            throw new Error('aspect must be greater than zero.');
        }

        if(zNear <= 0.0){
            throw new Error('zNear must be greater than zero');
        }

        if(zFar <= 0.0){
            throw new zFar('zFar must be greater than zero.');
        }

        var bottom = Math.tan(fovy * 0.5);
        var f = 1.0 / bottom;

        return new Matrix4D(
            f / aspect, 0.0,                0.0,            0.0,
            0.0,        f,                  0.0,            0.0,
            0.0,        0.0,(zFar + zNear)/(zNear - zFar),  (2.0 * zFar *zNear)/(zNear - zFar),
            0.0,        0.0,               -1.0,            0.0
        );
    };

    Matrix4D.CreateOrthographicOffCenter = function(left, right, bottom, top, zNear, zFar){
        var a = 1.0 / (right - left);
        var b = 1.0 / (top - bottom);
        var c = 1.0 / (zFar - zNear);

        var tx = -(right + left) * a;
        var ty = -(top + bottom) * b;
        var tz = -(zFar + zNear) * c;

        return new Matrix4D(
            2.0 * a, 0.0,      0.0,     tx,
            0.0,     2.0 * b,  0.0,     ty,
            0.0,     0.0,     -2.0 * c, tz,
            0.0,     0.0,      0.0,     1.0
        );
    };

    Matrix4D.LookAt = function(eye, target, up){
        var f = target.Subtract(eye).Normalize();
        var s = f.Cross(up).Normalize();
        var u = s.Cross(f).Normalize();

        var rotation = new Matrix4D(
            s.X,  s.Y,  s.Z, 0.0,
            u.X,  u.Y,  u.Z, 0.0,
            -f.X, -f.Y, -f.Z, 0.0,
            0.0,  0.0,  0.0, 1.0
        );

        var translation = new Matrix4D(
            1.0, 0.0, 0.0, -eye.X,
            0.0, 1.0, 0.0, -eye.Y,
            0.0, 0.0, 1.0, -eye.Z,
            0.0, 0.0, 0.0, 1.0
        );

        return Matrix4D.MultiplyMatrix4D(rotation, translation);
    };

    Matrix4D.MultiplyMatrix4D = function(left, right){
        var leftValues = left.ReadOnlyColumnMajorValues;
        var rightValues = right.ReadOnlyColumnMajorValues;

        var col0row0 =
            leftValues[0] * rightValues[0] +
            leftValues[4] * rightValues[1] +
            leftValues[8] * rightValues[2] +
            leftValues[12] * rightValues[3];
        var col0row1 =
            leftValues[1] * rightValues[0] +
            leftValues[5] * rightValues[1] +
            leftValues[9] * rightValues[2] +
            leftValues[13] * rightValues[3];
        var col0row2 =
            leftValues[2] * rightValues[0] +
            leftValues[6] * rightValues[1] +
            leftValues[10] * rightValues[2] +
            leftValues[14] * rightValues[3];
        var col0row3 =
            leftValues[3] * rightValues[0] +
            leftValues[7] * rightValues[1] +
            leftValues[11] * rightValues[2] +
            leftValues[15] * rightValues[3];

        var col1row0 =
            leftValues[0] * rightValues[4] +
            leftValues[4] * rightValues[5] +
            leftValues[8] * rightValues[6] +
            leftValues[12] * rightValues[7];
        var col1row1 =
            leftValues[1] * rightValues[4] +
            leftValues[5] * rightValues[5] +
            leftValues[9] * rightValues[6] +
            leftValues[13] * rightValues[7];
        var col1row2 =
            leftValues[2] * rightValues[4] +
            leftValues[6] * rightValues[5] +
            leftValues[10] * rightValues[6] +
            leftValues[14] * rightValues[7];
        var col1row3 =
            leftValues[3] * rightValues[4] +
            leftValues[7] * rightValues[5] +
            leftValues[11] * rightValues[6] +
            leftValues[15] * rightValues[7];

        var col2row0 =
            leftValues[0] * rightValues[8] +
            leftValues[4] * rightValues[9] +
            leftValues[8] * rightValues[10] +
            leftValues[12] * rightValues[11];
        var col2row1 =
            leftValues[1] * rightValues[8] +
            leftValues[5] * rightValues[9] +
            leftValues[9] * rightValues[10] +
            leftValues[13] * rightValues[11];
        var col2row2 =
            leftValues[2] * rightValues[8] +
            leftValues[6] * rightValues[9] +
            leftValues[10] * rightValues[10] +
            leftValues[14] * rightValues[11];
        var col2row3 =
            leftValues[3] * rightValues[8] +
            leftValues[7] * rightValues[9] +
            leftValues[11] * rightValues[10] +
            leftValues[15] * rightValues[11];

        var col3row0 =
            leftValues[0] * rightValues[12] +
            leftValues[4] * rightValues[13] +
            leftValues[8] * rightValues[14] +
            leftValues[12] * rightValues[15];
        var col3row1 =
            leftValues[1] * rightValues[12] +
            leftValues[5] * rightValues[13] +
            leftValues[9] * rightValues[14] +
            leftValues[13] * rightValues[15];
        var col3row2 =
            leftValues[2] * rightValues[12] +
            leftValues[6] * rightValues[13] +
            leftValues[10] * rightValues[14] +
            leftValues[14] * rightValues[15];
        var col3row3 =
            leftValues[3] * rightValues[12] +
            leftValues[7] * rightValues[13] +
            leftValues[11] * rightValues[14] +
            leftValues[15] * rightValues[15];

        return new Matrix4D(
            col0row0, col1row0, col2row0, col3row0,
            col0row1, col1row1, col2row1, col3row1,
            col0row2, col1row2, col2row2, col3row2,
            col0row3, col1row3, col2row3, col3row3);
    };

    Matrix4D.MultiplyMatrix4DAndVector4D = function(matrix, vector){
        var values = matrix.ReadOnlyColumnMajorValues;
        //TODO vector4D
        var x =
            values[0] * vector.X +
            values[4] * vector.Y +
            values[8] * vector.Z +
            values[12] * vector.W;
        var y =
            values[1] * vector.X +
            values[5] * vector.Y +
            values[9] * vector.Z +
            values[13] * vector.W;
        var z =
            values[2] * vector.X +
            values[6] * vector.Y +
            values[10] * vector.Z +
            values[14] * vector.W;
        var w =
            values[3] * vector.X +
            values[7] * vector.Y +
            values[11] * vector.Z +
            values[15] * vector.W;

        return new Vector4D(x, y, z, w);
    };

    Matrix4D.Identity = new Matrix4D(
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    );

    Matrix4D.prototype.Equals = function(other){
        for(var i = 0; i < this._values.length; i++){
            if(this._values[i] != other._values[i]){
                return false;
            }
        }

        return true;
    };

    return Matrix4D;
});