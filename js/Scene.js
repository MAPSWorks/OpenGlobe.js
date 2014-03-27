/**
 * Created by luosong on 14-3-20.
 */
define(['Object3D','Utils'],function(Object3D, Utils){

    var mvMatrix = null;
    var pMatrix = null;
    var nMatrix = null;
    var cMatrix = null;

    var home = [0,-2,-50];
    var position = [0,-2,-50];
    var rotation = [0,0,0];

    var coords = -1;

    var COORDS_WORLD = 1;
    var COORDS_CAMERA = 2;
    var requestUpdate = false;

    var updateLightPosition = false;

    //////////////////////////////////////////////////////

    var gl = null; // WebGL context
    var prg = null; // The program (shaders)
    var c_width = 0; // Variable to store the width of the canvas
    var c_height = 0; // Variable to store the height of the canvas

    var squareVertexBuffer = null; //The vertex buffer for the square
    var squareIndexBuffer = null; // The index buffer for the square

    var indices = []; //JavaScript array to store the indices of the square
    var vertices = []; //JavaScript array to store the vertices of the square


    function initProgram() {
        var fgShader = Utils.getShader(gl, "shader-fs");
        var vxShader = Utils.getShader(gl, "shader-vs");

        prg = gl.createProgram();
        gl.attachShader(prg, vxShader);
        gl.attachShader(prg, fgShader);
        gl.linkProgram(prg);

        if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(prg);

        prg.vertexPosition = gl.getAttribLocation(prg, "aVertexPosition");

    }

    function initBuffers() {


        vertices =  [
            -0.5,0.5,0.0, 	//Vertex 0
            -0.5,-0.5,0.0, 	//Vertex 1
            0.5,-0.5,0.0, 	//Vertex 2
            0.5,0.5,0.0]; 	//Vertex 3

        indices = [3,2,1,3,1,0];

        //The following code snippet creates a vertex buffer and binds the vertices to it
        squareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        //The following code snippet creates a vertex buffer and binds the indices to it
        squareIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    function drawScene(){
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0,0,680, 608);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
        gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(prg.vertexPosition);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
    }



    ///////////////////////////////////////////////////////

    var Scene = function(context,width,height){
        this.objects = [];

        this.context = context;
        this.width = width;
        this.height = height;

        this.program = null;
    };

    Scene.prototype.init = function(id_v,id_f){
        this.initTransform();

//        gl = this.context;
//        initProgram();
//        initBuffers();

        var fragmentShader = Utils.getShader(this.context,id_f);
        var vertexShader = Utils.getShader(this.context,id_v);

        this.program = gl.createProgram();
        var prg = this.program;

        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(this.program);

        this.program.aVertexPosition  = gl.getAttribLocation(prg, "aVertexPosition");
        this.program.aVertexNormal    = gl.getAttribLocation(prg, "aVertexNormal");
        this.program.aVertexColor     = gl.getAttribLocation(prg, "aVertexColor");

        this.program.uPMatrix         = gl.getUniformLocation(prg, "uPMatrix");
        this.program.uMVMatrix        = gl.getUniformLocation(prg, "uMVMatrix");
        this.program.uNMatrix         = gl.getUniformLocation(prg, "uNMatrix");

        this.program.uMaterialDiffuse  = gl.getUniformLocation(prg, "uMaterialDiffuse");
        this.program.uLightAmbient     = gl.getUniformLocation(prg, "uLightAmbient");
        this.program.uLightDiffuse     = gl.getUniformLocation(prg, "uLightDiffuse");
        this.program.uLightPosition    = gl.getUniformLocation(prg, "uLightPosition");
        this.program.uUpdateLight      = gl.getUniformLocation(prg, "uUpdateLight");
        this.program.uWireframe        = gl.getUniformLocation(prg, "uWireframe");
        this.program.uPerVertexColor   = gl.getUniformLocation(prg, "uPerVertexColor");


        gl.uniform3fv(this.program.uLightPosition,    [0, 120, 120]);
        gl.uniform4fv(this.program.uLightAmbient,      [0.20,0.20,0.20,1.0]);
        gl.uniform4fv(this.program.uLightDiffuse,      [1.0,1.0,1.0,1.0]);
    }

    Scene.prototype.getObject = function(alias){
        for (var i = 0; i < this.objects.length; i++){
            if (alias === this.objects[i].alias){
                return this.objects[i];
            }
        }
    }

    Scene.prototype.loadObject = function(filename, alias){
        var that = this;

        var request = new XMLHttpRequest();
        console.info('Requesting ' + filename);
        request.open('GET',filename);

        request.onreadystatechange = function(){
            if (request.readyState === 4){
                if (request.status === 404){
                    console.info(filename + ' does not exits.');
                }
                else{
                    var o = JSON.parse(request.responseText);
                    o.alias = (alias == null) ? 'none' : alias;
                    o.remote = true;
                    that.addObject(o);
                }
            }
        };

        request.send();
    };

    Scene.prototype.addObject = function(object){
        var gl = this.context;

        if (object.perVertexColor === undefined) { object.perVertexColor = false;};
        if (object.wireframe === undefined) {object.wireframe = false;};
        if (object.diffuse === undefined) {object.diffuse = [1.0,1.0,1.0,1.0];};

        var vertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.vertices), gl.STATIC_DRAW);

        var normalBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Utils.calculateNormals(object.vertices,object.indices)),gl.STATIC_DRAW);

        var colorBufferObject;
        if (object.perVertexColor) {
            colorBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.colors),gl.STATIC_DRAW);
            object.cbo = colorBufferObject;
        };

        var indexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.indices),gl.STATIC_DRAW);

        object.vbo = vertexBufferObject;
        object.ibo = indexBufferObject;
        object.nbo = normalBufferObject;

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this.objects.push(object);

        if (object.remote) {
            console.info(object.alias + ' has been added to the scene [Remote]');
        }
        else{
            console.info(object.alias + ' has been added to the scene [Local]');
        }

    }

    Scene.prototype.draw = function(){
//        drawScene();
//
//        return;

        var gl = this.context;
        var prg = this.program;

        gl.viewport(0,0,this.width,this.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.updateTransforms();
        this.setMatrixUniform();

        for(var i=0; i < this.objects.length; i++){
            var object = this.objects[i];

            //Setting uniforms
            gl.uniform4fv(prg.uMaterialDiffuse, object.diffuse);
            gl.uniform1i(prg.uWireframe,object.wireframe);
            gl.uniform1i(prg.uPerVertexColor, object.perVertexColor);

            //Setting attributes
            gl.enableVertexAttribArray(prg.aVertexPosition);
            gl.disableVertexAttribArray(prg.aVertexNormal);
            gl.disableVertexAttribArray(prg.aVertexColor);

            gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
            gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(prg.aVertexPosition);

            if(!object.wireframe){
                gl.bindBuffer(gl.ARRAY_BUFFER, object.nbo);
                gl.vertexAttribPointer(prg.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(prg.aVertexNormal);
            }

            if (object.perVertexColor){
                gl.bindBuffer(gl.ARRAY_BUFFER, object.cbo);
                gl.vertexAttribPointer(prg.aVertexColor,4,gl.FLOAT, false, 0,0);
                gl.enableVertexAttribArray(prg.aVertexColor);
            }

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.ibo);

            if (object.wireframe){
                gl.drawElements(gl.LINES, object.indices.length, gl.UNSIGNED_SHORT,0);
            }
            else{
                gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT,0);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }

    }

    Scene.prototype.initTransform = function(){

        mvMatrix = mat4.create();
        pMatrix = mat4.create();
        nMatrix = mat4.create();
        cMatrix = mat4.create();

        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix,home);

        mat4.identity(cMatrix);
        mat4.inverse(mvMatrix,cMatrix);

        mat4.identity(pMatrix);

        mat4.identity(nMatrix);
        mat4.set(mvMatrix,nMatrix);
        mat4.inverse(nMatrix);
        mat4.transpose(nMatrix);

        coords = COORDS_WORLD;

    }

    Scene.prototype.updateTransforms = function(){
        mat4.perspective(30, this.width/this.height, 0.1, 1000.0, pMatrix);

        if(coords === COORDS_WORLD){
            mat4.identity(mvMatrix);
            //mat4.translate(mvMatrix,position);
        }else{
            mat4.identity(cMatrix);
            mat4.translate(cMatrix, position);
        }
    }

    Scene.prototype.setMatrixUniform = function(){
        var gl = this.context;
        if(coords == COORDS_WORLD){
            mat4.inverse(mvMatrix,cMatrix);
            gl.uniformMatrix4fv(this.program.uMVMatrix, false, mvMatrix);
        }else{
            mat4.inverse(cMatrix, mvMatrix);
        }

        gl.uniformMatrix4fv(this.program.uPMatrix, false, pMatrix);
        gl.uniformMatrix4fv(this.program.uMVMatrix, false, mvMatrix);       //Maps the Model-View matrix to the uniform prg.uMVMatrix
        mat4.transpose(cMatrix, nMatrix);                                   //Calculates the Normal matrix
        gl.uniformMatrix4fv(this.program.uNMatrix, false, nMatrix);         //Maps the Normal matrix to the uniform prg.uNMatrix
    }

    return Scene;
});