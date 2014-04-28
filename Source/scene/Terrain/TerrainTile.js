/**
 * Created by luosong on 2014/4/28.
 */

define([
    'Core/defineProperties',
    'Core/Vector2D',
    'Core/RectangleD'
],function(
    defineProperties,
    Vector2D,
    RectangleD
    ){
    'use strict';

    var TerrainTile = function(
        extent,
        resolution,
        heights,
        minimumHeight,
        maximumHeight){

        if(extent.UpperRight.X <= extent.LowerLeft.X ||
            extent.UpperRight.Y <= extent.LowerLeft.Y){
            throw new Error('terrain tile extent error');
        }
        if(resolution.X < 0 || resolution.Y < 0){
            throw new Error('terrain tile resolution error');
        }
        if(heights == null){
            throw new Error('terrain tile null');
        }
        if(heights.Length != resolution.X * resolution.Y){
            throw new Error('heights.Length != resolution.Width * resolution.Height');
        }
        if(minimumHeight > maximumHeight){
            throw new Error('minimumHeight > maximumHeight');
        }

        this._extent = extent;
        this._resolution = resolution;
        this._height = heights;
        this._minimumHeight = minimumHeight;
        this._maximumHeight = maximumHeight;
    };


    TerrainTile.FromImage = function(image){
        if(image == null || image == undefined){
            throw new Error('image null or undefined');
        }

        var heights = new Array(image.width * image.height);
        var minHeight = Number.MAX_VALUE;
        var maxHeight = Number.MIN_VALUE;

        //read image pixel value, from http://blog.csdn.net/fdipzone/article/details/17051221

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        var img_width = image.width;
        var img_height = image.height;

        canvas.width = img_width;
        canvas.height = img_height;

        context.drawImage(image,0,0,img_width,img_height);

        var imageData = context.getImageData(0,0,img_width,img_height);
        var length = imageData.data.length;

        var k = 0;
        for(var i = 0; i < length; i++){
            if(i%4 === 0){  //every 4 element as a pixel data, r,g,b,alpha
                var x = i /4%img_width + 1;
                var y = Math.floor(i/4/img_width) + 1;

                var r = imageData.data[i];
                var g = imageData.data[i + 1];
                var b = imageData.data[i + 2];

                var h = r / 255;
                heights[k++] = h;
                minHeight = Math.min(h, minHeight);
                maxHeight = Math.max(h, maxHeight);
            }
        }

        return new TerrainTile(
            new RectangleD(new Vector2D(0.5,0.5),new Vector2D(img_width - 0.5,img_height - 0.5)),
            new Vector2D(img_width, img_height),
            heights,
            minHeight,
            maxHeight
        );

    };

    defineProperties(TerrainTile.prototype,{
        Extent : {
            get : function(){
                return this._extent;
            }
        },
        Resolution : {
            get : function(){
                return this._resolution;
            }
        },

        Heights : {
            get : function(){
                return this._height;
            }
        },
        MinimumHeight : {
            get : function(){
                return this._minimumHeight;
            }
        },
        MaximumHeight : {
            get : function(){
                return this._maximumHeight;
            }
        }
    });


    return TerrainTile;
});