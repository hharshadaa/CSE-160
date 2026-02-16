class Cube{
  constructor() {
    this.type='cube';
    //this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
   // this.size = 5.0;
   // this.segments = 10;
   this.matrix = new Matrix4();
   this.textureNum = -2;
   this.cubeVerts32 = new Float32Array([
      // Front
      0,0,0,  1,1,0,  1,0,0,
      0,0,0,  0,1,0,  1,1,0,

      // Top
      0,1,0,  0,1,1,  1,1,1,
      0,1,0,  1,1,1,  1,1,0,

      // Right
      1,0,0,  1,1,0,  1,1,1,
      1,0,0,  1,1,1,  1,0,1,

      // Left
      0,1,0,  0,1,1,  0,0,0,
      0,0,0,  0,1,1,  0,0,1,

      // Bottom
      0,0,0,  0,0,1,  1,0,1,
      0,0,0,  1,0,1,  1,0,0,

      // Back
      0,0,1,  1,1,1,  1,0,1,
      0,0,1,  0,1,1,  1,1,1
    ]);
    this.cubeVerts = [
      // Front
      0,0,0,  1,1,0,  1,0,0,
      0,0,0,  0,1,0,  1,1,0,

      // Top
      0,1,0,  0,1,1,  1,1,1,
      0,1,0,  1,1,1,  1,1,0,

      // Right
      1,0,0,  1,1,0,  1,1,1,
      1,0,0,  1,1,1,  1,0,1,

      // Left
      0,1,0,  0,1,1,  0,0,0,
      0,0,0,  0,1,1,  0,0,1,

      // Bottom
      0,0,0,  0,0,1,  1,0,1,
      0,0,0,  1,0,1,  1,0,0,

      // Back
      0,0,1,  1,1,1,  1,0,1,
      0,0,1,  0,1,1,  1,1,1
    ];
  }

  render() {
   // var xy = this.position;
    var rgba = this.color;

    gl.uniform1i(u_whichTexture, this.textureNum);

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    //Front
   drawTriangle3DUV(
    [0,0,0,  1,1,0,  1,0,0],
    [1,0,  0,1,  1,1]
  );
   drawTriangle3DUV(
    [0,0,0,  0,1,0,  1,1,0],
    [0,0,  0,1,  1,1]
  );
   

    gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
    //Top
    drawTriangle3D( [0,1,0,  0,1,1,  1,1,1]);
    drawTriangle3D( [0,1,0,  1,1,1,  1,1,0]);

    //Back
     drawTriangle3D( [0,0,1,  1,0,1,  1,1,1]);
    drawTriangle3D( [0,0,1,  1,1,1,  0,1,1]);

    //Bottom
    drawTriangle3D( [0,0,0,  1,0,0,  1,0,1]);
    drawTriangle3D( [0,0,0,  1,0,1,  0,0,1]);

     //Left
    drawTriangle3D( [0,0,0,  0,0,1,  0,1,1]);
    drawTriangle3D( [0,0,0,  0,1,1,  0,1,0]);

    //right
    drawTriangle3D( [1,0,0,  1,1,0,  1,1,1]);
    drawTriangle3D( [1,0,0,  1,1,1,  1,0,1]);

  }

  renderfaster() {
    var rgba = this.color;

    gl.uniform1i(u_whichTexture, this.textureNum);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    if (g_vertexBuffer == null) {
      initTriangle3D();
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      this.cubeVerts32,
      gl.DYNAMIC_DRAW
    );
  
    gl.disableVertexAttribArray(a_UV); 

    gl.drawArrays(gl.TRIANGLES, 0, 36);
  }

}