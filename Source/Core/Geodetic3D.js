/**
 * Created by luosong on 2014/3/27.
 */
define(['Core/defineProperties','Core/Geodetic2D'],function(defineProperties,Geodetic2D){

    var Geodetic3D = function(longitude, latitude, height){
        this._longitude = longitude;
        this._latitude = latitude;
        this._height = height;
    };


    Geodetic3D.prototype.getLongitude = function(){
        return this._longitude;
    };

    Geodetic3D.prototype.getLatitude = function(){
        return this._latitude;
    };

    Geodetic3D.prototype.getHeight = function(){
        return this._height;
    };

    Geodetic3D.prototype.Equals = function(other){
        return (this._longitude === other._longitude) &&
            (this._latitude === other._latitude) &&
            (this._height === other.height);
    };


    defineProperties(Geodetic3D.prototype,{
        Longitude : {
            get : function(){
                return this._longitude;
            }
        },

        Latitude : {
            get : function(){
                return this._latitude;
            }
        }
    });


    return Geodetic3D;

});