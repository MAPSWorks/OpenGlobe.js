/**
 * Created by luosong on 2014/4/30.
 */
define([],function(){
   'use strict';

    var RasterTileRegion = function(tile,west,south,east,north){
        this.Tile = tile;
        this.West = west;
        this.South = south;
        this.East = east;
        this.North = north;
    };

    return RasterTileRegion;
});