 //drawTriangle([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  //drawTriangle([0.8, 0.9, .7, .8, .8, .7]);
  //drawTriangle([0.0, 0.0, .5, 0, .5, .5]);


class Triangle{
  constructor() {
    this.type='triangle';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
  }

render() {
  const xy = this.position;
  const rgba = this.color;
  const size = this.size; 

  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

  
  const dx = (size / canvas.width) * 2.0;
  const dy = (size / canvas.height) * 2.0;

  drawTriangle([
    xy[0],xy[1], xy[0] + dx, xy[1], xy[0],  xy[1] + dy    ]);
}

}

function drawTriangle(vertices) {
  var n = 3;

  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);


  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0 , n);

}

function drawTriangle3D(vertices) {
  var n = vertices.length / 3;

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

var g_vertexBuffer = null;
var g_uvBuffer = null;
var g_normalBuffer = null;

function initTriangle3DUVNormal() {
  g_vertexBuffer = gl.createBuffer();
  g_uvBuffer = gl.createBuffer();
  g_normalBuffer = gl.createBuffer();

  if (!g_vertexBuffer || !g_uvBuffer || !g_normalBuffer) {
    console.log("Failed to create buffers");
    return -1;
  }
}

function drawTriangle3DUVNormal(vertices, uv, normals) {
  if (!g_vertexBuffer) {
    initTriangle3DUVNormal();
  }

  var n = vertices.length / 3;

  // POSITION
  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // UV
  gl.bindBuffer(gl.ARRAY_BUFFER, g_uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_UV);

  // NORMAL
  gl.bindBuffer(gl.ARRAY_BUFFER, g_normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Normal);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}