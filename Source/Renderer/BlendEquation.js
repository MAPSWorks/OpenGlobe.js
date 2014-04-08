/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration'],function(Enumeration){
    "use strict";

    var BlendEquation = {

        Add : new Enumeration(0,'Add'),

        Minimum : new Enumeration(1,'Minimum'),

        Maximum : new Enumeration(2,'Maximum'),

        Subtract : new Enumeration(3,'Subtract'),

        ReverseSubtract : new Enumeration(4,'ReverseSubtract')

    };

    return BlendEquation;
});