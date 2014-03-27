/**
 * Created by luosong on 2014/3/27.
 */

define(['GraphicesWindowGL3X'],function(GraphicesWindowGL3X){

    var Device = function(){

    }

    Device.CreateWindow = function(width, height, title){
        return new GraphicesWindowGL3X(width,height,title);
    }


    return Device;
});