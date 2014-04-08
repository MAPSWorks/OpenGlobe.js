/**
 * Created by luosong on 2014/3/31.
 */
define(['Core/Enumeration'],function(Enumeration){
    var ProgramPointSize = {
        Enabled : new Enumeration(0,'Enabled'),

        Disabled : new Enumeration(1,'Disabled'),

        validate : function(programPointSize){
            return ((programPointSize === ProgramPointSize.Enabled) ||
                (programPointSize === ProgramPointSize.Disabled));
        }
    };

    return ProgramPointSize;
});