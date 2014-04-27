/**
 * Created by luosong on 2014/4/25.
 */
define([],function(){
    'use strict';

    var Mouse = function(canvas){
        this._buttonDowns = [];
        this._buttonUps = [];
        this._moves = [];

        //firefox 1-2
        //chrome 0-2
        canvas.onmousedown = (function(mouse){
            var handle = function(event){
                mouse.OnButtonDown(
                    {X:event.clientX,Y:event.clientY},
                    event.button
                );
            };
            return handle;
        })(this);
        document.onmouseup = (function(mouse){
            var handle = function(event){
                mouse.OnButtonUp(
                    {X:event.clientX,Y:event.clientY},
                    event.button
                );

                if(event.button == 2){
                    return false;
                }
            };
            return handle;
        })(this);
        document.onmousemove = (function(mouse){
            var handle = function(event){
                mouse.OnMove(
                    {X:event.clientX,Y:event.clientY}
                );
            };
            return handle;
        })(this);

        document.oncontextmenu = function (event){
            if(window.event){
                event = window.event;
            }try{
                var the = event.srcElement;
                if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
                    return false;
                }
                return true;
            }catch (e){
                return false;
            }

        }

        //document.onkeydown = handleKeyDown;
        //document.onkeyup = handleKeyUp;

    };

    Mouse.prototype.OnButtonDown = function(point, button){
        for(var i = 0; i < this._buttonDowns.length; i++){
            var handler = this._buttonDowns[i];

            handler(point,button);
        }
        //console.log('down');
    };

    Mouse.prototype.OnButtonUp = function(point, button){
        for(var i = 0; i < this._buttonUps.length; i++){
            var handler = this._buttonUps[i];

            handler(point,button);
        }
        //console.log('up');
    };

    Mouse.prototype.OnMove = function(point){
        for(var i = 0; i < this._moves.length; i++){
            var handler = this._moves[i];

            handler(point);
        }
        //console.log('move');
    };

    Mouse.prototype.AddMouseDownHandler = function(handle){
        this._buttonDowns.push(handle);
    };

    Mouse.prototype.AddMouseUpHandler = function(handle){
        this._buttonUps.push(handle);
    };

    Mouse.prototype.AddMouseMoveHandler = function(handle){
        this._moves.push(handle);
    };


    Mouse.prototype.RemoveMouseDownHandler = function(handle){
        for(var i = 0 ; i < this._buttonDowns.length; i++){
            if(this._buttonDowns[i] == handle){
                this._buttonDowns.splice(i,1);
                break;
            }
        }
    };

    Mouse.prototype.RemoveMouseUpHandler = function(handle){
        for(var i = 0 ; i < this._buttonUps.length; i++){
            if(this._buttonUps[i] == handle){
                this._buttonUps.splice(i,1);
                break;
            }
        }
    };

    Mouse.prototype.RemoveMouseMoveHandler = function(handle){
        for(var i = 0 ; i < this._moves.length; i++){
            if(this._moves[i] == handle){
                this._moves.splice(i,1);
                break;
            }
        }
    };

    return Mouse;
});