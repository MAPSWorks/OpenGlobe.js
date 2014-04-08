/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration'],function(Enumeration){
    var RasterizationMode = {
        Point : new Enumeration(0,'Point'),

        Line : new Enumeration(1,'Line'),

        Fill : new Enumeration(2,'Fill'),

        validate : function(rasterizationMode){
            return ((rasterizationMode === RasterizationMode.Point) ||
                (rasterizationMode === RasterizationMode.Line) ||
                (rasterizationMode === RasterizationMode.Fill));
        }
    };

    return RasterizationMode;
});