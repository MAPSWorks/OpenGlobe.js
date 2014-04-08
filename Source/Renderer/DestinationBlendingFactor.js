/**
 * Created by luosong on 2014/3/31.
 */

define(['Core/Enumeration'],function(Enumeration){
    "use strict";

    var DestinationBlendingFactor = {

        Zero : new Enumeration(0,'Zero'),

        One : new Enumeration(1,'One'),

        SourceColor : new Enumeration(2,'SourceColor'),

        OneMinusSourceColor : new Enumeration(3,'OneMinusSourceColor'),

        SourceAlpha : new Enumeration(4,'SourceAlpha'),

        OneMinusSourceAlpha : new Enumeration(5,'OneMinusSourceAlpha'),

        DestinationAlpha : new Enumeration(6,'DestinationAlpha'),

        OneMinusDestinationAlpha : new Enumeration(7,'OneMinusDestinationAlpha'),

        DestinationColor : new Enumeration(8,'DestinationColor'),

        OneMinusDestinationColor : new Enumeration(9,'OneMinusDestinationColor'),

        ConstantColor : new Enumeration(10,'ConstantColor'),

        OneMinusConstantColor : new Enumeration(11,'OneMinusConstantColor'),

        ConstantAlpha : new Enumeration(12,'ConstantAlpha'),

        OneMinusConstantAlpha : new Enumeration(13,'OneMinusConstantAlpha')

    };

    return DestinationBlendingFactor;
});