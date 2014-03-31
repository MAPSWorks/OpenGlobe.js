/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration'],function(Enumeration){
    "use strict";

    var WindingOrder = {

        Clockwise : new Enumeration(0,'Clockwise'),

        Counterclockwise : new Enumeration(0,'Counterclockwise'),

        validate : function(windingOrder){
            return ((windingOrder === WindingOrder.Clockwise) || (windingOrder === WindingOrder.Counterclockwise));
        }
    };

    return WindingOrder;
});