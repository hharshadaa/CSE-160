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

  var rgba = this.color;

  gl.uniform1i(u_whichTexture, this.textureNum);
  gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

  // ================= FRONT =================
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

  drawTriangle3DUVNormal(
    [0,0,0,  1,1,0,  1,0,0],
    [1,0, 0,1, 1,1],
    [0,0,-1, 0,0,-1, 0,0,-1]
  );

  drawTriangle3DUVNormal(
    [0,0,0,  0,1,0,  1,1,0],
    [0,0, 0,1, 1,1],
    [0,0,-1, 0,0,-1, 0,0,-1]
  );


  // ================= TOP =================
  //gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

  drawTriangle3DUVNormal(
    [0,1,0,  0,1,1,  1,1,1],
    [0,0, 0,1, 1,1],
    [0,1,0, 0,1,0, 0,1,0]
  );

  drawTriangle3DUVNormal(
    [0,1,0,  1,1,1,  1,1,0],
    [0,0, 1,1, 1,0],
    [0,1,0, 0,1,0, 0,1,0]
  );


  // ================= RIGHT =================
 // gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3]);

  drawTriangle3DUVNormal(
    [1,0,0,  1,1,0,  1,1,1],
    [0,0, 0,1, 1,1],
    [1,0,0, 1,0,0, 1,0,0]
  );

  drawTriangle3DUVNormal(
    [1,0,0,  1,1,1,  1,0,1],
    [0,0, 1,1, 1,0],
    [1,0,0, 1,0,0, 1,0,0]
  );


  // ================= LEFT =================
 // gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);

  drawTriangle3DUVNormal(
    [0,1,0,  0,1,1,  0,0,0],
    [0,0, 0,1, 1,1],
    [-1,0,0, -1,0,0, -1,0,0]
  );

  drawTriangle3DUVNormal(
    [0,0,0,  0,1,1,  0,0,1],
    [0,0, 1,1, 1,0],
    [-1,0,0, -1,0,0, -1,0,0]
  );


  // ================= BOTTOM =================
  //gl.uniform4f(u_FragColor, rgba[0]*.6, rgba[1]*.6, rgba[2]*.6, rgba[3]);

  drawTriangle3DUVNormal(
    [0,0,0,  0,0,1,  1,0,1],
    [0,0, 0,1, 1,1],
    [0,-1,0, 0,-1,0, 0,-1,0]
  );

  drawTriangle3DUVNormal(
    [0,0,0,  1,0,1,  1,0,0],
    [0,0, 1,1, 1,0],
    [0,-1,0, 0,-1,0, 0,-1,0]
  );


  // ================= BACK =================
  //gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3]);

  drawTriangle3DUVNormal(
    [0,0,1,  1,1,1,  1,0,1],
    [1,0, 0,1, 1,1],
    [0,0,1, 0,0,1, 0,0,1]
  );

  drawTriangle3DUVNormal(
    [0,0,1,  0,1,1,  1,1,1],
    [0,0, 0,1, 1,1],
    [0,0,1, 0,0,1, 0,0,1]
  );
}

  renderfaster() {

    gl.uniform1i(u_whichTexture, this.textureNum);
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

    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, 36);
  }

}