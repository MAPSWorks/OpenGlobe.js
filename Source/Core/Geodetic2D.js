/**
 * Created by luosong on 2014/3/27.
 */
define(['Core/defineProperties'],function(defineProperties){

    var Geodetic2D = function(longitude, latitude){
        this._longitude = longitude;
        this._latidude = latitude;
    };

    Geodetic2D.prototype.getLongitude = function(){
        return this._longitude;
    };

    Geodetic2D.prototype.getLatitude = function(){
        return this._latidude;
    };

    Geodetic2D.prototype.EqualsEpsilon = function(other, epsilon){
        return (Math.abs(this._longitude - other._longitude) <= epsilon) &&
            (Math.abs(this._latidude - other._latidude) <= epsilon);
    };

    Geodetic2D.prototype.Equals = function(other){
        return (this._longitude == other._longitude) && (this._latidude == other._latidude);
    };



    defineProperties(Geodetic2D.prototype,{
        Longitude : {
            get : function(){
                return this._longitude;
            }
        },

        Latitude : {
            get : function(){
                return this._latidude;
            }
        }
    });

    return Geodetic2D;
});