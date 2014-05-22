/**
 * Created by luosong on 2014/4/30.
 */
define([
    'Core/defineProperties',
    'Core/GeodeticExtent',
    'Scene/Terrain/RasterTile'
],function(
    defineProperties,
    GeodeticExtent,
    RasterTile
    ){

    'use strict';

    var RasterSource = function(){
        this._level = null;
        this._extent = null;

        this._activeTiles = {};
    };

//    defineProperties(RasterSource.prototype,{
//        Level : {
//            get : function(){
//                return this._level;
//            }
//        },
//        Extent : {
//            get : function(){
//                return this._extent;
//            }
//        }
//    });

    RasterSource.prototype.GetTile = function(identifier){
        var tile = this._activeTiles[identifier];
        if(tile){
            return tile;
        }

        tile = new RasterTile(this,identifier);
        return tile;
    };

    RasterSource.prototype.ActivateTile = function(tile){
        this._activeTiles[tile.Identifier] = tile;
    };

    RasterSource.prototype.DeactivateTile = function(tile){
        //TODO

    };

    RasterSource.prototype.LoadTileTexture = function(identifier){

    };



    return RasterSource;
});