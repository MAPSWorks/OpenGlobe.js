/**
 * Created by Administrator on 2014/3/30.
 */
define(['Core/Utils','Core/defineProperties'],function(Utils,defineProperties) {
    var Vector2D = function (x, y) {
        this._x = x;
        this._y = y;
    };

    Vector2D.Zero = function(){
        return new Vector2D(0.0,0.0);
    };

    Vector2D.UnitX = function(){
        return new Vector2D(1.0,0.0);
    };

    Vector2D.UnitY = function(){
        return new Vector2D(0.0,1.0);
    };

    Vector2D.prototype.Normalize = function(){
        var magnitude = this.Magnitude;
        return divide(this,magnitude);
    };

    Vector2D.prototype.Dot = function(other){
        return this.X * other.X + this.Y * other.Y;
    };

    Vector2D.prototype.Add = function(other){
        return add(this,other);
    };

    Vector2D.prototype.Subtract = function(other){
        return sub(this,other);
    };

    Vector2D.prototype.Multiply = function(scalar){
        return mul(this,scalar);
    };

    Vector2D.prototype.Divide = function(scalar){
        return divide(this,scalar);
    };

    Vector2D.prototype.Negate = function(){
        return sub(Vector2D.Zero(),this);
    };

    Vector2D.prototype.EqualsEpsilon = function(other, epsilon){
        return (Math.abs(this._x - other._x) <= epsilon) && (Math.abs(this._y - other._y) <= epsilon);
    };

    Vector2D.prototype.Equals = function(other){
        return (this._x == other._x) && (this._y == other._y);
    };



    defineProperties(Vector2D.prototype,{
        X : {
            get : function(){
                return this._x;
            }
        },

        Y : {
            get :function(){
                return this._y;
            }
        },

        MagnitudeSquared : {
            get : function(){
                return this._x * this._x + this._y * this._y;
            }
        },

        Magnitude : {
            get :function(){
                return Math.sqrt(this.MagnitudeSquared);
            }
        },

        IsUndefined : {
            get : function(){
                //TODO
                return false;
            }
        }


    });

    function sub(v1,v2){
        return new Vector2D(v1.X - v2.X,v1.Y - v2.Y);
    }

    function add(v1,v2){
        return new Vector2D(v1.X + v2.X,v1.Y + v2.Y);
    }

    function mul(v,d){
        return new Vector2D(v.X * d, v.Y * d);
    }

    function divide(v,d){
        return new Vector2D(v.X/ d, v.Y/d);
    }





    return Vector2D;
});