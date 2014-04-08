/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration'],function(Enumeration){
    "use strict";

    var StencilOperation = {
        Zero : new Enumeration(0,'Zero'),
        Invert : new Enumeration(1,'Invert'),
        Keep : new Enumeration(2,'Keep'),
        Replace : new Enumeration(3,'Replace'),
        Increment : new Enumeration(4,'Increment'),
        Decrement : new Enumeration(5,'Decrement'),
        IncrementWrap : new Enumeration(6,'IncrementWrap'),
        DecrementWrap : new Enumeration(7,'DecrementWrap')

    };

    return StencilOperation;
});