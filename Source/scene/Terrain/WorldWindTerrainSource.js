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

    var WorldWindTerrainSource = function(){
        this.NumberOfLevels = 12;
        this.TileWidth = 150;
        this.TileHeight = 150;
        this.LevelZeroDeltaLongitudeDegrees = 20;
        this.LevelZeroDeltaLatitudeDegrees = 20;

        this._baseUri = '';
        this._levels = new Array(this.NumberOfLevels);              //RasterLevel
        this._levelsCollection = self._levels;
        this._extent = new GeodeticExtent(-180.0, -90.0, 180.0, 90.0);
        this._tilesLoaded = 0;

        var deltaLongitude = this.LevelZeroDeltaLongitudeDegrees;
        var deltaLatitude = this.LevelZeroDeltaLatitudeDegrees;

        for(var i = 0; i < this._levels.Count; ++i){
            var longitudePosts = Math.round(360.0 / deltaLongitude) * self.TileLongitudePosts + 1;
            var latitudePosts = Math.round(180.0 / deltaLatitude) * self.TileLatitudePosts + 1;
            self._levels[i] = new RasterLevel(
                this,
                i,
                self._extent,
                longitudePosts,
                latitudePosts,
                self.TileLongitudePosts,
                self.TileLatitudePosts
            );
            deltaLongitude /= 2.0;
            deltaLatitude /= 2.0;
        }
    };

    WorldWindTerrainSource.prototype = new RasterSource();
    WorldWindTerrainSource.prototype.constructor = WorldWindTerrainSource;

    defineProperties(WorldWindTerrainSource.prototype,{
        Levels : {
            get : function(){
                return this._levels;
            }
        },
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
                return this.TileWidth;
            }
        },
        TileLatitudePosts : {
            get : function(){
                return this.TileHeight;
            }
        }
    });

    WorldWindTerrainSource.prototype = function LoadTileTexture(identifier){
        var imgUrl = "http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer/tile";
        imgUrl = imgUrl + "/" + identifier.Level + "/" + identifier.X + "/" + identifier.Y;

        //TODO
        //return an texture2D
        return null;
    };

    return WorldWindTerrainSource;
});