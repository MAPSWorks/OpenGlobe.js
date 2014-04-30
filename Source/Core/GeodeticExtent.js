/**
 * Created by luosong on 2014/4/30.
 */

define([],function(){
    'use strict';

    var GeodeticExtent = function(west, south, east, north){
        this.West = west;
        this.South = south;
        this.East = east;
        this.North = north;
    };




    return GeodeticExtent;
});