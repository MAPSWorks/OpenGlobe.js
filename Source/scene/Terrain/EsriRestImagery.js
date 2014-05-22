/**
 * Created by luosong on 2014/4/30.
 */
define([
    'Core/defineProperties',
    'Core/GeodeticExtent',
    'Scene/Terrain/RasterSource',
    'Scene/Terrain/RasterLevel',
    'Scene/Terrain/RasterTileIdentifier'
],function(
    defineProperties,
    GeodeticExtent,
    RasterSource,
    RasterLevel,
    RasterTileIdentifier
    ){
    'use strict';

    var EsriRestImagery = function(url){
        this.NumberOfLevels = 16;

        this.LevelZeroDeltaLongitudeDegrees = 180.0;
        this.LevelZeroDeltaLatitudeDegrees = 180.0;

        this._baseUri = url; //http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer/tile/

        this._extent = new GeodeticExtent(-180, -90, 180, 90);
        this._tilesLoaded = 0;
        this._levels = new Array(self.NumberOfLevels);      //RasterLevel
        this._levelsCollection = this._levels;

        var deltaLongitude = this.LevelZeroDeltaLongitudeDegrees;
        var deltaLatitude = this.LevelZeroDeltaLatitudeDegrees;

        for(var i = 0; i < this._levels.Count; ++i){
            var longitudePosts = Math.round(360.0 / deltaLongitude) * this.TileLongitudePosts + 1;
            var latitudePosts = Math.round(180.0 / deltaLatitude) * this.TileLatitudePosts + 1;
            this._levels[i] = new RasterLevel(this, i, this._extent, longitudePosts, latitudePosts, this.TileLongitudePosts, this.TileLatitudePosts);
            deltaLongitude /= 2.0;
            deltaLatitude /= 2.0;
        }

    };

    EsriRestImagery.prototype = new RasterSource();
    EsriRestImagery.prototype.constructor = EsriRestImagery;

    defineProperties(EsriRestImagery.prototype,{

        Extent : {
            get : function(){
                return this._extent;
            }
        },
        RasterLevelCollection : {
            get : function(){
                return this._levelsCollection;
            }
        },
        TileLongitudePosts : {
            get : function(){
                return 512;
            }
        },
        TileLatitudePosts : {
            get : function(){
                return 512;
            }
        },
        NumberOfLevels : {
            get : function(){
                return 16;
            },
            set : function(x){
                this._numberOfLevels = 16;
            }
        }
    });


    EsriRestImagery.prototype.LoadTileTexture = function(identifier){
        //TODO
        //return an texture2D
        return null;
    };

    return EsriRestImagery;
});