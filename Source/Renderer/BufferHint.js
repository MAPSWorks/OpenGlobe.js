/**
 * Created by luosong on 2014/4/9.
 */
define(['Core/Enumeration'],function(Enumeration){
    "use strict";

    var BufferHint = {

        StreamDraw : new Enumeration(0,'StreamDraw'),
        StreamRead : new Enumeration(1,'StreamRead'),
        StreamCopy : new Enumeration(2,'StreamCopy'),

        StaticDraw : new Enumeration(3,'StaticDraw'),
        StaticRead : new Enumeration(4,'StaticRead'),
        StaticCopy : new Enumeration(5,'StaticCopy'),

        DynamicDraw : new Enumeration(6,'DynamicDraw'),
        DynamicRead : new Enumeration(6,'DynamicRead'),
        DynamicCopy : new Enumeration(7,'DynamicCopy')

    };

    return BufferHint;
});